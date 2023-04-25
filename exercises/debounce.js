function debounce(func, wait) {
    let timer = null;

    return function () {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }

        let self = this;
        let args = arguments;

        timer = setTimeout(function () {
            func.apply(self, args);
            timer = null;
        }, wait);
    };
}

module.exports = debounce;
