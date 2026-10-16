import { createCaptcha } from "@/lib/captcha";

// A fresh portal captcha on every request; never cached.
export function GET() {
  const { svg, token } = createCaptcha();
  return Response.json(
    { image: `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`, token },
    { headers: { "cache-control": "no-store" } },
  );
}
