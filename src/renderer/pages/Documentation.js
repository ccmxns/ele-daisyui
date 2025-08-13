/**
 * Documentation - 文档页面
 * 
 * 这个页面用于：
 * - 展示框架文档
 * - 提供API参考
 * - 显示使用示例
 * 
 * 使用示例：
 * ```javascript
 * const docsPage = new Documentation();
 * docsPage.show();
 * ```
 */
class Documentation {
  constructor() {
    this.pageId = 'documentation';
    this.isInitialized = false;
    this.data = {};
    
    this.init();
  }

  /**
   * 初始化页面
   */
  init() {
    this.createPageElement();
    this.loadData();
    this.bindEvents();
    this.isInitialized = true;
  }

  /**
   * 创建页面元素
   */
  createPageElement() {
    const existingPage = document.getElementById(this.pageId + '-page');
    if (existingPage) {
      this.pageElement = existingPage;
      return;
    }

    this.pageElement = document.createElement('div');
    this.pageElement.id = this.pageId + '-page';
    this.pageElement.className = 'page-content hidden';
    this.pageElement.innerHTML = this.getTemplate();

    // 添加到页面容器
    const pageContainer = document.getElementById('page-content');
    if (pageContainer) {
      pageContainer.appendChild(this.pageElement);
    }
  }

