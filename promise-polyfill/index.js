window.Promise = function (cb) {
    this.status = 'pending'
}

Promise.resolve = function (msg) {
    return new Promise(function(resolve, reject){
        resolve(msg)
    });
}

Promise.reject = function () {

}

Promise.prototype = {
    constructor:Promise,
    then:function (resolve) {
        resolve('foo')
    },
    catch:function(reject){
        reject('bar')
    }
}