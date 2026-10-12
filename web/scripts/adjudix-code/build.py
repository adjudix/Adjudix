"""Builds the Adjudix Code of ADR Procedure (2018, 2021, 2026) from content.py.

Outputs, per edition:
  web/public/code/adjudix-code-of-adr-procedure-<year>.pdf   (linked from the site)
  client-review/code-drafts/adjudix-code-of-adr-procedure-<year>.docx  (editable)
and web/src/lib/moral-principles.json (the 2026 Preamble, used by the site).

Run:  python -I web/scripts/adjudix-code/build.py
Needs python-docx and Google Chrome (for HTML -> PDF).
"""

import html
import json
import re
import subprocess
import sys
import tempfile
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
import content as C  # noqa: E402

ROOT = HERE.parents[2]  # repo root
PDF_DIR = ROOT / "web" / "public" / "code"
DOCX_DIR = ROOT / "client-review" / "code-drafts"
JSON_OUT = ROOT / "web" / "src" / "lib" / "moral-principles.json"
READER_DIR = ROOT / "web" / "src" / "lib" / "code"  # full text for the on-site reader
CHROME = Path(r"C:/Program Files/Google/Chrome/Application/chrome.exe")
EDITIONS = [2018, 2021, 2026]
PREV = {2021: 2018, 2026: 2021}


def roman(n):
    out = ""
    for value, sym in [(10, "X"), (9, "IX"), (5, "V"), (4, "IV"), (1, "I")]:
        while n >= value:
            out += sym
            n -= value
    return out


def pick(value, ed):
    return value[ed] if isinstance(value, dict) else value


def build_edition(ed):
    """Filter content to one edition and number parts, chapters, sections."""
    parts, refs, chaps, partnums = [], {}, {}, {}
    p_no = c_no = s_no = 0
    for part in C.PARTS:
        if ed not in part.get("eds", C.ALL):
            continue
        p_no += 1
        if "key" in part:
            partnums[part["key"]] = roman(p_no)
        chapters = []
        for chap in part["chapters"]:
            if ed not in chap.get("eds", C.ALL):
                continue
            # An inserted chapter takes the previous numbers with a suffix
            # (Chapter X-A, Sections 50A, 50B...) instead of renumbering.
            inserted = chap.get("inserted", False)
            if not inserted:
                c_no += 1
            chap_no = f"{roman(c_no)}-A" if inserted else roman(c_no)
            if "key" in chap:
                chaps[chap["key"]] = chap_no
            chap_since = max(min(chap.get("eds", C.ALL)), min(part.get("eds", C.ALL)))
            sections = []
            letter = 0
            for sec in chap["sections"]:
                if ed not in sec.get("eds", C.ALL):
                    continue
                body = pick(sec["body"], ed) if sec["body"] != "DEFINITIONS" else "DEFINITIONS"
                if body is None:
                    continue
                if inserted:
                    number = f"{s_no}{chr(65 + letter)}"
                    letter += 1
                else:
                    s_no += 1
                    number = str(s_no)
                if "key" in sec:
                    refs[sec["key"]] = number
                sections.append(
                    {"no": number, "title": pick(sec["title"], ed), "body": body, "since": max(min(sec.get("eds", C.ALL)), chap_since)}
                )
            chapters.append(
                {"no": chap_no, "title": chap["title"], "sections": sections, "since": chap_since}
            )
        parts.append({"no": roman(p_no), "title": part["title"], "chapters": chapters})

    def fill(text):
        text = re.sub(r"\{ref:(\w+)\}", lambda m: f"Section {refs[m.group(1)]}", text)
        text = re.sub(r"\{chap:(\w+)\}", lambda m: chaps[m.group(1)], text)
        text = re.sub(r"\{part:(\w+)\}", lambda m: partnums[m.group(1)], text)
        return text.replace("{year}", str(ed)).replace("{prev}", str(PREV.get(ed, "")))

    definitions = [(term, fill(pick(text, ed))) for term, text, eds in C.DEFINITIONS if ed in eds]
    for part in parts:
        for chap in part["chapters"]:
            for sec in chap["sections"]:
                if sec["body"] == "DEFINITIONS":
                    sec["body"] = None
                    sec["definitions"] = definitions
                else:
                    sec["body"] = [fill(t) for t in sec["body"]]
    return {
        "year": ed,
        "title": f"The Adjudix Code of ADR Procedure, {ed}",
        "note": C.EDITION_NOTES[ed],
        "intro": [fill(t) for t in C.PREAMBLE_INTRO[ed]],
        "principles": C.PRINCIPLES[ed],
        "close": C.PREAMBLE_CLOSE[ed],
        "parts": parts,
    }


# ---------------------------------------------------------------- HTML / PDF

