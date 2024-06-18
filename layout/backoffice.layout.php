<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="apple-touch-icon" sizes="76x76" href="../../src/img/apple-icon.png">
    <link rel="icon" type="image/png" href="../../src/img/favicon.png">
    <title>
        {{title}}
    </title>

    <meta content="<?php echo Site\SystemVar::_getValue("company_name"); ?> | <?php echo Site\SystemVar::_getValue("title"); ?>" name="author" />
    <meta content="<?php echo Site\SystemVar::_getValue("description"); ?>" name="description" />
    <meta property="og:site_name" content="<?php echo Site\SystemVar::_getValue("company_name"); ?>">
    <meta property="og:title" content="<?php echo Site\SystemVar::_getValue("company_name"); ?> | <?php echo Site\SystemVar::_getValue("title"); ?>" />
    <meta property="og:description" content="<?php echo Site\SystemVar::_getValue("description"); ?>" />
    <meta property="og:image" itemprop="image" content="<?php echo HCStudio\Connection::getMainPath() ?>/src/img/jade-social.png">
    <meta property="og:image:type" content="image/jpeg">
    <meta property="og:image:width" content="300">
    <meta property="og:image:height" content="300">
    
    <!--     Fonts and icons     -->
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet" />
    <!-- Nucleo Icons -->
    <link rel="stylesheet" href="../../src/css/nucleo-icons.css" />
    <link rel="stylesheet" href="../../src/css/nucleo-svg.css" />
    <!-- Font Awesome Icons -->
    <link rel="stylesheet" href="../../src/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="../../src/css/nucleo-svg.css" />
    <!-- CSS Files -->
    
    <link id="pagestyle" href="../../src/css/soft-ui-dashboard.css?v=1.0.7" rel="stylesheet" />
    
    <link rel="stylesheet" href="../../src/css/admin-general.css?v=1.0.7" />

    <link id="pagestyle" href="../../src/css/admin.min.css?v=1.0.7" rel="stylesheet" />
    {{css_scripts}}
</head>

