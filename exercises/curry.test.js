const curry = require('./curry');

describe('curry', () => {
    test('应正确地柯里化一个函数', () => {
        const sum = (a, b, c) => a + b + c;
        const curriedSum = curry(sum);

        expect(curriedSum(1)(2)(3)).toBe(6);
        expect(curriedSum(1, 2)(3)).toBe(6);
        expect(curriedSum(1)(2, 3)).toBe(6);
        expect(curriedSum(1, 2, 3)).toBe(6);
    });

    // test('应处理不定参数的函数', () => {
    //     const sum = (...args) => args.reduce((a, b) => a + b, 0);
    //     const curriedSum = curry(sum);

    //     expect(curriedSum(1)(2)(3)()).toBe(6);
    //     expect(curriedSum(1, 2)(3)()).toBe(6);
    //     expect(curriedSum(1)(2, 3)()).toBe(6);
    //     expect(curriedSum(1, 2, 3)()).toBe(6);
    // });

    test('应处理没有参数的函数', () => {
        const sayHello = () => 'Hello';
        const curriedHello = curry(sayHello);

        expect(curriedHello()).toBe('Hello');
    });
});
