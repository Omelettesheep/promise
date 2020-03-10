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
        if (this.status === RESOLVED) {
            onFullfilled(this.value);
        }

        if (this.status === REJECTED) {
            onRejected(this.reason);
        }

        if(this.status === PENDING) {
            this.onFulfilledCallbacks.push(() => onFullfilled(this.value))
            this.onRejectedCallbacks.push(() => onRejected(this.reason))
        }
    }
}

module.exports = Promise;