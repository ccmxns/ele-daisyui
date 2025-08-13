# 窗口状态管理功能

## 📋 概述

Electron DaisyUI Framework 集成了完整的窗口状态管理系统，能够自动保存和恢复应用窗口的大小、位置和状态，提供原生般的用户体验。

## ✨ 功能特性

### 自动状态保存
- **实时监听**：自动监听窗口大小、位置变化
- **防抖保存**：使用防抖机制，避免频繁写入文件
- **智能检测**：检测最大化、全屏等状态变化

### 持久化存储
- **安全路径**：配置文件存储在用户数据目录
- **JSON 格式**：使用可读的 JSON 格式存储配置
- **跨平台兼容**：支持 Windows、macOS、Linux

### 智能恢复
- **位置验证**：确保窗口在有效显示器范围内
- **状态恢复**：恢复最大化、全屏等状态
- **默认回退**：无效配置时使用默认值

## 🚀 使用方法

### 基础配置

框架会自动初始化窗口状态管理，无需额外配置：

```javascript
// main.js - 自动集成
const windowStateManager = new WindowStateManager('main', {
    width: 1400,      // 默认宽度
    height: 900,      // 默认高度
    minWidth: 1200,   // 最小宽度
    minHeight: 800    // 最小高度
});

// 获取窗口选项（包含保存的状态）
const windowOptions = windowStateManager.getWindowOptions({
    // 其他窗口选项...
});

// 创建窗口并管理状态
const mainWindow = new BrowserWindow(windowOptions);
windowStateManager.manage(mainWindow);
```

### 渲染进程 API

在渲染进程中可以通过 `electronAPI.windowState` 访问状态管理功能：

```javascript
// 获取当前窗口状态
const currentState = await electronAPI.windowState.getCurrentState();
console.log(currentState);
// 输出：{ width: 1400, height: 900, x: 100, y: 100, isMaximized: false, isFullScreen: false }

// 手动保存当前状态
await electronAPI.windowState.save();

// 重置为默认状态
await electronAPI.windowState.reset();

// 检查是否有保存的状态
const hasExisting = await electronAPI.windowState.hasExistingState();

// 获取配置文件路径
const configPath = await electronAPI.windowState.getConfigPath();
```

### 在页面中使用

在设置页面或其他页面中集成状态管理：

```javascript
class SettingsPage {
    async saveWindowState() {
        try {
            const success = await electronAPI.windowState.save();
            if (success) {
                this.showNotification('保存成功', '窗口状态已保存');
            }
        } catch (error) {
            console.error('保存失败:', error);
        }
    }

    async resetWindowState() {
        const confirmed = confirm('确定要重置窗口状态吗？');
        if (confirmed) {
            await electronAPI.windowState.reset();
            this.showNotification('重置成功', '需要重启应用生效');
        }
    }
}
```

## 📁 配置文件

### 存储位置

配置文件按平台存储在不同位置：

- **Windows**: `%APPDATA%/electron-daisyui-framework/window-state-main.json`
- **macOS**: `~/Library/Application Support/electron-daisyui-framework/window-state-main.json`
- **Linux**: `~/.config/electron-daisyui-framework/window-state-main.json`

### 配置格式

```json
{
  "width": 1400,
  "height": 900,
  "x": 100,
  "y": 100,
  "isMaximized": false,
  "isFullScreen": false,
  "timestamp": 1698765432100
}
```

## 🔧 高级配置

### 自定义窗口管理器

如果需要管理多个窗口，可以创建多个管理器实例：

```javascript
// 主窗口
const mainWindowManager = new WindowStateManager('main');

// 设置窗口
const settingsWindowManager = new WindowStateManager('settings', {
    width: 800,
    height: 600
});
```

### 自定义默认选项

