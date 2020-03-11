const PENDING = 'PENDING'
const RESOLVED = 'RESOLVED'
const REJECTED = 'REJECTED'
class Promise {
    constructor(excutor) {
        this.status = PENDING;
        this.reason = null;
        this.value = null;

        this.onFulfilledCallbacks = []
        this.onRejectedCallbacks = []

        const resolved = value => {
            if(this.status === PENDING) {
                this.value = value;
                this.status = RESOLVED;
                this.onFulfilledCallbacks.forEach(fn => fn())
            }
        }

        const rejected = reason => {
            if (this.status === PENDING) {
                this.reason = reason;
                this.status = REJECTED;
                this.onRejectedCallbacks.forEach(fn => fn())
            }
        }

        excutor(resolved, rejected);
    }

    then(onFullfilled, onRejected) {
        onFullfilled = typeof onFullfilled === 'function' ? onFullfilled : v => v;
        onRejected = typeof onRejected === 'function' ? onRejected : e => { throw e }
        return new Promise((resolve, reject) => {
            if (this.status === RESOLVED) {
                try {
                    const x = onFullfilled(this.value)
                    resolve(x)
                } catch (e) {
                    reject(e)
                }
            }

            if (this.status === REJECTED) {
                try {
                    const x = onRejected(this.reason)
                    resolve(x)
                } catch (e) {
                    reject(e)
                }
            }

            if (this.status === PENDING) {
                this.onFulfilledCallbacks.push(() => {
                    try {
                        const x = onFullfilled(this.value)
                        resolve(x)
                    } catch (e) {
                        reject(e)
                    }
                })
                this.onRejectedCallbacks.push(() => {
                    try {
                        const x = onRejected(this.reason)
                        resolve(x)
                    } catch (e) {
                        reject(e)
                    }
                })
            }

        })
    }
}

module.exports = Promise;