CSS = """
@page { size: A4; margin: 22mm 20mm 22mm 20mm; }
body { font-family: Georgia, 'Times New Roman', serif; font-size: 10.5pt; line-height: 1.5; color: #111; }
.cover { height: 245mm; display: flex; flex-direction: column; justify-content: center; text-align: center; page-break-after: always; }
.cover .inst { letter-spacing: .18em; font-size: 10pt; text-transform: uppercase; color: #8a6a1f; }
.cover h1 { font-size: 26pt; margin: 18pt 0 8pt; line-height: 1.2; }
.cover .force { font-size: 11pt; color: #444; }
.cover .note { max-width: 120mm; margin: 24pt auto 0; font-size: 10pt; color: #444; font-style: italic; }
h2 { font-size: 13pt; text-align: center; text-transform: uppercase; letter-spacing: .06em; margin: 22pt 0 4pt; }
h3 { font-size: 11.5pt; text-align: center; margin: 4pt 0 12pt; font-weight: normal; text-transform: uppercase; letter-spacing: .04em; }
h4 { font-size: 10.5pt; margin: 14pt 0 4pt; }
.toc { page-break-after: always; }
.toc h2 { margin-top: 0; }
.toc .part { margin-top: 8pt; font-weight: bold; font-size: 9.5pt; }
.toc .chap { margin: 3pt 0 1pt 10pt; font-style: italic; font-size: 9.5pt; }
.toc .sec { margin-left: 20pt; font-size: 9.5pt; }
.preamble { page-break-after: always; }
.preamble p { text-align: justify; }
.principle { margin: 8pt 0; text-align: justify; }
.principle b { display: block; }
ol.sub { margin: 0; padding-left: 26pt; list-style: none; counter-reset: sub; }
ol.sub li { margin: 3pt 0; text-align: justify; counter-increment: sub; position: relative; }
ol.sub li::before { content: "(" counter(sub) ")"; position: absolute; left: -26pt; }
.defs p { margin: 3pt 0 3pt 22pt; text-align: justify; }
.part-block { page-break-before: always; }
.part-block:first-of-type { page-break-before: auto; }
.end { text-align: center; margin-top: 30pt; font-size: 9pt; color: #555; }
"""


def esc(text):
    return html.escape(text, quote=False)


def to_html(doc):
    y = doc["year"]
    out = [f"<!doctype html><html><head><meta charset='utf-8'><title>{esc(doc['title'])}</title><style>{CSS}</style></head><body>"]
    out.append(
        f"<section class='cover'><div class='inst'>Adjudix Dispute Resolution Institute</div>"
        f"<h1>{esc(doc['title'].upper())}</h1><div class='force'>In force from 1 January {y}</div>"
        f"<div class='note'>{esc(doc['note'])}</div></section>"
    )
    out.append("<section class='toc'><h2>Arrangement of Parts, Chapters, and Sections</h2>")
    out.append("<div class='part'>Preamble and Moral Principles</div>")
    for part in doc["parts"]:
        out.append(f"<div class='part'>PART {part['no']}: {esc(part['title'].upper())}</div>")
        for chap in part["chapters"]:
            out.append(f"<div class='chap'>Chapter {chap['no']}: {esc(chap['title'])}</div>")
            for sec in chap["sections"]:
                out.append(f"<div class='sec'>Section {sec['no']}: {esc(sec['title'])}</div>")
    out.append("</section>")

    out.append("<section class='preamble'><h2>Preamble</h2>")
    for para in doc["intro"]:
        out.append(f"<p>{esc(para)}</p>")
    out.append("<h3>Moral Principles</h3>")
    for i, (title, body) in enumerate(doc["principles"], 1):
        out.append(f"<div class='principle'><b>{roman(i)}. {esc(title)}</b>{esc(body)}</div>")
    out.append(f"<p><i>{esc(doc['close'])}</i></p></section>")

    for part in doc["parts"]:
        out.append(f"<section class='part-block'><h2>Part {part['no']}</h2><h3>{esc(part['title'])}</h3>")
        for chap in part["chapters"]:
            out.append(f"<h2 style='font-size:11pt'>Chapter {chap['no']}</h2><h3>{esc(chap['title'])}</h3>")
            for sec in chap["sections"]:
                out.append(f"<h4>{sec['no']}. {esc(sec['title'])}</h4>")
                if sec.get("definitions"):
                    out.append("<p>In this Code, unless the context otherwise requires —</p><div class='defs'>")
                    for k, (term, text) in enumerate(sec["definitions"]):
                        out.append(f"<p>({chr(97 + k)}) “{esc(term)}” {esc(text)}</p>")
                    out.append(
                        "</div><p>Words and expressions used but not defined in this Code have the meanings assigned to them in the Act.</p>"
                    )
                elif len(sec["body"]) == 1:
                    out.append(f"<p style='text-align:justify'>{esc(sec['body'][0])}</p>")
                else:
                    out.append("<ol class='sub'>" + "".join(f"<li>{esc(t)}</li>" for t in sec["body"]) + "</ol>")
        out.append("</section>")
    out.append(f"<div class='end'>— End of {esc(doc['title'])} —</div></body></html>")
    return "\n".join(out)


