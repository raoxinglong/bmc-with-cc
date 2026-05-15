# MCP Server 概览

## 什么是 MCP

MCP（Model Context Protocol）是 Claude Code 与外部工具和服务交互的标准协议。通过本地 MCP Server，可以为 Claude Code 添加自定义能力。

## 在 openBMC 中的应用场景

- **构建状态查询** — 查询 bitbake 构建进度和结果
- **设备操作** — 通过 IPMI/Redfish 与 BMC 硬件交互
- **Bug 追踪** — 查询 Redmine 等系统的 openBMC 相关 issue
- **日志分析** — 读取和分析 BMC 系统日志

## 配置方式

在项目的 `.claude/settings.json` 中添加：

```json
{
  "mcpServers": {
    "openbmc-build": {
      "command": "node",
      "args": ["/path/to/openbmc-build-server.js"],
      "env": {
        "OPENBMC_ROOT": "/path/to/openbmc"
      }
    }
  }
}
```

## 后续章节

- [本地搭建 MCP Server](/mcp/local-server) — 从零搭建
- [openBMC 配置示例](/mcp/openbmc-config) — 完整配置
