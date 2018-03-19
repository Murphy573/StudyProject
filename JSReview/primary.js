
{
    !function Loop() {
        let _i = 0, str = '';

        while (_i < 7){
            str += '#';
            console.log(str);
            _i++;
        }
    }();
}

{
    !function fizzBuzz() {
        let i = 1;

        while (i < 100){
            if(i % 3 === 0) {
                if(i % 5 === 0) {
                    console.log('FizzBuzz');
                }
                else {
                    console.log('Fizz');
                }
                i++;
                continue;
            }

            if(i % 5 === 0 ) {
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
        return function() {
            return f.apply(null, arguments);
        }
    }

    function con(...args) {
        console.log(...args);
    }

    transferArgs(con)(1,2,3,4,5);
}

{
    function myBind(...args) {
        console.log(args);
    }

    let new_func = myBind.bind(null, 1, 2,3,4);
    new_func();
}
