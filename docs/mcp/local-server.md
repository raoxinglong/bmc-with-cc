# 本地搭建 MCP Server

## 准备工作

```bash
mkdir openbmc-mcp-server && cd openbmc-mcp-server
npm init -y
npm install @modelcontextprotocol/sdk
```

## 实现示例

```javascript
// server.js
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new McpServer({
  name: "openbmc-build-server",
  version: "1.0.0"
});

// 工具 1: 查询构建状态
server.tool("check-build-status", {
  platform: { type: "string", description: "目标平台" }
}, async ({ platform }) => ({
  content: [{
    type: "text",
    text: `平台 ${platform} 构建状态: 通过`
  }]
}));

// 工具 2: 触发构建
server.tool("trigger-build", {
  platform: { type: "string" },
  target: { type: "string", default: "obmc-phosphor-image" }
}, async ({ platform, target }) => ({
  content: [{
    type: "text",
    text: `已触发 ${platform} 的 ${target} 构建`
  }]
}));

// 启动
const transport = new StdioServerTransport();
await server.connect(transport);
```

## 注册到 Claude Code

```json
{
  "mcpServers": {
    "openbmc-build": {
      "command": "node",
      "args": ["/path/to/openbmc-mcp-server/server.js"]
    }
  }
}
```

重启 Claude Code 后即可在对话中使用这些工具。
