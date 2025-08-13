// Electron 环境检测和功能增强
const isElectron = window.electronAPI !== undefined;

// 页面实例
let settingsPage = null;

// 框架初始化
document.addEventListener('DOMContentLoaded', function() {
    // Electron 特定初始化
    if (isElectron) {
        initElectronFeatures();
    }

    // 主题切换功能
    initThemeSystem();

    // 初始化页面导航系统
    initPageNavigation();

    // 初始化欢迎页面交互
    initWelcomePage();
    
    // 初始化页面实例
    initPageInstances();
});

/**
 * 初始化主题系统
 */
function initThemeSystem() {
    const themeSelect = document.getElementById('theme-select');
    const html = document.documentElement;

    if (!themeSelect) return;

    // 加载保存的主题
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    themeSelect.value = savedTheme;

    // 主题切换事件
    themeSelect.addEventListener('change', function() {
        const selectedTheme = this.value;
        html.setAttribute('data-theme', selectedTheme);
        localStorage.setItem('theme', selectedTheme);
        
        // 触发主题变更事件，供其他组件使用
        window.dispatchEvent(new CustomEvent('themeChange', {
            detail: { theme: selectedTheme }
        }));
    });
}

/**
 * 初始化页面导航系统
 */
function initPageNavigation() {
    // 基础的页面路由系统
    window.navigateTo = function(pageId, pageName = '页面') {
        // 隐藏所有页面
        const pages = document.querySelectorAll('.page-content');
        pages.forEach(page => page.classList.add('hidden'));
        
        // 显示目标页面
        const targetPage = document.getElementById(pageId + '-page');
        if (targetPage) {
            targetPage.classList.remove('hidden');
        }
        
        // 更新面包屑
        const currentPageElement = document.getElementById('current-page');
        if (currentPageElement) {
            currentPageElement.textContent = pageName;
        }
        
        // 触发页面变更事件
        window.dispatchEvent(new CustomEvent('pageChange', {
            detail: { pageId, pageName }
        }));
    };

    // 监听来自主进程的导航消息
    if (isElectron && window.electronAPI && window.electronAPI.ipcRenderer) {
        window.electronAPI.ipcRenderer.on('navigate-to', (event, pageId) => {
            const pageNames = {
                'welcome': 'Welcome',
                'docs': '开发文档',
                'examples': '示例代码'
            };
            navigateTo(pageId, pageNames[pageId] || '页面');
        });
    }
}

/**
 * 初始化欢迎页面交互
 */
function initWelcomePage() {
    // 开始开发按钮
    const getStartedBtn = document.getElementById('get-started');
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', function() {
            showNotification('开始开发', '欢迎使用 Electron DaisyUI Framework！', 'success');
        });
    }

    // 查看文档按钮
    const viewDocsBtn = document.getElementById('view-docs');
    if (viewDocsBtn) {
        viewDocsBtn.addEventListener('click', function() {
            if (isElectron) {
                // 在桌面应用中，可以打开本地文档或外部链接
                window.electronAPI.shell?.openExternal('https://daisyui.com/docs/');
            } else {
                // 在浏览器中直接跳转
                window.open('https://daisyui.com/docs/', '_blank');
            }
        });
    }
}

/**
 * 显示通知
 */
