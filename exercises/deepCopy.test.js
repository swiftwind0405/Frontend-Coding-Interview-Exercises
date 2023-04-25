const deepCopy = require('./deepCopy'); // 引入你的深拷贝函数

describe('deepCopy', () => {
    test('应处理基本类型', () => {
        expect(deepCopy(null)).toBeNull();
        expect(deepCopy(undefined)).toBeUndefined();
        expect(deepCopy(42)).toBe(42);
        expect(deepCopy('hello')).toBe('hello');
        expect(deepCopy(true)).toBe(true);
        expect(deepCopy(false)).toBe(false);
    });

    test('应处理数组', () => {
        const input = [1, 2, 3, 4];
        const result = deepCopy(input);
        expect(result).toEqual(input);
        expect(result).not.toBe(input);
    });

    test('应处理对象', () => {
        const input = { a: 1, b: 2, c: 3 };
        const result = deepCopy(input);
        expect(result).toEqual(input);
        expect(result).not.toBe(input);
    });

    test('应处理嵌套结构', () => {
        const input = {
            a: 1,
            b: [2, 3, { d: 4 }],
            c: { e: 5, f: { g: 6 } },
        };
        const result = deepCopy(input);
        expect(result).toEqual(input);
        expect(result).not.toBe(input);
        expect(result.b).not.toBe(input.b);
        expect(result.b[2]).not.toBe(input.b[2]);
        expect(result.c).not.toBe(input.c);
        expect(result.c.f).not.toBe(input.c.f);
    });

    test('应处理循环引用', () => {
        const input = { a: 1, b: 2 };
        input.c = input;
        const result = deepCopy(input);
        expect(result.a).toBe(1);
        expect(result.b).toBe(2);
        expect(result.c).toEqual(result);
    });

    test('应处理Symbol类型', () => {
        const symbol = Symbol('test');
        const input = {
            a: symbol,
        };
        const result = deepCopy(input);
        expect(result).toEqual(input);
        expect(result).not.toBe(input);
        expect(result.a).toBe(symbol);
    });

    test('应处理嵌套的Symbol类型', () => {
        const symbol1 = Symbol('test1');
        const symbol2 = Symbol('test2');
        const input = {
            a: {
                b: symbol1,
            },
            c: [symbol2],
        };
        const result = deepCopy(input);
        expect(result).toEqual(input);
        expect(result).not.toBe(input);
        expect(result.a).not.toBe(input.a);
        expect(result.a.b).toBe(symbol1);
        expect(result.c).not.toBe(input.c);
        expect(result.c[0]).toBe(symbol2);
    });
});
