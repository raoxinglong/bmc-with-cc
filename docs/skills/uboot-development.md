---
outline:
  - label: 页面导航
  - minDepth: 2
  - maxDepth: 3
---

# openBMC U-Boot 开发实战

> 记录使用 Claude Code 辅助完成 openBMC 平台 U-Boot 启动流程开发的全过程，从设备树编写到 DDR 配置再到启动调试。

## 背景

openBMC 的 Bootloader 基于 U-Boot，通常运行在 ASPEED SoC（AST2500/AST2600）或 Nuvoton 芯片上。在实际开发中，新板卡适配时经常需要：

- 编写或修改设备树（.dts/.dtsi）
- 配置 DDR 初始化参数
- 调整 SPI/NOR Flash 分区
- 修改 U-Boot 环境变量和启动脚本
- 解决启动失败、串口无输出等问题

传统方式需要反复查阅 U-Boot 文档、对比已有板卡配置、分析串口日志。Claude Code 可以通过代码搜索、设备树解析和日志分析大幅加速这个过程。

## 环境准备

首先让 Claude Code 理解项目结构：

```
cd /path/to/openbmc
claude
```

Claude Code 会自动扫描项目，识别出 U-Boot 相关的关键目录：

```
u-boot-aspeed/
├── arch/arm/dts/          # 设备树文件
├── board/aspeed/          # 板级代码
├── configs/               # defconfig
├── drivers/               # 驱动代码
└── include/configs/       # 头文件配置
```

## 实战一：为新板卡创建设备树

### 需求

为新板卡 `romed8hm3` 创建 U-Boot 设备树文件。

### 操作过程

在 Claude Code 中发出指令：

> 帮我参考 ast2600 系列已有的设备树，为 romed8hm3 创建一份 U-Boot 设备树模板。需要包含 SPI Flash、UART、I2C 控制器和 DDR 配置。

Claude Code 会自动：

1. **搜索已有的参考模板**

   Claude Code 会搜索 `arch/arm/dts/` 下 ASPEED AST2600 系列已有的 .dts 文件，找到如 `ast2600-evb.dts`、`ast2600-tigerland.dts` 等作为参考。

2. **生成设备树框架**

   ```dts
   // ast2600-romed8hm3.dts
   /dts-v1/;

   #include "ast2600.dtsi"

   / {
       model = "ASPEED AST2600 ROMED8HM3";
       compatible = "aspeed,ast2600";

       chosen {
           stdout-path = &uart5;
       };

       memory@80000000 {
           device_type = "memory";
           reg = <0x80000000 0x80000000>;  // 2GB DDR4
       };
   };

   &uart5 {
       status = "okay";
   };

   &fmc {
       status = "okay";
       #address-cells = <1>;
       #size-cells = <0>;

       flash@0 {
           compatible = "jedec,spi-nor";
           reg = <0>;
           spi-max-frequency = <50000000>;
       };
   };

   &i2c0 {
       status = "okay";
   };
   ```

3. **对比检查**

   Claude Code 会自动对比生成的设备树与参考模板的差异，标注需要注意的字段：
   - `memory` 节点的地址和大小是否匹配实际硬件
   - `stdout-path` 指向正确的 UART 端口
   - SPI Flash 的 `compatible` 字符串是否匹配实际芯片型号

### 经验

设备树最容易出错的地方是 `memory` 节点的 `reg` 属性。AST2600 的 DDR 控制器基地址是 `0x80000000`，但实际 DDR 容量取决于板载 DRAM 芯片，需要确认是 1GB、2GB 还是 4GB。

## 实战二：配置 DDR 初始化

### 问题

U-Boot 启动时卡在 DDR 初始化阶段，串口无输出或停在某个固定位置。

### 操作过程

> U-Boot 在 romed8hm3 上启动时卡在 DDR 初始化，帮我分析一下可能的原因，并参考已有的 AST2600 板卡 DDR 配置。

Claude Code 会：

1. **定位 DDR 初始化代码**

   搜索 `u-boot-aspeed/` 中的 DDR 相关代码，通常会找到：

   ```
   board/aspeed/ast2600/ast2600.c      # 板级初始化
   drivers/ddr/aspeed/ddr_ctrl.c       # DDR 控制器驱动
   arch/arm/mach-aspeed/ast2600/ddr_training.c  # DDR 训练
   ```

