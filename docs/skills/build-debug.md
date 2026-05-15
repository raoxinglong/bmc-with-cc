# 构建调试 Skill

## 场景

bitbake 构建 openBMC 失败时，使用此 Skill 分析和修复问题。

## Skill 定义

```markdown
# openbmc-build-debug

当用户报告 bitbake 构建失败时，执行以下流程：

## 错误分析
1. 读取 tmp/log/cooker/<machine>/ 下的日志
2. 识别错误类型：
   - **编译错误**：源码语法、头文件缺失
   - **依赖错误**：DEPENDS 声明不完整
   - **配置错误**：defconfig 或 machine 配置问题
   - **任务失败**：do_fetch, do_unpack, do_patch, do_compile
3. 定位具体失败的 recipe 和任务

## 常见错误模式

### do_fetch 失败
\`\`\`
# 检查 SRC_URI 是否可达
# 检查 checksum 是否匹配
bitbake -c clean <recipe>
bitbake -c fetch <recipe>
\`\`\`

### do_compile 失败
\`\`\`
# 检查依赖是否完整
bitbake -e <recipe> | grep ^DEPENDS=
# 查看完整编译日志
bitbake <recipe> -c compile -f -v
\`\`\`

### 依赖冲突
\`\`\`
# 查看 recipe 优先级
bitbake-layers show-recipes <recipe-name>
# 查看 PROVIDER
bitbake-layers show-cross-depends
\`\`\`

## 调试技巧
- 使用 bitbake -k 继续构建其他目标
- 使用 devtool modify <recipe> <src> 本地修改 recipe
- 使用 bitbake -c devshell <recipe> 进入开发 shell
```

## 使用方式

```
/openbmc-build-debug 构建失败了，帮我分析一下原因
```

或者提供日志：

```
/openbmc-build-debug 这是 bitbake 的错误日志：
（粘贴日志内容）
```
