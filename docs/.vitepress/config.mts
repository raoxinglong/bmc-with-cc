import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Claude Code × openBMC',
  description: '使用 Claude Code 简化 openBMC 开发和测试的实践记录',
  lastUpdated: true,
  base: '/bmc-with-cc/',

  themeConfig: {
    logo: { text: 'CC × openBMC' },

    nav: [
      { text: '首页', link: '/' },
      { text: '快速开始', link: '/guide/quick-start' },
    ],

    sidebar: [
      {
        text: '快速开始',
        items: [
          { text: '安装与启动', link: '/guide/quick-start' },
          { text: '环境变量', link: '/guide/env-vars' },
          { text: '项目配置', link: '/guide/project-config' },
          { text: '常见问题', link: '/guide/faq' },
        ],
      },
      {
        text: 'Skills 系统',
        collapsed: false,
        items: [
          { text: '使用指南', link: '/skills/01-usage-guide' },
          { text: 'U-Boot 开发', link: '/skills/uboot-development' },
          { text: 'Kernel 开发', link: '/skills/kernel-development' },
          { text: 'Recipes 开发', link: '/skills/recipes-development' },
          { text: 'Board Support', link: '/skills/board-support' },
          { text: '代码审查', link: '/skills/code-review' },
          { text: '构建调试', link: '/skills/build-debug' },
        ],
      },
      {
        text: 'MCP Server',
        collapsed: false,
        items: [
          { text: '概览', link: '/mcp/01-overview' },
          { text: '本地搭建', link: '/mcp/local-server' },
          { text: 'openBMC 配置', link: '/mcp/openbmc-config' },
        ],
      },
      {
        text: 'Agents',
        collapsed: true,
        items: [
          { text: '并行任务', link: '/guide/agents' },
        ],
      },
      {
        text: 'Hooks',
        collapsed: true,
        items: [
          { text: '自动化工作流', link: '/guide/hooks' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/raoxinglong/bmc-with-cc' },
    ],

    search: {
      provider: 'local',
    },

    editLink: {
      pattern: 'https://github.com/raoxinglong/bmc-with-cc/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页',
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright 2026 raoxinglong',
    },

    outline: {
      label: '页面导航',
    },

    returnToTopLabel: '返回顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lastUpdated: { text: '最后更新于' },
    docFooter: { prev: '上一页', next: '下一页' },
  },
})
