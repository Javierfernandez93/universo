function clearCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

clearCookie('merchant_token')
clearCookie('itemsCP')