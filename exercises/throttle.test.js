const throttle = require('./throttle');

describe('throttle', () => {
    let callback;
    let throttled;

    beforeEach(() => {
        jest.useFakeTimers();
        callback = jest.fn();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test('应正确地调用节流函数', () => {
        const wait = 500;
        throttled = throttle(callback, wait);

        throttled();
        expect(callback).toHaveBeenCalledTimes(1); // 初始时，立即调用

        // 快速连续调用
        for (let i = 0; i < 5; i++) {
            throttled();
        }

        expect(callback).toHaveBeenCalledTimes(1); // 连续调用期间，不再调用

        jest.advanceTimersByTime(wait);
        expect(callback).toHaveBeenCalledTimes(2); // 节流时间过后，调用一次
    });

    test('应在节流期间忽略多次调用', () => {
        const wait = 500;
        throttled = throttle(callback, wait);

        throttled();
        expect(callback).toHaveBeenCalledTimes(1); // 初始时，立即调用

        jest.advanceTimersByTime(wait / 2);
        throttled();
        expect(callback).toHaveBeenCalledTimes(1); // 在节流时间内调用，未调用

        jest.advanceTimersByTime(wait / 2);
        expect(callback).toHaveBeenCalledTimes(2); // 节流时间过后，调用一次
    });

    test('应在节流时间结束后调用最后一次调用', () => {
        const wait = 500;
        throttled = throttle(callback, wait);

        throttled();
        throttled();
        throttled();

        expect(callback).toHaveBeenCalledTimes(1); // 初始时，立即调用

        jest.advanceTimersByTime(wait);
        expect(callback).toHaveBeenCalledTimes(2); // 节流时间过后，调用一次
    });
});
