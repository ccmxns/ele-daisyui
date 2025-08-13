const { app, BrowserWindow, Menu, shell, ipcMain, dialog, Tray, nativeImage, screen } = require('electron');
const path = require('path');
const WindowStateManager = require('./src/main/WindowStateManager');

// 保持对窗口对象的全局引用，如果你不这样做，当 JavaScript 对象被垃圾回收时，窗口会被自动关闭
let mainWindow;
let tray = null;
let windowStateManager;

function createWindow() {
    // 初始化窗口状态管理器
    windowStateManager = new WindowStateManager('main', {
        width: 1400,
        height: 900,
        minWidth: 1200,
        minHeight: 800
    });

    // 获取窗口选项（包含保存的位置和大小）
    const windowOptions = windowStateManager.getWindowOptions({
        minWidth: 1200,
        minHeight: 800,
        // icon: path.join(__dirname, 'assets/icon.png'), // 应用图标 - 暂时不需要
        webPreferences: {
            nodeIntegration: false, // 安全性考虑
            contextIsolation: true, // 启用上下文隔离
            enableRemoteModule: false,
            preload: path.join(__dirname, 'preload.js') // 预加载脚本
        },
        frame: false, // 移除窗口框架
        titleBarStyle: 'hidden', // 隐藏标题栏
        show: false // 先不显示，等待准备好再显示
    });

    // 创建浏览器窗口
    mainWindow = new BrowserWindow(windowOptions);
    
    // 让状态管理器管理窗口
    windowStateManager.manage(mainWindow);

    // 加载应用的 index.html
    mainWindow.loadFile('index.html');

    // 当窗口准备好显示时
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
        
        // 开发模式下打开开发者工具
        if (process.env.NODE_ENV === 'development') {
            mainWindow.webContents.openDevTools();
        }
    });

    // 当窗口被关闭时
    mainWindow.on('closed', () => {
        // 取消引用 window 对象，如果你的应用支持多窗口的话，
        // 通常会把多个 window 对象存放在一个数组里面，
        // 与此同时，你应该删除相应的元素。
        mainWindow = null;
        windowStateManager = null;
    });

    // 当窗口即将关闭时，隐藏到托盘而不是退出
    mainWindow.on('close', (event) => {
        if (!app.isQuiting) {
            event.preventDefault();
            mainWindow.hide();
            
            // 首次隐藏时显示提示
            if (!global.hasShownTrayTip) {
                tray.displayBalloon({
                    iconType: 'info',
                    title: 'Electron Framework',
                    content: '应用已最小化到系统托盘，点击托盘图标可重新打开'
                });
                global.hasShownTrayTip = true;
            }
        }
    });

    // 处理窗口链接点击 - 在外部浏览器中打开
    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        shell.openExternal(url);
        return { action: 'deny' };
    });

    // 阻止导航到外部 URL
    mainWindow.webContents.on('will-navigate', (event, navigationUrl) => {
        const parsedUrl = new URL(navigationUrl);
        
        if (parsedUrl.origin !== 'file://') {
            event.preventDefault();
            shell.openExternal(navigationUrl);
        }
    });
}

