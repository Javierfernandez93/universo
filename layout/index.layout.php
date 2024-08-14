<!doctype html>
<html lang="es">
<head>
    <meta charset="utf-8" />
    <title>{{title}}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta content="<?php echo Site\SystemVar::_getValue("company_name"); ?> | <?php echo Site\SystemVar::_getValue("title"); ?>" name="author" />
    <meta content="<?php echo Site\SystemVar::_getValue("description"); ?>" name="description" />

    <meta name="theme-color" content="#2D2250">

    <meta name="keywords" content="yucatán, hoteles, desarrolladora, inmobiliaria">
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

    <!-- Font Awesome Icons -->
    <link href="../../src/css/core/bootstrap.min.css" rel="stylesheet">
    
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    
    <!-- plugin css -->
    <link id="pagestyle" href="../../src/css/soft-ui-dashboard.css?v=1.0.0" rel="stylesheet" />
    <link rel="stylesheet" href="../../src/css/general.css?v=1.0.0" />
</head>

<body>
    <div id="preloader" class="start-0 top-0 d-flex align-items-center justify-content-center position-fixed vh-100 w-100">
        <div class="row align-items-center justify-content-center text-center">
            <div class="col-9 col-md-6 text-center text-dark animation-fall-down" style="--delay:300ms">
                <img src="../../src/img/green-light-vertical.png" class="w-100" alt="logo" title="logo" />

                <div class="spinner spinner-border text-success mt-3" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    </div>
    
    <nav class="fixed-top py-2 py-xl-3">
        <header class="container d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-xl-3 mb-0">
            <div class="col-md-2 mb-2 mb-md-0 d-none d-md-block">
                <a href="/" class="d-inline-flex link-body-emphasis text-decoration-none">
                    <svg class="bi" width="40" height="32" role="img" aria-label="Bootstrap"><use xlink:href="#bootstrap"></use></svg>

                    <img src="../../src/img/white-horizontal.png" class="w-100" alt="logo" title="logo" />
                </a>
            </div>

            <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                <li><a href="../../apps/home" class="nav-link px-2 link-success">INICIO</a></li>
                <li><a href="../../apps/realState" class="nav-link px-2">DESARROLLOS</a></li>
                <li><a href="../../apps/blog" class="nav-link px-2">BLOG</a></li>
                <li><a href="../../apps/home/us" class="nav-link px-2">COUMINDAD DE JADE</a></li>
                <li><a href="../../apps/home/about" class="nav-link px-2">NOSOTROS</a></li>
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
                id: '<?php echo session_id();?>',
            });
    </script>
    <div id="appChatBot"></div>

    <script src="../../src/js/42d5adcbca.min.js" type="text/javascript"></script>

    <script src="../../src/js/alertCtrl.min.js?v=1.1.6" type="text/javascript"></script>
    <script src="../../src/js/jquery-3.5.1.min.js" type="text/javascript"></script>
    <script src="../../src/js/general.js?v=1.1.6" type="text/javascript"></script>

    <!-- Github buttons -->
    <script async defer src="../../src/js/buttons.min.js"></script>
    <script src="../../src/js/soft-ui-dashboard.min.js?v=1.1.6"></script>

    <script src="../../src/js/core/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    <script src="../../src/js/vue.js"></script>

    {{js_scripts}}
    {{css_scripts}}
</body>

</html>