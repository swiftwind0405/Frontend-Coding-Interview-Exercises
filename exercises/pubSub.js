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
        return true;
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
        const index = (this.handlers[eventType] || []).findIndex(item => item === handler)
        if (index > -1) {
            this.handlers[eventType].splice(index, 1)
            return true
        }
        return false
    }
}

const test1 = new PubSub();
const fn1 = (...data) => console.log(data);
test1.on("event1", fn1);
test1.on("event1", (...data) => console.log(`fn2: ${data}`));
test1.emit("event1", "hzfe1", "hzfe2", "hzfe3");
test1.remove("event1", fn1);
console.log('remove')
test1.emit("event1", "hzfe1", "hzfe2", "hzfe3");