// 创建应用菜单
function createMenu() {
    const template = [
        {
            label: '文件',
            submenu: [
                {
                    label: '新建',
                    accelerator: 'CmdOrCtrl+N',
                    click: () => {
                        // 新建功能
                        dialog.showMessageBox(mainWindow, {
                            type: 'info',
                            title: '新建',
                            message: '新建功能开发中...',
                            buttons: ['确定']
                        });
                    }
                },
                {
                    label: '保存',
                    accelerator: 'CmdOrCtrl+S',
                    click: () => {
                        // 保存功能
                        dialog.showMessageBox(mainWindow, {
                            type: 'info',
                            title: '保存',
                            message: '保存功能开发中...',
                            buttons: ['确定']
                        });
                    }
                },
                { type: 'separator' },
                {
                    label: '退出',
                    accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
                    click: () => {
                        app.quit();
                    }
                }
            ]
        },
        {
            label: '编辑',
            submenu: [
                { label: '撤销', accelerator: 'CmdOrCtrl+Z', role: 'undo' },
                { label: '重做', accelerator: 'Shift+CmdOrCtrl+Z', role: 'redo' },
                { type: 'separator' },
                { label: '剪切', accelerator: 'CmdOrCtrl+X', role: 'cut' },
                { label: '复制', accelerator: 'CmdOrCtrl+C', role: 'copy' },
                { label: '粘贴', accelerator: 'CmdOrCtrl+V', role: 'paste' },
                { label: '全选', accelerator: 'CmdOrCtrl+A', role: 'selectall' }
            ]
        },
        {
            label: '查看',
            submenu: [
                { label: '重新加载', accelerator: 'CmdOrCtrl+R', role: 'reload' },
                { label: '强制重新加载', accelerator: 'CmdOrCtrl+Shift+R', role: 'forceReload' },
                { label: '切换开发者工具', accelerator: 'F12', role: 'toggleDevTools' },
                { type: 'separator' },
                { label: '实际大小', accelerator: 'CmdOrCtrl+0', role: 'resetZoom' },
                { label: '放大', accelerator: 'CmdOrCtrl+Plus', role: 'zoomIn' },
                { label: '缩小', accelerator: 'CmdOrCtrl+-', role: 'zoomOut' },
                { type: 'separator' },
                { label: '切换全屏', accelerator: 'F11', role: 'togglefullscreen' }
            ]
        },
        {
            label: '窗口',
            submenu: [
                { label: '最小化', accelerator: 'CmdOrCtrl+M', role: 'minimize' },
                { label: '关闭', accelerator: 'CmdOrCtrl+W', role: 'close' }
            ]
        },
        {
            label: '帮助',
            submenu: [
                {
                    label: '关于',
                    click: () => {
                        dialog.showMessageBox(mainWindow, {
                            type: 'info',
                            title: '关于',
                            message: 'Electron DaisyUI Framework',
                            detail: 'Version 1.0.0\n基于 Electron + daisyUI + Tailwind CSS 构建的开发框架',
                            buttons: ['确定']
                        });
                    }
                },
                {
                    label: '查看许可证',
                    click: () => {
                        shell.openExternal('https://github.com/saadeghi/daisyui');
                    }
                }
            ]
        }
    ];

    // macOS 特殊处理
    if (process.platform === 'darwin') {
        template.unshift({
            label: app.getName(),
            submenu: [
                { label: '关于 ' + app.getName(), role: 'about' },
                { type: 'separator' },
                { label: '服务', role: 'services', submenu: [] },
                { type: 'separator' },
                { label: '隐藏 ' + app.getName(), accelerator: 'Command+H', role: 'hide' },
                { label: '隐藏其他', accelerator: 'Command+Shift+H', role: 'hideothers' },
                { label: '显示全部', role: 'unhide' },
                { type: 'separator' },
                { label: '退出', accelerator: 'Command+Q', click: () => app.quit() }
            ]
        });
    }

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}

