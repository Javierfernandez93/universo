<!doctype html>
<html lang="es">
<head>
    <meta charset="utf-8" />
    <title>{{title}}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta content="<?php echo Site\SystemVar::_getValue("company_name"); ?> | <?php echo Site\SystemVar::_getValue("title"); ?>" name="author" />
    <meta content="<?php echo Site\SystemVar::_getValue("description"); ?>" name="description" />

    <meta name="theme-color" content="#2D2250">

    <meta name="keywords" content="trading, cripto, Site">
    <meta name="robots" value="index, follow">

    <meta name="googlebot" content="index, follow">
    <meta name="googlebot-news" content="index, follow">

    <meta property="og:site_name" content="<?php echo Site\SystemVar::_getValue("company_name"); ?>">
    <meta property="og:title" content="<?php echo Site\SystemVar::_getValue("company_name"); ?> | <?php echo Site\SystemVar::_getValue("title"); ?>" />
    <meta property="og:description" content="<?php echo Site\SystemVar::_getValue("description"); ?>" />
    <meta property="og:image" itemprop="image" content="<?php echo HCStudio\Connection::getMainPath() ?>/src/img/jade-social.png">
    <meta property="og:image:type" content="image/jpeg">
    <meta property="og:image:width" content="300">
    <meta property="og:image:height" content="300">

    <meta property="og:type" content="website" />
    <meta property="og:updated_time" content="1664070388" />
    <meta property="og:url" content="<?php echo HCStudio\Connection::getMainPath() ?>">


    <!-- App favicon -->
    <link rel="icon" type="image/png" href="../../src/img/favicon.png">

    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet" />
    <!-- Nucleo Icons -->
    <link rel="stylesheet" href="../../src/css/nucleo-icons.css" />
    <link rel="stylesheet" href="../../src/css/nucleo-svg.css" />
    <!-- Font Awesome Icons -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.4/font/bootstrap-icons.css">
    
    <link rel="stylesheet" href="../../src/css/nucleo-svg.css" />
    
    <!-- plugin css -->
    <link id="pagestyle" href="../../src/css/soft-ui-dashboard.css?af=1" rel="stylesheet" />
    <link rel="stylesheet" href="../../src/css/general.css?t=1" />
</head>

<body>
    <div id="preloader" class="start-0 top-0 d-flex align-items-center justify-content-center position-fixed vh-100 w-100">
        <div class="row align-items-center justify-content-center text-center">
            <div class="col-9 col-md-4 text-center text-dark animation-fall-down" style="--delay:300ms">
                <img src="../../src/img/green-light-vertical.png" class="w-100" alt="logo" title="logo" />
            </div>
        </div>
    </div>
    
    <nav class="fixed-top py-2 py-xl-3">
        <header class="container d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-xl-3 mb-0">
            <div class="col-md-3 mb-2 mb-md-0 d-none d-md-block">
                <a href="/" class="d-inline-flex link-body-emphasis text-decoration-none">
                    <svg class="bi" width="40" height="32" role="img" aria-label="Bootstrap"><use xlink:href="#bootstrap"></use></svg>

                    <img src="../../src/img/white-horizontal.png" class="w-100" alt="logo" title="logo" />
                </a>
            </div>

            <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                <li><a href="../../apps/home" class="nav-link px-2 link-success">INICIO</a></li>
                <li><a href="../../apps/realState" class="nav-link px-2">DESARROLLOS</a></li>
                <li><a href="../../apps/blog" class="nav-link px-2">BLOG</a></li>
                <li><a href="../../apps/home/us" class="nav-link px-2">NOSOTROS</a></li>
                <li><a href="../../apps/home/about" class="nav-link px-2">SOMOS</a></li>
            </ul>

            <div class="col-md-3 text-end">
                <a href="../../apps/login" type="button" class="btn shadow-none text-white btn-lg mb-0">Iniciar sesión</a>
            </div>
        </header>
    </nav>

    <div class="">
        {{content}}    
    </div>

    <script type="module">
            import { ZuppiBot } from 'https://www.zuppi.io/src/js/chatbot.js?t=3';
            
            let zuppiBot = new ZuppiBot({
                api_key: '042DTY',
            });
    </script>
    <div id="appChatBot"></div>

    <!--   Core JS Files   -->
    <script src="../../src/js/plugins/perfect-scrollbar.min.js"></script>
    <script src="../../src/js/plugins/smooth-scrollbar.min.js"></script>
    <script src="../../src/js/plugins/chartjs.min.js"></script>
    <script src="../../src/js/42d5adcbca.js" type="text/javascript"></script>

    <script src="../../src/js/constants.js?v=2.4.6.2" type="text/javascript"></script>
    <script src="../../src/js/alertCtrl.js?v=2.4.6.2" type="text/javascript"></script>
    <script src="../../src/js/jquery-3.5.1.min.js" type="text/javascript"></script>
    <script src="../../src/js/general.js?v=2.4.6.2" type="text/javascript"></script>

    <!-- Github buttons -->

    <script async defer src="../../src/js/buttons.js"></script>
    <!-- Control Center for Soft Dashboard: parallax effects, scripts for the example pages etc -->
    <script src="../../src/js/soft-ui-dashboard.min.js?v=2.4.6.2"></script>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    <script src="../../src/js/vue.js"></script>

    {{js_scripts}}
    {{css_scripts}}
</body>

</html>