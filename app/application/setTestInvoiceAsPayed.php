<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new Site\UserSupport;

if($UserSupport->logged === true)
{
    try {
        if($UserApi->setTestInvoiceAsPayed($data))
        {
            $data['status'] = Site\UserApiCodes::DATA_OK;
            $data['message'] = Site\UserApiCodes::DATA_OK->label();
        } else {
            $data['status'] = Site\UserApiCodes::ERROR_AT_SEND_TEXT_INVOICE_AS_PAYED;
            $data['message'] = Site\UserApiCodes::ERROR_AT_SEND_TEXT_INVOICE_AS_PAYED->label();
        }
    } catch (Exception $e) {
        $data['status'] = $e->getMessage();
    }
} else {
    $data['status'] = Site\UserApiCodes::INVALID_CREDENTIALS;
    $data['message'] = Site\UserApiCodes::INVALID_CREDENTIALS->label();
}

echo json_encode(HCStudio\Util::compressDataForPhone($data));