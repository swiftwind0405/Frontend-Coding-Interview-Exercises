const debounce = require('./debounce');

describe('debounce', () => {
    let callback;
    let debounced;

    beforeEach(() => {
        jest.useFakeTimers();
        callback = jest.fn();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test('应正确地调用防抖函数', () => {
        const wait = 500;
        debounced = debounce(callback, wait);

        debounced();
        expect(callback).toHaveBeenCalledTimes(0); // 初始时，未调用

        // 快速连续调用
        for (let i = 0; i < 5; i++) {
            debounced();
        }

        expect(callback).toHaveBeenCalledTimes(0); // 连续调用期间，未调用

        jest.advanceTimersByTime(wait);
        expect(callback).toHaveBeenCalledTimes(1); // 防抖时间过后，调用一次
    });

    // test('应在防抖期间忽略多次调用', () => {
    //     const wait = 500;
    //     debounced = debounce(callback, wait);

    //     debounced();
    //     expect(callback).toHaveBeenCalledTimes(0); // 初始时，未调用

    //     jest.advanceTimersByTime(wait / 2);
    //     debounced();
    //     expect(callback).toHaveBeenCalledTimes(0); // 在防抖时间内调用，未调用

    //     jest.advanceTimersByTime(wait / 2);
    //     expect(callback).toHaveBeenCalledTimes(1); // 防抖时间过后，调用一次
    // });

    // test('应在防抖时间结束后调用最后一次调用', () => {
    //     const wait = 500;
    //     debounced = debounce(callback, wait);

    //     debounced();
    //     debounced();
    //     debounced();

    //     expect(callback).toHaveBeenCalledTimes(0); // 初始时，未调用

    //     jest.advanceTimersByTime(wait);
    //     expect(callback).toHaveBeenCalledTimes(1); // 防抖时间过后，调用一次
    // });
});
