<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8" />
    
    <title>{{title}}</title>
    
    <link rel="icon" type="image/x-icon" href="../../src/img/meta.png">
    <link rel="apple-touch-icon" sizes="76x76" href="../../src/img/meta.png">
    <link rel="icon" type="image/png" href="../../src/img/favicon.png">
    <link rel="shortcut icon" href="../../src/img/favicon.png" />

    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=5" />
    
    <meta content="-" name="description" />
    <meta content="-" name="author" />

    <meta property="og:site_name" content="Universo">
    <meta property="og:title" content="Universo" />
    <meta property="og:description" content="-" />
    <meta property="og:image" itemprop="image" content="../../src/img/logo.png">
    <meta property="og:type" content="website" />
    <meta property="og:updated_time" content="1693339145" />
    <meta name="theme-color" content="#2D2250">   

    <!--     Fonts and icons     -->
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet" />
    <!-- Nucleo Icons -->
    
    <!-- Font Awesome Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.min.css">
    
    <link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;900&display=swap" rel="stylesheet">

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    
    <link rel="stylesheet" href="../../src/css/general.css?v=2.6.7" />
    
    <!-- CSS Files -->
    <link id="pagestyle" href="../../src/css/soft-ui-dashboard.min.css?v=2.4.5" rel="stylesheet" />
    <link id="pagestyle" href="../../src/css/soft-ui-dashboard-theme-light.min.css?v=2.4.6" rel="stylesheet" />
</head>

