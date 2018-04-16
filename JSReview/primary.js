{
    !function Loop() {
        let _i = 0, str = '';

        while (_i < 7) {
            str += '#';
            console.log(str);
            _i++;
        }
    }();
}

{
    !function fizzBuzz() {
        let i = 1;

        while (i < 100) {
            if (i % 3 === 0) {
                if (i % 5 === 0) {
                    console.log('FizzBuzz');
                }
                else {
                    console.log('Fizz');
                }
                i++;
                continue;
            }

            if (i % 5 === 0) {
                console.log('Buzz');
                i++;
                continue;
            }
            console.log(i);
            i++;
        }
    }();
}

{
    function transferArgs(f) {
        return function () {
            return f.apply(null, arguments);
        }
    }

    function con(...args) {
        console.log(...args);
    }

    transferArgs(con)(1, 2, 3, 4, 5);
}

{
    function myBind(...args) {
        console.log(args);
    }

    let new_func = myBind.bind(null, 1, 2, 3, 4);
    new_func();
}

{
    // 定义数字0:
    let zero = function (f) {
        return function (x) {
            return x;
        }
    };

    // 定义数字1:
    let one = function (f) {
        return function (x) {
            return f(x);
        }
    };

    // 定义加法:
    function add(n, m) {
        return function (f) {
            return function (x) {
                return m(f)(n(f)(x));
            }
        }
    }

    // 计算数字2 = 1 + 1:
    let two = add(one, one);

    // 计算数字3 = 1 + 2:
    let three = add(one, two);

    // 计算数字5 = 2 + 3:
    let five = add(two, three);

    // 你说它是3就是3，你说它是5就是5，你怎么证明？

    // 呵呵，看这里:

    // 给3传一个函数,会打印3次:

    let dd = three(function () {
        console.log(`打印三次---${Math.random()}`);
    });

    dd();

}


{

    class A {
        constructor() {
            console.log(new.target.name);
            this.a = 2;
        }
    }

    class B extends A {
        constructor() {
            super();
            this.b = 3;
        }

        add() {

        }
    }

    new B();
}


//挑选出数组中重复的元素
{
    let arr = [1, 6, 8, 3, 7, 9, 2, 7, 2, 4, 4, 3, 3, 1, 5, 3];

    function filterMuti() {
        let _result = [], _cur = [];
        arr.forEach((v, i) => {
            if (_cur.indexOf(v) === -1) {
                _cur.push(v)
            }
            else {
                _result.indexOf(v) === -1 ? _result.push(v) : null;
            }
        });

        return _result
    }

    console.log(filterMuti().sort((a, b) => a - b));
}

{
    //作用域链：
    var a = 10;

    function fn() {
        var b = 20;

        function bar() {
            console.log(a + b);
        }

        return bar;
    }

    var x = fn(), b = 200;
    x();
}
{
    let twoSum = function (nums, target) {
        if (!Array.isArray(nums)) return;
        let _result = [];
        nums.forEach((v, i) => {
            for (let _i = i + 1, len = nums.length; _i < len; _i++) {
                if (v + nums[_i] === target) {
                    _result = _result.concat(v, nums[_i]);
                    break;
                }
            }
        });
        return _result;
    };

    console.log(twoSum([3, 2, 4], 6))
}

{
    function quickSort(arr) {
        if (arr.length < 1) {
            return arr;
        }

        let _midLen = Math.floor(arr.length / 2);
        let _midNum = arr.splice(_midLen, 1);
        let _left = [], _right = [];

        for (let i = 0, len = arr.length; i < len; i++) {
            if (arr[i] < _midNum) {
                _left.push(arr[i]);
            }
            else {
                _right.push(arr[i]);
            }
        }

        return quickSort(_left).concat(_midNum, quickSort(_right));
    }

    let _d = new Date().getTime();
    console.log(quickSort([3, 1, 4, 2, 5, 21, 6, 15, 63,66,77,88,99,23,44]));
    console.log('quicksort所用时间', new Date().valueOf() - _d);


    function realQuickSort(arr) {
        //交换
        function swap(arr, a, b) {
            let temp = arr[a];
            arr[a] = arr[b];
            arr[b] = temp;
        }

        function partition(arr, leftIndex, rightIndex) {
            /**
             * 开始时不知最终pivot的存放位置，可以先将pivot交换到后面去
             * 这里直接定义最右边的元素为基准
             */
            let pivot = arr[rightIndex];
            /**
             * 存放小于pivot的元素时，是紧挨着上一元素的，否则空隙里存放的可能是大于pivot的元素，
             * 故声明一个storeIndex变量，并初始化为left来依次紧挨着存放小于pivot的元素。
             */
            let storeIndex = leftIndex;
            for (let i = leftIndex; i < rightIndex; i++) {
                if (arr[i] < pivot) {
                    /**
                     * 遍历数组，找到小于的pivot的元素，（大于pivot的元素会跳过）
                     * 将循环i次时得到的元素，通过swap交换放到storeIndex处，
                     * 并对storeIndex递增1，表示下一个可能要交换的位置
                     */
                    swap(arr, storeIndex, i);
                    storeIndex++;
                }
            }
            // 最后： 将pivot交换到storeIndex处，基准元素放置到最终正确位置上
            swap(arr, rightIndex, storeIndex);
            return storeIndex;
        }

        function sort(arr, leftIndex, rightIndex) {
            if(leftIndex > rightIndex) return;
            let storeIndex = partition(arr, leftIndex, rightIndex)
            sort(arr, leftIndex, storeIndex -1);
            sort(arr, storeIndex + 1, rightIndex);
        }

        sort(arr, 0, arr.length - 1);
        return arr;
    }
    let _dd = new Date().getTime();
    console.log(realQuickSort([3, 1, 4, 2, 5, 21, 6, 15, 63,66,77,88,99,23,44]));
    console.log('realQuickSort所用时间', new Date().valueOf() - _dd);


}
{
    //函数在定义的时候（不是调用的时候），就已经确定了函数体内部自由变量的作用域
    //作用域中变量的值是在执行过程中产生的确定的，而作用域却是在函数创建时就确定了
    //如果要查找一个作用域下某个变量的值，就需要找到这个作用域对应的执行上下文环境，再在其中寻找变量的值
    //作用域只是一个“地盘”，一个抽象的概念，其中没有变量。要通过作用域对应的执行上下文环境来获取变量的值
    /**
     * 我们拿文字总结一下取自由变量时的这个“作用域链”过程：（假设a是自由量）
        第一步，现在当前作用域查找a，如果有则获取并结束。如果没有则继续；
        第二步，如果当前作用域是全局作用域，则证明a未定义，结束；否则继续；
        第三步，（不是全局作用域，那就是函数作用域）将创建该函数的作用域作为当前作用域；

     第四步，跳转到第一步。
     */
    var a = 10;
    function fn() {
        console.log(a);
    }

    function bar(f) {
        var a = 20;
        f();
    }
    bar(fn);
}

{
    setTimeout(() => {
        //函数去抖
        let _div = document.querySelector('.mousemove');

        _div.addEventListener('mousemove', Common._throttle((e) => {
            console.log(e.clientX);
        }, 500))
    });

}