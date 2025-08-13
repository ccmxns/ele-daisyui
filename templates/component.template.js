/**
 * 组件模板文件
 * 
 * 复制这个模板来创建新的组件
 * 替换 ComponentName 为你的组件名称
 */

/**
 * ComponentName - 组件功能描述
 * 
 * 使用示例：
 * ```javascript
 * const component = new ComponentName({
 *   prop1: 'value1',
 *   prop2: 'value2'
 * });
 * component.render();
 * ```
 * 
 * @param {Object} props - 组件属性
 * @param {string} props.className - CSS 类名
 * @param {Function} props.onClick - 点击事件处理函数
 */
class ComponentName {
  constructor(props = {}) {
    this.props = {
      className: '',
      onClick: () => {},
      ...props
    };
    
    this.element = null;
    this.init();
  }

  /**
   * 初始化组件
   */
  init() {
    this.createElement();
    this.bindEvents();
  }

  /**
   * 创建 DOM 元素
   */
  createElement() {
    this.element = document.createElement('div');
    this.element.className = `component-name ${this.props.className}`;
    this.element.innerHTML = this.getTemplate();
  }

  /**
   * 获取组件模板
   * @returns {string} HTML 模板字符串
   */
  getTemplate() {
    return `
      <div class="component-content">
        <!-- 在这里添加组件的 HTML 结构 -->
        <p>组件内容</p>
      </div>
    `;
  }

  /**
   * 绑定事件处理
   */
  bindEvents() {
    if (this.element) {
      this.element.addEventListener('click', this.props.onClick);
    }
  }

  /**
   * 渲染组件到指定容器
   * @param {HTMLElement} container - 目标容器
   */
  render(container) {
    if (container && this.element) {
      container.appendChild(this.element);
    }
  }

  /**
   * 更新组件属性
   * @param {Object} newProps - 新的属性
   */
  update(newProps) {
    this.props = { ...this.props, ...newProps };
    this.element.innerHTML = this.getTemplate();
  }

  /**
   * 销毁组件
   */
  destroy() {
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
  }
}

// 如果在 Node.js 环境中使用
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ComponentName;
}
