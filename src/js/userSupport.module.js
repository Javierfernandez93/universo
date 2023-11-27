import { Http } from '../../src/js/http.module.js?v=2.3.5';

class UserSupport extends Http {
    constructor() {
        super();
    }
    /* ATI */
    getAdminUserAti(data, callback) {
        return this.call('../../app/application/getAdminUserAti.php', data, callback);
    }
    addAtiCredentials(data, callback) {
        return this.call('../../app/application/addAtiCredentials.php', data, callback);
    }
    getUsers(data, callback) {
        return this.call('../../app/application/get_users.php', data, callback);
    }
    getAdministrators(data, callback) {
        return this.call('../../app/application/get_administrators.php', data, callback);
    }
    sendAtiCredentials(data, callback) {
        return this.call('../../app/application/sendAtiCredentials.php', data, callback);
    }
    getAdministrator(data, callback) {
        return this.call('../../app/application/get_administrator.php', data, callback);
    }
    setCommissionReferral(data, callback) {
        return this.call('../../app/application/setCommissionReferral.php', data, callback);
    }
    deleteUser(data, callback) {
        return this.call('../../app/application/delete_user.php', data, callback);
    }
    updatePlan(data, callback) {
        return this.call('../../app/application/update_plan.php', data, callback);
    }
    addDeposit(data, callback) {
        return this.call('../../app/application/add_deposit.php', data, callback);
    }
    sendActivationWhatsApp(data, callback) {
        return this.call('../../app/application/sendActivationWhatsApp.php', data, callback);
    }
    addPermission(data, callback) {
        return this.call('../../app/application/addPermission.php', data, callback);
    }
    getEmailCampaigns(data, callback) {
        return this.call('../../app/application/getEmailCampaigns.php', data, callback);
    }
    sendEmail(data, callback) {
        return this.call('../../app/application/sendEmail.php', data, callback);
    }
    saveEmailCampaign(data, callback) {
        return this.call('../../app/application/saveEmailCampaign.php', data, callback);
    }
    getEmailCampaign(data, callback) {
        return this.call('../../app/application/getEmailCampaign.php', data, callback);
    }
    getEmailLayout(data, callback) {
        return this.call('../../app/application/getEmailLayout.php', data, callback);
    }
    getAllEmailCampaign(data, callback) {
        return this.call('../../app/application/getAllEmailCampaign.php', data, callback);
    }
    deleteDeposit(data, callback) {
        return this.call('../../app/application/delete_deposit.php', data, callback);
    }
    sendTransactionByAdmin(data, callback) {
        return this.call('../../app/application/sendTransactionByAdmin.php', data, callback);
    }
    reactiveDeposit(data, callback) {
        return this.call('../../app/application/reactive_deposit.php', data, callback);
    }
    deleteTransaction(data, callback) {
        return this.call('../../app/application/delete_transaction.php', data, callback);
    }
    getDeposits(data, callback) {
        return this.call('../../app/application/get_deposits.php', data, callback);
    }
    getTransactionsList(data, callback) {
        return this.call('../../app/application/get_transactions_list.php', data, callback);
    }
    disperseGains(data, callback) {
        return this.call('../../app/cronjob/disperse_gains.php', data, callback);
    }
    getInBackoffice(data, callback) {
        return this.call('../../app/application/get_in_backoffice.php', data, callback);
    }
    getCatalogTools(data, callback) {
        return this.call('../../app/application/getCatalogTools.php', data, callback);
    }
    getStats(data, callback) {
        return this.call('../../app/application/get_stats.php', data, callback);
    }
    addCapitalToBroker(data, callback) {
        return this.call('../../app/application/add_capital_to_broker.php', data, callback);
    }
    addGainPerBroker(data, callback) {
        return this.call('../../app/application/add_gain_per_broker.php', data, callback);
    }
    saveBroker(data, callback) {
        return this.call('../../app/application/save_broker.php', data, callback);
    }
    getBrokerCapitals(data, callback) {
        return this.call('../../app/application/get_broker_capitals.php', data, callback);
    }
    addPerformance(data, callback) {
        return this.call('../../app/application/add_performance.php', data, callback);
    }
    deleteDeposit(data, callback) {
        return this.call('../../app/application/delete_deposit.php', data, callback, null, null, 'POST');
    }
    viewCoinpaymentsTXNId(data, callback) {
        return this.call('../../app/application/viewCoinpaymentsTXNId.php', data, callback, null, null, 'POST');
    }
    closeOperation(data, callback) {
        return this.call('../../app/application/close_operation.php', data, callback, null, null, 'POST');
    }
    deleteCapital(data, callback) {
        return this.call('../../app/application/delete_capital.php', data, callback);
    }
    updateBroker(data, callback) {
        return this.call('../../app/application/update_broker.php', data, callback);
    }
    applyWithdraw(data, callback) {
        return this.call('../../app/application/apply_withdraw.php', data, callback);
    }
    applyDeposit(data, callback) {
        return this.call('../../app/application/apply_deposit.php', data, callback);
    }
    getBrokersData(data, callback) {
        return this.call('../../app/application/get_brokers_data.php', data, callback);
    }
    deleteWithdraw(data, callback) {
        return this.call('../../app/application/delete_withdraw.php', data, callback);
    }
    getUsersTransactions(data, callback) {
        return this.call('../../app/application/get_users_transactions.php', data, callback);
    }
    saveUser(data, callback) {
        return this.call('../../app/application/save_user.php', data, callback);
    }
    getAdministratorPermissions(data, callback) {
        return this.call('../../app/application/get_administrator_permissions.php', data, callback);
    }
    saveAdministrator(data, callback) {
        return this.call('../../app/application/save_administrator.php', data, callback, null, null, 'POST');
    }
    editAdministrator(data, callback) {
        return this.call('../../app/application/edit_administrator.php', data, callback, null, null, 'POST');
    }
    getReferral(data, callback) {
        return this.call('../../app/application/get_referral.php', data, callback);
    }
    getCountries(data, callback) {
        return this.call('../../app/application/get_countries.php', data, callback);
    }
    inactiveBroker(data, callback) {
        return this.call('../../app/application/inactive_broker.php', data, callback);
    }
    deleteBroker(data, callback) {
        return this.call('../../app/application/delete_broker.php', data, callback);
    }
    activeBroker(data, callback) {
        return this.call('../../app/application/active_broker.php', data, callback);
    }
    getBrokers(data, callback) {
        return this.call('../../app/application/get_brokers.php', data, callback);
    }
    getBroker(data, callback) {
        return this.call('../../app/application/get_broker.php', data, callback);
    }
    getUser(data, callback) {
        return this.call('../../app/application/get_user.php', data, callback);
    }
    updateUser(data, callback) {
        return this.call('../../app/application/update_user.php', data, callback);
    }
    getUserProfile(data, callback) {
        return this.call('../../app/application/get_user_profile.php', data, callback);
    }
    getPlans(data, callback) {
        return this.call('../../app/application/get_plans.php', data, callback);
    }
    deleteSupportUser(data, callback) {
        return this.call('../../app/application/delete_support_user.php', data, callback);
    }
    doLoginSupport(data, callback) {
        return this.call('../../app/application/do_login_support.php', data, callback);
    }
    deletePlan(data, callback) {
        return this.call('../../app/application/delete_plan.php', data, callback);
    }
    getAllGainsByDays(data, callback) {
        return this.call('../../app/application/get_all_gains_by_days.php', data, callback);
    }
    getReport(data, callback) {
        return this.call('../../app/application/getReport.php', data, callback);
    }
    getNotices(data, callback) {
        return this.call('../../app/application/get_notices.php', data, callback);
    }
    saveNotice(data, callback) {
        return this.call('../../app/application/save_notice.php', data, callback, null, null, 'POST');
    }
    updateNotice(data, callback) {
        return this.call('../../app/application/update_notice.php', data, callback, null, null, 'POST');
    }
    getNotice(data, callback) {
        return this.call('../../app/application/get_notice.php', data, callback);
    }
    publishNotice(data, callback) {
        return this.call('../../app/application/publish_notice.php', data, callback);
    }
    deleteNotice(data, callback) {
        return this.call('../../app/application/delete_notice.php', data, callback);
    }
    unpublishNotice(data, callback) {
        return this.call('../../app/application/unpublish_notice.php', data, callback);
    }
    getCatalogNotices(data, callback) {
        return this.call('../../app/application/get_catalog_notices.php', data, callback);
    }
    getCatalogPriorities(data, callback) {
        return this.call('../../app/application/get_catalog_priorities.php', data, callback);
    }
    getBuys(data, callback) {
        return this.call('../../app/application/getBuys.php', data, callback);
    }
    validateBuyByAdmin(data, callback) {
        return this.call('../../app/application/validateBuyByAdmin.php', data, callback);
    }
    deleteBuyByAdmin(data, callback) {
        return this.call('../../app/application/deleteBuyByAdmin.php', data, callback);
    }
    saveTool(data, callback) {
        return this.call('../../app/application/saveTool.php', data, callback);
    }
    getTool(data, callback) {
        return this.call('../../app/application/getTool.php', data, callback);
    }
    updateTool(data, callback) {
        return this.call('../../app/application/updateTool.php', data, callback);
    }
    getAdminTools(data, callback) {
        return this.call('../../app/application/getAdminTools.php', data, callback);
    }
    setBuyAsPendingByAdmin(data, callback) {
        return this.call('../../app/application/setBuyAsPendingByAdmin.php', data, callback);
    }
    viewEwallet(data, callback) {
        return this.call('../../app/application/viewEwallet.php', data, callback);
    }
    getAllFaqs(data, callback) {
        return this.call('../../app/application/getAllFaqs.php', data, callback);
    }
    getAllTickets(data, callback) {
        return this.call('../../app/application/getAllTickets.php', data, callback);
    }
    setTicketAs(data, callback) {
        return this.call('../../app/application/setTicketAs.php', data, callback);
    }
    sendTicketReplyFromAdmin(data, callback) {
        return this.call('../../app/application/sendTicketReplyFromAdmin.php', data, callback);
    }
    getEwalletInfo(data, callback) {
        return this.call('../../app/application/getEwalletInfo.php', data, callback);
    }
    getAllIptvClients(data, callback) {
        return this.call('../../app/application/getAllIptvClients.php', data, callback);
    }
    addClientIptvCredentials(data, callback) {
        return this.call('../../app/application/addClientIptvCredentials.php', data, callback);
    }
    setUpIptvService(data, callback) {
        return this.call('../../app/application/setUpIptvService.php', data, callback);
    }
    setUpIptvDemo(data, callback) {
        return this.call('../../app/application/setUpIptvDemo.php', data, callback);
    }
    sendDemoCredentials(data, callback) {
        return this.call('../../app/application/sendDemoCredentials.php', data, callback);
    }
    sendServiceCredentials(data, callback) {
        return this.call('../../app/application/sendServiceCredentials.php', data, callback);
    }
    setAsRenovated(data, callback) {
        return this.call('../../app/application/setAsRenovated.php', data, callback);
    }
    addLicenceToUser(data, callback) {
        return this.call('../../app/application/addLicenceToUser.php', data, callback);
    }
    addCreditToUser(data, callback) {
        return this.call('../../app/application/addCreditToUser.php', data, callback);
    }
    getClientIptvApi(data, callback) {
        return this.call('../../app/application/getClientIptvApi.php', data, callback);
    }
    // callfile
    uploadImageProfile(data, progress, callback) {
        return this.callFile('../../app/application/upload_image_profile.php', data, callback, progress);
    }
    uploadToolFile(data, progress, callback) {
        return this.callFile('../../app/application/uploadToolFile.php', data, callback, progress);
    }
    /* new fun */
    approbeExercise(data, callback) {
        return this.call('../../app/application/approbeExercise.php', data, callback);
    }
    getExercises(data, callback) {
        return this.call('../../app/application/getExercises.php', data, callback);
    }
    getTradingAccounts(data, callback) {
        return this.call('../../app/application/getTradingAccounts.php', data, callback);
    }
    getTradingAccountsForDisperseGains(data, callback) {
        return this.call('../../app/application/getTradingAccountsForDisperseGains.php', data, callback);
    }
    setExerciseCredentials(data, callback) {
        return this.call('../../app/application/setExerciseCredentials.php', data, callback);
    }
    setExerciseAs(data, callback) {
        return this.call('../../app/application/setExerciseAs.php', data, callback);
    }
    setTraddingAccountAs(data, callback) {
        return this.call('../../app/application/setTraddingAccountAs.php', data, callback);
    }
    sendWhatsAppExerciseCredentials(data, callback) {
        return this.call('../../app/application/sendWhatsAppExerciseCredentials.php', data, callback);
    }
    sendWhatsAppUserTradingCredentials(data, callback) {
        return this.call('../../app/application/sendWhatsAppUserTradingCredentials.php', data, callback);
    }
    addProfit(data, callback) {
        return this.call('../../app/application/addProfit.php', data, callback);
    }
    getAllLandings(data, callback) {
        return this.call('../../app/application/getAllLandings.php', data, callback);
    }
    getAllCatalogLandingActions(data, callback) {
        return this.call('../../app/application/getAllCatalogLandingActions.php', data, callback);
    }
    addLanding(data, callback) {
        return this.call('../../app/application/addLanding.php', data, callback);
    }
    getAllPaymentMethods(data, callback) {
        return this.call('../../app/application/getAllPaymentMethods.php', data, callback);
    }
    savePaymentMethodFee(data, callback) {
        return this.call('../../app/application/savePaymentMethodFee.php', data, callback);
    }
    inactivePaymentMethod(data, callback) {
        return this.call('../../app/application/inactivePaymentMethod.php', data, callback);
    }
    activePaymentMethod(data, callback) {
        return this.call('../../app/application/activePaymentMethod.php', data, callback);
    }
    enableRecomendation(data, callback) {
        return this.call('../../app/application/enableRecomendation.php', data, callback);
    }
    disableRecomendation(data, callback) {
        return this.call('../../app/application/disableRecomendation.php', data, callback);
    }
    deletePaymentMethod(data, callback) {
        return this.call('../../app/application/deletePaymentMethod.php', data, callback);
    }
    getCrons(data, callback) {
        return this.call('../../app/application/getCrons.php', data, callback);
    }
    saveCron(data, callback) {
        return this.call('../../app/application/saveCron.php', data, callback);
    }
    publishLanding(data, callback) {
        return this.call('../../app/application/publishLanding.php', data, callback);
    }
    unpublishLanding(data, callback) {
        return this.call('../../app/application/unpublishLanding.php', data, callback);
    }
    deleteLanding(data, callback) {
        return this.call('../../app/application/deleteLanding.php', data, callback);
    }
    /* invoices */
    getAdminInvoices(data, callback) {
        return this.call('../../app/application/getAdminInvoices.php', data, callback);
    }
    /* apis */
    getAdminUserApis(data, callback) {
        return this.call('../../app/application/getAdminUserApis.php', data, callback);
    }
    getAdminTrx(data, callback) {
        return this.call('../../app/application/getAdminTrx.php', data, callback);
    }
    deleteUserApi(data, callback) {
        return this.call('../../app/application/deleteUserApi.php', data, callback);
    }
    validateMasterBuy(data, callback) {
        return this.call('../../app/application/validateMasterBuy.php', data, callback);
    }
    /* dash */
    getAdminAllUserGains(data, callback) {
        return this.call('../../app/application/getAdminAllUserGains.php', data, callback);
    }
    getAdminLastInvoices(data, callback) {
        return this.call('../../app/application/getAdminLastInvoices.php', data, callback);
    }
    getAdminUserGains(data, callback) {
        return this.call('../../app/application/getAdminUserGains.php', data, callback);
    }
    readFileData(data, callback) {
        return this.call('../../app/application/readFileData.php', data, callback);
    }
    addAdminUserClientProfit(data, callback) {
        return this.call('../../app/application/addAdminUserClientProfit.php', data, callback);
    }
    uploadGainsFile(data, progress, callback) {
        return this.callFile('../../app/application/uploadGainsFile.php', data, callback, progress);
    }
    /* trading signal dummy trader */
    getAllTradingSingals(data, callback) {
        return this.call('../../app/application/getAllTradingSingals.php', data, callback);
    }
    createTradingSignal(data, callback) {
        return this.call('../../app/application/createTradingSignal.php', data, callback);
    }
    getAdminReferralProfile(data, callback) {
        return this.call('../../app/application/getAdminReferralProfile.php', data, callback);
    }
    /* payouts */
    sendPayout(data, callback) {
        return this.call('../../app/application/sendPayout.php', data, callback);
    }
    /* bridge */
    getAllBuyPerBridge(data, callback) {
        return this.call('../../app/application/getAllBuyPerBridge.php', data, callback);
    }
    sendMoneyToBridge(data, callback) {
        return this.call('../../app/application/sendMoneyToBridge.php', data, callback);
    }
    getAllAdminMarketing(data, callback) {
        return this.call('../../app/application/getAllAdminMarketing.php', data, callback);
    }
    getAllAdminMarketingData(data, callback) {
        return this.call('../../app/application/getAllAdminMarketingData.php', data, callback);
    }
    getAdminAllUserBridgeAccount(data, callback) {
        return this.call('../../app/application/getAdminAllUserBridgeAccount.php', data, callback);
    }
    addAdminBridgeAccount(data, callback) {
        return this.call('../../app/application/addAdminBridgeAccount.php', data, callback);
    }
    deleteBridgeAccount(data, callback) {
        return this.call('../../app/application/deleteBridgeAccount.php', data, callback);
    }
    lookupBridgeAccount(data, callback) {
        return this.call('../../app/application/lookupBridgeAccount.php', data, callback);
    }
    attachBridgeAccount(data, callback) {
        return this.call('../../app/application/attachBridgeAccount.php', data, callback);
    }
    setAsSendToBridge(data, callback) {
        return this.call('../../app/application/setAsSendToBridge.php', data, callback);
    }
    editBridgeAccount(data, callback) {
        return this.call('../../app/application/editBridgeAccount.php', data, callback);
    }
    sendEmailtToBridge(data, callback) {
        return this.call('../../app/application/sendEmailtToBridge.php', data, callback);
    }
    /* intents */
    getAllIntents(data, callback) {
        return this.call('../../app/application/getAllIntents.php', data, callback);
    }
    saveIntent(data, callback) {
        return this.call('../../app/application/saveIntent.php', data, callback);
    }
    /* marketing */
    attachFeedBackToMarketing(data, callback) {
        return this.call('../../app/application/attachFeedBackToMarketing.php', data, callback);
    }
    uploadMarketingImageFeedback(data, progress, callback) {
        return this.callFile('../../app/application/uploadMarketingImageFeedback.php', data, callback, progress);
    }

