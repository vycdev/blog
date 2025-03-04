import { composeVisitors } from "lightningcss"
import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [
    Component.Comments({
      provider: "giscus",
      options: {
        repo: "vycdev/blog",
        repoId: "R_kgDOOCiRuQ",
        category: "General",
        categoryId: "DIC_kwDOOCiRuc4Cnhmn",
        themeUrl: "https://giscus.app/themes",
        lightTheme: "catppuccin_latte",
        darkTheme: "catppuccin_mocha",
      },
    }),
  ],
  footer: Component.Footer({
    links: {
      RSS: "/index.xml",
      YouTube: "https://www.youtube.com/@vycdev",
      GitHub: "https://github.com/vycdev",
      Discord: "https://discord.gg/nU63sFMcnX",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Explorer(),
    Component.DesktopOnly(Component.RecentNotes()),
    Component.Darkmode(),
  ],
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
    Component.MobileOnly(Component.TableOfContents()),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Explorer(),
    Component.RecentNotes(),
    Component.Darkmode(),
  ],
  right: [
    Component.Search(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}
