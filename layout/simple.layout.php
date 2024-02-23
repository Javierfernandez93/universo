<!doctype html>
<html lang="es">
<head>
    <meta charset="utf-8" />
    <title>{{title}}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta content="<?php echo JFStudio\Layout::PROYECT_NAME; ?> | Tu espacio seguro" name="author" />
    <meta content="Tu espacio seguro" name="description" />

    <meta name="theme-color" content="#2D2250">

    <meta name="keywords" content="trading, cripto, Site">
    <meta name="robots" value="index, follow">

    <meta name="googlebot" content="index, follow">
    <meta name="googlebot-news" content="index, follow">

    <meta property="og:site_name" content="<?php echo JFStudio\Layout::PROYECT_NAME; ?> | Tu espacio seguro">
    <meta property="og:title" content="<?php echo JFStudio\Layout::PROYECT_NAME; ?> | Tu espacio seguro" />
    <meta property="og:description" content="Tu espacio seguro" />
    <meta property="og:image" itemprop="image" content="<?php echo HCStudio\Connection::getMainPath() ?>/src/img/logo.png">
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

    <link rel="stylesheet" href="../../src/css/general.css" />
</head>

<body class="bg-xdark">
    <nav class="sticky py-5">
        <header class="container d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-xl-3 mb-0">
            <div class="col-md-3 mb-2 mb-md-0">
                <a href="/" class="d-inline-flex link-body-emphasis text-decoration-none">
                <svg class="bi" width="40" height="32" role="img" aria-label="Bootstrap"><use xlink:href="#bootstrap"></use></svg>
                </a>
            </div>

            <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                <li><a href="../../apps/home" class="nav-link px-2 <?php if($route == JFStudio\Router::Home) {?>text-success<?php } ?>">INICIO</a></li>
                <li><a href="../../apps/realState" class="nav-link px-2 <?php if($route == JFStudio\Router::RealState) {?>text-success<?php } ?>">DESARROLLOS</a></li>
                <li><a href="../../apps/blog" class="nav-link px-2 <?php if($route == JFStudio\Router::BLOG) {?>text-success<?php } ?>">BLOG</a></li>
                <li><a href="../../apps/home/us" class="nav-link px-2 <?php if($route == JFStudio\Router::Us) {?>text-success<?php } ?>">NOSOTROS</a></li>
                <li><a href="../../apps/home/about" class="nav-link px-2 <?php if($route == JFStudio\Router::About) {?>text-success<?php } ?>">SOMOS</a></li>
            </ul>

            <div class="col-md-3 text-end">
                <a href="../../apps/login" type="button" class="btn shadow-none text-white btn-lg mb-0">Iniciar sesión</a>
            </div>
        </header>
    </nav>

    <div class="bg-repeat">
        {{content}}    
    </div>

    <!--   Core JS Files   -->
    <script src="../../src/js/plugins/perfect-scrollbar.min.js"></script>
    <script src="../../src/js/plugins/smooth-scrollbar.min.js"></script>
    <script src="../../src/js/plugins/chartjs.min.js"></script>
    <script src="../../src/js/42d5adcbca.js" type="text/javascript"></script>

    <script src="../../src/js/constants.js?v=2.4.6.2" type="text/javascript"></script>
    <script src="../../src/js/alertCtrl.js?v=2.4.6.2" type="text/javascript"></script>
    <script src="../../src/js/jquery-3.5.1.min.js" type="text/javascript"></script>
    <script src="../../src/js/general.js?v=2.4.6.2" type="text/javascript"></script>

    <script>
        var win = navigator.platform.indexOf('Win') > -1;
        if (win && document.querySelector('#sidenav-scrollbar')) {
            var options = {
                damping: '0.5'
            }
            Scrollbar.init(document.querySelector('#sidenav-scrollbar'), options);
        }
    </script>

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