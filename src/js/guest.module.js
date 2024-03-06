import { Http } from './http.module.js?v=2.5.0';

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
    getTopCountries(data, callback) {
        return this.call('../../app/application/getTopCountries.php', data, callback);
    }
}

export { Guest }