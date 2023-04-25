function throttle(func, wait) {
    let lastTime = 0;
    let timer = null;

    return function () {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }

        let self = this;
        let args = arguments;
        let nowTime = +new Date();

        const remainWaitTime = wait - (nowTime - lastTime);

        if (remainWaitTime <= 0) {
            lastTime = nowTime;
            func.apply(self, args);
        } else {
            timer = setTimeout(function () {
                lastTime = +new Date();
                func.apply(self, args);
                timer = null;
            }, remainWaitTime);
        }
    };
}

module.exports = throttle;
