# Skills 使用指南

## 什么是 Skills

Skills 是 Claude Code 的可复用能力模块，定义了一组特定场景下的行为模式、工具调用方式和输出格式。

## 内置 Skills

Claude Code 内置了多种 Skills：

- `/code-reviewer` — 代码审查
- `/build-error-resolver` — 构建错误修复
- `/feature-dev` — 功能开发

## 自定义 openBMC Skills

在 `skills/` 目录中创建 Skill 文件，然后在 `.claude/settings.json` 中注册：

```json
{
  "skills": [
    {
      "name": "openbmc-uboot",
      "file": "skills/uboot.md"
    },
    {
      "name": "openbmc-kernel",
      "file": "skills/kernel.md"
    },
    {
      "name": "openbmc-recipes",
      "file": "skills/recipes.md"
    }
  ]
}
```

## Skill 文件结构

一个 Skill 文件本质上是系统提示词：

```markdown
# openbmc-uboot Skill

当用户请求开发或调试 U-Boot 时：

1. 确认目标平台（如 romed8hm3）
2. 检查 U-Boot 配置（defconfig, device tree）
3. 分析构建或运行问题
4. 提供修复建议
```

## Skills 列表

本仓库涵盖以下 openBMC 相关 Skills：

- [U-Boot 开发](/skills/uboot-development) — Bootloader 开发、设备树、启动流程
- [Kernel 开发](/skills/kernel-development) — Linux Kernel 配置、驱动开发、调试
- [Recipes 开发](/skills/recipes-development) — Yocto Recipe 编写、依赖管理
- [Board Support](/skills/board-support) — 新板卡适配、machine 配置
- [代码审查](/skills/code-review) — openBMC 代码规范审查
- [构建调试](/skills/build-debug) — bitbake 构建问题排查
