/**
 * WindowStateManager - 窗口状态管理器
 * 
 * 负责保存和恢复窗口的大小、位置和状态
 * 数据持久化到用户数据目录的配置文件中
 */

const { app, screen } = require('electron');
const path = require('path');
const fs = require('fs');

class WindowStateManager {
  constructor(windowName = 'main', defaultOptions = {}) {
    this.windowName = windowName;
    this.configPath = path.join(app.getPath('userData'), `window-state-${windowName}.json`);
    
    // 默认窗口配置
    this.defaultState = {
      width: 1400,
      height: 900,
      x: undefined,
      y: undefined,
      isMaximized: false,
      isFullScreen: false,
      ...defaultOptions
    };
    
    this.currentState = this.loadState();
    this.window = null;
    this.isInitialized = false;
  }

  /**
   * 从配置文件加载窗口状态
   */
  loadState() {
    try {
      if (fs.existsSync(this.configPath)) {
        const data = fs.readFileSync(this.configPath, 'utf8');
        const savedState = JSON.parse(data);
        
        // 验证保存的状态是否有效
        if (this.isValidState(savedState)) {
          return { ...this.defaultState, ...savedState };
        }
      }
    } catch (error) {
      console.error('加载窗口状态失败:', error);
    }
    
    return { ...this.defaultState };
  }

  /**
   * 保存窗口状态到配置文件
   */
  saveState() {
    if (!this.window) return;

    try {
      const bounds = this.window.getBounds();
      const state = {
        width: bounds.width,
        height: bounds.height,
        x: bounds.x,
        y: bounds.y,
        isMaximized: this.window.isMaximized(),
        isFullScreen: this.window.isFullScreen(),
        timestamp: Date.now()
      };

      // 创建用户数据目录（如果不存在）
      const userDataPath = app.getPath('userData');
      if (!fs.existsSync(userDataPath)) {
        fs.mkdirSync(userDataPath, { recursive: true });
      }

      fs.writeFileSync(this.configPath, JSON.stringify(state, null, 2), 'utf8');
      this.currentState = state;
      
      console.log(`窗口状态已保存: ${this.configPath}`);
    } catch (error) {
      console.error('保存窗口状态失败:', error);
    }
  }

  /**
   * 验证保存的状态是否有效
   */
  isValidState(state) {
    if (!state || typeof state !== 'object') {
      return false;
    }

    // 检查必要的属性
    const requiredProps = ['width', 'height'];
    for (const prop of requiredProps) {
      if (typeof state[prop] !== 'number' || state[prop] <= 0) {
        return false;
      }
    }

    // 检查窗口是否在有效的屏幕范围内
    if (typeof state.x === 'number' && typeof state.y === 'number') {
      const displays = screen.getAllDisplays();
      let isInDisplay = false;
      
      for (const display of displays) {
        const { x, y, width, height } = display.workArea;
        if (state.x >= x && state.x < x + width && 
            state.y >= y && state.y < y + height) {
          isInDisplay = true;
          break;
        }
      }
      
      if (!isInDisplay) {
        // 如果窗口不在任何显示器中，清除位置信息
        state.x = undefined;
        state.y = undefined;
      }
    }

    return true;
  }

  /**
   * 获取窗口创建选项
   */
  getWindowOptions(options = {}) {
    const state = this.currentState;
    const windowOptions = {
      width: state.width,
      height: state.height,
      ...options
    };

    // 如果有保存的位置，则使用它
    if (typeof state.x === 'number' && typeof state.y === 'number') {
      windowOptions.x = state.x;
      windowOptions.y = state.y;
    } else {
      // 否则居中显示
      const primaryDisplay = screen.getPrimaryDisplay();
      const { width, height } = primaryDisplay.workAreaSize;
      windowOptions.x = Math.round((width - state.width) / 2);
      windowOptions.y = Math.round((height - state.height) / 2);
    }

    return windowOptions;
  }

  /**
   * 绑定窗口事件监听器
   */
  manage(window) {
    this.window = window;
    
    if (this.isInitialized) {
      return;
    }

    // 防抖保存函数
    let saveTimeout;
    const debouncedSave = () => {
      if (saveTimeout) {
        clearTimeout(saveTimeout);
      }
      saveTimeout = setTimeout(() => {
        this.saveState();
      }, 500); // 500ms 延迟保存
    };

    // 监听窗口大小变化
    this.window.on('resize', debouncedSave);
    
    // 监听窗口位置变化
    this.window.on('move', debouncedSave);
    
    // 监听最大化状态变化
    this.window.on('maximize', debouncedSave);
    this.window.on('unmaximize', debouncedSave);
    
    // 监听全屏状态变化
    this.window.on('enter-full-screen', debouncedSave);
    this.window.on('leave-full-screen', debouncedSave);

    // 窗口关闭前保存状态
    this.window.on('close', () => {
      if (saveTimeout) {
        clearTimeout(saveTimeout);
      }
      this.saveState();
    });

    // 恢复窗口状态
    this.window.once('ready-to-show', () => {
      if (this.currentState.isMaximized) {
        this.window.maximize();
      } else if (this.currentState.isFullScreen) {
        this.window.setFullScreen(true);
      }
    });

    this.isInitialized = true;
    console.log(`窗口状态管理器已初始化: ${this.windowName}`);
  }

  /**
   * 重置窗口状态为默认值
   */
  resetToDefault() {
    try {
      if (fs.existsSync(this.configPath)) {
        fs.unlinkSync(this.configPath);
      }
      this.currentState = { ...this.defaultState };
      console.log('窗口状态已重置为默认值');
    } catch (error) {
      console.error('重置窗口状态失败:', error);
    }
  }

  /**
   * 获取当前窗口状态
   */
  getCurrentState() {
    if (this.window) {
      const bounds = this.window.getBounds();
      return {
        width: bounds.width,
        height: bounds.height,
        x: bounds.x,
        y: bounds.y,
        isMaximized: this.window.isMaximized(),
        isFullScreen: this.window.isFullScreen()
      };
    }
    return this.currentState;
  }

  /**
   * 手动触发状态保存
   */
  forceSave() {
    this.saveState();
  }

  /**
   * 检查配置文件是否存在
   */
  hasExistingState() {
    return fs.existsSync(this.configPath);
  }

  /**
   * 获取配置文件路径
   */
  getConfigPath() {
    return this.configPath;
  }
}

module.exports = WindowStateManager;
