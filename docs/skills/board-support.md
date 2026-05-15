# Board Support Skill

## 场景

在 openBMC 中为新硬件平台创建 Board Support Package (BSP) 时使用。

## Skill 定义

```markdown
# openbmc-board-support

当用户请求新板卡适配时，执行以下流程：

## Machine 配置
1. 创建 meta-<vendor>/conf/machine/<machine>.conf
2. 定义 PREFERRED_PROVIDER_u-boot、PREFERRED_PROVIDER_virtual/kernel
3. 设置 SERIAL_CONSOLES、IMAGE_FSTYPES 等
4. 配置 U-Boot defconfig 和 Kernel defconfig

## Device Tree
1. 创建 arch/arm/boot/dts/<vendor>-<machine>.dts
2. 定义内存、CPU、外设节点
3. 配置 BMC 传感器、风扇、电源管理

## 常见适配步骤

### 1. 创建 meta layer
\`\`\`
meta-<vendor>/
├── conf/
│   └── layer.conf
├── conf/machine/
│   └── <machine>.conf
├── recipes-phosphor/
│   └── <board-specific>/
└── recipes-kernel/
    └── linux/
\`\`\`

### 2. 添加 machine 配置
\`\`\`
require conf/machine/include/ast2600.inc

PREFERRED_PROVIDER_u-boot ?= "u-boot-aspeed"
UBOOT_MACHINE = "<machine>_defconfig"
\`\`\`

### 3. 创建设备树
- 参考同系列 SoC 的已有设备树
- 确认引脚复用和电源配置
- 添加 BMC 特定外设节点
```

## 使用方式

```
/openbmc-board-support 帮我为新的 AST2600 板卡创建 machine 配置
```
