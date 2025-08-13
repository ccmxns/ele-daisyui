/**
 * 应用配置文件
 * 
 * 这个文件定义了应用的基本配置信息
 * AI 可以通过修改这个文件来快速调整应用设置
 */

module.exports = {
  // 应用基本信息
  app: {
    name: 'Electron DaisyUI App',           // 应用名称 - 显示在标题栏和托盘
    version: '1.0.0',                       // 应用版本
    description: 'Modern desktop app built with Electron and daisyUI', // 应用描述
    author: 'Your Name',                    // 作者信息
    homepage: 'https://your-website.com'   // 主页链接
  },

  // 窗口配置
  window: {
    width: 1400,                           // 默认窗口宽度
    height: 900,                           // 默认窗口高度
    minWidth: 1200,                        // 最小窗口宽度
    minHeight: 800,                        // 最小窗口高度
    frame: false,                          // 是否显示原生窗口框架
    titleBarStyle: 'hidden',               // 标题栏样式
    resizable: true,                       // 是否可调整大小
    maximizable: true,                     // 是否可最大化
    minimizable: true,                     // 是否可最小化
    webSecurity: true                      // 是否启用 web 安全
  },

  // 系统托盘配置
  tray: {
    enabled: true,                         // 是否启用系统托盘
    tooltip: 'Electron DaisyUI App',       // 托盘提示文本
    showBalloon: true,                     // 是否显示气球提示
    balloonTitle: 'App Minimized',         // 气球提示标题
    balloonContent: 'App is running in system tray' // 气球提示内容
  },

  // 开发配置
  development: {
    openDevTools: false,                   // 是否自动打开开发者工具
    enableHotReload: true,                 // 是否启用热重载
    port: 3000                            // 开发服务器端口
  },

  // 主题配置
  theme: {
    default: 'light',                      // 默认主题
    available: [                           // 可用主题列表
      'light', 'dark', 'cupcake', 'bumblebee', 
      'emerald', 'corporate', 'synthwave', 'retro', 'cyberpunk'
    ],
    saveUserPreference: true               // 是否保存用户主题偏好
  },

  // 安全配置
  security: {
    nodeIntegration: false,                // 是否启用 Node.js 集成
    contextIsolation: true,                // 是否启用上下文隔离
    enableRemoteModule: false,             // 是否启用远程模块
    allowRunningInsecureContent: false     // 是否允许不安全内容
  }
};
