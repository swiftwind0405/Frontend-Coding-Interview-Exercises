const handleValue = value => {
    // 没有value的时候返回true
    if (!value) {
        return true;
    }

    // 能被转成数字的就转成数字类型
    if (!Number.isNaN(Number(value))) {
        return Number(value);
    }

    return value;
};

function parseUrl(url) {
    // 中文需解码
    url = decodeURI(url);
    let params = url.split('?')[1];
    if (params) {
        params = params.split('#')[0];
    }

    const queryString = {};

    if (!params) {
        return queryString;
    }

    const group = params.split('&');
    group.forEach(item => {
        const [key, value] = item.split('=');
        const existValue = queryString[key];
        const _value = handleValue(value);
        if (existValue !== undefined) {
            // 重复出现的 key 要组装成数组
            queryString[key] = Array.isArray(_value)
                ? [...existValue, _value]
                : [existValue, _value];
        } else {
            queryString[key] = _value;
        }
    });
    return queryString;
}

module.exports = parseUrl;
