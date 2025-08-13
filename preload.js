const { contextBridge, ipcRenderer } = require('electron');

// 暴露 API 给渲染进程
contextBridge.exposeInMainWorld('electronAPI', {
    // 获取应用版本
    getAppVersion: () => ipcRenderer.invoke('get-app-version'),
    
    // 显示消息框
    showMessageBox: (options) => ipcRenderer.invoke('show-message-box', options),
    
    // 窗口控制
    windowMinimize: () => ipcRenderer.invoke('window-minimize'),
    windowMaximize: () => ipcRenderer.invoke('window-maximize'),
    windowClose: () => ipcRenderer.invoke('window-close'),
    windowIsMaximized: () => ipcRenderer.invoke('window-is-maximized'),
    
    // 窗口状态管理
    windowState: {
        getCurrentState: () => ipcRenderer.invoke('window-state-get-current'),
        save: () => ipcRenderer.invoke('window-state-save'),
        reset: () => ipcRenderer.invoke('window-state-reset'),
        hasExistingState: () => ipcRenderer.invoke('window-state-has-existing'),
        getConfigPath: () => ipcRenderer.invoke('window-state-get-config-path')
    },
    
    // 平台信息
    platform: process.platform,
    
    // 应用信息
    appInfo: {
        name: 'Electron DaisyUI Framework',
        version: '1.0.0'
    }
});

// 等待 DOM 加载完成后添加 Electron 特定的样式
window.addEventListener('DOMContentLoaded', () => {
    // 添加 Electron 标识
    document.body.classList.add('electron-app');
    
    // 更新标题栏信息
    const titleElement = document.querySelector('title');
    if (titleElement) {
        titleElement.textContent = 'Electron DaisyUI Framework';
    }
    
    // 监听托盘导航消息
    const { ipcRenderer } = require('electron');
    ipcRenderer.on('navigate-to', (event, page) => {
        // 触发页面导航
        const navItems = document.querySelectorAll('.nav-item');
        const targetNav = document.querySelector(`[data-page="${page}"]`);
        
        if (targetNav) {
            // 移除所有活动状态
            navItems.forEach(nav => nav.classList.remove('active'));
            document.querySelectorAll('.page-content').forEach(page => page.classList.add('hidden'));
            
            // 添加当前活动状态
            targetNav.classList.add('active');
            
            // 显示对应页面
            const targetPage = document.getElementById(page + '-page');
            if (targetPage) {
                targetPage.classList.remove('hidden');
            }
            
            // 更新面包屑
            const pageNames = {
                'dashboard': '仪表板',
                'users': '用户管理',
                'orders': '订单管理',
                'products': '商品管理',
                'analytics': '数据分析',
                'settings': '系统设置'
            };
            const currentPageElement = document.getElementById('current-page');
            if (currentPageElement) {
                currentPageElement.textContent = pageNames[page] || '未知页面';
            }
        }
    });
    
    // 移除侧边栏底部版本与状态注入（按需求不显示）
});

// 处理未捕获的错误
window.addEventListener('error', (event) => {
    console.error('渲染进程错误:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('未处理的 Promise 拒绝:', event.reason);
});

console.log('Preload script loaded successfully');
