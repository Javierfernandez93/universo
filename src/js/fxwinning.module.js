import { Http } from './http.module.js';

const PATH = getMainPath()

class Fxwinning extends Http {
    constructor() {
        super();
    }
    uploadImageSign(data, progress, callback) {
        return this.callFile(PATH+'/app/application/uploadImageSign.php', data, callback, progress);
    }
    uploadImageSignAsString(data, callback) {
        return this.call(PATH+'/app/application/uploadImageSignAsString.php', data, callback, null, null, 'POST');
    }
    makeFxWinninDocument(data,callback) {
        return this.call(PATH+'/app/application/autoMakeFxWinninDocument.php', data, callback);
    }
    makeAofDocument(data,callback) {
        return this.call(PATH+'/app/application/makeAofDocument.php', data, callback);
    }
    getSponsorFxWinning(data,callback) {
        return this.call(PATH+'/app/application/getSponsorFxWinning.php', data, callback);
    }
    generateLinkForSignature(data, callback) {
        return this.call('../../app/application/generateLinkForSignature.php', data, callback);
    }
    getUserSignature(data, callback) {
        return this.call('../../app/application/getUserSignature.php', data, callback);
    }
    getRemotePelSignIdByCode(data, callback) {
        return this.call('../../app/application/getRemotePelSignIdByCode.php', data, callback);
    }
    saveSignatureInAccount(data, callback) {
        return this.call('../../app/application/saveSignatureInAccount.php', data, callback);
    }
    sendPelForEmail(data, callback) {
        return this.call('../../app/application/sendPelForEmail.php', data, callback);
    }
    sendAofForEmail(data, callback) {
        return this.call('../../app/application/sendAofForEmail.php', data, callback);
    }
}

export { Fxwinning }