const STATE = {
    pending: 'pending',
    fulfilled: 'fulfilled',
    rejected: 'rejected',
}
function Promise(executor) {
    // A promise must be in one of three states: pending, fulfilled, or rejected.
    this.state = STATE.pending
    this.value= null
    this.reason = null

    this.onFulfilledFunc = Function.prototype
    this.onRejectedFunc = Function.prototype

    const resolve = (value) => {
        if (this.state === STATE.pending) {
            this.state = STATE.fulfilled
            this.value = value
            this.onFulfilledFunc(this.value)
        }
    }

    const reject = (reason) => {
        if (this.state === STATE.pending) {
            this.state = STATE.rejected
            this.reason = reason
            this.onRejectedFunc(this.reason)
        }
    }

    executor(resolve, reject)
}

// A promise must provide a then method to access its current or eventual value or reason
Promise.prototype.then = function(onFulfilled, onRejected){
    if (this.state === STATE.fulfilled) {
        onFulfilled(this.value)
    } else if (this.state === STATE.rejected) {
        onRejected(this.reason)
    } else {
        // 当执行then方法时发现 state还处于pending状态，则把onFulfilled 和 onRejected 两个方法存起来
        //
        this.onFulfilledFunc = onFulfilled
        this.onRejectedFunc = onRejected
    }
}

module.exports = Promise
