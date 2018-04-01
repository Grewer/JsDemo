var resolve = function (msg) {
    this.status = 'resolve';
    this.value = msg;
    for (var i = 0, l = this.todoList.length; i < l; i++) {
        this.todoList[i].call(this, msg)
    }
}

var reject = function (msg) {
    this.status = 'reject';
    this.value = msg;
    for (var i = 0, l = this.failList.length; i < l; i++) {
        this.failList[i].call(this, msg)
    }
}

Promise = function (cb) {
    this.status = 'pending';
    this.value = undefined;
    this.todoList = [];
    this.failList = [];
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
        this.todoList.push(resolve)
        return this
    },
    catch: function (reject) {
        this.failList.push(reject)
    }
}

// if(!window.Promise){
//    window.Promise = Promise
// }