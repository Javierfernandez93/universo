import { Http } from '../../src/js/http.module.js?v=1.4.6';

class User extends Http {
    constructor() {
        super();
    }
    doLogin(data, callback) {
        return this.call('../../app/application/do_login.php', data, callback);
    }
    signExmaAccount(data, callback) {
        return this.call('../../app/application/signExmaAccount.php', data, callback);
    }
    getBackofficeVars(data, callback) {
        return this.call('../../app/application/get_backoffice_vars.php', data, callback);
    }
    getVarsConfiguration(data, callback) {
        return this.call('../../app/application/getVarsConfiguration.php', data, callback);
    }
    getNotifications(data, callback) {
        return this.call('../../app/application/get_notifications.php', data, callback);
    }
    getBalance(data, callback) {
        return this.call('../../app/application/get_balance.php', data, callback);
    }
    createTransactionRequirement(data, callback) {
        return this.call('../../app/application/create_transaction_requirement.php', data, callback);
    }
    getZuumTools(data, callback) {
        return this.call('../../app/application/getZuumTools.php', data, callback);
    }
    signupChecker(data, callback) {
        return this.call('../../app/application/signupChecker.php', data, callback);
    }
    getTestStatus(data, callback) {
        return this.call('../../app/application/getTestStatus.php', data, callback);
    }
    getPidForExternalTool(data, callback) {
        return this.call('../../app/application/getPidForExternalTool.php', data, callback);
    }
    signupExternal(data, callback) {
        return this.call('../../app/application/signupExternal.php', data, callback);
    }
    getLastTransactionsRequirement(data, callback) {
        return this.call('../../app/application/get_last_transactions_requirement.php', data, callback);
    }
    getPayPalPaymentStatus(data, callback) {
        return this.call('../../app/application/getPayPalPaymentStatus.php', data, callback);
    }
    getCurrencies(data, callback) {
        return this.call('../../app/application/get_currencies.php', data, callback);
    }
    doWithdraw(data, callback) {
        return this.call('../../app/application/do_withdraw.php', data, callback);
    }
    editWithdrawMethod(data, callback) {
        return this.call('../../app/application/edit_withdraw_method.php', data, callback);
    }
    getWithdraws(data, callback) {
        return this.call('../../app/application/get_withdraws.php', data, callback);
    }
    getPlans(data, callback) {
        return this.call('../../app/application/get_plans.php', data, callback);
    }
    editProfile(data, callback) {
        return this.call('../../app/application/edit_profile.php', data, callback);
    }
    getCountries(data, callback) {
        return this.call('../../app/application/get_countries.php', data, callback);
    }
    getIpInfo(data, callback) {
        return this.call('https://ipinfo.io/?token=f1d59709f7dad4', data, callback);
    }
    enrollInCourse(data, callback) {
        return this.call('../../app/application/enrollInCourse.php', data, callback);
    }
    getCountryData(data, callback) {
        return this.call('../../app/application/getCountryData.php', data, callback);
    }
    getAdvices(data, callback) {
        return this.call('../../app/application/getAdvices.php', data, callback);
    }
    changePassword(data, callback) {
        return this.call('../../app/application/changePassword.php', data, callback);
    }
    changePasswordWithoutLogin(data, callback) {
        return this.call('../../app/application/changePasswordWithoutLogin.php', data, callback);
    }
    addExmaAccount(data, callback) {
        return this.call('../../app/application/addExmaAccount.php', data, callback);
    }
    recoverPassword(data, callback) {
        return this.call('../../app/application/recover_password.php', data, callback);
    }
    getToolsList(data, callback) {
        return this.call('../../app/application/getToolsList.php', data, callback);
    }
    getCoursesList(data, callback) {
        return this.call('../../app/application/getCoursesList.php', data, callback);
    }
    getCourse(data, callback) {
        return this.call('../../app/application/getCourse.php', data, callback);
    }
    setSessionAsTaked(data, callback) {
        return this.call('../../app/application/setSessionAsTaked.php', data, callback);
    }
    getSessionPerCourse(data, callback) {
        return this.call('../../app/application/getSessionPerCourse.php', data, callback);
    }
    getSessionsCourse(data, callback) {
        return this.call('../../app/application/getSessionsCourse.php', data, callback);
    }
    getAuthToChangePassword(data, callback) {
        return this.call('../../app/application/get_auth_to_change_password.php', data, callback);
    }
    getLandings(data, callback) {
        return this.call('../../app/application/getLandings.php', data, callback);
    }
    saveLanding(data, callback) {
        return this.call('../../app/application/saveLanding.php', data, callback);
    }
    doSignup(data, callback) {
        return this.call('../../app/application/do_signup.php', data, callback);
    }
    getProfile(data, callback) {
        return this.call('../../app/application/get_profile.php', data, callback);
    }
    getLastReferrals(data, callback) {
        return this.call('../../app/application/get_last_referrals.php', data, callback);
    }
    getReferrals(data, callback) {
        return this.call('../../app/application/get_referrals.php', data, callback);
    }
    getCatalogBanners(data, callback) {
        return this.call('../../app/application/getCatalogBanners.php', data, callback);
    }
    getReferral(data, callback) {
        return this.call('../../app/application/get_referral.php', data, callback);
    }
    getProfits(data, callback) {
        return this.call('../../app/application/get_profits.php', data, callback);
    }
    getProfitStats(data, callback) {
        return this.call('../../app/application/get_profit_stats.php', data, callback);
    }
    getNoticesList(data, callback) {
        return this.call('../../app/application/get_notices_list.php', data, callback);
    }
    getLastNoticesShort(data, callback) {
        return this.call('../../app/application/getLastNoticesShort.php', data, callback);
    }
    getCampaigns(data, callback) {
        return this.call('../../app/application/getCampaigns.php', data, callback);
    }
    getCampaign(data, callback) {
        return this.call('../../app/application/getCampaign.php', data, callback);
    }
    saveCampaign(data, callback) {
        return this.call('../../app/application/saveCampaign.php', data, callback, null, null, 'POST');
    }
    publishCampaign(data, callback) {
        return this.call('../../app/application/publishCampaign.php', data, callback);
    }
    unPublishCampaign(data, callback) {
        return this.call('../../app/application/unPublishCampaign.php', data, callback);
    }
    deleteCampaign(data, callback) {
        return this.call('../../app/application/deleteCampaign.php', data, callback);
    }
    saveBannerPerCampaign(data, callback) {
        return this.call('../../app/application/saveBannerPerCampaign.php', data, callback, null, null, 'POST');
    }
    getBanners(data, callback) {
        return this.call('../../app/application/getBanners.php', data, callback);
    }
    updateCampaign(data, callback) {
        return this.call('../../app/application/updateCampaign.php', data, callback);
    }
    getAllCountries(data, callback) {
        return this.call('../../app/application/getAllCountries.php', data, callback);
    }
    getAllVCards(data, callback) {
        return this.call('../../app/application/getAllVCards.php', data, callback);
    }
    publishVcard(data, callback) {
        return this.call('../../app/application/publishVcard.php', data, callback);
    }
    unPublishVcard(data, callback) {
        return this.call('../../app/application/unPublishVcard.php', data, callback);
    }
    deleteVcard(data, callback) {
        return this.call('../../app/application/deleteVcard.php', data, callback);
    }
    getAllTemplates(data, callback) {
        return this.call('../../app/application/getAllTemplates.php', data, callback);
    }
    getVcardConfiguration(data, callback) {
        return this.call('../../app/application/getVcardConfiguration.php', data, callback);
    }
    getVcard(data, callback) {
        return this.call('../../app/application/getVcard.php', data, callback);
    }
    saveVCard(data, callback) {
        return this.call('../../app/application/saveVCard.php', data, callback);
    }
    updateVCard(data, callback) {
        return this.call('../../app/application/updateVCard.php', data, callback);
    }
    getMyStorageFiles(data, callback) {
        return this.call('../../app/application/getMyStorageFiles.php', data, callback);
    }
    getStorageCapacity(data, callback) {
        return this.call('../../app/application/getStorageCapacity.php', data, callback);
    }
    getCountriesPhones(data, callback) {
        return this.call('../../app/application/getCountriesPhones.php', data, callback);
    }
    uploadStorageFile(data,callback,progress){
        return this.callFile('../../app/application/upload_storage_file.php',data,callback,progress);
    } 
    // callfile
    uploadImageProfile(data, progress, callback) {
        return this.callFile('../../app/application/upload_image_profile.php', data, callback, progress);
    }
    uploadPaymentImage(data, progress, callback) {
        return this.callFile('../../app/application/uploadPaymentImage.php', data, callback, progress);
    }
    uploadImageBanner(data, progress, callback) {
        return this.callFile('../../app/application/uploadImageBanner.php', data, callback, progress);
    }
    //ewallet
    getLastTransactionsWallet(data, callback) {
        return this.call('../../app/application/getLastTransactionsWallet.php', data, callback, null, null, 'POST');
    }
    getLastWithdraws(data, callback) {
        return this.call('../../app/application/getLastWithdraws.php', data, callback, null, null, 'POST');
    }
    getInvoiceById(data, callback) {
        return this.call('../../app/application/getInvoiceById.php', data, callback, null, null, 'POST');
    }
    getLastAddress(data, callback) {
        return this.call('../../app/application/getLastAddress.php', data, callback);
    }
    getEwallet(data, callback) {
        return this.call('../../app/application/getEwallet.php', data, callback, null, null, 'POST');
    }
    doWithdraw(data, callback) {
        return this.call('../../app/application/doWithdraw.php', data, callback, null, null, 'POST');
    }
    sendEwalletFunds(data, callback) {
        return this.call('../../app/application/sendEwalletFunds.php', data, callback, null, null, 'POST');
    }
    withdrawFunds(data, callback) {
        return this.call('../../app/application/withdrawFunds.php', data, callback, null, null, 'POST');
    }
    getWithdrawsMethods(data, callback) {
        return this.call('../../app/application/getWithdrawsMethods.php', data, callback);
    }
    editWithdrawMethod(data, callback) {
        return this.call('../../app/application/editWithdrawMethod.php', data, callback);
    }
    payInvoiceFromWallet(data, callback) {
        return this.call('../../app/application/payInvoiceFromWallet.php', data, callback);
    }
    getTransactionFee(data, callback) {
        return this.call('../../app/application/getTransactionFee.php', data, callback);
    }
    getTransactionWithdrawFee(data, callback) {
        return this.call('../../app/application/getTransactionWithdrawFee.php', data, callback);
    }
    addFunds(data, callback) {
        return this.call('../../app/application/addFunds.php', data, callback);
    }
    // cart 
    initCart(data, callback) {
        return this.call('../../app/application/initCart.php', data, callback);
    }
    getStoreItemsNetwork(data, callback) {
        return this.call('../../app/application/getStoreItemsNetwork.php', data, callback);
    }
    getStoreItemsPackage(data, callback) {
        return this.call('../../app/application/getStoreItemsPackage.php', data, callback);
    }
    getStoreItemsMarketing(data, callback) {
        return this.call('../../app/application/getStoreItemsMarketing.php', data, callback);
    }
    getPaymentMethods(data, callback) {
        return this.call('../../app/application/getPaymentMethods.php', data, callback);
    }
    addPackage(data, callback) {
        return this.call('../../app/application/addPackage.php', data, callback);
    }
    getInvoices(data, callback) {
        return this.call('../../app/application/getInvoices.php', data, callback);
    }
    selectCatalogPaymentMethodId(data, callback) {
        return this.call('../../app/application/selectCatalogPaymentMethodId.php', data, callback);
    }
    selectCatalogCurrencyId(data, callback) {
        return this.call('../../app/application/selectCatalogCurrencyId.php', data, callback);
    }
    saveBuy(data, callback) {
        return this.call('../../app/application/saveBuy.php', data, callback);
    }
    getCartResume(data, callback) {
        return this.call('../../app/application/getCartResume.php', data, callback);
    }
    deleteItem(data, callback) {
        return this.call('../../app/application/deleteItem.php', data, callback);
    }
    getCatalogTimezones(data, callback) {
        return this.call('../../app/application/getCatalogTimezones.php', data, callback);
    }
    getInvoice(data, callback) {
        return this.call('../../app/application/getInvoice.php', data, callback);
    }
    getAllFaqs(data, callback) {
        return this.call('../../app/application/getAllFaqs.php', data, callback);
    }
    getTickets(data, callback) {
        return this.call('../../app/application/getTickets.php', data, callback);
    }
    addTicket(data, callback) {
        return this.call('../../app/application/addTicket.php', data, callback);
    }
    sendTicketReply(data, callback) {
        return this.call('../../app/application/sendTicketReply.php', data, callback);
    }
    getTransactionInfo(data, callback) {
        return this.call('../../app/application/getTransactionInfo.php', data, callback, null, null, 'POST');
    }
    getTransactionInfo(data, callback) {
        return this.call('../../app/application/getTransactionInfo.php', data, callback, null, null, 'POST');
    }
    getEwalletAddressInfo(data, callback) {
        return this.call('../../app/application/getEwalletAddressInfo.php', data, callback, null, null, 'POST');
    }
    getConferences(data, callback) {
        return this.call('../../app/application/getConferences.php', data, callback, null, null, 'POST');
    }
    getLicences(data, callback) {
        return this.call('../../app/application/getLicences.php', data, callback, null, null, 'POST');
    }
    getReferralPayments(data, callback) {
        return this.call('../../app/application/getReferralPayments.php', data, callback, null, null);
    }
    approbeReferralPayment(data, callback) {
        return this.call('../../app/application/approbeReferralPayment.php', data, callback, null, null);
    }
    deleteReferralPayment(data, callback) {
        return this.call('../../app/application/deleteReferralPayment.php', data, callback, null, null);
    }
    addReferralPayment(data, callback) {
        return this.call('../../app/application/addReferralPayment.php', data, callback, null, null);
    }
    getApiCredentials(data, callback) {
        return this.call('../../app/application/getApiCredentials.php', data, callback, null, null);
    }
    configureService(data, callback) {
        return this.call('../../app/application/configureService.php', data, callback, null, null);
    }
    makeApiCredentials(data, callback) {
        return this.call('../../app/application/makeApiCredentials.php', data, callback, null, null);
    }
    getProduct(data, callback) {
        return this.call('../../app/application/getProduct.php', data, callback, null, null);
    }
    addProduct(data, callback) {
        return this.call('../../app/application/addProduct.php', data, callback, null, null);
    }
    getPackages(data, callback) {
        return this.call('../../app/application/getPackages.php', data, callback, null, null);
    }
    getIptvCredits(data, callback) {
        return this.call('../../app/application/getIptvCredits.php', data, callback, null, null);
    }
    getMovies(data, callback) {
        return this.call('../../app/application/getMovies.php', data, callback, null, null);
    }
    getMovie(data, callback) {
        return this.call('../../app/application/getMovie.php', data, callback, null, null);
    }
    addViewPerMovie(data, callback) {
        return this.call('../../app/application/addViewPerMovie.php', data, callback, null, null);
    }
    getReamingTime(data, callback) {
        return this.call('../../app/application/getReamingTime.php', data, callback, null, null);
    }
    isAviableToAddPayment(data, callback) {
        return this.call('../../app/application/isAviableToAddPayment.php', data, callback, null, null);
    }
    getImages(data, callback) {
        return this.call('../../app/application/getImages.php', data, callback, null, null);
    }
    addClient(data, callback) {
        return this.call('../../app/application/addClient.php', data, callback, null, null);
    }
    requestClientService(data, callback) {
        return this.call('../../app/application/requestClientService.php', data, callback, null, null);
    }
    requestRenovation(data, callback) {
        return this.call('../../app/application/requestRenovation.php', data, callback, null, null);
    }
    getReferralLanding(data, callback) {
        return this.call('../../app/application/getReferralLanding.php', data, callback, null, null);
    }
    getIptvClients(data, callback) {
        return this.call('../../app/application/getIptvClients.php', data, callback, null, null);
    }
    getPaymentMethodByReferral(data, callback) {
        return this.call('../../app/application/getPaymentMethodByReferral.php', data, callback, null, null);
    }
    isActive(data, callback) {
        return this.call('../../app/application/isActive.php', data, callback, null, null);
    }
    isSponsorActive(data, callback) {
        return this.call('../../app/application/isSponsorActive.php', data, callback, null, null);
    }
    getGainsChart(data, callback) {
        return this.call('../../app/application/getGainsChart.php', data, callback, null, null);
    }
    getCatalogCommissionTypes(data, callback) {
        return this.call('../../app/application/getCatalogCommissionTypes.php', data, callback, null, null);
    }
    createDummieAccount(data, callback) {
        return this.call('../../app/application/createDummieAccount.php', data, callback, null, null);
    }
    getCommissionsPerUser(data, callback) {
        return this.call('../../app/application/getCommissionsPerUser.php', data, callback, null, null);
    }
    getTradingAccount(data, callback) {
        return this.call('../../app/application/getTradingAccount.php', data, callback, null, null);
    }
    getProfileShort(data, callback) {
        return this.call('../../app/application/getProfileShort.php', data, callback, null, null);
    }
    getNotice(data, callback) {
        return this.call('../../app/application/getNotice.php', data, callback, null, null);
    }
    getGains(data, callback) {
        return this.call('../../app/application/getGains.php', data, callback, null, null);
    }
    getAllMyLandings(data, callback) {
        return this.call('../../app/application/getAllMyLandings.php', data, callback, null, null);
    }
    getPaymentGateWay(data, callback) {
        return this.call('../../app/application/getPaymentGateWay.php', data, callback, null, null);
    }
    /* userApi */
    getUserApiList(data, callback) {
        return this.call('../../app/application/getUserApiList.php', data, callback, null, null);
    }
    createApi(data, callback) {
        return this.call('../../app/application/createApi.php', data, callback, null, null);
    }
    getUserApiPayments(data, callback) {
        return this.call('../../app/application/getUserApiPayments.php', data, callback, null, null);
    }
    createInvoice(data, callback) {
        return this.call('../../app/application/createInvoice.php', data, callback, null, null);
    }
    getUserApiWallets(data, callback) {
        return this.call('../../app/application/getUserApiWallets.php', data, callback, null, null);
    }
    setHookUrl(data, callback) {
        return this.call('../../app/application/setHookUrl.php', data, callback, null, null);
    }
    testHookUrl(data, callback) {
        return this.call('../../app/application/testHookUrl.php', data, callback, null, null);
    }
    getMainWallet(data, callback) {
        return this.call('../../app/application/getMainWallet.php', data, callback, null, null);
    }
    cancelInvoice(data, callback) {
        return this.call('../../app/application/cancelInvoice.php', data, callback, null, null);
    }
    aceptPartialFounds(data, callback) {
        return this.call('../../app/application/aceptPartialFounds.php', data, callback, null, null);
    }
    getUserApiPayouts(data, callback) {
        return this.call('../../app/application/getUserApiPayouts.php', data, callback, null, null);
    }
    createPayout(data, callback) {
        return this.call('../../app/application/createPayout.php', data, callback, null, null);
    }
    cancelPayout(data, callback) {
        return this.call('../../app/application/cancelPayout.php', data, callback, null, null);
    }
    resendPaymentGatewayWhatsApp(data, callback) {
        return this.call('../../app/application/resendPaymentGatewayWhatsApp.php', data, callback, null, null);
    }
    getUserApiItems(data, callback) {
        return this.call('../../app/application/getUserApiItems.php', data, callback, null, null);
    }
    addItem(data, callback) {
        return this.call('../../app/application/addItem.php', data, callback, null, null);
    }
    addCustomer(data, callback) {
        return this.call('../../app/application/addCustomer.php', data, callback, null, null);
    }
    deleteSplit(data, callback) {
        return this.call('../../app/application/deleteSplit.php', data, callback, null, null);
    }
    attachSplitToItem(data, callback) {
        return this.call('../../app/application/attachSplitToItem.php', data, callback, null, null);
    }
    updateSplitAmount(data, callback) {
        return this.call('../../app/application/updateSplitAmount.php', data, callback, null, null);
    }
    getResellers(data, callback) {
        return this.call('../../app/application/getResellers.php', data, callback, null, null);
    }
    updateSplit(data, callback) {
        return this.call('../../app/application/updateSplit.php', data, callback, null, null);
    }
    deleteReseller(data, callback) {
        return this.call('../../app/application/deleteReseller.php', data, callback, null, null);
    }
    makeReseller(data, callback) {
        return this.call('../../app/application/makeReseller.php', data, callback, null, null);
    }
    updateCustomer(data, callback) {
        return this.call('../../app/application/updateCustomer.php', data, callback, null, null);
    }
    getSplitsByCustomer(data, callback) {
        return this.call('../../app/application/getSplitsByCustomer.php', data, callback, null, null);
    }
    editItem(data, callback) {
        return this.call('../../app/application/editItem.php', data, callback, null, null);
    }
    getItem(data, callback) {
        return this.call('../../app/application/getItem.php', data, callback, null, null);
    }
    publishItem(data, callback) {
        return this.call('../../app/application/publishItem.php', data, callback, null, null);
    }
    unpublishItem(data, callback) {
        return this.call('../../app/application/unpublishItem.php', data, callback, null, null);
    }
    deleteItem(data, callback) {
        return this.call('../../app/application/deleteItem.php', data, callback, null, null);
    }
    getUserApiStats(data, callback) {
        return this.call('../../app/application/getUserApiStats.php', data, callback, null, null);
    }
    deleteCustomer(data, callback) {
        return this.call('../../app/application/deleteCustomer.php', data, callback, null, null);
    }
    getUserApiCustomers(data, callback) {
        return this.call('../../app/application/getUserApiCustomers.php', data, callback, null, null);
    }
    getUserApiCustomer(data, callback) {
        return this.call('../../app/application/getUserApiCustomer.php', data, callback, null, null);
    }
    getCustomer(data, callback) {
        return this.call('../../app/application/getCustomer.php', data, callback, null, null);
    }
    uploadItemImage(data, progress, callback) {
        return this.callFile('../../app/application/uploadItemImage.php', data, callback, progress);
    }
    /* api hosts */
    getUserApiHosts(data, callback) {
        return this.call('../../app/application/getUserApiHosts.php', data, callback, null, null);
    }
    deleteHost(data, callback) {
        return this.call('../../app/application/deleteHost.php', data, callback, null, null);
    }
    setDepositWallet(data, callback) {
        return this.call('../../app/application/setDepositWallet.php', data, callback, null, null);
    }
    createHost(data, callback) {
        return this.call('../../app/application/createHost.php', data, callback, null, null);
    }
    updateHost(data, callback) {
        return this.call('../../app/application/updateHost.php', data, callback, null, null);
    }
    /* api documentation */
    getDocumentation(data, callback) {
        return this.call('../../app/application/getDocumentation.php', data, callback, null, null);
    }
    getSafePrivateKeysByWallet(data, callback) {
        return this.call('../../app/application/getSafePrivateKeysByWallet.php', data, callback, null, null);
    }
    /* auth request */
    hasValidAuth(data, callback) {
        return this.call('../../app/application/hasValidAuth.php', data, callback, null, null);
    }
    expireAuth(data, callback) {
        return this.call('../../app/application/expireAuth.php', data, callback, null, null);
    }
    requestNewAuth(data, callback) {
        return this.call('../../app/application/requestNewAuth.php', data, callback, null,null );
    }
    getLengthCode(data, callback) {
        return this.call('../../app/application/getLengthCode.php', data, callback, null,null );
    }
    validateCode(data, callback) {
        return this.call('../../app/application/validateCode.php', data, callback, null,null );
    }
    deleteItemCart(data, callback) {
        return this.call('../../app/application/deleteItemCart.php', data, callback, null,null );
    }
    getIpInfo(data, callback) {
        return this.call('https://ipinfo.io/?token=f1d59709f7dad4', data, callback, null,null );
    }
    /* mlm */