    /* Academy */
    saveCourse(data, callback) {
        return this.call('../../app/application/saveCourse.php', data, callback);
    }
    updateCourse(data, callback) {
        return this.call('../../app/application/updateCourse.php', data, callback, null, null, 'POST');
    }
    getCourses(data, callback) {
        return this.call('../../app/application/getCourses.php', data, callback);
    }
    getCourseFormAddVars(data, callback) {
        return this.call('../../app/application/getCourseFormAddVars.php', data, callback);
    }
    getCatalogMultimedias(data, callback) {
        return this.call('../../app/application/getCatalogMultimedias.php', data, callback);
    }
    changeCourseStatus(data, callback) {
        return this.call('../../app/application/changeCourseStatus.php', data, callback);
    }
    uploadCoverCourse(data, progress, callback) {
        return this.callFile('../../app/application/uploadCoverCourse.php', data, callback, progress);
    }
    uploadImageBanner(data, progress, callback) {
        return this.callFile('../../app/application/uploadImageBanner.php', data, callback, progress);
    }
    getCatalogCampaigns(data, callback) {
        return this.call('../../app/application/getCatalogCampaigns.php', data, callback);
    }
    getAdminReferralProfile(data, callback) {
        return this.call('../../app/application/getAdminReferralProfile.php', data, callback);
    }
    getCoruseForEdit(data, callback) {
        return this.call('../../app/application/getCoruseForEdit.php', data, callback);
    }
    getSystemVars(data, callback) {
        return this.call('../../app/application/getSystemVars.php', data, callback);
    }
    saveSystemVar(data, callback) {
        return this.call('../../app/application/saveSystemVar.php', data, callback);
    }
    getBanners(data, callback) {
        return this.call('../../app/application/getBanners.php', data, callback);
    }
    saveBanner(data, callback) {
        return this.call('../../app/application/saveBanner.php', data, callback);
    }
}

export { UserSupport }