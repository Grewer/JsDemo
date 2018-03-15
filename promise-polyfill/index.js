var resolve = function (msg) {
    this.status = 'resolve';
    this.value = msg;
}

var reject = function (msg) {
    this.status = 'reject';
    this.value = msg;
}

Promise = function (cb) {
    this.status = 'pending';
    this.value = undefined;
    cb(resolve.bind(this), reject.bind(this));
}

Promise.resolve = function (msg) {
    return new Promise(function (resolve, reject) {
        resolve(msg)
    });
}

Promise.reject = function () {

}

Promise.prototype = {
    constructor: Promise,
    then: function (resolve) {
        resolve('foo')
    },
    catch: function (reject) {
        reject('bar')
    }
}