// 创建系统托盘
function createTray() {
    // 统一使用 icon.png，兼容开发和生产环境
    let iconPath;
    
    if (app.isPackaged) {
        // 生产环境：图标文件通过 extraResources 配置，位于 resources 目录
        iconPath = path.join(process.resourcesPath, 'icon.png');
    } else {
        // 开发环境：图标文件在项目根目录
        iconPath = path.join(__dirname, 'icon.png');
    }
    
    let baseImage = nativeImage.createFromPath(iconPath);

    // 回退：如果主路径加载失败，尝试其他可能的路径
    if (baseImage.isEmpty()) {
        const fallbackPaths = [
            path.join(__dirname, 'icon.png'),
            path.join(process.resourcesPath, 'icon.png'),
            path.join(process.resourcesPath, '..', 'icon.png'),
            path.join(__dirname, '..', 'icon.png'),
            path.join(__dirname, 'assets', 'icon.png')
        ];
        
        for (const fallbackPath of fallbackPaths) {
            try {
                const fallbackImage = nativeImage.createFromPath(fallbackPath);
                if (!fallbackImage.isEmpty()) {
                    baseImage = fallbackImage;
                    console.log(`托盘图标加载成功: ${fallbackPath}`);
                    break;
                }
            } catch (error) {
                console.log(`托盘图标加载失败: ${fallbackPath}`, error.message);
            }
        }
    } else {
        console.log(`托盘图标加载成功: ${iconPath}`);
    }

    // 再回退：创建一个简单的占位图避免透明
    if (baseImage.isEmpty()) {
        const placeholder = nativeImage.createFromBuffer(Buffer.from(
            'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAJFBMVEUAAAD///////////////////////////////////////////////////////8p1s4wAAAAD3RSTlMAAQQHCxITFjJQh6vZ7f3e1z2a3QAAAFJJREFUGNNjYGBgZGBgZGJhYGB4B2QGEAZGJmBgQJBBwQhEJgYmBiY2BqYwCkGg0hBqCkQGgYjQkGgYkAkcQwQkAgmEwYFAkZQGAAjKQAAxLkQe0K8v4QAAAABJRU5ErkJggg==',
            'base64'
        ));
        baseImage = placeholder;
    }

    // macOS 使用模板图像（自适应浅/深色菜单栏）
    if (process.platform === 'darwin') {
        baseImage.setTemplateImage(true);
    }

    // 按屏幕缩放因子选择更清晰的尺寸，避免小尺寸图标变透明或糊
    const scaleFactor = Math.max(1, Math.round(screen.getPrimaryDisplay().scaleFactor || 1));
    const baseDipSize = process.platform === 'win32' ? 16 : 22; // Windows 托盘常用 16dp，macOS 较大
    const pixelSize = Math.max(baseDipSize, baseDipSize * scaleFactor);

    const trayImage = baseImage.resize({ width: pixelSize, height: pixelSize, quality: 'best' });

    tray = new Tray(trayImage);
    
    // 设置托盘提示
    tray.setToolTip('Electron DaisyUI Framework');
    
    // 创建托盘菜单
    const contextMenu = Menu.buildFromTemplate([
        {
            label: '显示主窗口',
            click: () => {
                showMainWindow();
            }
        },
        {
            label: '隐藏窗口',
            click: () => {
                if (mainWindow && mainWindow.isVisible()) {
                    mainWindow.hide();
                }
            }
        },
        { type: 'separator' },
        {
            label: '开发文档',
            click: () => {
                showMainWindow();
                if (mainWindow) {
                    mainWindow.webContents.send('navigate-to', 'docs');
                }
            }
        },
        {
            label: '示例代码',
            click: () => {
                showMainWindow();
                if (mainWindow) {
                    mainWindow.webContents.send('navigate-to', 'examples');
                }
            }
        },
        { type: 'separator' },
        {
            label: '设置',
            submenu: [
                {
                    label: '开机自启动',
                    type: 'checkbox',
                    checked: app.getLoginItemSettings().openAtLogin,
                    click: (menuItem) => {
                        app.setLoginItemSettings({
                            openAtLogin: menuItem.checked,
                            openAsHidden: true // 开机时隐藏启动
                        });
                    }
                },
                {
                    label: '关闭时最小化到托盘',
                    type: 'checkbox',
                    checked: true,
                    click: (menuItem) => {
                        // 可以保存设置到配置文件
                        global.minimizeToTray = menuItem.checked;
                    }
                }
            ]
        },
        {
            label: '关于',
            click: () => {
                dialog.showMessageBox(mainWindow, {
                    type: 'info',
                    title: '关于',
                    message: 'Electron DaisyUI Framework',
                    detail: `版本: 1.0.0\n基于 Electron + daisyUI + Tailwind CSS 构建\n\n现代化的桌面应用开发框架。`,
                    buttons: ['确定']
                });
            }
        },
        { type: 'separator' },
        {
            label: '退出',
            click: () => {
                app.isQuiting = true;
                app.quit();
            }
        }
    ]);
    
    // 设置托盘菜单
    tray.setContextMenu(contextMenu);
    
    // 单击托盘图标显示/隐藏窗口
    tray.on('click', () => {
        if (mainWindow.isVisible()) {
            mainWindow.hide();
        } else {
            showMainWindow();
        }
    });
    
    // 双击托盘图标显示窗口
    tray.on('double-click', () => {
        showMainWindow();
    });
}

