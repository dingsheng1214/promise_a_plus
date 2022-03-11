const Promise  = require('./Promise_v2.js')

test('promise_v2_test1', () => {
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

test('promise_v2_test2', (done) => {
    let result = 'init'
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('data')
        }, 2000)
    })

    promise.then(val => {
        console.log(val)
        result = val
    }, err => {
        console.log(err)
    })
    setTimeout(() => {
        expect(result).toEqual('data')
        done()
    }, 3000)
})

test('promise_v2_test3', (done) => {
    let result
    const promise = new Promise((resolve, reject) => {
        resolve('data')
    })
    promise.then(val => {
        result = val
    })
    result = 1

    // 预期是 先执行 reslut = 1 然后再执行 result = val, 事实却相反
    expect(result).toEqual('data')
})
