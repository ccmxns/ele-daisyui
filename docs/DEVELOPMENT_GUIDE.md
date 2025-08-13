# 开发指南

这个文档为 AI 和开发者提供了完整的开发指导。

## 🚀 快速开始

### 1. 克隆项目
```bash
git clone <repository-url>
cd electron-daisyui-framework
```

### 2. 安装依赖
```bash
npm install
```

### 3. 开发模式
```bash
npm run dev
```

### 4. 构建应用
```bash
npm run build
```

## 📁 项目结构理解

### 核心目录说明
- `src/main/` - Electron 主进程代码
- `src/renderer/` - 渲染进程代码（前端）
- `src/shared/` - 主进程和渲染进程共享的代码
- `config/` - 配置文件
- `templates/` - 代码模板

## 🎯 AI 开发指南

### 添加新功能的标准流程

#### 1. 添加新页面
```javascript
// 1. 在 src/shared/constants.js 添加页面常量
export const PAGES = {
  // ...existing pages
  NEW_PAGE: 'new-page'
};

// 2. 复制 templates/page.template.js 到 src/renderer/pages/
// 3. 重命名并修改页面类名
// 4. 在导航菜单中添加新页面链接
```

#### 2. 添加新组件
```javascript
// 1. 复制 templates/component.template.js 到 src/renderer/components/
// 2. 重命名并修改组件类名
// 3. 在需要的页面中引入和使用组件
```

#### 3. 修改应用配置
```javascript
// 编辑 config/app.config.js 文件
// 所有应用设置都在这里配置
```

### 常见开发任务

#### 修改应用名称和图标
1. 编辑 `config/app.config.js` 中的 `app.name`
2. 替换 `public/icons/` 目录中的图标文件
3. 更新 `package.json` 中的应用信息

#### 添加新的主题
1. 在 `config/app.config.js` 的 `theme.available` 数组中添加主题名
2. 确保主题在 daisyUI 中可用

#### 修改窗口行为
1. 编辑 `config/app.config.js` 中的 `window` 配置
2. 重启应用查看效果

#### 添加新的 IPC 通信
1. 在 `src/shared/constants.js` 中定义事件名称
2. 在主进程中添加事件处理器
3. 在渲染进程中调用对应的 API

## 🔧 开发工具和命令

### 可用的 npm 脚本
- `npm start` - 启动 Electron 应用
- `npm run dev` - 开发模式（自动重载 CSS）
- `npm run dev-web` - 浏览器开发模式
- `npm run build-css-once` - 编译 CSS
- `npm run build` - 构建生产版本
- `npm run dist` - 打包分发版本

### 调试技巧
1. 使用 `console.log()` 进行调试
2. 在开发模式下按 F12 打开开发者工具
3. 查看 Electron 主进程日志

## 📋 代码规范

### 文件命名
- 组件文件：`ComponentName.js` (PascalCase)
- 页面文件：`PageName.js` (PascalCase)
- 工具文件：`utility-name.js` (kebab-case)
- 配置文件：`config-name.js` (kebab-case)

### 注释规范
```javascript
/**
 * 函数或类的描述
 * 
 * @param {type} paramName - 参数描述
 * @returns {type} 返回值描述
 */
```

### CSS 类名规范
- 使用 daisyUI 的类名优先
- 自定义类名使用 BEM 命名法
- 组件特定样式使用组件名作为前缀

## 🚨 常见问题

### 1. 样式不生效
- 检查是否运行了 CSS 编译命令
- 确认 Tailwind 配置是否正确

### 2. Electron 窗口无法显示
- 检查主进程代码是否有错误
- 查看控制台错误信息

### 3. IPC 通信失败
- 确认事件名称在主进程和渲染进程中一致
- 检查 preload.js 是否正确暴露 API

## 📚 学习资源

- [Electron 官方文档](https://www.electronjs.org/docs)
- [daisyUI 组件库](https://daisyui.com/)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)

## 🤖 AI 开发提示

当你需要：
1. **添加新功能** - 先查看 templates/ 目录的模板文件
2. **修改配置** - 编辑 config/ 目录下的配置文件
3. **理解项目结构** - 查看各目录的 README.md 文件
4. **查找常量定义** - 查看 src/shared/constants.js
5. **了解组件用法** - 查看 src/renderer/components/ 目录
