var resolve = function (msg) {
    if (this.status !== 'reject') {
        this.status = 'resolve';
        this.value = msg;
    }
    var run = function () {
        for (var i = 0, l = this.todoList.length; i < l; i++) {
            if (i !== 0) msg = undefined;
            this.todoList[i](msg)
        }
    }
    setTimeout(run.bind(this), 0)
}

var reject = function (msg) {
    this.status = 'reject';
    this.value = msg;
    setTimeout(function () {
        if (!this.fail) {
            throw new Error('Uncaught (in promise)' + msg)
        }
        this.fail(msg)
        if (this.hasThen) {
            this.todoList.shift()
        }
        resolve.call(this)
    }.bind(this), 0)

}

Promise = function (cb) {
    this.status = 'pending';
    this.value = undefined;
    this.todoList = [];
    this.fail = null
    this.hasThen = false
    cb(resolve.bind(this), reject.bind(this));
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
            if (this.todoList.length !== 0) {
                this.hasThen = true
            }
        }
        return this
    }
}
Promise.resolve = function (msg) {
    return new Promise(function (resolve, reject) {
        resolve(msg)
    });
}

Promise.reject = function (msg) {
    return new Promise(function (resolve, reject) {
        reject(msg)
    });
}

Promise.all = function (arr) {
    var result = [], max = arr.length, count = 0
    return new Promise(function (resolve, reject) {
        if (arr instanceof Array) {
            for (var i = 0, l = arr.length; i < l; i++) {
                if (arr[i] instanceof Promise) {
                    arr[i].then((function (i) {
                        return function (data) {
                            count++
                            result[i] = data
                            if (count === max) {
                                resolve(result)
                            }
                        }
                    }).call(this, i)).catch(function (data) {
                        reject(data)
                    })
                } else {
                    count++
                    result[i] = arr[i]
                    if (count === max) {
                        resolve(result)
                    }
                }
            }
        } else {
            reject('error')
        }
    })

}

// if(!window.Promise){
//    window.Promise = Promise
// }