import { defineConfig } from "vitepress";

export default defineConfig({
  title: "create-skills",
  description: "Bun-native CLI for orchestrating Devin skills, MCP servers, subagents, and CLI tools.",
  base: "/",
  lang: "en-US",
  lastUpdated: true,
  cleanUrls: true,
  themeConfig: {
    nav: [
      { text: "Project", link: "/project/overview" },
      { text: "Features", link: "/project/features" },
      { text: "Getting Started", link: "/getting-started/installation" },
      { text: "Roadmap", link: "/roadmap/" },
      { text: "Development", link: "/development/setup" },
      { text: "References", link: "/references/" },
    ],
    sidebar: {
      "/project/": [
        {
          text: "Project",
          collapsed: false,
          items: [
            { text: "Overview", link: "/project/overview" },
            { text: "Features", link: "/project/features" },
          ],
        },
      ],
      "/getting-started/": [
        {
          text: "Getting Started",
          collapsed: false,
          items: [
            { text: "Installation", link: "/getting-started/installation" },
            { text: "Usage", link: "/getting-started/usage" },
          ],
        },
      ],
      "/roadmap/": [
        {
          text: "Roadmap",
          collapsed: false,
          items: [
            { text: "Overview", link: "/roadmap/" },
            { text: "Idea Features", link: "/roadmap/idea-features" },
          ],
        },
      ],
      "/development/": [
        {
          text: "Development",
          collapsed: false,
          items: [
            { text: "Setup", link: "/development/setup" },
            { text: "Architecture", link: "/development/architecture" },
            { text: "Workflows", link: "/development/workflows" },
            { text: "Testing", link: "/development/testing" },
          ],
        },
      ],
      "/references/": [
        {
          text: "References",
          collapsed: false,
          items: [
            { text: "Index", link: "/references/" },
          ],
        },
      ],
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/newkub/create-skills" },
    ],
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2026 Wrikka",
    },
  },
});
