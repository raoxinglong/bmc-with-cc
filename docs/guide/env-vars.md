# 环境变量

## Claude Code 相关

| 变量 | 说明 | 示例 |
|------|------|------|
| `ANTHROPIC_API_KEY` | Anthropic API 密钥 | `sk-ant-...` |
| `ANTHROPIC_MODEL` | 指定模型 | `claude-sonnet-4-6` |
| `OPENAI_API_KEY` | 兼容 OpenAI 格式时使用 | |

## openBMC 相关

| 变量 | 说明 | 示例 |
|------|------|------|
| `OPENBMC_ROOT` | openBMC 源码根目录 | `/home/user/openbmc` |
| `MACHINE` | 目标硬件平台 | `romed8hm3` |
| `TEMPLATECONF` | 配置模板路径 | `meta-phosphor/conf` |

## 配置方式

在 `.claude/settings.local.json` 中添加：

```json
{
  "env": {
    "OPENBMC_ROOT": "/path/to/openbmc",
    "MACHINE": "romed8hm3"
  }
}
```

Claude Code 在对话中会自动获取这些环境变量。