    getUsersMultilevel(data, callback) {
        return this.call('../../app/application/getUsersMultilevel.php', data, callback, null,null );
    }
    getPackageForReferralPayment(data, callback) {
        return this.call('../../app/application/getPackageForReferralPayment.php', data, callback, null, null);
    }
    getCommissionPerUserByType(data, callback) {
        return this.call('../../app/application/getCommissionPerUserByType.php', data, callback, null, null);
    }
    getNetworkInfo(data, callback) {
        return this.call('../../app/application/getNetworkInfo.php', data, callback, null, null);
    }
    getEwalletAmount(data, callback) {
        return this.call('../../app/application/getEwalletAmount.php', data, callback, null, null);
    }
    getBalanceUserFromNetwork(data, callback) {
        return this.call('../../app/application/getBalanceUserFromNetwork.php', data, callback, null, null);
    }
    getBridgeAccount(data, callback) {
        return this.call('../../app/application/getBridgeAccount.php', data, callback, null, null);
    }
    signBridgeAccount(data, callback) {
        return this.call('../../app/application/signBridgeAccount.php', data, callback, null, null);
    }
    /* tickets */
    getCatalogTopic(data, callback) {
        return this.call('../../app/application/getCatalogTopic.php', data, callback, null, null);
    }
    /* chatbot */
    getIntentReply(data, callback) {
        return this.call('../../app/application/getIntentReply.php', data, callback, null, null);
    }
    getBotName(data, callback) {
        return this.call('../../app/application/getBotName.php', data, callback, null, null);
    }
    getChatIaFirstMessage(data, callback) {
        return this.call('../../app/application/getChatIaFirstMessage.php', data, callback, null, null);
    }
    getCatalogMamAccount(data, callback) {
        return this.call('../../app/application/getCatalogMamAccount.php', data, callback, null, null);
    }
    /* password update */
    validateSecret(data, callback) {
        return this.call('../../app/application/validateSecret.php', data, callback, null, null);
    }
    getAllUserBridgeAccounts(data, callback) {
        return this.call('../../app/application/getAllUserBridgeAccounts.php', data, callback, null, null);
    }
    updatePasswordAndLogin(data, callback) {
        return this.call('../../app/application/updatePasswordAndLogin.php', data, callback, null, null);
    }
    checkUserName(data, callback) {
        return this.call('../../app/application/checkUserName.php', data, callback, null, null);
    }
    verifyAccount(data, callback) {
        return this.call('../../app/application/verifyAccount.php', data, callback, null, null);
    }
    attachBridgeAccount(data, callback) {
        return this.call('../../app/application/attachBridgeAccount.php', data, callback, null, null);
    }
    /* marketing */
    getAllPendingFields(data, callback) {
        return this.call('../../app/application/getAllPendingFields.php', data, callback, null, null);
    }
    sendBasicMarketingInfo(data, callback) {
        return this.call('../../app/application/sendBasicMarketingInfo.php', data, callback, null, null);
    }
    saveMarketingField(data, callback) {
        return this.call('../../app/application/saveMarketingField.php', data, callback, null, null);
    }
    getAllMarketingFeedBacks(data, callback) {
        return this.call('../../app/application/getAllMarketingFeedBacks.php', data, callback, null, null);
    }
    uploadMarketingImage(data, progress, callback) {
        return this.callFile('../../app/application/uploadMarketingImage.php', data, callback, progress);
    }
    /* academy coming classes */
    getComingClasses(data, callback) {
        return this.call('../../app/application/getComingClasses.php', data, callback, null, null);
    }
    getRecordClasses(data, callback) {
        return this.call('../../app/application/getRecordClasses.php', data, callback, null, null);
    }
    getEvents(data, callback) {
        return this.call('../../app/application/getEvents.php', data, callback, null, null);
    }
    getAtiAccount(data, callback) {
        return this.call('../../app/application/getAtiAccount.php', data, callback, null, null);
    }
    getDummieAccount(data, callback) {
        return this.call('../../app/application/getDummieAccount.php', data, callback, null, null);
    }
    addDerivAccount(data, callback) {
        return this.call('../../app/application/addDerivAccount.php', data, callback, null, null);
    }

