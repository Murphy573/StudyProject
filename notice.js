(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define([''], factory);
    }
    else if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory();
    }
    else {
        global.Notice = factory();
    }
})(window, function () {

    const setNotices = Symbol('setNotices'),
    generateRandomString = Symbol('generateRandomString'),
    generateNoticeDom = Symbol('generateNoticeDom'),
    setStyle = Symbol('setStyle'),
    pullNotice = Symbol('pullNotice'),
    setDisplacement = Symbol('setDisplacement'),
    isOverContainer = Symbol('isOverContainer'),
    canDisplayNext = Symbol('canDisplayNext'),
    appendContainer = Symbol('appendContainer'),
    interval = Symbol('interval'),
    next = Symbol('next'),
    NOTICE_FLAG = 'notice';


    const DEFAULT_CONFIG = {
        speed: 40,
        notices: [],
        container: null
    };

    class Notice {
        constructor(option = {}) {
            if (!option.container || !(option.container instanceof HTMLElement)) {
                throw 'container ==> 缺少dom容器对象';
            }
            let _option = Object.assign(DEFAULT_CONFIG, option);
            this.container = _option.container;
            this.speed = _option.speed;
            this[setNotices](_option);
            this[interval] = null;
        }

        [setNotices](option) {//设置公告数据
            if (!Array.isArray(option.notices) || option.notices.length === 0) {
                this.notices = [];
                throw 'notices ==> 必须为数组且有数据';
            }
            this.notices = option.notices.map((v) => {
                return {
                    id: this[generateRandomString](),
                    content: v
                };
            })
        }

        appendNotice(notice) {//追加公告
            let _notice = {
                content: notice,
                id: this[generateRandomString]()
            };
            this.notices.push(_notice);
        }

        [generateRandomString]() {//获取随机字符串
            return Math.random().toString(16).substring(2);
        }

        [generateNoticeDom](notice) {//生成公告dom
            let _dom = document.createElement('div');
            _dom.innerText = notice.content;
            _dom.classList.add(NOTICE_FLAG);
            this[setStyle](_dom);
            _dom.setAttribute('id', notice.id);
            return _dom;
        }

        [setStyle](dom) {//设置样式
            dom.style.cssText = 'position:absolute;\n' +
            '            left: 100%;\n' +
            '            top:0;\n' +
            '            white-space: nowrap;\n' +
            '            background:#f60;';
        }

        [pullNotice]() {//抓取下一个数据
            let _nt = this.notices.shift();
            this.notices.push(_nt);
            return _nt;
        }

        [setDisplacement](_dom) {//设置位移
            let _last = _dom.style.transform;
            if (!_last) {
                _dom.style.transform = 'translate3d(-1px, 0, 0)';
            }
            else {
                let _v = _last.substring(_last.indexOf('(') + 1, _last.indexOf(')'));
                let _curV = _v.match(/\d+/g);
                _dom.style.transform = 'translate3d(' + (-Number(_curV[0]) - 2) + 'px, 0, 0)';
            }

            if (this[isOverContainer](_dom)) {
                this.container.removeChild(_dom);
            }
        }

        [isOverContainer](_dom) {//是否完全超出屏幕
            let _rect = _dom.getClientRects()[0];
            return (_rect.left + _rect.width) <= 0
        }

        [appendContainer](child) {//添加到容器末端
            this.container.appendChild(child)
        }

        [canDisplayNext](_lastDom) {//是否可以添加下一个dom
            if (!_lastDom) {
                this[next]();
                return;
            }
            let _domRect = _lastDom.getClientRects()[0];
            let _ContainerRec = this.container.getClientRects()[0];

            if ((_domRect.left + _domRect.width) < (_ContainerRec.right + 10)) {
                this[next]();
            }
        }

        [next]() {//添加下一个dom
            let _next = this[pullNotice]();
            let _nextDom = this[generateNoticeDom](_next);
            this[appendContainer](_nextDom);
        }

        start() {
            if (this[interval]) {
                return;
            }
            this[interval] = setInterval(() => {
                //let _dom = Array.from(this.container.querySelectorAll('.' + NOTICE_FLAG));
                let _dom = [...this.container.querySelectorAll('.' + NOTICE_FLAG)];

                _dom.every((dom) => {
                    this[setDisplacement](dom);
                    return true;
                });

                setTimeout(() => {
                    this[canDisplayNext](_dom[_dom.length - 1]);
                }, 0)
            }, this.speed);
        }

        stop() {
            clearInterval(this[interval]);
            if (this[interval]) {
                this[interval] = null;
            }
        }
    }


    return Notice;
});