import { Http } from './http.module.js?v=2.3.7';

class Guest extends Http {
    constructor() {
        super();
    }
    getInvoiceByTx(data, callback) {
        return this.call('../../app/application/getInvoiceByTx.php', data, callback);
    }
}

export { Guest }