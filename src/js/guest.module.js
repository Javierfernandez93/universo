import { Http } from './http.module.js?v=2.3.8';

class Guest extends Http {
    constructor() {
        super();
    }
    getInvoiceByTx(data, callback) {
        return this.call('../../app/application/getInvoiceByTx.php', data, callback);
    }
    getConfigVarsStats(data, callback) {
        return this.call('../../app/application/getConfigVarsStats.php', data, callback);
    }
}

export { Guest }