<body class="g-sidenav-show bg-light">
    <aside class="sidenav navbar p-3 navbar-vertical border-end navbar-expand-xs bg-light fixed-start animation-fall-down" style="--delay:50ms" id="sidenav-main">
        <div class="card card-body shadow-none border px-0">
            <div class="sidenav-header">
                <i class="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
                <a class="navbar-brand m-0 text-center py-0" href="https://universo.com" target="_blank">
                    <img src="../../src/img/logo-single-dark.svg" alt="logo" title="logo" class="img-fluid"/>
                </a>
            </div>
            
            <div class="collapse  navbar-collapse w-auto h-auto" id="sidenav-collapse-main">
                <ul class="navbar-nav">
                    <li class="nav-item my-3">
                        <div class="row justify-content-center">
                            <div class="col text-center">
                                <span class="badge bg-primary">asesor</span>
                            </div>
                        </div>
                    </li>
                    <li class="nav-item mt-3">
                        <h6 class="ps-4 ms-2 text-uppercase text-xs opacity-6 ">Menú principal</h6>
                    </li>
                    <?php if ($UserLogin->logged) { ?>
                        <li class="nav-item">
                            <a class="nav-link <?php if (in_array($route, [JFStudio\Router::Backoffice])) { ?>active<?php } ?>" href="../../apps/backoffice">
                                <i class="bi bi-cup-fill"></i>
                                <span data-translate="menu.backoffice" class="nav-link-text ms-1 fw-semiboldx"><?php echo JFStudio\Router::getName(JFStudio\Router::Backoffice); ?></span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link <?php if (in_array($route,[JFStudio\Router::Clients,JFStudio\Router::AdminClientAdd])) { ?>active<?php } ?>" href="../../apps/clients/">
                                <i class="bi bi-people-fill"></i>
                                <span  data-translate="menu.start" class="nav-link-text ms-1 fw-semiboldx">Mis clientes</span>
                            </a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link <?php if (in_array($route,[JFStudio\Router::Lead])) { ?>active<?php } ?>" href="../../apps/clients/leads">
                                <i class="bi bi-people-fill"></i>
                                <span  data-translate="menu.start" class="nav-link-text ms-1 fw-semiboldx">Mis prospectos</span>
                            </a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link <?php if ($route == JFStudio\Router::Commissions) { ?>active<?php } ?>" href="../../apps/commissions">
                                <i class="bi bi-percent"></i>
                                <span  data-translate="menu.start" class="nav-link-text ms-1 fw-semiboldx">Mis comisiones</span>
                            </a>
                        </li>
                        
                        <li class="nav-item">
                            <a class="nav-link <?php if ($route == JFStudio\Router::Tools) { ?>active<?php } ?>" href="../../apps/backoffice/tools">
                                <i class="bi bi-laptop-fill"></i>
                                <span  data-translate="menu.start" class="nav-link-text ms-1 fw-semiboldx">Herramientas</span>
                            </a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link <?php if ($route == JFStudio\Router::Help) { ?>active<?php } ?>" href="../../apps/ticket/">
                                <i class="bi bi-chat-left"></i>
                                <span  data-translate="menu.start" class="nav-link-text ms-1 fw-semiboldx">Soporte técnico</span>
                            </a>
                        </li>
            
                        <li class="nav-item mt-3">
                            <h6 data-translate="menu.account_settings" class="ps-4 ms-2 text-uppercase text-xs opacity-6 ">Ajustes de cuenta</h6>
                        </li>

                        <li class="nav-item">
                            <a data-bs-toggle="collapse" href="#profilePages" class="nav-link collapsed <?php if (in_array($route,[JFStudio\Router::Profile])) { ?>active<?php } ?>" aria-controls="profilePages" role="button" aria-expanded="false">
                                <i class="bi bi-people"></i>
                                <span data-translate="menu.profile" class="nav-link-text ms-1 fw-semiboxld">Perfil</span>
                            </a>
                            <div class="collapse" id="profilePages">
                                <ul class="nav ms-4">
                                    <li class="nav-item">
                                        <a class="nav-link " href="../../apps/backoffice/profile">
                                            <i class="bi bi-person-circle"></i>
                                            <span data-translate="menu.account_settings" class="sidenav-normal fw-semibold"> <?php echo JFStudio\Router::getName(JFStudio\Router::ProfileSetting); ?> </span>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link " href="../../apps/backoffice/?logout=true">
                                            <i class="bi bi-door-closed-fill"></i>
                                            <span data-translate="menu.logout" class="sidenav-normal fw-semibold"> Cerrar sesión </span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    <?php } ?>
                </ul>
            </div>
        </div>
        <div class="sidenav-footer d-none mx-3" id="appBannerLeft">
            <bannerleft-viewer></bannerleft-viewer>
        </div>
    </aside>
    <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg animation-fall-down" style="--delay:250ms">
        <nav class="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl <?php if ($floating_nav === true) { ?>bg-transparent position-absolute floating-nav w-100 z-index-2<?php } ?>">
            <div class="container py-2">
                <nav aria-label="breadcrumb">
                    <h4 class=" lead"><?php echo isset($routeTranslated) ? $routeTranslated : 'Site'; ?></h4>
                </nav>
                <?php if ($UserLogin->logged) { ?>
                    <div class="collapse navbar-collapse me-md-0 me-sm-4 mt-sm-0 mt-2" id="navbar">
                        <div class="ms-md-auto pe-md-3 d-flex align-items-center">

                        </div>
                        <ul class="navbar-nav justify-content-end">
                            <li class="nav-item d-none dropdown px-3 d-flex align-items-center">
                                <a href="../../apps/backoffice/notifications" class="nav-link p-0 fs-3 rounded-circle" id="dropdownMenuButton">
                                    <i class="fa fa-bell cursor-pointer" aria-hidden="true"></i>
                                </a>
                            </li>
                            <li class="nav-item pe-3 align-items-center">
                                <div class="row align-items-center">
                                    <div class="col">
                                        <div>
                                            <a class="fw-sembold  mb-n2" href="../../apps/backoffice"><?php echo $UserLogin->_data['user_data']['names']; ?></a>
                                        </div>
                                        <div><span class=" text-xs sans"><?php echo $UserLogin->email; ?></span></div>
                                    </div>
                                    <div class="col" id="appLanguage">
                                        <language-viewer></language-viewer>
                                    </div>
                                </div>                                
                            </li>
                            <li class="nav-item d-xl-none ps-3 pe-0 d-flex align-items-center">
                                <a href="javascript:;" class="nav-link  p-0">
                                </a>
                                <a href="javascript:;" class="nav-link text-body p-0" id="iconNavbarSidenav">
                                    <div class="sidenav-toggler-inner">
                                        <i class="sidenav-toggler-line"></i>
                                        <i class="sidenav-toggler-line"></i>
                                        <i class="sidenav-toggler-line"></i>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                <?php } ?>
            </div>
        </nav>
        
        <div class="container py-5">
            {{content}}
        </div>

        <footer class="footer fixesd-bottom p-3 row justify-content-center pt-5">
            <div class="col-12 col-xl-11">
                <div class="row align-items-center justify-content-lg-between">
                    <div class="col-lg-6 mb-lg-0 mb-4">
                        <div class="copyright  text-opacity-50 text-center text-sm text-lg-start">
                            © 2023,
                            made with <i class="fa fa-heart"></i> by
                            <a href="../../" class="font-weight-bold " target="_blank">Universo</a>
                            for a better web.
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <ul class="nav nav-footer justify-content-center justify-content-lg-end">
                            <li class="nav-item">
                                <a href="" class="nav-link  text-opacity-50" target="_blank">Universo</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    </main>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
    
    <!--   Core JS Files   -->
    <script src="../../src/js/plugins/perfect-scrollbar.min.js" type="text/javascript"></script>
    <script src="../../src/js/plugins/smooth-scrollbar.min.js" type="text/javascript"></script>
    <script src="../../src/js/plugins/chartjs.min.js" type="text/javascript"></script>
    <script src="../../src/js/42d5adcbca.js" type="text/javascript"></script>
    
    <script src="../../src/js/constants.js?v=1.1.0" type="text/javascript"></script>
    <script src="../../src/js/alertCtrl.min.js?v=1.1.0" type="text/javascript"></script>
    <script src="../../src/js/toastCtrl.js?v=1.1.0" type="text/javascript"></script>
    <script src="../../src/js/jquery-3.5.1.min.js" type="text/javascript"></script>
    <script src="../../src/js/general.js?v=1.1.0" type="text/javascript"></script>
    <!-- Github buttons -->

    <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>

    <!-- Github buttons -->
    <script src="../../src/js/buttons.min.js" type="text/javascript"></script>
    <script src="../../src/js/soft-ui-dashboard.js?v=1.1.0"></script>
    
    <script src="../../src/js/cookie.min.js?v=1.1.0" type="text/javascript"></script>
    <script src="../../src/js/vue.js?v=1.1.0" type="text/javascript"></script>
    <script src="../../src/js/language.vue.js?v=1.1.0" type="module"></script>
    
    {{js_scripts}}
    {{css_scripts}}
</body>
</html>