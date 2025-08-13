# 页面目录

这个目录包含框架的页面组件。

## 📝 页面开发指南

### 创建新页面
1. 复制 `templates/page.template.js` 作为起点
2. 在此目录创建新的页面文件
3. 页面名称与路由保持一致
4. 使用框架提供的工具函数和样式系统

### 页面结构示例
```javascript
/**
 * 示例页面 - 展示基础功能
 * 
 * 这个页面用于：
 * - 展示框架基础功能
 * - 提供开发参考
 * - 演示最佳实践
 */
class ExamplePage {
  constructor() {
    this.pageId = 'example-page';
    this.init();
  }
  
  init() {
    this.createPageElement();
    this.bindEvents();
  }
  
  createPageElement() {
    const template = `
      <div class="page-header mb-6">
        <h1 class="text-2xl font-bold">示例页面</h1>
        <p class="text-base-content/70">这是一个示例页面</p>
      </div>
      
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">页面内容</h2>
          <p>在这里添加你的页面内容</p>
        </div>
      </div>
    `;
    
    this.element = document.createElement('div');
    this.element.id = this.pageId;
    this.element.className = 'page-content hidden';
    this.element.innerHTML = template;
    
    document.getElementById('page-content').appendChild(this.element);
  }
  
  show() {
    // 使用框架导航函数
    window.navigateTo('example', '示例页面');
  }
}
```

## 📋 框架页面规划

### 核心页面
- [x] Welcome.js - 欢迎页面（框架介绍、快速入门）
- [ ] Documentation.js - 文档页面（API参考、使用指南）
- [ ] Examples.js - 示例页面（组件演示、代码示例）
- [ ] Settings.js - 设置页面（主题配置、框架设置）

### 示例页面
- [ ] FormExample.js - 表单示例页面
- [ ] TableExample.js - 表格示例页面
- [ ] ChartExample.js - 图表示例页面
- [ ] ComponentsShowcase.js - 组件展示页面

## 🛠️ 开发工具

### 框架工具函数
```javascript
// 页面导航
window.navigateTo(pageId, pageName);

// 通知系统
window.FrameworkUtils.showNotification(title, message, type);

// 主题系统
window.addEventListener('themeChange', (event) => {
    console.log('主题变更:', event.detail.theme);
});

// 页面变更事件
window.addEventListener('pageChange', (event) => {
    console.log('页面变更:', event.detail);
});
```

### DaisyUI 组件使用
```html
<!-- 卡片组件 -->
<div class="card bg-base-100 shadow-xl">
    <div class="card-body">
        <h2 class="card-title">标题</h2>
        <p>内容</p>
    </div>
</div>

<!-- 按钮组件 -->
<button class="btn btn-primary">主要按钮</button>
<button class="btn btn-secondary">次要按钮</button>

<!-- 表单组件 -->
<div class="form-control">
    <label class="label">
        <span class="label-text">标签</span>
    </label>
    <input type="text" class="input input-bordered" />
</div>
```

## 🎯 AI 开发提示

当需要创建新页面时，请：
1. 使用页面模板 (`templates/page.template.js`)
2. 遵循命名约定 (PageName.js)
3. 使用 DaisyUI 组件系统
4. 利用框架提供的工具函数
5. 添加响应式设计考虑
6. 包含无障碍访问支持

### 页面文件命名规范
- 使用 PascalCase 命名
- 文件名与类名保持一致
- 页面ID使用 kebab-case

示例：
- 文件：`UserProfile.js`
- 类名：`UserProfile`
- 页面ID：`user-profile`