

console.log(1);
var date = new Date().getTime();
setTimeout(function(){
    console.log('timeout1')
    console.log('timeout1--' + (new Date().getTime() - date))
    setTimeout(function(){
        console.log('timeout-inner--')
        console.log('timeout-inner--' + (new Date().getTime() - date))
    }, 1000)
},3000);
console.log(2);
setTimeout(function(){
    console.log('timeout2')
    console.log('timeout2--' + (new Date().getTime() - date))
},4000);
console.log(3);