function showNotification(title, message, type = 'info') {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} fixed top-4 right-4 max-w-sm z-50 shadow-lg`;
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-${getNotificationIcon(type)} mr-2"></i>
            <div>
                <div class="font-bold">${title}</div>
                <div class="text-sm">${message}</div>
            </div>
            <button class="btn btn-ghost btn-xs ml-auto" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

    // 添加到页面
    document.body.appendChild(notification);

    // 自动移除
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        'info': 'info-circle',
        'success': 'check-circle',
        'warning': 'exclamation-triangle',
        'error': 'times-circle'
    };
    return icons[type] || 'info-circle';
}

// Electron 特定功能
function initElectronFeatures() {
    console.log('初始化 Electron 功能...');
    
    // 设置窗口标题
    if (window.electronAPI && window.electronAPI.appInfo) {
        document.title = window.electronAPI.appInfo.name;
    }
    
    // 初始化自定义标题栏
    initCustomTitleBar();
    
    // 添加快捷键支持
    addKeyboardShortcuts();
    
    // 添加 Electron 菜单项
    addElectronMenuItems();
}

function initCustomTitleBar() {
    // 检查是否最大化并更新按钮状态
    updateMaximizeButton();
    
    // 双击标题栏最大化/还原
    const titleBar = document.querySelector('.custom-titlebar');
    if (titleBar) {
        titleBar.addEventListener('dblclick', () => {
            if (window.electronAPI && window.electronAPI.windowMaximize) {
                window.electronAPI.windowMaximize().then(updateMaximizeButton);
            }
        });
    }
}

async function updateMaximizeButton() {
    if (window.electronAPI && window.electronAPI.windowIsMaximized) {
        const isMaximized = await window.electronAPI.windowIsMaximized();
        const maximizeBtn = document.querySelector('button[onclick="electronAPI.windowMaximize()"]');
        if (maximizeBtn) {
            maximizeBtn.title = isMaximized ? '还原' : '最大化';
            
            // 更新图标
            const svg = maximizeBtn.querySelector('svg');
            if (svg) {
                if (isMaximized) {
                    // 还原图标 - 两个重叠的方框
                    svg.innerHTML = `
                        <rect x="2.5" y="0.5" width="7" height="7" fill="none" stroke="currentColor" stroke-width="1"/>
                        <rect x="0.5" y="2.5" width="7" height="7" fill="none" stroke="currentColor" stroke-width="1"/>
                    `;
                } else {
                    // 最大化图标 - 单个方框
                    svg.innerHTML = `
                        <rect x="0.5" y="0.5" width="9" height="9" fill="none" stroke="currentColor" stroke-width="1"/>
                    `;
                }
            }
        }
    }
}

function addElectronMenuItems() {
    // 在设置菜单中添加 Electron 特定选项
    const settingsMenu = document.querySelector('.dropdown-content.menu');
    if (settingsMenu) {
        const aboutItem = settingsMenu.querySelector('li:first-child a');
        if (aboutItem) {
            aboutItem.addEventListener('click', showAboutDialog);
        }
    }
}

function addKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + R: 刷新页面
        if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
            e.preventDefault();
            location.reload();
        }
        
        // F11: 切换全屏（通过菜单）
        if (e.key === 'F11') {
            e.preventDefault();
            // 全屏功能由 Electron 菜单处理
        }
        
        // F12: 开发者工具
        if (e.key === 'F12') {
            e.preventDefault();
            if (window.electronAPI && window.electronAPI.toggleDevTools) {
                window.electronAPI.toggleDevTools();
            }
        }
    });
}

async function showAboutDialog() {
    if (window.electronAPI && window.electronAPI.showMessageBox) {
        await window.electronAPI.showMessageBox({
            type: 'info',
            title: '关于框架',
            message: 'Electron DaisyUI Framework',
            detail: `版本: 1.0.0\n基于 Electron + daisyUI + Tailwind CSS 构建\n\n现代化的桌面应用开发框架。`,
            buttons: ['确定']
        });
    } else {
        alert('Electron DaisyUI Framework v1.0.0\n基于 Electron + daisyUI + Tailwind CSS 构建的开发框架');
    }
}

// 工具函数：加载外部页面或组件
window.loadPage = function(pagePath) {
    return fetch(pagePath)
        .then(response => response.text())
        .then(html => {
            const pageContainer = document.getElementById('page-content');
            if (pageContainer) {
                pageContainer.innerHTML = html;
                
                // 重新绑定事件
                initPageEvents();
            }
        })
        .catch(error => {
            console.error('加载页面失败:', error);
            showNotification('错误', '页面加载失败', 'error');
        });
};

// 工具函数：初始化页面事件
function initPageEvents() {
    // 重新初始化表单验证
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
    });
    
    // 重新初始化按钮事件
    const buttons = document.querySelectorAll('[data-action]');
    buttons.forEach(button => {
        button.addEventListener('click', handleButtonAction);
    });
}

function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    console.log('表单提交:', data);
    showNotification('成功', '表单已提交', 'success');
}

function handleButtonAction(event) {
    const button = event.target;
    const action = button.dataset.action;
    
    switch (action) {
        case 'save':
            showNotification('保存', '数据已保存', 'success');
            break;
        case 'delete':
            if (confirm('确定要删除吗？')) {
                showNotification('删除', '项目已删除', 'success');
            }
            break;
        case 'refresh':
            location.reload();
            break;
        default:
            console.log('执行操作:', action);
    }
}

// 响应式处理
window.addEventListener('resize', function() {
    // 触发窗口大小变更事件
    window.dispatchEvent(new CustomEvent('windowResize', {
        detail: {
            width: window.innerWidth,
            height: window.innerHeight
        }
    }));
});

/**
 * 初始化页面实例
 */
function initPageInstances() {
    // 延迟初始化页面实例，确保Settings类已加载
    setTimeout(() => {
        if (typeof Settings !== 'undefined') {
            settingsPage = new Settings();
        }
    }, 100);
}

/**
 * 显示设置页面
 */
function showSettings() {
    if (settingsPage) {
        settingsPage.show();
    } else {
        // 如果页面实例不存在，尝试创建
        if (typeof Settings !== 'undefined') {
            settingsPage = new Settings();
            settingsPage.show();
        } else {
            showNotification('错误', '设置页面未加载', 'error');
        }
    }
}

// 导出框架工具函数，供页面使用
window.FrameworkUtils = {
    showNotification,
    navigateTo,
    loadPage,
    initPageEvents,
    isElectron
};

// 导出全局函数
window.showSettings = showSettings;