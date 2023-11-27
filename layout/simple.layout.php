<!doctype html>
<html lang="es">
<head>
    <meta charset="utf-8" />
    <title>{{title}}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta content="Site | Trading profesional" name="author" />
    <meta content="Herramientas deTrading profesional" name="description" />

    <meta name="theme-color" content="#2D2250">   
    
    <meta name="keywords" content="marketing digital,Trading profesional, herramientas, potenciar negocio, realidad, whatsappsender">
    <meta name="robots" value="index, follow">

    <meta property="og:site_name" content="Site | Trading profesional">
    <meta property="og:title" content="Site | Trading profesional" />
    <meta property="og:description" content="Herramientas deTrading profesional" />
    <meta property="og:image" itemprop="image" content="https://www.Sitegroup.io/src/img/logo.png">
    <meta property="og:image:type" content="image/jpeg">
    <meta property="og:image:width" content="300">
    <meta property="og:image:height" content="300">

    <meta property="og:type" content="website" />
    <meta property="og:updated_time" content="1664070388" />
    <meta property="og:url" content="http://www.Sitegroup.io">

    <!-- Size of image. Any size up to 300. Anything above 300px will not work in WhatsApp -->

    <!-- Website to visit when clicked in fb or WhatsApp-->

    <link rel="apple-touch-icon" sizes="76x76" href="../../src/img/apple-icon.png">
    
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    <link rel="shortcut icon" href="<?php echo HCStudio\Connection::getMainPath();?>/src/img/favicon.png">

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css">
    
    {{css_scripts}}

    <script async src="https://www.googletagmanager.com/gtag/js?id=G-C8DRLEFM41"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-C8DRLEFM41');
    </script>
<body>
    {{content}}
    
    <script src="<?php echo HCStudio\Connection::getMainPath();?>/src/js/jquery-3.1.1.js" type="text/javascript"></script>
    <script src="<?php echo HCStudio\Connection::getMainPath();?>/src/js/general.js?v=2.3.5" type="text/javascript"></script>
    <script src="<?php echo HCStudio\Connection::getMainPath();?>/src/js/constants.js?v=2.3.5" type="text/javascript"></script>
    <script src="<?php echo HCStudio\Connection::getMainPath();?>/src/js/vue.js"></script> 
    
    {{js_scripts}}
</body>
</html>