## Promise polyfill


**实现情况:**

1. ```js
     var P = new Promise((resolve,reject)=>{
            setTimeout(()=>{
            resolve('this is a msg!')
        },1000)
        })
    
        P.then(data=>{
            console.log('1:'+data)
        }).then(data=>{
            console.log('2:'+data)
        })
    ```
2. ```js
    var P = new Promise((resolve,reject)=>{
            setTimeout(()=>{
            reject('this is a msg!')
        },1000)
        })
    
        P.catch(data=>{
            console.log('1:'+data)
        }).catch(data=>{
            console.log('2:'+data)
        })
    ```
3. ```js
    var P = new Promise((resolve,reject)=>{
            setTimeout(()=>{
            reject('this is a msg!')
        },1000)
        })
    
        P.catch(data=>{
            console.log('1:'+data)
        }).then(data=>{
            console.log('2:'+data)
        })
    ```
4. ```js
    var P = new Promise((resolve,reject)=>{
            setTimeout(()=>{
            resolve('this is a msg!')
        },1000)
        })
    
        P.then(data=>{
            console.log('1:'+data)
        }).catch(data=>{
            console.log('2:'+data)
        }).then(data=>{
            console.log('3:'+data)
        })
    ```
5. ```js
    var P = new Promise((resolve,reject)=>{
            setTimeout(()=>{
            reject('this is a msg!')
        },1000)
        })
    
        P.then(data=>{
            console.log('1:'+data)
        }).catch(data=>{
            console.log('2:'+data)
        }).then(data=>{
            console.log('3:'+data)
        })
    ```
6. ```js
    var promise1 = Promise.resolve(3);
        var promise2 = 42;
        var promise3 = new Promise(function (resolve, reject) {
            setTimeout(resolve, 2000, 'foo');
        });
        var promise4 = new Promise(function (resolve, reject) {
            setTimeout(resolve, 1000, 'foo2');
        });
        Promise.all([promise1, promise2, promise3, promise4]).then(function (values) {
            console.log('run finished:',values);
        }).catch(function (val) {
            console.log(val)
        })
    ```