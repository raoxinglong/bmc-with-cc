# Hooks 自动化工作流

## 什么是 Hooks

Hooks 是 Claude Code 的自动化钩子，在特定事件发生时自动执行 shell 命令。

## 配置方式

在 `.claude/settings.json` 中配置：

```json
{
  "hooks": {
    "onStart": {
      "command": "echo 'Welcome to openBMC project'"
    },
    "beforeCommit": {
      "command": "git diff --check"
    }
  }
}
```

## openBMC 常用 Hooks

### 启动时加载构建环境

```json
{
  "hooks": {
    "onStart": {
      "command": "echo 'OpenBMC environment loaded'"
    }
  }
}
```

### 提交前运行代码风格检查

```json
{
  "hooks": {
    "beforeCommit": {
      "command": "scripts/check-openbmc-style.sh"
    }
  }
}
```

## 注意事项

- Hooks 由系统自动执行
- Hook 失败时 Claude Code 会阻止后续操作
- 敏感配置放在 `settings.local.json`
