const deepCopy = require('./deepCopy'); 

describe('deepCopy', () => {
  test('should handle basic types', () => {
    expect(deepCopy(null)).toBeNull();
    expect(deepCopy(undefined)).toBeUndefined();
    expect(deepCopy(42)).toBe(42);
    expect(deepCopy('hello')).toBe('hello');
    expect(deepCopy(true)).toBe(true);
    expect(deepCopy(false)).toBe(false);
  });

  test('should handle arrays', () => {
    const input = [1, 2, 3, 4];
    const result = deepCopy(input);
    expect(result).toEqual(input);
    expect(result).not.toBe(input);
  });

  test('should handle objects', () => {
    const input = { a: 1, b: 2, c: 3 };
    const result = deepCopy(input);
    expect(result).toEqual(input);
    expect(result).not.toBe(input);
  });

  test('should handle nested structures', () => {
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

  test('should handle circular references', () => {
    const input = { a: 1, b: 2 };
    input.c = input;
    const result = deepCopy(input);
    expect(result.a).toBe(1);
    expect(result.b).toBe(2);
    expect(result.c).toEqual(result);
  });
});
