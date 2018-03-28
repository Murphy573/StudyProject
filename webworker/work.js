var i = 0;

function timedCount() {
    i = i + 1;
    postMessage(i);
    setTimeout(timedCount, 500);
}

self.onmessage = function (e) {
    debugger;
    i = e.data;
    timedCount();
};
debugger;
console.log(self);