// 显示主窗口
function showMainWindow() {
    if (mainWindow) {
        if (mainWindow.isMinimized()) {
            mainWindow.restore();
        }
        mainWindow.show();
        mainWindow.focus();
        
        // Windows 系统需要特殊处理来确保窗口获得焦点
        if (process.platform === 'win32') {
            mainWindow.setAlwaysOnTop(true);
            setTimeout(() => {
                mainWindow.setAlwaysOnTop(false);
            }, 100);
        }
    }
}

// 这段程序将会在 Electron 结束初始化和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
    createWindow();
    createTray();
    // createMenu(); // 暂时移除菜单

    app.on('activate', () => {
        // 在 macOS 上，当点击 dock 图标并且该应用程序没有打开的窗口时，
        // 绝大部分应用程序会重新创建一个窗口。
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        } else if (mainWindow) {
            showMainWindow();
        }
    });
});

// 当全部窗口关闭时的行为
app.on('window-all-closed', () => {
    // 如果不是明确退出，则保持应用运行（托盘模式）
    if (!app.isQuiting) {
        // 应用继续在后台运行
        return;
    }
    
    // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
    // 否则绝大部分应用程序会保持激活状态，即使没有窗口。
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// 应用即将退出时清理托盘
app.on('before-quit', () => {
    app.isQuiting = true;
    if (tray) {
        tray.destroy();
    }
});

// IPC 通信处理
ipcMain.handle('get-app-version', () => {
    return app.getVersion();
});

ipcMain.handle('show-message-box', async (event, options) => {
    const result = await dialog.showMessageBox(mainWindow, options);
    return result;
});

// 窗口控制 IPC 处理
ipcMain.handle('window-minimize', () => {
    mainWindow.minimize();
});

ipcMain.handle('window-maximize', () => {
    if (mainWindow.isMaximized()) {
        mainWindow.unmaximize();
    } else {
        mainWindow.maximize();
    }
    return mainWindow.isMaximized();
});

ipcMain.handle('window-close', () => {
    mainWindow.close();
});

ipcMain.handle('window-is-maximized', () => {
    return mainWindow.isMaximized();
});

// 窗口状态管理 IPC 处理
ipcMain.handle('window-state-get-current', () => {
    return windowStateManager ? windowStateManager.getCurrentState() : null;
});

ipcMain.handle('window-state-save', () => {
    if (windowStateManager) {
        windowStateManager.forceSave();
        return true;
    }
    return false;
});

ipcMain.handle('window-state-reset', () => {
    if (windowStateManager) {
        windowStateManager.resetToDefault();
        return true;
    }
    return false;
});

ipcMain.handle('window-state-has-existing', () => {
    return windowStateManager ? windowStateManager.hasExistingState() : false;
});

ipcMain.handle('window-state-get-config-path', () => {
    return windowStateManager ? windowStateManager.getConfigPath() : null;
});

// 在这个文件中，你可以续写应用剩下主进程代码。
// 也可以拆分成几个文件，然后用 require 导入。
