# 组件目录

这个目录包含所有可复用的 UI 组件。

## 📝 组件开发指南

### 创建新组件
1. 每个组件创建一个单独的文件
2. 使用清晰的命名（PascalCase）
3. 添加详细的注释说明功能
4. 包含使用示例

### 组件结构示例
```javascript
/**
 * 组件名称 - 组件功能描述
 * 
 * @param {Object} props - 组件属性
 * @param {string} props.title - 标题文本
 * @param {Function} props.onClick - 点击事件处理
 */
class ComponentName {
  constructor(props) {
    this.props = props;
  }
  
  render() {
    // 渲染逻辑
  }
}
```

## 📋 待创建的组件

- [ ] TitleBar.js - 自定义标题栏组件
- [ ] Sidebar.js - 侧边栏导航组件  
- [ ] Header.js - 顶部导航栏组件
- [ ] Modal.js - 模态框组件
- [ ] Button.js - 按钮组件
- [ ] Card.js - 卡片组件
- [ ] Table.js - 表格组件
- [ ] Form.js - 表单组件