2. **分析 DDR 训练流程**

   AST2600 的 DDR 初始化通常包含以下步骤：

   ```c
   // 典型 DDR 初始化流程
   ast2600_ddr_init() {
       // 1. 配置 DDR PHY
       ddr_phy_init();

       // 2. DDR 训练（read/write eye training）
       ddr_training();

       // 3. 验证 DDR 访问
       ddr_verify();
   }
   ```

3. **提供排查建议**

   Claude Code 会给出常见排查方向：

   - **DDR PHY 配置** — 检查 `ddr_phy_init()` 中的时序参数是否匹配 DDR 类型（DDR3/DDR4）和频率
   - **Board strapping** — AST2600 通过硬件 strapping pins 检测 DDR 类型和容量，检查 GPIO 配置是否正确
   - **DDR 训练失败** — 查看 DDR 训练寄存器值（如 `0x1E6E0000` 附近的 DDR 控制器寄存器）
   - **硬件问题** — 确认 DRAM 芯片焊接正确，供电正常

### 实用技巧

当串口无输出时，可以通过以下方式获取更多信息：

- 在 U-Boot `board_init_f()` 前添加早期串口调试信息（使用 `early_putc`）
- 使用 JTAG 调试器读取 DDR 控制器寄存器
- 对比正常工作的板卡的 DDR 寄存器值

## 实战三：SPI Flash 分区配置

### 需求

在 U-Boot 中正确识别和配置 SPI Flash 分区，包括 BMC 固件、内核、文件系统、环境变量等区域。

### 操作过程

> 帮我为 romed8hm3 配置 U-Boot 的 SPI Flash 分区，使用 32MB Winbond W25Q256 Flash。

Claude Code 会：

1. **识别 Flash 驱动**

   搜索 U-Boot 中的 SPI Flash 驱动，确认 Winbond W25Q256 的支持状态：

   ```c
   // drivers/mtd/spi/sf_ids.c 中查找
   { "w25q256", INFO(0xef4019, 0x0, 64 * 1024, 512, 0) }
   ```

2. **生成 Flash 分区表**

   ```c
   // include/configs/ast2600.h
   #define CONFIG_SYS_SPI_FLASH_PARTITION \
       "u-boot=0x0,0x80000;" \
       "u-boot-env=0x80000,0x80000;" \
       "kernel=0x100000,0x400000;" \
       "rofs=0x500000,0x1300000;" \
       "rwfs=0x1800000,0x800000;"
   ```

3. **在设备树中定义分区**

   ```dts
   &fmc {
       status = "okay";

       flash@0 {
           compatible = "jedec,spi-nor";
           reg = <0>;
           spi-max-frequency = <50000000>;

           partitions {
               compatible = "fixed-partitions";
               #address-cells = <1>;
               #size-cells = <1>;

               partition@0 {
                   label = "u-boot";
                   reg = <0x0 0x80000>;    // 512KB
                   read-only;
               };

               partition@80000 {
                   label = "u-boot-env";
                   reg = <0x80000 0x80000>;  // 512KB
               };

               partition@100000 {
                   label = "kernel";
                   reg = <0x100000 0x400000>;  // 4MB
               };

               partition@500000 {
                   label = "rofs";
                   reg = <0x500000 0x1300000>;  // 19MB
               };

               partition@1800000 {
                   label = "rwfs";
                   reg = <0x1800000 0x800000>;  // 8MB
               };
           };
       };
   };
   ```

## 实战四：U-Boot 启动脚本调试

### 需求

配置 U-Boot 启动脚本，实现从 SPI Flash 加载内核并启动。

### 操作过程

> 帮我编写 U-Boot 启动脚本，从 SPI Flash 加载内核和设备树到内存，然后启动 Linux Kernel。

Claude Code 会生成 `bootcmd` 配置：

