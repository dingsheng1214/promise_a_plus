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

    const resolve = (value) => {
        if (this.state === STATE.pending) {
            this.state = STATE.fulfilled
            this.value = value
        }
    }

    const reject = (reason) => {
        if (this.state === STATE.pending) {
            this.state = STATE.rejected
            this.reason = reason
        }
    }

    executor(resolve, reject)
}

// A promise must provide a then method to access its current or eventual value or reason
Promise.prototype.then = function(onFulfilled, onRejected){
    if (this.state === STATE.fulfilled) {
        onFulfilled(this.value)
    }
    if (this.state === STATE.rejected) {
        onRejected(this.reason)
    }
}

module.exports = Promise
