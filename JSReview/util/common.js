const Common = {
    _debounce(callback, delay) {
        let _timeout;

        return function() {
            let ctx = this, args = arguments;
            clearTimeout(_timeout);
            _timeout = setTimeout(() => {
                callback.apply(ctx, Array.prototype.slice.call(args));
            }, delay);
        }
    },
    /**
     * 函数去抖：当调用动作n毫秒后，才会执行该动作，若在这n毫秒内又调用此动作则将重新计算执行时间
     * @param callback function 回调
     * @param delay number延迟时间
     * @param immediate boolean 第一次触发是否立即执行
     * @returns {Function}
     */
    debounce(callback, delay, immediate) {
        //immediate
        let _timeout, args, context, timestamp, result;

        const _later = function() {
            let _last = new Date().getTime() - timestamp;

            if(_last < delay && _last > 0) {
                _timeout = setTimeout(_later, delay - _last);
            }
            else {
                _timeout = null;
                if(!immediate) {
                    result = callback.apply(context, args);
                    if (!_timeout) {
                        context = args = null;
                    }
                }
            }
        };

        return function() {
            //是否立即执行
            let _isCallNow = immediate && !_timeout;
            context = this;
            args = arguments;
            timestamp = new Date().getTime();

            if(!_timeout) {
                _timeout = setTimeout(_later, delay)
            }

            if(_isCallNow) {
                result = callback.apply(context, args);
                context = args = null;
            }

            return result;
        }
    },
    _throttle(callback, delay) {
        let _last = 0;
        return function() {

            let _cur = new Date().valueOf();
            if(_cur - _last > delay) {
                callback.apply(this, arguments);
                _last = _cur;
            }
        }
    }
};