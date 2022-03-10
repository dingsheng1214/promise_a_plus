const Promise  = require('./Promise_v1.js')

test('promise_v1_test1', () => {
    const promise = new Promise((resolve, reject) => {
        resolve('data')
        reject('error')
    })
    promise.then(val => {
        expect(val).toEqual('data')
    }, err => {
        console.log(err)
    })
})

test('promise_v1_test2', (done) => {
    let result = 'init'
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('data')
        }, 2000)
    })

    promise.then(val => {
        // 正常情况下 会在2s后输出 data，但确并未输出，而且都不会执行这段代码
        // 因为 v1 版本的then 都是同步代码，当进入then时，state还处于 pending状态, 所以 onFulfilled 和 onRejected 两个函数都不会执行
        console.log(val)
        result = val
    }, err => {
        console.log(err)
    })
    setTimeout(() => {
        expect(result).toEqual('data')
        done()
    })
})
