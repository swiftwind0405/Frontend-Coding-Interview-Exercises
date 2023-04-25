class PubSub {
    constructor() {
        this.handlers = {}
    }

    // 订阅事件
    on(eventType, handler) {
        if (this.handlers[eventType]) {
            this.handlers[eventType].push(handler)
        } else {
            this.handlers[eventType] = [handler]
        }
    }

    // 消息发布
    emit(eventType, ...args) {
        const handlers = this.handlers[eventType]
        if (!handlers || handlers.length === 0) {
            return false
        }
        handlers.forEach(handler => handler.call(null, ...args));
        return true
    }

    // 取消
    remove(eventType, handler) {
        const handles = this.handlers[eventType] || [];
        if (!handles || !handles.length) {
            return;
        }
        this.handlers[eventType].splice(handles.indexOf(handler) >>> 0, 1)
    }
}

module.exports = PubSub;