<body class="g-sidenav-show bg-gradient-special" data-bs-theme="light">
    <aside class="sidenav navbar navbar-vertical shadow-none navbar-expand-xs fixed-start" id="sidenav-main">
        <div class="sidenav-header p-4">
            <i class="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
            
            <a class="navbar-brand text-center mt-3 me-0" href="<?php echo HCStudio\Connection::getMainPath(); ?>" target="_blank">
                <img src="../../src/img/logo.svg" alt="logo" title="logo" class="w-100"/>
            </a>
        </div>
        
        <div class="collapse px-3 navbar-collapse w-auto h-auto" id="sidenav-collapse-main">
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
                        <a class="nav-link <?php if ($route == JFStudio\Router::Academy) { ?>active<?php } ?>" href="../../apps/academy">
                            <i class="bi bi-youtube"></i>
                            <span  data-translate="menu.start" class="nav-link-text ms-1 fw-semiboldx">Academia</span>
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
                            <i class="bi bi-ticket-fill"></i>
                            <span  data-translate="menu.start" class="nav-link-text ms-1 fw-semiboldx">Tickets</span>
                        </a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link <?php if ($route == JFStudio\Router::Quoter) { ?>active<?php } ?>" href="../../apps/quoter/">
                            <i class="bi bi-chat-left"></i>
                            <span  data-translate="menu.start" class="nav-link-text ms-1 fw-semiboldx">Cotizador</span>
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
    </aside>
    
    <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        <nav class="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl">
            <div class="container py-2">
                <nav aria-label="breadcrumb" class="w-100">
                    <h6 class="fs-4 font-weight-bolder ms-2"></h6>
                    <div id="topApp">
                        <!-- <lastsignedwidget-viewer></lastsignedwidget-viewer> -->
                    </div>
                </nav>
                <?php if ($UserLogin->logged) { ?>
                    <div class="collapse navbar-collapse me-md-0 me-sm-4 mt-sm-0 mt-2" id="navbar">
                        <div class="ms-md-auto pe-md-3 d-flex align-items-center">

                        </div>
                        <ul class="navbar-nav justify-content-end">
                            <li class="nav-item dropdown pe-3 d-flex align-items-center">
                                <a href="../../apps/backoffice/notifications" class="nav-link p-0 text-body">
                                    <i class="fa fa-bell cursor-pointer lead text-white" aria-hidden="true"></i>
                                </a>
                            </li>
                            <li class="nav-item dropdown pe-3 d-flex align-items-center">
                                <a href="../../apps/backoffice/?logout=true" class="nav-link p-0 text-body">
                                    <i class="bi bi-box-arrow-right lead text-white"></i>
                                </a>
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
                        <div class="copyright text-center text-sm text-muted text-lg-start">
                            © <script>
                                document.write(new Date().getFullYear())
                            </script>,
                            made with <i class="fa fa-heart"></i> by
                            <a href="https://www.dota.io/" class="font-weight-bold" target="_blank">DOTA</a>
                            for a better web.
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <ul class="nav nav-footer justify-content-center justify-content-lg-end">
                            <li class="nav-item">
                                <a href="" class="nav-link text-muted" target="_blank">DOTA</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    </main>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    
    <!--   Core JS Files   -->
    <script src="../../src/js/plugins/perfect-scrollbar.min.js" type="text/javascript"></script>
    <script src="../../src/js/plugins/smooth-scrollbar.min.js" type="text/javascript"></script>
    <script src="../../src/js/plugins/chartjs.min.js" type="text/javascript"></script>
    <script src="../../src/js/42d5adcbca.js" type="text/javascript"></script>
    
    <script src="../../src/js/constants.js?v=1.1.1" type="text/javascript"></script>
    <script src="../../src/js/alertCtrl.js?v=1.1.1" type="text/javascript"></script>
    <script src="../../src/js/toastCtrl.js?v=1.1.1" type="text/javascript"></script>
    <script fetchpriority="high" src="../../src/js/jquery-3.1.1.js" type="text/javascript"></script>

    <script src="../../src/js/general.js?v=1.1.1" type="text/javascript"></script>
    <!-- Github buttons -->
    

    <script type="module">
        import { ZuppiBot } from 'https://www.zuppi.io/src/js/chatbot.js?t=3';
        
        let zuppiBot = new ZuppiBot({
            api_key: '<?php echo Site\SystemVar::_getValue("key")?>',
        });
    </script>
    <div id="appChatBot"></div>
    
    <script>
        var win = navigator.platform.indexOf('Win') > -1;
        if (win && document.querySelector('#sidenav-scrollbar')) {
            var options = {
                damping: '0.5'
            }
            Scrollbar.init(document.querySelector('#sidenav-scrollbar'), options);
        }
    </script>

    <script src="https://cdn.jsdelivr.net/gh/ethereum/web3.js@1.0.0-beta.36/dist/web3.min.js" integrity="sha256-nWBTbvxhJgjslRyuAKJHK+XcZPlCnmIAAMixz6EefVk=" crossorigin="anonymous"></script>

    <!-- Github buttons -->
    <script src="../../src/js/buttons.js" type="text/javascript"></script>
    <script src="../../src/js/soft-ui-dashboard.min.js?v=1.1.1"></script>
    <!-- <script src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" type="text/javascript"></script> -->
    
    <script src="https://unpkg.com/axios/dist/axios.min.js" type="module"></script>
    <script src="../../src/js/vue.js?v=1.1.1" type="text/javascript"></script>
    <script src="../../src/js/top.vue.js?v=1.1.1" type="module"></script>
    <script src="../../src/js/notice.vue.js?v=1.1.1" type="module"></script>
    <script src="../../src/js/chat.vue.js?v=1.1.1" type="module"></script>
    <link rel="stylesheet" href="../../src/css/general.css?v=1.2.8" />


    {{js_scripts}}
    {{css_scripts}}
</body>
</html>