```javascript
const windowStateManager = new WindowStateManager('main', {
    width: 1600,           // 自定义默认宽度
    height: 1000,          // 自定义默认高度
    minWidth: 1000,        // 自定义最小宽度
    minHeight: 600,        // 自定义最小高度
    x: 200,                // 自定义默认 X 位置
    y: 100,                // 自定义默认 Y 位置
    isMaximized: true      // 默认最大化
});
```

### 手动触发保存

```javascript
// 在特定事件中手动保存
document.addEventListener('beforeunload', () => {
    if (windowStateManager) {
        windowStateManager.forceSave();
    }
});
```

## 🛡️ 安全和错误处理

### 位置验证

系统会自动验证窗口位置是否在有效的显示器范围内：

```javascript
isValidState(state) {
    // 检查窗口是否在任何显示器中
    const displays = screen.getAllDisplays();
    // 如果不在有效范围内，清除位置信息
    // 系统会自动居中显示
}
```

### 错误处理

```javascript
try {
    const state = windowStateManager.loadState();
} catch (error) {
    console.error('加载窗口状态失败:', error);
    // 自动使用默认配置
}
```

### 数据验证

```javascript
// 验证保存的数据是否有效
isValidState(state) {
    // 检查必要属性
    // 验证数值范围
    // 确保类型正确
    return isValid;
}
```

## 📊 性能优化

### 防抖保存

使用防抖机制避免频繁保存：

```javascript
let saveTimeout;
const debouncedSave = () => {
    if (saveTimeout) clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
        this.saveState();
    }, 500); // 500ms 延迟
};
```

### 内存管理

```javascript
// 窗口关闭时清理资源
mainWindow.on('closed', () => {
    windowStateManager = null;
});
```

## 🔍 调试和故障排除

### 启用调试日志

```javascript
// 在 WindowStateManager 中启用详细日志
console.log(`窗口状态已保存: ${this.configPath}`);
console.log(`窗口状态管理器已初始化: ${this.windowName}`);
```

### 常见问题

**Q: 窗口没有恢复到保存的位置？**
A: 检查显示器配置是否发生变化，系统会自动验证位置有效性。

**Q: 配置文件在哪里？**
A: 使用 `electronAPI.windowState.getConfigPath()` 获取路径。

**Q: 如何重置到默认状态？**
A: 调用 `electronAPI.windowState.reset()` 或删除配置文件。

**Q: 支持多显示器吗？**
A: 支持，系统会自动验证窗口位置是否在有效的显示器范围内。

## 🎯 最佳实践

1. **让系统自动管理**：通常情况下无需手动干预
2. **提供重置选项**：在设置中为用户提供重置功能
3. **优雅处理错误**：确保即使配置损坏也能正常启动
4. **考虑多显示器**：测试在不同显示器配置下的行为
5. **用户体验优先**：确保窗口始终出现在可见区域

## 📝 API 参考

### WindowStateManager 类

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `constructor(windowName, defaultOptions)` | 窗口名称, 默认选项 | - | 创建管理器实例 |
| `getWindowOptions(options)` | 窗口选项 | Object | 获取包含状态的窗口选项 |
| `manage(window)` | BrowserWindow 实例 | - | 开始管理窗口状态 |
| `saveState()` | - | - | 手动保存当前状态 |
| `resetToDefault()` | - | - | 重置为默认状态 |
| `getCurrentState()` | - | Object | 获取当前窗口状态 |
| `hasExistingState()` | - | Boolean | 检查是否有保存的状态 |

### IPC API

| 方法 | 说明 |
|------|------|
| `electronAPI.windowState.getCurrentState()` | 获取当前状态 |
| `electronAPI.windowState.save()` | 保存状态 |
| `electronAPI.windowState.reset()` | 重置状态 |
| `electronAPI.windowState.hasExistingState()` | 检查状态存在性 |
| `electronAPI.windowState.getConfigPath()` | 获取配置路径 |

---

*通过集成窗口状态管理，你的应用将提供更加流畅和原生的用户体验！*
