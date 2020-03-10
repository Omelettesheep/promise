const PENDING = 'PENDING'
const RESOLVED = 'RESOLVED'
const REJECTED = 'REJECTED'
class Promise {
    constructor(excutor) {
        const resolved = value => {
            this.value = value;
            this.status = RESOLVED;
        }

        const rejected = reason => {
            this.reason = reason;
            this.status = REJECTED;
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
    }
}

module.exports = Promise;