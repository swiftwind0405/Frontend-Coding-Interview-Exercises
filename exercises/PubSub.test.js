const PubSub = require('./PubSub');

describe('PubSub', () => {
    let pubSub;

    beforeEach(() => {
        pubSub = new PubSub();
    });

    test('应当注册并触发事件', () => {
        const eventType = 'testEvent';
        const callback = jest.fn();

        pubSub.on(eventType, callback);
        pubSub.emit(eventType, 'arg1', 'arg2');

        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith('arg1', 'arg2');
    });

    test('不应触发未注册的事件', () => {
        const eventType = 'testEvent';
        const unregisteredEventType = 'unregisteredEvent';
        const callback = jest.fn();

        pubSub.on(eventType, callback);
        pubSub.emit(unregisteredEventType, 'arg1', 'arg2');

        expect(callback).toHaveBeenCalledTimes(0);
    });

    test('应当注册并移除事件监听器', () => {
        const eventType = 'testEvent';
        const callback1 = jest.fn();
        const callback2 = jest.fn();

        pubSub.on(eventType, callback1);
        pubSub.on(eventType, callback2);
        pubSub.remove(eventType, callback1);
        pubSub.emit(eventType, 'arg1', 'arg2');

        expect(callback1).toHaveBeenCalledTimes(0);
        expect(callback2).toHaveBeenCalledTimes(1);
        expect(callback2).toHaveBeenCalledWith('arg1', 'arg2');
    });

    test('移除未注册的事件或处理程序时不应失败', () => {
        const eventType = 'testEvent';
        const unregisteredEventType = 'unregisteredEvent';
        const callback = jest.fn();

        expect(() => {
            pubSub.remove(eventType, callback);
            pubSub.remove(unregisteredEventType, callback);
        }).not.toThrow();
    });
});
