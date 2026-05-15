# 常见问题

## Claude Code 无法识别 openBMC 项目结构

确保你在 openBMC 仓库根目录下启动 Claude Code。Claude Code 通过识别 `meta/` 目录和 `setup` 脚本来判断是否为 openBMC 项目。

## bitbake 构建失败怎么办

使用 Claude Code 的 Agent 功能并行分析问题：

```
Agent({
  description: "分析构建错误",
  prompt: "读取 tmp/log/cooker/ 下的错误日志，分析构建失败原因"
})
```

## 如何自定义 Skill

参考 [Skills 使用指南](/skills/01-usage-guide) 了解如何为 openBMC 创建自定义 Skill。

## MCP Server 连接失败

检查以下几点：

1. Server 的 command 路径是否正确
2. Server 进程是否正常启动
3. 环境变量是否正确设置
4. 查看 Claude Code 启动时的 MCP 连接日志
