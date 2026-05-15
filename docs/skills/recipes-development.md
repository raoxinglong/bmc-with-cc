# Recipes 开发 Skill

## 场景

在 openBMC 中编写或调试 Yocto Recipe 时使用。

## Skill 定义

```markdown
# openbmc-recipes

当用户请求 Yocto Recipe 相关开发或调试时，执行以下流程：

## Recipe 结构检查
1. 确认 Recipe 文件命名规范（name_version.bb）
2. 检查 LICENSE 字段和 LIC_FILES_CHKSUM
3. 确认 SRC_URI 指向正确的源码路径
4. 检查 DEPENDS 和 RDEPENDS 声明

## 常见 Recipe 模式

### 应用服务 Recipe
\`\`\`
SUMMARY = "BMC sensor service"
LICENSE = "Apache-2.0"
LIC_FILES_CHKSUM = "file://LICENSE;md5=..."

inherit meson systemd

DEPENDS += "sdbusplus"
RDEPENDS:${PN} += "phosphor-dbus-interfaces"

SYSTEMD_SERVICE:${PN} = "xyz.openbmc.Sensor.service"
\`\`\`

### Kernel Module Recipe
\`\`\`
inherit module

SRC_URI = "file://Makefile \
           file://sensor_driver.c"
\`\`\`

### 固件 Recipe
\`\`\`
inherit deploy

do_deploy() {
    install -d ${DEPLOYDIR}/firmware
    install -m 0644 firmware.bin ${DEPLOYDIR}/firmware/
}
\`\`\`

## 依赖排查
- 使用 bitbake-layers show-recipes 查看 recipe 状态
- 使用 devtool status 查看修改记录
- 使用 bitbake -e <recipe> 查看最终环境变量
```

## 使用方式

```
/openbmc-recipes 帮我编写一个 phosphor-host-ipmid 的自定义 recipe
```
