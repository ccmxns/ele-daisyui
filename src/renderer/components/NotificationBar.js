/**
 * NotificationBar - 通知栏组件
 * 
 * 用于显示应用级别的通知信息，支持多种类型和自动消失功能
 * 
 * 使用示例：
 * ```javascript
 * const notificationBar = new NotificationBar({
 *   type: 'info',
 *   title: '提示',
 *   message: '这是一条信息',
 *   autoHide: true,
 *   duration: 3000
 * });
 * notificationBar.render(document.body);
 * ```
 * 
 * @param {Object} props - 组件属性
 * @param {string} props.type - 通知类型：info, success, warning, error
 * @param {string} props.title - 通知标题
 * @param {string} props.message - 通知内容
 * @param {boolean} props.autoHide - 是否自动隐藏
 * @param {number} props.duration - 自动隐藏延迟时间（毫秒）
 * @param {string} props.className - 额外的CSS类名
 * @param {Function} props.onClose - 关闭时的回调函数
 */
class NotificationBar {
  constructor(props = {}) {
    this.props = {
      type: 'info',
      title: '',
      message: '',
      autoHide: true,
      duration: 5000,
      className: '',
      onClose: () => {},
      ...props
    };
    
    this.element = null;
    this.timer = null;
    this.isVisible = false;
    
    this.init();
  }

  /**
   * 初始化组件
   */
  init() {
    this.createElement();
    this.bindEvents();
    
    if (this.props.autoHide && this.props.duration > 0) {
      this.startAutoHideTimer();
    }
  }

  /**
   * 创建 DOM 元素
   */
  createElement() {
    this.element = document.createElement('div');
    this.element.className = this.getElementClassName();
    this.element.innerHTML = this.getTemplate();
    
    // 添加进入动画
    requestAnimationFrame(() => {
      this.element.classList.add('notification-enter-active');
    });
  }

  /**
   * 获取元素类名
   */
  getElementClassName() {
    const baseClass = 'notification-bar fixed top-4 right-4 max-w-sm z-50 shadow-lg transform transition-all duration-300 translate-x-full opacity-0';
    const typeClass = this.getTypeClassName();
    const customClass = this.props.className;
    
    return `${baseClass} ${typeClass} ${customClass}`.trim();
  }

  /**
   * 获取类型对应的类名
   */
  getTypeClassName() {
    const typeMap = {
      'info': 'alert alert-info',
      'success': 'alert alert-success',
      'warning': 'alert alert-warning',
      'error': 'alert alert-error'
    };
    
    return typeMap[this.props.type] || typeMap['info'];
  }

  /**
   * 获取组件模板
   * @returns {string} HTML 模板字符串
   */
  getTemplate() {
    const icon = this.getTypeIcon();
    const title = this.props.title ? `<div class="font-bold">${this.escapeHtml(this.props.title)}</div>` : '';
    const message = this.props.message ? `<div class="text-sm">${this.escapeHtml(this.props.message)}</div>` : '';
    
    return `
      <div class="flex items-start">
        <i class="fas fa-${icon} mr-3 mt-1 flex-shrink-0"></i>
        <div class="flex-1">
          ${title}
          ${message}
        </div>
        <button class="btn btn-ghost btn-xs ml-3 flex-shrink-0" data-action="close">
          <i class="fas fa-times"></i>
        </button>
      </div>
    `;
  }

  /**
   * 获取类型对应的图标
   */
  getTypeIcon() {
    const iconMap = {
      'info': 'info-circle',
      'success': 'check-circle',
      'warning': 'exclamation-triangle',
      'error': 'times-circle'
    };
    
    return iconMap[this.props.type] || iconMap['info'];
  }

  /**
   * HTML 转义
   */
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * 绑定事件处理
   */
  bindEvents() {
    if (!this.element) return;

    // 关闭按钮点击事件
    const closeBtn = this.element.querySelector('[data-action="close"]');
    if (closeBtn) {
      closeBtn.addEventListener('click', this.close.bind(this));
    }

    // 鼠标悬停暂停自动隐藏
    this.element.addEventListener('mouseenter', this.pauseAutoHide.bind(this));
    this.element.addEventListener('mouseleave', this.resumeAutoHide.bind(this));

    // 点击整个通知栏
    this.element.addEventListener('click', (event) => {
      // 如果点击的不是关闭按钮，则可以执行其他操作
      if (!event.target.closest('[data-action="close"]')) {
        this.handleClick(event);
      }
    });
  }

