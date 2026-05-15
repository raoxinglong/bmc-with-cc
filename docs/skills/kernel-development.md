# Kernel 开发 Skill

## 场景

在 openBMC 中开发或调试 Linux Kernel 时使用。

## Skill 定义

```markdown
# openbmc-kernel

当用户请求 Kernel 相关开发或调试时，执行以下流程：

## 环境确认
1. 确认 Kernel 版本（通常在 meta-phosphor/recipes-kernel/）
2. 确认 defconfig（arch/arm/configs/ 或 arch/arm64/configs/）
3. 确认目标平台和设备树

## Kernel 配置检查
- 检查 .config 中的关键选项是否启用
- 确认 CONFIG_I2C、CONFIG_SPI、CONFIG_GPIO 等驱动配置
- 检查 Device Tree Overlay 支持

## 驱动开发辅助
- 分析 Device Tree 绑定（Documentation/devicetree/bindings/）
- 检查驱动 probe 函数的返回路径
- 确认中断、时钟、regmap 配置

## 调试方法
- 使用 dmesg 查看启动日志
- 分析 oops/panic 输出
- 使用 ftrace 追踪函数调用
- 检查 sysfs/debugfs 输出
```

## 使用方式

```
/openbmc-kernel 帮我分析这个 Kernel panic 的原因
```

```
/openbmc-kernel 为新的 I2C 传感器编写设备树绑定
```
