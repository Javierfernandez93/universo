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
    
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    
    <!-- plugin css -->
    <link id="pagestyle" href="../../src/css/soft-ui-dashboard.css?v=1.0.1" rel="stylesheet" />
    <link id="pagestyle" href="../../src/css/landing-theme.css?v=1.0.1" rel="stylesheet" />
</head>

<!-- <body data-bs-theme="dark"> -->
<body data-bs-theme="dark">
    <nav class="navbar navbar-expand-lg shadow-none py-4 sticky-top">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">
                <img  src="../../src/img/logos/nuuktal.png" alt="logo" style="width: 12rem;"/>
            </a>
            <button class="navbar-toggler border border-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                
                <i class="bi bi-list-nested text-white"></i>
            </button>
            <div class="collapse oleo navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Inicio</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#imagine">Imagina Nuuktal</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#meaning">¿Qué significa Nuuktal?</a>
                    </li>
                    <li class="nav-item dropdown d-none">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Dropdown
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">Action</a></li>
                            <li><a class="dropdown-item" href="#">Another action</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#amenities">Amenidades</a>
                    </li>
                </ul>
                <div class="d-flex align-items-center">
                    <a target="_blank" href="https://maps.app.goo.gl/LfyNNHF283TUPdr88" class="me-3 text-uppercase text-md text-light">
                        <i class="bi bi-geo-alt-fill"></i>
                        <span>Conoce nuestra ubicación</span>
                    </a>
                    <a href="tel:9995013046" class="btn btn-primary btn-lg px-3" id="whatsapp-button">
                        <i class="bi bi-whatsapp"></i>
                        <span>+99 9501 3046</span>
                    </a>
                </div>
            </div>
        </div>
    </nav>

    <div class="">
        {{content}}    
    </div>


    <footer class="footer fixesd-bottom p-3 row justify-content-center pt-5">
        <div class="col-12 col-xl-11">
            <div class="row align-items-center justify-content-lg-between">
                <div class="col-lg-6 mb-lg-0 mb-4">
                    <div class="copyright text-center text-sm text-light text-lg-start">
                        © <script>
                            document.write(new Date().getFullYear())
                        </script>,
                        made with <i class="bi bi-heart"></i> by
                        <a href="https://www.universodejade.com/" class="font-weight-bold text-light" target="_blank">Site - admin site</a>
                        for a better web.
                    </div>
                </div>
                <div class="col-lg-6">
                    <ul class="nav nav-footer justify-content-center justify-content-lg-end">
                        <li class="nav-item">
                            <a href="" class="nav-link text-light" target="_blank">
                                <?php echo Site\SystemVar::_getValue("company_name"); ?>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>

    <script src="../../src/js/42d5adcbca.min.js" type="text/javascript"></script>

    <script src="../../src/js/alertCtrl.min.js?v=1.1.8" type="text/javascript"></script>
    <script src="../../src/js/jquery-3.5.1.min.js" type="text/javascript"></script>
    <script src="../../src/js/general.js?v=1.1.8" type="text/javascript"></script>

    <!-- Github buttons -->
    <script async defer src="../../src/js/buttons.min.js"></script>
    <script src="../../src/js/soft-ui-dashboard.min.js?v=1.1.8"></script>

    <script src="../../src/js/core/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    <script src="../../src/js/vue.js"></script>

    {{js_scripts}}
    {{css_scripts}}
</body>

</html>