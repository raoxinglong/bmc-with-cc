# 项目配置

## settings.json

项目级配置放在 `.claude/settings.json` 中：

```json
{
  "mcpServers": {
    "openbmc-build": {
      "command": "node",
      "args": ["/path/to/servers/openbmc-build-server.js"],
      "env": {
        "OPENBMC_ROOT": "/home/user/openbmc"
      }
    }
  },
  "skills": [
    {
      "name": "openbmc-uboot",
      "file": "skills/uboot.md"
    }
  ]
}
```

## settings.local.json

本地配置，包含敏感信息（API Key 等），**不提交到 git**：

```json
{
  "env": {
    "ANTHROPIC_API_KEY": "sk-ant-..."
  }
}
```

## .gitignore

确保 `.claude/settings.local.json` 不被提交：

```gitignore
.claude/settings.local.json
```
