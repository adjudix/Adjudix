import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { SiteHeader } from "@/components/layout/site-header";
import { buildSearchIndex } from "@/lib/search-index";
import { SiteFooter } from "@/components/layout/site-footer";
import { PageLoader } from "@/components/layout/page-loader";
import { ConsultationPopup } from "@/components/layout/consultation-popup";
import { getSiteSettings } from "@/lib/content/data";
import { LocaleScript } from "@/components/i18n/locale-script";
import { Translator } from "@/components/i18n/translator";

// The public site's chrome around every page, with its menus, notices and
// pop-up as set in the console's Site settings.
export default async function SiteLayout({ children }: LayoutProps<"/">) {
  const [settings, searchItems] = await Promise.all([getSiteSettings(), buildSearchIndex()]);
  return (
    <>
      {/* First, so a translated page is hidden before it paints. */}
      <LocaleScript />
      {/* Without JavaScript the intro can't be dismissed and the scroll-reveal
          never fires: skip the one and show everything for the other. */}
      <noscript>
        <style>
          {"[data-intro]{display:none!important}html{overflow:auto!important}[data-reveal]{opacity:1!important;transform:none!important}"}
        </style>
      </noscript>
      <PageLoader enabled={settings.introReel} />
      <AnnouncementBar announcement={settings.announcement} />
      <SiteHeader searchItems={searchItems} navGroups={settings.navGroups} secondaryLinks={settings.secondaryLinks} languages={settings.languages} />
      <div className="flex flex-1 flex-col">{children}</div>
      <SiteFooter groups={settings.footerGroups} copyright={settings.copyright} />
      <ConsultationPopup offer={settings.consultation} />
      <Translator />
    </>
  );
}
