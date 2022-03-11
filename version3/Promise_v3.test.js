const Promise  = require('./Promise_v3.js')

describe('v3', () => {
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
})

