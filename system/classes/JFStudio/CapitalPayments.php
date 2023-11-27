<?php

namespace JFStudio;

class CapitalPayments {
    /* live */
    const API_KEY = 'aDqUT8pPlY4rKwhR';
    const API_SECRET = 'n5BmeYEuTqdeJ+4VIutsDzW7H1P7VFYSvn/LM8STmjqaPD+PDz09E+L5kQA6ElPsapPxvrIiyS6IJ/PQrsZOGA==:VEFMRU5UT1VNQlJFTExBMg==';
    const IPN_SECRET = 'dqsRG0tCQbSfDLw4g';

    /* sandbox */
    // const API_KEY = 'RWZBAckwOLimlroz';
    // const API_SECRET = 'tP9mXJKN5V6S4WQMfURdPA+E6BjFuXwztk5QGvvH0L2w7GnGEJVPhPWTrnloqXerGSMfYDCCHQlBV5rQP11GVA==:VEFMRU5UT1VNQlJFTExBMg==';
    // const IPN_SECRET = 'qoi2uQTKHD0RZsmLE';

    //* status * */
    const ORDER_CREATED = 100;
    const ORDER_PAID = 101;
    const ORDER_CANCELED = 102;
    const PAYOUT_DONE = 105;

    const GAS_DISPERSED = 103;
    const STATUS_200 = 200;
}