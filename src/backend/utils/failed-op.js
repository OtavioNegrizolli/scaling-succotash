export class FailedOp {
    /** @type {string|{[field:string]:string}} */
    errors;
    /** @param {string|{[key:string]:string}} errors */
    constructor(errors) {
        this.errors = errors;
    }
}