def to_pdf(html_text, target):
    with tempfile.TemporaryDirectory() as tmp:
        src = Path(tmp) / "code.html"
        src.write_text(html_text, encoding="utf-8")
        subprocess.run(
            [
                str(CHROME),
                "--headless=new",
                "--disable-gpu",
                "--no-pdf-header-footer",
                f"--user-data-dir={tmp}/profile",
                f"--print-to-pdf={target}",
                src.as_uri(),
            ],
            check=True,
            capture_output=True,
            timeout=120,
        )


# ---------------------------------------------------------------- DOCX


def to_docx(doc, target):
    from docx import Document
    from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_BREAK
    from docx.shared import Pt

    d = Document()
    style = d.styles["Normal"]
    style.font.name = "Georgia"
    style.font.size = Pt(10.5)

    def para(text, bold=False, italic=False, center=False, size=None, justify=True):
        p = d.add_paragraph()
        run = p.add_run(text)
        run.bold, run.italic = bold, italic
        if size:
            run.font.size = Pt(size)
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER if center else (WD_ALIGN_PARAGRAPH.JUSTIFY if justify else None)
        return p

    def page_break():
        d.add_paragraph().add_run().add_break(WD_BREAK.PAGE)

    para("ADJUDIX DISPUTE RESOLUTION INSTITUTE", center=True, size=10)
    para(doc["title"].upper(), bold=True, center=True, size=22)
    para(f"In force from 1 January {doc['year']}", center=True)
    para(doc["note"], italic=True, center=True)
    page_break()

    para("PREAMBLE", bold=True, center=True, size=13)
    for text in doc["intro"]:
        para(text)
    para("MORAL PRINCIPLES", bold=True, center=True)
    for i, (title, body) in enumerate(doc["principles"], 1):
        p = d.add_paragraph()
        p.add_run(f"{roman(i)}. {title}. ").bold = True
        p.add_run(body)
        p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    para(doc["close"], italic=True)

    for part in doc["parts"]:
        page_break()
        para(f"PART {part['no']}", bold=True, center=True, size=13)
        para(part["title"].upper(), center=True)
        for chap in part["chapters"]:
            para(f"CHAPTER {chap['no']}", bold=True, center=True)
            para(chap["title"].upper(), center=True)
            for sec in chap["sections"]:
                para(f"{sec['no']}. {sec['title']}", bold=True, justify=False)
                if sec.get("definitions"):
                    para("In this Code, unless the context otherwise requires —")
                    for k, (term, text) in enumerate(sec["definitions"]):
                        para(f"({chr(97 + k)}) “{term}” {text}")
                    para("Words and expressions used but not defined in this Code have the meanings assigned to them in the Act.")
                elif len(sec["body"]) == 1:
                    para(sec["body"][0])
                else:
                    for k, text in enumerate(sec["body"], 1):
                        para(f"({k}) {text}")
    para(f"— End of {doc['title']} —", italic=True, center=True)
    d.save(target)


def write_reader_json(doc, target):
    data = {
        "year": doc["year"],
        "title": doc["title"],
        "note": doc["note"],
        "intro": doc["intro"],
        "principles": [{"title": t, "body": b} for t, b in doc["principles"]],
        "close": doc["close"],
        "parts": doc["parts"],
        "closingNote": "Words and expressions used but not defined in this Code have the meanings assigned to them in the Act.",
    }
    for part in data["parts"]:
        for chap in part["chapters"]:
            for sec in chap["sections"]:
                if sec.get("definitions"):
                    sec["definitions"] = [{"term": t, "text": x} for t, x in sec["definitions"]]
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(json.dumps(data, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")


def main():
    PDF_DIR.mkdir(parents=True, exist_ok=True)
    DOCX_DIR.mkdir(parents=True, exist_ok=True)
    summary = []
    for ed in EDITIONS:
        doc = build_edition(ed)
        name = f"adjudix-code-of-adr-procedure-{ed}"
        to_pdf(to_html(doc), PDF_DIR / f"{name}.pdf")
        to_docx(doc, DOCX_DIR / f"{name}.docx")
        n_sec = sum(len(c["sections"]) for p in doc["parts"] for c in p["chapters"])
        n_chap = sum(len(p["chapters"]) for p in doc["parts"])
        summary.append({"year": ed, "parts": len(doc["parts"]), "chapters": n_chap, "sections": n_sec})
        write_reader_json(doc, READER_DIR / f"code-{ed}.json")
        if ed == 2026:
            JSON_OUT.write_text(
                json.dumps(
                    {"edition": ed, "principles": [{"title": t, "body": b} for t, b in doc["principles"]]},
                    ensure_ascii=False,
                    indent=2,
                )
                + "\n",
                encoding="utf-8",
            )
    print(json.dumps(summary))


if __name__ == "__main__":
    main()
