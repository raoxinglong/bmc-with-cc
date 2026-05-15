# Agents 并行任务

## 什么是 Agents

Agents（子代理）是 Claude Code 的并行任务处理能力。在 openBMC 开发中可以同时启动多个 Agent 处理不同任务。

## 应用场景

### 并行代码审查

```
# Agent 1: 审查 D-Bus 接口
Agent({
  description: "审查 D-Bus 接口变更",
  prompt: "审查 phosphor-dbus-interfaces/ 下的 YAML 接口定义变更",
  subagent_type: "general-purpose"
})

# Agent 2: 审查 Yocto Recipe
Agent({
  description: "审查 Recipe 变更",
  prompt: "审查 meta-phosphor/ 下的 recipe 文件变更",
  subagent_type: "general-purpose"
})
```

### 构建问题调研

```
# Agent 1: 查日志
Agent({
  description: "分析错误日志",
  prompt: "读取 tmp/log/cooker/ 下的错误日志"
})

# Agent 2: 查源码
Agent({
  description: "查找相关源码",
  prompt: "搜索导致该错误的相关源文件"
})
```

## 注意事项

- 子 Agent 有独立的上下文窗口
- 对于简单查询，直接用 `Read` 或 `grep` 更高效
- Agent 的结果自动返回给主会话
