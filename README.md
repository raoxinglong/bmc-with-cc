# Claude Code x openBMC

在 openBMC 开发中使用 [Claude Code](https://claude.ai/code) 的实践记录。

## 在线文档

👉 **https://github.com/raoxinglong/bmc-with-cc/**

## 本地开发

```bash
npm install
npm run docs:dev
```

浏览器打开 `http://localhost:5173/bmc-with-cc/` 预览。

## 构建

```bash
npm run docs:build
npm run docs:preview
```

## 目录结构

```
docs/
├── index.md              # 首页
├── guide/                # 快速开始
├── mcp/                  # MCP Server 相关
├── skills/               # Skills 系统相关
├── commands/             # Commands 系统相关
├── agents/               # Agents 系统相关
└── hooks/                # Hooks 系统相关
```

使用 [VitePress](https://vitepress.dev/) 构建，通过 GitHub Actions 自动部署到 GitHub Pages。