  /**
   * 处理点击事件
   */
  handleClick(event) {
    // 可以在这里添加点击通知的逻辑
    if (typeof this.props.onClick === 'function') {
      this.props.onClick(event, this);
    }
  }

  /**
   * 开始自动隐藏计时器
   */
  startAutoHideTimer() {
    this.clearAutoHideTimer();
    
    if (this.props.autoHide && this.props.duration > 0) {
      this.timer = setTimeout(() => {
        this.close();
      }, this.props.duration);
    }
  }

  /**
   * 暂停自动隐藏
   */
  pauseAutoHide() {
    this.clearAutoHideTimer();
  }

  /**
   * 恢复自动隐藏
   */
  resumeAutoHide() {
    if (this.props.autoHide && this.isVisible) {
      this.startAutoHideTimer();
    }
  }

  /**
   * 清除自动隐藏计时器
   */
  clearAutoHideTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  /**
   * 显示通知
   */
  show() {
    if (this.element && !this.isVisible) {
      this.element.classList.remove('translate-x-full', 'opacity-0');
      this.element.classList.add('translate-x-0', 'opacity-100');
      this.isVisible = true;
      
      if (this.props.autoHide) {
        this.startAutoHideTimer();
      }
    }
  }

  /**
   * 隐藏通知
   */
  hide() {
    if (this.element && this.isVisible) {
      this.element.classList.remove('translate-x-0', 'opacity-100');
      this.element.classList.add('translate-x-full', 'opacity-0');
      this.isVisible = false;
      
      this.clearAutoHideTimer();
    }
  }

  /**
   * 关闭通知
   */
  close() {
    this.hide();
    
    // 等待动画完成后移除元素
    setTimeout(() => {
      this.destroy();
      if (typeof this.props.onClose === 'function') {
        this.props.onClose(this);
      }
    }, 300);
  }

  /**
   * 渲染组件到指定容器
   * @param {HTMLElement} container - 目标容器
   */
  render(container) {
    if (container && this.element) {
      container.appendChild(this.element);
      
      // 延迟显示以确保动画效果
      setTimeout(() => {
        this.show();
      }, 100);
    }
  }

  /**
   * 更新组件属性
   * @param {Object} newProps - 新的属性
   */
  update(newProps) {
    const oldProps = { ...this.props };
    this.props = { ...this.props, ...newProps };
    
    // 如果内容发生变化，重新渲染
    if (oldProps.title !== this.props.title || 
        oldProps.message !== this.props.message || 
        oldProps.type !== this.props.type) {
      
      this.element.className = this.getElementClassName();
      this.element.innerHTML = this.getTemplate();
      this.bindEvents();
    }
    
    // 如果自动隐藏设置发生变化
    if (oldProps.autoHide !== this.props.autoHide || 
        oldProps.duration !== this.props.duration) {
      
      if (this.props.autoHide) {
        this.startAutoHideTimer();
      } else {
        this.clearAutoHideTimer();
      }
    }
  }

  /**
   * 销毁组件
   */
  destroy() {
    this.clearAutoHideTimer();
    
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
    
    this.element = null;
    this.isVisible = false;
  }

  /**
   * 获取当前状态
   */
  getState() {
    return {
      type: this.props.type,
      title: this.props.title,
      message: this.props.message,
      isVisible: this.isVisible,
      hasTimer: !!this.timer
    };
  }

  /**
   * 静态方法：创建并显示一个临时通知
   * @param {Object} options - 通知选项
   * @returns {NotificationBar} 通知实例
   */
  static show(options = {}) {
    const notification = new NotificationBar(options);
    notification.render(document.body);
    return notification;
  }

  /**
   * 静态方法：显示信息通知
   */
  static info(title, message, options = {}) {
    return this.show({ type: 'info', title, message, ...options });
  }

  /**
   * 静态方法：显示成功通知
   */
  static success(title, message, options = {}) {
    return this.show({ type: 'success', title, message, ...options });
  }

  /**
   * 静态方法：显示警告通知
   */
  static warning(title, message, options = {}) {
    return this.show({ type: 'warning', title, message, ...options });
  }

  /**
   * 静态方法：显示错误通知
   */
  static error(title, message, options = {}) {
    return this.show({ type: 'error', title, message, autoHide: false, ...options });
  }
}

// 为 CSS 添加动画类
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    .notification-enter-active {
      transform: translateX(0) !important;
      opacity: 1 !important;
    }
    
    .notification-bar:hover {
      transform: scale(1.02);
    }
  `;
  document.head.appendChild(style);
}

// 如果在 Node.js 环境中使用
if (typeof module !== 'undefined' && module.exports) {
  module.exports = NotificationBar;
}