  /**
   * 获取页面模板
   * @returns {string} HTML 模板字符串
   */
  getTemplate() {
    return `
      <div class="page-header mb-6">
        <h1 class="text-3xl font-bold text-primary">
          <i class="fas fa-book mr-3"></i>
          框架文档
        </h1>
        <p class="text-base-content/70 mt-2">
          Electron DaisyUI Framework 完整开发指南和API参考
        </p>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <!-- 侧边导航 -->
        <div class="lg:col-span-1">
          <div class="card bg-base-100 shadow-xl sticky top-6">
            <div class="card-body p-4">
              <h2 class="card-title text-lg mb-4">导航目录</h2>
              <ul class="menu menu-sm w-full">
                <li><a href="#getting-started" class="doc-nav-item active">快速开始</a></li>
                <li><a href="#api-reference" class="doc-nav-item">API 参考</a></li>
                <li><a href="#components" class="doc-nav-item">组件系统</a></li>
                <li><a href="#theming" class="doc-nav-item">主题系统</a></li>
                <li><a href="#examples" class="doc-nav-item">代码示例</a></li>
                <li><a href="#best-practices" class="doc-nav-item">最佳实践</a></li>
              </ul>
            </div>
          </div>
        </div>

        <!-- 主要内容 -->
        <div class="lg:col-span-3 space-y-8">
          <!-- 快速开始 -->
          <div id="getting-started" class="doc-section">
            <div class="card bg-base-100 shadow-xl">
              <div class="card-body">
                <h2 class="card-title text-2xl mb-4">
                  <i class="fas fa-rocket text-primary"></i>
                  快速开始
                </h2>
                
                <div class="space-y-4">
                  <div>
                    <h3 class="font-bold text-lg mb-2">1. 环境准备</h3>
                    <div class="mockup-code">
                      <pre data-prefix="$"><code>node --version  # 需要 16.0+</code></pre>
                      <pre data-prefix="$"><code>npm --version   # 需要 7.0+</code></pre>
                    </div>
                  </div>

                  <div>
                    <h3 class="font-bold text-lg mb-2">2. 安装依赖</h3>
                    <div class="mockup-code">
                      <pre data-prefix="$"><code>npm install</code></pre>
                    </div>
                  </div>

                  <div>
                    <h3 class="font-bold text-lg mb-2">3. 启动开发</h3>
                    <div class="mockup-code">
                      <pre data-prefix="$"><code>npm run dev</code></pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- API 参考 -->
          <div id="api-reference" class="doc-section">
            <div class="card bg-base-100 shadow-xl">
              <div class="card-body">
                <h2 class="card-title text-2xl mb-4">
                  <i class="fas fa-code text-secondary"></i>
                  API 参考
                </h2>

                <div class="space-y-6">
                  <div>
                    <h3 class="font-bold text-lg mb-3">核心函数</h3>
                    <div class="overflow-x-auto">
                      <table class="table table-zebra">
                        <thead>
                          <tr>
                            <th>函数</th>
                            <th>参数</th>
                            <th>说明</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td><code>navigateTo(pageId, pageName)</code></td>
                            <td>pageId: string, pageName: string</td>
                            <td>页面导航</td>
                          </tr>
                          <tr>
                            <td><code>showNotification(title, message, type)</code></td>
                            <td>title: string, message: string, type: string</td>
                            <td>显示通知</td>
                          </tr>
                          <tr>
                            <td><code>loadPage(pagePath)</code></td>
                            <td>pagePath: string</td>
                            <td>动态加载页面</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div>
                    <h3 class="font-bold text-lg mb-3">事件系统</h3>
                    <div class="mockup-code">
                      <pre><code>// 主题变更事件
window.addEventListener('themeChange', (event) => {
    console.log('新主题:', event.detail.theme);
});

// 页面变更事件
window.addEventListener('pageChange', (event) => {
    console.log('当前页面:', event.detail.pageId);
});</code></pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 组件系统 -->
          <div id="components" class="doc-section">
            <div class="card bg-base-100 shadow-xl">
              <div class="card-body">
                <h2 class="card-title text-2xl mb-4">
                  <i class="fas fa-puzzle-piece text-accent"></i>
                  组件系统
                </h2>

                <div class="space-y-4">
                  <div>
                    <h3 class="font-bold text-lg mb-2">创建组件</h3>
                    <div class="mockup-code">
                      <pre><code>class MyComponent {
  constructor(props = {}) {
    this.props = props;
    this.init();
  }
  
  init() {
    this.createElement();
    this.bindEvents();
  }
  
  createElement() {
    this.element = document.createElement('div');
    this.element.className = 'my-component';
    this.element.innerHTML = this.getTemplate();
  }
  
  render(container) {
    container.appendChild(this.element);
  }
}</code></pre>
                    </div>
                  </div>

                  <div>
                    <h3 class="font-bold text-lg mb-2">使用组件</h3>
                    <div class="mockup-code">
                      <pre><code>const myComponent = new MyComponent({
  title: 'Hello World',
  onClick: () => console.log('clicked')
});

myComponent.render(document.getElementById('container'));</code></pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 主题系统 -->
          <div id="theming" class="doc-section">
            <div class="card bg-base-100 shadow-xl">
              <div class="card-body">
                <h2 class="card-title text-2xl mb-4">
                  <i class="fas fa-palette text-info"></i>
                  主题系统
                </h2>

                <div class="space-y-4">
                  <p>框架内置了完整的主题系统，支持多种预设主题和自定义主题。</p>
                  
                  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div class="theme-preview" data-theme="light">
                      <div class="bg-base-100 p-3 rounded-lg border">
                        <div class="font-bold">Light</div>
                        <div class="text-xs text-base-content/70">浅色主题</div>
                      </div>
                    </div>
                    <div class="theme-preview" data-theme="dark">
                      <div class="bg-base-100 p-3 rounded-lg border">
                        <div class="font-bold">Dark</div>
                        <div class="text-xs text-base-content/70">深色主题</div>
                      </div>
                    </div>
                    <div class="theme-preview" data-theme="cupcake">
                      <div class="bg-base-100 p-3 rounded-lg border">
                        <div class="font-bold">Cupcake</div>
                        <div class="text-xs text-base-content/70">杯子蛋糕</div>
                      </div>
                    </div>
                    <div class="theme-preview" data-theme="cyberpunk">
                      <div class="bg-base-100 p-3 rounded-lg border">
                        <div class="font-bold">Cyberpunk</div>
                        <div class="text-xs text-base-content/70">赛博朋克</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 代码示例 -->
          <div id="examples" class="doc-section">
            <div class="card bg-base-100 shadow-xl">
              <div class="card-body">
                <h2 class="card-title text-2xl mb-4">
                  <i class="fas fa-code-branch text-warning"></i>
                  代码示例
                </h2>

                <div class="space-y-6">
                  <div>
                    <h3 class="font-bold text-lg mb-2">基础页面示例</h3>
                    <div class="mockup-code">
                      <pre><code>class MyPage {
  constructor() {
    this.pageId = 'my-page';
    this.init();
  }
  
  init() {
    this.createPageElement();
    this.bindEvents();
  }
  
  show() {
    window.navigateTo(this.pageId, '我的页面');
  }
}</code></pre>
                    </div>
                  </div>

                  <div>
                    <h3 class="font-bold text-lg mb-2">表单处理示例</h3>
                    <div class="mockup-code">
                      <pre><code>function handleFormSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);
  
  // 处理表单数据
  console.log('表单数据:', data);
  
  // 显示成功通知
  window.FrameworkUtils.showNotification(
    '成功', '数据已保存', 'success'
  );
}</code></pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 最佳实践 -->
          <div id="best-practices" class="doc-section">
            <div class="card bg-base-100 shadow-xl">
              <div class="card-body">
                <h2 class="card-title text-2xl mb-4">
                  <i class="fas fa-star text-success"></i>
                  最佳实践
                </h2>

                <div class="space-y-4">
                  <div class="alert alert-info">
                    <i class="fas fa-info-circle"></i>
                    <div>
                      <h3 class="font-bold">代码组织</h3>
                      <p class="text-sm">保持页面和组件的单一职责原则，使用模块化的代码结构。</p>
                    </div>
                  </div>

                  <div class="alert alert-success">
                    <i class="fas fa-check-circle"></i>
                    <div>
                      <h3 class="font-bold">性能优化</h3>
                      <p class="text-sm">使用事件委托，避免内存泄漏，适当使用防抖和节流。</p>
                    </div>
                  </div>

                  <div class="alert alert-warning">
                    <i class="fas fa-exclamation-triangle"></i>
                    <div>
                      <h3 class="font-bold">用户体验</h3>
                      <p class="text-sm">提供加载状态，错误处理，以及合适的反馈机制。</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * 加载页面数据
   */
  async loadData() {
    try {
      this.data = {
        title: '框架文档',
        version: '1.0.0',
        lastUpdated: new Date().toISOString().split('T')[0]
      };
    } catch (error) {
      console.error('加载文档数据失败:', error);
    }
  }

  /**
   * 绑定事件处理
   */
  bindEvents() {
    if (!this.pageElement) return;

    // 导航项点击事件
    const navItems = this.pageElement.querySelectorAll('.doc-nav-item');
    navItems.forEach(item => {
      item.addEventListener('click', this.handleNavClick.bind(this));
    });

    // 主题预览点击事件
    const themePreviews = this.pageElement.querySelectorAll('.theme-preview');
    themePreviews.forEach(preview => {
      preview.addEventListener('click', this.handleThemePreviewClick.bind(this));
    });
  }

  /**
   * 处理导航点击
   */
  handleNavClick(event) {
    event.preventDefault();
    const target = event.target;
    const href = target.getAttribute('href');
    
    // 更新活动状态
    this.pageElement.querySelectorAll('.doc-nav-item').forEach(item => {
      item.classList.remove('active');
    });
    target.classList.add('active');
    
    // 滚动到目标部分
    const section = this.pageElement.querySelector(href);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }

  /**
   * 处理主题预览点击
   */
  handleThemePreviewClick(event) {
    const theme = event.currentTarget.dataset.theme;
    if (theme) {
      // 切换主题
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      
      // 更新主题选择器
      const themeSelect = document.getElementById('theme-select');
      if (themeSelect) {
        themeSelect.value = theme;
      }
      
      // 显示通知
      window.FrameworkUtils?.showNotification(
        '主题已切换', 
        `已切换到 ${theme} 主题`, 
        'success'
      );
    }
  }

  /**
   * 显示页面
   */
  show() {
    if (this.pageElement) {
      // 使用框架导航功能
      window.navigateTo('documentation', '开发文档');
    }
  }

  /**
   * 隐藏页面
   */
  hide() {
    if (this.pageElement) {
      this.pageElement.classList.add('hidden');
    }
  }

  /**
   * 销毁页面
   */
  destroy() {
    if (this.pageElement && this.pageElement.parentNode) {
      this.pageElement.parentNode.removeChild(this.pageElement);
    }
  }
}

// 如果在 Node.js 环境中使用
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Documentation;
}
