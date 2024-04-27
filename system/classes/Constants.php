<?php

/*
 * Place here all the hardcoded values used throughout the system
 */
class Constants {
    const ROOT = __DIR__."/../../";
    const DELETE = -1;
    const DISABLED = 0;
    const AVIABLE = 1;
    const RESPONSES = [
        'DATA_OK' => 'DATA_OK',
        'INVALID_DATA' => 'INVALID_DATA',
        'NOT_DATA' => 'NOT_DATA',
        'NOT_PARAM' => 'NOT_PARAM',
        'NOT_FIELD_SESSION_DATA' => 'NOT_FIELD_SESSION_DATA',
        'EMAIL_EXIST' => 'EMAIL_EXIST',
        'INVALID_PERMISSION' => 'INVALID_PERMISSION',
        'ERROR_ON_SIGNUP' => 'ERROR_ON_SIGNUP',
    ];
}