# 安装与启动

## 安装 Claude Code

Claude Code 是 Anthropic 推出的终端 AI 编程助手：

```bash
# 通过 npm 全局安装
npm install -g @anthropic-ai/claude-code

# 或直接使用 npx
npx @anthropic-ai/claude-code
```

## 在 openBMC 项目中启动

```bash
cd /path/to/openbmc
claude
```

Claude Code 会自动识别项目结构。开始对话后你可以：

- 搜索和理解 openBMC 代码结构
- 帮助编写和修改 Yocto recipe 文件
- 调试 U-Boot、Kernel 构建问题
- 审查 D-Bus 接口定义
- 编写 Board Support Package

## 项目级配置

在 openBMC 仓库根目录创建 `.claude/` 目录：

```
.claude/
├── settings.json       # 项目配置（可提交到 git）
└── settings.local.json # 本地配置（不提交，存放 API Key 等）
```

## 下一步

- [环境变量配置](/guide/env-vars)
- [Skills 使用指南](/skills/01-usage-guide)
