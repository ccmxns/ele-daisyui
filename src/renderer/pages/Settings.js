/**
 * Settings - 设置页面
 * 
 * 这个页面用于：
 * - 框架设置和配置
 * - 窗口状态管理
 * - 主题和外观设置
 * 
 * 使用示例：
 * ```javascript
 * const settingsPage = new Settings();
 * settingsPage.show();
 * ```
 */
class Settings {
  constructor() {
    this.pageId = 'settings';
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
          <i class="fas fa-cog mr-3"></i>
          框架设置
        </h1>
        <p class="text-base-content/70 mt-2">
          配置框架参数和应用程序设置
        </p>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- 窗口设置 -->
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title mb-4">
              <i class="fas fa-window-maximize text-primary"></i>
              窗口设置
            </h2>
            
            <div class="space-y-4">
              <!-- 当前窗口状态 -->
              <div class="alert alert-info">
                <i class="fas fa-info-circle"></i>
                <div>
                  <h3 class="font-bold">当前窗口状态</h3>
                  <div id="current-window-state" class="text-sm mt-1">
                    正在获取窗口信息...
                  </div>
                </div>
              </div>
              
              <!-- 窗口操作按钮 -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button class="btn btn-outline btn-sm" data-action="save-window-state">
                  <i class="fas fa-save"></i>
                  保存当前状态
                </button>
                
                <button class="btn btn-outline btn-sm" data-action="reset-window-state">
                  <i class="fas fa-undo"></i>
                  重置为默认
                </button>
              </div>
              
              <!-- 配置文件信息 -->
              <div class="divider">配置文件</div>
              
              <div class="text-sm">
                <div class="mb-2">
                  <strong>存储位置:</strong>
                  <code id="config-file-path" class="text-xs break-all">获取中...</code>
                </div>
                <div class="flex gap-2">
                  <span class="badge badge-success" id="config-exists-badge">未知</span>
                  <button class="btn btn-ghost btn-xs" data-action="show-config-path">
                    <i class="fas fa-folder-open"></i>
                    打开文件夹
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 主题设置 -->
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title mb-4">
              <i class="fas fa-palette text-secondary"></i>
              主题设置
            </h2>
            
            <div class="space-y-4">
              <!-- 主题选择器 -->
              <div class="form-control">
                <label class="label">
                  <span class="label-text">选择主题</span>
                </label>
                <select class="select select-bordered" id="theme-selector">
                  <option value="light">Light - 浅色主题</option>
                  <option value="dark">Dark - 深色主题</option>
                  <option value="cupcake">Cupcake - 杯子蛋糕</option>
                  <option value="bumblebee">Bumblebee - 大黄蜂</option>
                  <option value="emerald">Emerald - 翡翠绿</option>
                  <option value="corporate">Corporate - 企业风格</option>
                  <option value="synthwave">Synthwave - 合成波</option>
                  <option value="retro">Retro - 复古风格</option>
                  <option value="cyberpunk">Cyberpunk - 赛博朋克</option>
                </select>
              </div>
              
              <!-- 主题预览 -->
              <div class="grid grid-cols-3 gap-2">
                <div class="theme-preview-card" data-theme="light">
                  <div class="bg-base-100 p-2 rounded border">
                    <div class="text-xs font-bold">Light</div>
                    <div class="flex gap-1 mt-1">
                      <div class="w-2 h-2 bg-primary rounded"></div>
                      <div class="w-2 h-2 bg-secondary rounded"></div>
                      <div class="w-2 h-2 bg-accent rounded"></div>
                    </div>
                  </div>
                </div>
                
                <div class="theme-preview-card" data-theme="dark">
                  <div class="bg-base-100 p-2 rounded border">
                    <div class="text-xs font-bold">Dark</div>
                    <div class="flex gap-1 mt-1">
                      <div class="w-2 h-2 bg-primary rounded"></div>
                      <div class="w-2 h-2 bg-secondary rounded"></div>
                      <div class="w-2 h-2 bg-accent rounded"></div>
                    </div>
                  </div>
                </div>
                
                <div class="theme-preview-card" data-theme="cyberpunk">
                  <div class="bg-base-100 p-2 rounded border">
                    <div class="text-xs font-bold">Cyberpunk</div>
                    <div class="flex gap-1 mt-1">
                      <div class="w-2 h-2 bg-primary rounded"></div>
                      <div class="w-2 h-2 bg-secondary rounded"></div>
                      <div class="w-2 h-2 bg-accent rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 应用信息 -->
        <div class="card bg-base-100 shadow-xl lg:col-span-2">
          <div class="card-body">
            <h2 class="card-title mb-4">
              <i class="fas fa-info-circle text-info"></i>
              应用信息
            </h2>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="stat">
                <div class="stat-title">应用名称</div>
                <div class="stat-value text-lg" id="app-name">框架</div>
              </div>
              
              <div class="stat">
                <div class="stat-title">版本</div>
                <div class="stat-value text-lg" id="app-version">1.0.0</div>
              </div>
              
              <div class="stat">
                <div class="stat-title">平台</div>
                <div class="stat-value text-lg" id="app-platform">Unknown</div>
              </div>
            </div>
            
            <div class="divider">框架特性</div>
            
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div class="text-center">
                <i class="fas fa-desktop text-2xl text-primary"></i>
                <div class="text-sm font-bold mt-1">跨平台</div>
              </div>
              
              <div class="text-center">
                <i class="fas fa-palette text-2xl text-secondary"></i>
                <div class="text-sm font-bold mt-1">多主题</div>
              </div>
              
              <div class="text-center">
                <i class="fas fa-mobile-alt text-2xl text-accent"></i>
                <div class="text-sm font-bold mt-1">响应式</div>
              </div>
              
              <div class="text-center">
                <i class="fas fa-code text-2xl text-info"></i>
                <div class="text-sm font-bold mt-1">现代化</div>
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
      // 获取应用信息
      if (window.electronAPI) {
        this.data.appVersion = await window.electronAPI.getAppVersion();
        this.data.appInfo = window.electronAPI.appInfo;
        this.data.platform = window.electronAPI.platform;
        
        // 获取窗口状态信息
        if (window.electronAPI.windowState) {
          this.data.currentState = await window.electronAPI.windowState.getCurrentState();
          this.data.hasExistingState = await window.electronAPI.windowState.hasExistingState();
          this.data.configPath = await window.electronAPI.windowState.getConfigPath();
        }
      }

      this.data.currentTheme = localStorage.getItem('theme') || 'light';
      
      console.log('设置页面数据:', this.data);
    } catch (error) {
      console.error('加载设置数据失败:', error);
    }
  }

  /**
   * 绑定事件处理
   */
  bindEvents() {
    if (!this.pageElement) return;

    // 窗口操作按钮
    const buttons = this.pageElement.querySelectorAll('[data-action]');
    buttons.forEach(button => {
      button.addEventListener('click', this.handleButtonClick.bind(this));
    });

    // 主题选择器
    const themeSelector = this.pageElement.querySelector('#theme-selector');
    if (themeSelector) {
      themeSelector.addEventListener('change', this.handleThemeChange.bind(this));
    }

    // 主题预览卡片
    const themeCards = this.pageElement.querySelectorAll('.theme-preview-card');
    themeCards.forEach(card => {
      card.addEventListener('click', this.handleThemePreviewClick.bind(this));
    });
  }

  /**
   * 处理按钮点击
   */
  async handleButtonClick(event) {
    const action = event.target.closest('[data-action]').dataset.action;
    
    switch (action) {
      case 'save-window-state':
        await this.saveWindowState();
        break;
      case 'reset-window-state':
        await this.resetWindowState();
        break;
      case 'show-config-path':
        await this.showConfigPath();
        break;
    }
  }

  /**
   * 保存窗口状态
   */
  async saveWindowState() {
    try {
      if (window.electronAPI && window.electronAPI.windowState) {
        const success = await window.electronAPI.windowState.save();
        if (success) {
          window.FrameworkUtils?.showNotification(
            '保存成功', 
            '窗口状态已保存', 
            'success'
          );
          await this.updateWindowStateDisplay();
        }
      }
    } catch (error) {
      console.error('保存窗口状态失败:', error);
      window.FrameworkUtils?.showNotification(
        '保存失败', 
        '无法保存窗口状态', 
        'error'
      );
    }
  }

  /**
   * 重置窗口状态
   */
  async resetWindowState() {
    try {
      if (window.electronAPI && window.electronAPI.windowState) {
        const confirmed = confirm('确定要重置窗口状态为默认值吗？\n重置后需要重启应用生效。');
        if (confirmed) {
          const success = await window.electronAPI.windowState.reset();
          if (success) {
            window.FrameworkUtils?.showNotification(
              '重置成功', 
              '窗口状态已重置，重启应用后生效', 
              'success'
            );
            await this.updateWindowStateDisplay();
          }
        }
      }
    } catch (error) {
      console.error('重置窗口状态失败:', error);
      window.FrameworkUtils?.showNotification(
        '重置失败', 
        '无法重置窗口状态', 
        'error'
      );
    }
  }

  /**
   * 显示配置文件路径
   */
  async showConfigPath() {
    if (this.data.configPath) {
      // 在 Electron 中可以打开文件夹
      if (window.electronAPI) {
        const path = this.data.configPath.replace(/[^/\\]+$/, '');
        // 这里可以添加打开文件夹的功能
        navigator.clipboard.writeText(this.data.configPath).then(() => {
          window.FrameworkUtils?.showNotification(
            '路径已复制', 
            '配置文件路径已复制到剪贴板', 
            'success'
          );
        });
      }
    }
  }

  /**
   * 处理主题变更
   */
  handleThemeChange(event) {
    const theme = event.target.value;
    this.applyTheme(theme);
  }

  /**
   * 处理主题预览点击
   */
  handleThemePreviewClick(event) {
    const theme = event.currentTarget.dataset.theme;
    this.applyTheme(theme);
    
    // 更新选择器
    const themeSelector = this.pageElement.querySelector('#theme-selector');
    if (themeSelector) {
      themeSelector.value = theme;
    }
  }

  /**
   * 应用主题
   */
  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    this.data.currentTheme = theme;
    
    // 触发主题变更事件
    window.dispatchEvent(new CustomEvent('themeChange', {
      detail: { theme }
    }));
    
    window.FrameworkUtils?.showNotification(
      '主题已切换', 
      `已切换到 ${theme} 主题`, 
      'success'
    );
  }

  /**
   * 更新窗口状态显示
   */
  async updateWindowStateDisplay() {
    if (!this.pageElement) return;

    const stateElement = this.pageElement.querySelector('#current-window-state');
    const configPathElement = this.pageElement.querySelector('#config-file-path');
    const configExistsBadge = this.pageElement.querySelector('#config-exists-badge');

    if (window.electronAPI && window.electronAPI.windowState) {
      try {
        const currentState = await window.electronAPI.windowState.getCurrentState();
        const hasExisting = await window.electronAPI.windowState.hasExistingState();
        const configPath = await window.electronAPI.windowState.getConfigPath();

        if (stateElement && currentState) {
          stateElement.innerHTML = `
            <div>宽度: ${currentState.width}px, 高度: ${currentState.height}px</div>
            <div>位置: (${currentState.x}, ${currentState.y})</div>
            <div>状态: ${currentState.isMaximized ? '最大化' : '正常'} ${currentState.isFullScreen ? '/ 全屏' : ''}</div>
          `;
        }

        if (configPathElement && configPath) {
          configPathElement.textContent = configPath;
        }

        if (configExistsBadge) {
          configExistsBadge.textContent = hasExisting ? '已存在' : '不存在';
          configExistsBadge.className = `badge ${hasExisting ? 'badge-success' : 'badge-warning'}`;
        }
      } catch (error) {
        console.error('更新窗口状态显示失败:', error);
      }
    }
  }

  /**
   * 更新应用信息显示
   */
  updateAppInfoDisplay() {
    if (!this.pageElement) return;

    const appNameElement = this.pageElement.querySelector('#app-name');
    const appVersionElement = this.pageElement.querySelector('#app-version');
    const appPlatformElement = this.pageElement.querySelector('#app-platform');

    if (appNameElement && this.data.appInfo) {
      appNameElement.textContent = this.data.appInfo.name || 'Electron DaisyUI Framework';
    }

    if (appVersionElement && this.data.appVersion) {
      appVersionElement.textContent = this.data.appVersion;
    }

    if (appPlatformElement && this.data.platform) {
      const platformNames = {
        'win32': 'Windows',
        'darwin': 'macOS',
        'linux': 'Linux'
      };
      appPlatformElement.textContent = platformNames[this.data.platform] || this.data.platform;
    }
  }

  /**
   * 更新主题选择器
   */
  updateThemeSelector() {
    const themeSelector = this.pageElement.querySelector('#theme-selector');
    if (themeSelector && this.data.currentTheme) {
      themeSelector.value = this.data.currentTheme;
    }
  }

  /**
   * 显示页面
   */
  show() {
    if (this.pageElement) {
      // 使用框架导航功能
      window.navigateTo('settings', '设置');
      
      // 更新显示内容
      setTimeout(() => {
        this.updateWindowStateDisplay();
        this.updateAppInfoDisplay();
        this.updateThemeSelector();
      }, 100);
    }
  }

  /**
   * 页面显示时的回调
   */
  onShow() {
    this.updateWindowStateDisplay();
    this.updateAppInfoDisplay();
    this.updateThemeSelector();
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
  module.exports = Settings;
}
