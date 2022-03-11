const Promise  = require('./Promise_v4.js')

describe('v4', () => {
    test('test1', () => {
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

    test('test2', (done) => {
        let result = 'init'
        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('data')
            }, 2000)
        })

        promise.then(val => {
            result = val
        }, err => {
            console.log(err)
        })
        setTimeout(() => {
            expect(result).toEqual('data')
            done()
        }, 3000)
    })

    test('test3', (done) => {
        const log = jest.fn();
        const promise = new Promise((resolve, reject) => {
            resolve('data')
        })
        promise.then(val => {
            log('第二次调用')
            result = val
            expect(log).toHaveBeenCalledTimes(2)
            done()
        })
        log('第一次调用')
        expect(log).toHaveBeenCalledTimes(1)
    })

    // 多个 then
    test('test4', (done) => {
        const log = jest.fn();
        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('data')
            }, 2000)
        })
        promise.then(val => {
            log(`1: ${val}`)
        })
        promise.then(val => {
            log(`2: ${val}`)
            // 预期执行两次 其实只执行了一次，第二次把第一次的onFulfilled给覆盖了
            expect(log).toHaveBeenCalledTimes(2)
            done()
        })
    })
})