    /* academy */
    setSessionAsTaked(data, callback) {
        return this.call('../../app/application/setSessionAsTaked.php', data, callback);
    }
    commentCourse(data, callback) {
        return this.call('../../app/application/commentCourse.php', data, callback);
    }
    rankCourse(data, callback) {
        return this.call('../../app/application/rankCourse.php', data, callback);
    }
    /* lastSigned */
    getLastSigned(data, callback) {
        return this.call('../../app/application/getLastSigned.php', data, callback);
    }
    /* range */
    getCurrentRange(data, callback) {
        return this.call('../../app/application/getCurrentRange.php', data, callback);
    }
    /* productPermissions */
    getProductPermissions(data, callback) {
        return this.call('../../app/application/getProductPermissions.php', data, callback);
    }
    /* BT */
    getBinaryTree(data, callback) {
        return this.call('../../app/application/getBinaryTree.php', data, callback);
    }
    getMainBinaryTree(data, callback) {
        return this.call('../../app/application/getMainBinaryTree.php', data, callback);
    }
    getTeamPending(data, callback) {
        return this.call('../../app/application/getTeamPending.php', data, callback);
    }
    setReferralInPosition(data, callback) {
        return this.call('../../app/application/setReferralInPosition.php', data, callback);
    }
    getCurrentMembership(data, callback) {
        return this.call('../../app/application/getCurrentMembership.php', data, callback);
    }
    getLastMembers(data, callback) {
        return this.call('../../app/application/getLastMembers.php', data, callback);
    }
    getTopCountries(data, callback) {
        return this.call('../../app/application/getTopCountries.php', data, callback);
    }
    getIncome(data, callback) {
        return this.call('../../app/application/getIncome.php', data, callback);
    }
}

export { User }