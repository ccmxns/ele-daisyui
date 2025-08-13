/**
 * 应用常量定义
 * 
 * 这个文件定义了应用中使用的所有常量
 * AI 可以在这里查找和定义新的常量
 */

// IPC 通信事件名称
export const IPC_EVENTS = {
  // 窗口控制
  WINDOW_MINIMIZE: 'window-minimize',
  WINDOW_MAXIMIZE: 'window-maximize',
  WINDOW_CLOSE: 'window-close',
  WINDOW_IS_MAXIMIZED: 'window-is-maximized',
  
  // 应用信息
  GET_APP_VERSION: 'get-app-version',
  SHOW_MESSAGE_BOX: 'show-message-box',
  
  // 页面导航
  NAVIGATE_TO: 'navigate-to',
  
  // 主题管理
  THEME_CHANGE: 'theme-change',
  GET_THEME: 'get-theme',
  
  // 设置管理
  GET_SETTINGS: 'get-settings',
  SET_SETTINGS: 'set-settings'
};

// 页面标识符
export const PAGES = {
  DASHBOARD: 'dashboard',
  USERS: 'users',
  ORDERS: 'orders',
  PRODUCTS: 'products',
  ANALYTICS: 'analytics',
  SETTINGS: 'settings',
  ABOUT: 'about'
};

// 页面显示名称映射
export const PAGE_TITLES = {
  [PAGES.DASHBOARD]: '仪表板',
  [PAGES.USERS]: '用户管理',
  [PAGES.ORDERS]: '订单管理',
  [PAGES.PRODUCTS]: '商品管理',
  [PAGES.ANALYTICS]: '数据分析',
  [PAGES.SETTINGS]: '系统设置',
  [PAGES.ABOUT]: '关于'
};

// 主题列表
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  CUPCAKE: 'cupcake',
  BUMBLEBEE: 'bumblebee',
  EMERALD: 'emerald',
  CORPORATE: 'corporate',
  SYNTHWAVE: 'synthwave',
  RETRO: 'retro',
  CYBERPUNK: 'cyberpunk'
};

// 本地存储键名
export const STORAGE_KEYS = {
  THEME: 'app-theme',
  WINDOW_STATE: 'window-state',
  USER_PREFERENCES: 'user-preferences'
};

// 应用状态
export const APP_STATES = {
  LOADING: 'loading',
  READY: 'ready',
  ERROR: 'error'
};

// 通知类型
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};
