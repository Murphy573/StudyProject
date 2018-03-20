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