```c
// include/configs/ast2600.h
#define CONFIG_BOOTCOMMAND \
    "sf probe 0; " \
    "sf read ${kernel_addr} ${kernel_offset} ${kernel_size}; " \
    "sf read ${fdt_addr} ${fdt_offset} ${fdt_size}; " \
    "setenv bootargs ${bootargs}; " \
    "bootz ${kernel_addr} - ${fdt_addr}"

#define CONFIG_EXTRA_ENV_SETTINGS \
    "kernel_addr=0x83000000\0" \
    "kernel_offset=0x100000\0" \
    "kernel_size=0x400000\0" \
    "fdt_addr=0x82000000\0" \
    "fdt_offset=0x500000\0" \
    "fdt_size=0x20000\0" \
    "bootargs=console=ttyS4,115200n8 root=/dev/mtdblock5 rw\0"
```

### 调试过程

启动脚本常见问题：

| 问题 | 排查方法 |
|------|----------|
| 内核加载失败 | 使用 `sf read` 手动读取验证数据 |
| 设备树不匹配 | 使用 `fdt print` 检查加载的设备树内容 |
| 内核 panic | 检查 `bootargs` 中的 console 和 root 参数 |
| 串口无输出 | 确认 console 参数（ttyS4, 115200n8）与硬件匹配 |

在 U-Boot 命令行中手动调试：

```
ASPEED# printenv bootcmd
ASPEED# sf probe 0
SF: Detected w25q256 with page size 256 Bytes, erase size 4 KiB, total 32 MiB
ASETHW# sf read 0x83000000 0x100000 0x400000
ASPEED# sf read 0x82000000 0x500000 0x20000
ASPEED# fdt addr 0x82000000
ASPEED# fdt print
# 验证设备树内容
ASPEED# bootz 0x83000000 - 0x82000000
# 启动内核
```

## Claude Code 在 U-Boot 开发中的优势

### 1. 代码搜索和理解

U-Boot 源码庞大（数百万行），手动搜索耗时。Claude Code 可以直接：

```
> 找出 AST2600 DDR 初始化的完整调用链
> 找到 W25Q256 Flash 驱动在 U-Boot 中的注册位置
> 分析 ast2600-evb 和 ast2600-tigerland 设备树的区别
```

### 2. 设备树生成和验证

Claude Code 可以参考已有模板，快速生成新板卡的设备树框架，减少重复工作。

### 3. 日志分析

当 U-Boot 启动失败时，将串口日志粘贴给 Claude Code，它能快速定位问题所在。

### 4. 对比分析

通过同时启动多个 Agent，可以并行分析：

```
# Agent 1: 分析硬件差异
Agent({
  description: "对比 romed8hm3 和 tiogapass 硬件差异",
  prompt: "对比两个板卡的设备树文件，列出关键差异：内存、Flash、UART、I2C 配置"
})

# Agent 2: 分析 U-Boot 配置差异
Agent({
  description: "对比 U-Boot defconfig",
  prompt: "对比两个板卡的 U-Boot defconfig，分析配置差异"
})
```

## 常见问题排查总结

| 问题 | 可能原因 | Claude Code 排查命令 |
|------|----------|----------------------|
| 串口无输出 | DDR 初始化失败 / UART 配置错误 | 搜索 `board_init_f()` 和 UART 初始化代码 |
| Flash 未识别 | SPI 控制器配置错误 / Flash 型号不支持 | 搜索 `sf_ids.c` 确认 Flash 型号 |
| 内核不启动 | `bootargs` 配置错误 / 设备树不匹配 | 检查 `bootcmd` 和设备树 `chosen` 节点 |
| 环境变量丢失 | Flash 分区错误 / 写入偏移错误 | 检查设备树中 `u-boot-env` 分区定义 |
| DDR 容量不对 | `memory` 节点 reg 值错误 | 对比设备树中的 `memory` 节点和实际硬件 |

## 总结

使用 Claude Code 辅助 openBMC U-Boot 开发的核心价值在于：

- **缩短代码理解时间** — 直接提问，不需要逐行翻阅源码
- **减少重复工作** — 设备树、配置文件等模板化工作由 Claude Code 自动生成
- **加速问题排查** — 日志分析、对比检查并行执行
- **降低门槛** — 新开发者可以快速上手 openBMC U-Boot 开发
