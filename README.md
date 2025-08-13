# Electron DaisyUI Framework

> 现代化的桌面应用开发框架，基于 Electron + DaisyUI + Tailwind CSS

## ✨ 特性

- 🚀 **快速开发** - 完整的模板系统和工具链
- 🎨 **现代化 UI** - 基于 DaisyUI 和 Tailwind CSS
- 📱 **响应式设计** - 支持不同屏幕尺寸
- 🌙 **主题系统** - 内置多种主题，支持深色模式
- 🔧 **跨平台** - 支持 Windows、macOS 和 Linux
- ⚡ **热重载** - 开发时实时预览
- 📦 **自动打包** - 一键生成可执行文件

## 🛠️ 技术栈

- **Electron** - 跨平台桌面应用框架
- **DaisyUI** - 基于 Tailwind CSS 的组件库
- **Tailwind CSS** - 实用优先的 CSS 框架
- **JavaScript** - 原生 JavaScript，无额外框架依赖

## 📦 安装与使用

### 环境要求
- Node.js 16.0+
- npm 或 yarn

### 快速开始

```bash
# 克隆项目
git clone <repository-url>
cd electron-daisyui-framework

# 安装依赖
npm install

# 开发模式
npm run dev

# 构建项目
npm run build

# 打包应用
npm run dist
```

## 🏗️ 项目结构

```
electron-daisyui-framework/
├── src/
│   ├── renderer/          # 渲染进程代码
│   │   ├── components/    # 组件文件
│   │   ├── pages/         # 页面文件
│   │   ├── styles/        # 样式文件
│   │   └── utils/         # 工具函数
│   ├── main/              # 主进程代码
│   ├── shared/            # 共享代码
│   └── input.css          # Tailwind 输入文件
├── templates/             # 页面和组件模板
├── config/                # 配置文件
├── public/                # 静态资源
├── main.js                # Electron 主进程入口
├── index.html             # 主页面
├── script.js              # 框架核心 JS
└── tailwind.config.js     # Tailwind 配置
```

## 🚀 开发指南

### 创建新页面

1. 复制页面模板：
```bash
cp templates/page.template.js src/renderer/pages/MyPage.js
```

2. 编辑页面文件，替换 `PageName` 为你的页面名称

3. 在页面中使用框架工具：
```javascript
// 页面导航
window.navigateTo('my-page', '我的页面');

// 显示通知
window.FrameworkUtils.showNotification('成功', '操作完成', 'success');
```

### 创建新组件

1. 复制组件模板：
```bash
cp templates/component.template.js src/renderer/components/MyComponent.js
```

2. 编辑组件文件，实现你的功能

3. 在页面中使用：
```javascript
const myComponent = new MyComponent({
    className: 'custom-class',
    onClick: () => console.log('clicked')
});
myComponent.render(document.getElementById('container'));
```

### 主题系统

框架内置多种主题，支持动态切换：

```javascript
// 监听主题变更
window.addEventListener('themeChange', (event) => {
    console.log('当前主题:', event.detail.theme);
});

// 以编程方式切换主题
document.documentElement.setAttribute('data-theme', 'dark');
localStorage.setItem('theme', 'dark');
```

### 可用主题
- `light` - 浅色主题
- `dark` - 深色主题
- `cupcake` - 杯子蛋糕
- `bumblebee` - 大黄蜂
- `emerald` - 翡翠绿
- `corporate` - 企业风格
- `synthwave` - 合成波
- `retro` - 复古风格
- `cyberpunk` - 赛博朋克

## 📚 API 参考

### 框架工具函数

```javascript
// 页面导航
window.navigateTo(pageId, pageName)

// 显示通知
window.FrameworkUtils.showNotification(title, message, type)

// 加载外部页面
window.loadPage(pagePath)

// 初始化页面事件
window.FrameworkUtils.initPageEvents()

// 检查是否在 Electron 环境
window.FrameworkUtils.isElectron
```

### 事件系统

```javascript
// 主题变更事件
window.addEventListener('themeChange', (event) => {
    // event.detail.theme
});

// 页面变更事件
window.addEventListener('pageChange', (event) => {
    // event.detail.pageId
    // event.detail.pageName
});

// 窗口大小变更事件
window.addEventListener('windowResize', (event) => {
    // event.detail.width
    // event.detail.height
});
```

## 🎨 组件库

框架集成了完整的 DaisyUI 组件库，包括：

### 基础组件
- Button（按钮）
- Badge（徽章）
- Card（卡片）
- Avatar（头像）

### 表单组件
- Input（输入框）
- Select（选择器）
- Checkbox（复选框）
- Radio（单选框）
- Toggle（开关）

### 导航组件
- Navbar（导航栏）
- Menu（菜单）
- Breadcrumbs（面包屑）
- Tabs（标签页）

### 数据展示
- Table（表格）
- Progress（进度条）
- Stats（统计）
- Timeline（时间线）

详细使用方法请参考 [DaisyUI 官方文档](https://daisyui.com/components/)

## 🔧 配置

### Tailwind 配置

在 `tailwind.config.js` 中可以自定义样式配置：

```javascript
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 自定义样式
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark", /* 其他主题 */],
  },
}
```

### Electron 配置

在 `main.js` 中可以配置窗口选项：

```javascript
const mainWindow = new BrowserWindow({
  width: 1400,
  height: 900,
  minWidth: 1200,
  minHeight: 800,
  // 其他选项...
});
```

## 📸 截图

> 在这里添加应用截图

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🙏 致谢

- [Electron](https://electronjs.org/)
- [DaisyUI](https://daisyui.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---

**开始构建你的桌面应用吧！** 🚀