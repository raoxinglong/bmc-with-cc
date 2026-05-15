# openBMC MCP 配置示例

## 完整配置

```json
{
  "mcpServers": {
    "openbmc-build": {
      "command": "node",
      "args": ["/path/to/servers/openbmc-build-server.js"],
      "env": {
        "OPENBMC_ROOT": "/home/user/openbmc"
      }
    },
    "openbmc-bmc": {
      "command": "python3",
      "args": ["/path/to/servers/openbmc-bmc-server.py"],
      "env": {
        "BMC_HOST": "10.0.0.1",
        "BMC_USER": "root"
      }
    }
  }
}
```

## Server 说明

| Server | 功能 | 提供工具 |
|--------|------|----------|
| openbmc-build | 构建状态查询 | `check-build-status`, `trigger-build` |
| openbmc-bmc | BMC 设备操作 | `read-sensors`, `reboot-bmc`, `flash-firmware` |

## 安全建议

- BMC 密码等敏感信息放在 `settings.local.json` 中
- 不提交到 git
- 使用环境变量引用（如 `${BMC_PASS}`）
