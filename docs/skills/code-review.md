# 代码审查 Skill

## 场景

审查 openBMC 项目的代码变更时使用。

## Skill 定义

```markdown
# openbmc-code-review

当用户请求 openBMC 代码审查时，检查以下内容：

## D-Bus 接口规范
- YAML 接口定义是否符合 phosphor-dbus-interfaces 规范
- 接口版本标记是否正确（xyz.openbmc.project interface 1.0.0）
- 属性类型和方法参数是否合理

## Yocto Recipe 规范
- 配方文件格式是否正确
- LICENSE 和 LIC_FILES_CHKSUM 是否匹配
- DEPENDS 和 RDEPENDS 声明是否完整
- systemd service 文件是否完整

## C++ 代码规范
- 命名约定（驼峰式、下划线式）
- 错误处理模式（sdbusplus exception）
- 头文件包含顺序
- 智能指针使用（unique_ptr vs shared_ptr）

## 测试覆盖
- 是否包含对应的单元测试
- 测试用例是否覆盖边界情况
- Mock 对象是否正确构造

## 安全审查
- 密码/密钥是否硬编码
- 输入验证是否完整
- D-Bus 权限控制是否配置
```

## 使用方式

```
/openbmc-code-review 帮我审查本次 PR 的变更
```

或者直接指向文件：

```
/openbmc-code-review 审查这个 YAML 接口定义是否符合规范
```
