const parseUrl = require("./parseUrl");

test("[parseUrl] 没有params的情况", () => {
    expect(parseUrl('https://shanyue.tech')).toEqual({});
  });

test("[parseUrl] 普通params", () => {
  expect(parseUrl('https://shanyue.tech?a=3&b=4&c=5')).toEqual({a: 3, b: 4, c: 5});
});

test("[parseUrl] 解析特殊url", () => {
    expect(parseUrl('http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled')).toEqual({
        user: 'anonymous',
        id: [ 123, 456 ], // 重复出现的 key 要组装成数组，能被转成数字的就转成数字类型
        city: '北京',     // 中文需解码
        enabled: true
    });
  });

  test("[parseUrl] url带#", () => {
    expect(parseUrl('https://shanyue.tech?name=%E5%B1%B1%E6%9C%88&a=3#hash')).toEqual( {name: '山月', a: 3});
  });

