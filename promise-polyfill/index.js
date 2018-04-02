var resolve = function (msg) {
    if (this.status === 'pending') {
        this.status = 'resolve';
        this.value = msg;
    }
    for (var i = 0, l = this.todoList.length; i < l; i++) {
        if (i !== 0) msg = undefined
        this.todoList[i].call(this, msg)
    }
}

var reject = function (msg) {
    this.status = 'reject';
    this.value = msg;
    if (!this.fail) {
        throw new Error('Uncaught (in promise)' + msg)
    }
    this.fail(msg)
    resolve.call(this)
}

Promise = function (cb) {
    this.status = 'pending';
    this.value = undefined;
    this.todoList = [];
    this.fail = null
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
        if (!this.fail) {
            this.fail = reject
        }
        return this
    }
}

// if(!window.Promise){
//    window.Promise = Promise
// }