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
    <!--     Fonts and icons     -->
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet" />
    <!-- Nucleo Icons -->
    <link rel="stylesheet" href="../../src/css/nucleo-icons.css" />
    <link rel="stylesheet" href="../../src/css/nucleo-svg.css" />
    <!-- Font Awesome Icons -->
    <link rel="stylesheet" href="../../src/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.3/font/bootstrap-icons.css">
    <link rel="stylesheet" href="../../src/css/nucleo-svg.css" />
    <!-- CSS Files -->
    
    <link id="pagestyle" href="../../src/css/soft-ui-dashboard.css?v=1.3.1" rel="stylesheet" />
    
    <link rel="stylesheet" href="../../src/css/general.css?v=1.3.1" />

    <link id="pagestyle" href="../../src/css/admin.min.css?v=1.3.1" rel="stylesheet" />
    {{css_scripts}}
</head>

<div class="bg-gradient-primary header-Site-signature" style="height: 0.3rem;">
</div>

<body class="g-sidenav-show bg-light">
    <aside class="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3" id="sidenav-main" data-color="danger">
        <div class="sidenav-header text-center">
            <i class="fas fa-times p-4 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
            <a class="navbar-brand text-primary pb-3 mb-3 text.center" href=" https://Sitegroup.io" target="_blank">
                <img src="../../src/img/logo.svg" alt="logo" class="h-100"/>
            </a>
        </div>
        
        <hr class="horizontal dark mt-4">

        <div class="collapse navbar-collapse w-auto h-100" id="sidenav-collapse-main">
            <ul class="navbar-nav nav-admin">
                <li class="nav-item">
                    <a class="nav-link" href="../../apps/backoffice">
                        <span class="badge me-2 d-flex justify-content-center align-items-center icon"><i class="bi bi-house-door"></i></span>
                        <span class="nav-link-text text-dark ms-1">Mi sitio</span>
                    </a>
                </li>

                <?php if ($UserSupport->hasPermission('list_dash')) { ?>
                    <li class="nav-item d-none">
                        <a class="nav-link <?php if (in_array($route, [JFStudio\Router::AdminDash, JFStudio\Router::AdminStats])) { ?>active<?php } ?>" href="../../apps/admin">
                            <span class="badge me-2 d-flex justify-content-center align-items-center icon"><i class="bi bi-house-door"></i></span>
                            <span class="nav-link-text text-dark ms-1"><?php echo JFStudio\Router::getName(JFStudio\Router::AdminDash); ?></span>
                        </a>
                    </li>
                <?php } ?>
                <?php if ($UserSupport->hasPermission('list_users')) { ?>
                    <li class="nav-item">
                        <a class="nav-link <?php if (in_array($route, [JFStudio\Router::AdminUsers,JFStudio\Router::AdminUserAdd,JFStudio\Router::AdminUserEdit])) { ?>active<?php } ?>" href="../../apps/admin-users">
                            <span class="badge me-2 d-flex justify-content-center align-items-center icon"><i class="bi bi-people"></i></span>
                            <span class="nav-link-text text-dark ms-1"><?php echo JFStudio\Router::getName(JFStudio\Router::AdminUsers); ?></span>
                        </a>
                    </li>
                <?php } ?>
                <?php if ($UserSupport->hasPermission('list_administrators')) { ?>
                    <li class="nav-item">
                        <a class="nav-link <?php if (in_array($route, [JFStudio\Router::AdminAdministrators, JFStudio\Router::AdminAdministratorsAdd, JFStudio\Router::AdminAdministratorsEdit])) { ?>active<?php } ?>" href="../../apps/admin-administrators">
                            <span class="badge me-2 d-flex justify-content-center align-items-center icon"><i class="bi bi-person-circle"></i></span>
                            <span class="nav-link-text text-dark ms-1"><?php echo JFStudio\Router::getName(JFStudio\Router::AdminAdministrators); ?></span>
                        </a>
                    </li>
                <?php } ?>
                <?php if (true) { ?>
                    <li class="nav-item">
                        <a class="nav-link <?php if (in_array($route, [JFStudio\Router::AdminAcademy])) { ?>active<?php } ?>" href="../../apps/admin-academy">
                            <span class="badge me-2 d-flex justify-content-center align-items-center icon"><i class="bi bi-telegram"></i></span>
                            <span class="nav-link-text text-dark ms-1"><?php echo JFStudio\Router::getName(JFStudio\Router::AdminAcademy); ?></span>
                        </a>
                    </li>
                <?php } ?>
                <?php if ($UserSupport->hasPermission('list_transactions')) { ?>
                    <li class="nav-item">
                        <a class="nav-link <?php if (in_array($route, [JFStudio\Router::AdminTransactions])) { ?>active<?php } ?>" href="../../apps/admin-transactions/">
                            <span class="badge me-2 d-flex justify-content-center align-items-center icon"><i class="bi bi-currency-exchange"></i></span>
                            <span class="nav-link-text text-dark ms-1">Pagar comisiones</span>
                        </a>
                    </li>
                <?php } ?>
                
                <?php if ($UserSupport->hasPermission('list_intents')) { ?>
                    <li class="nav-item">
                        <a class="nav-link <?php if (in_array($route, [JFStudio\Router::AdminIntent])) { ?>active<?php } ?>" href="../../apps/admin-intent/">
                            <span class="badge me-2 d-flex justify-content-center align-items-center icon"><i class="bi bi-robot"></i></span>
                            <span class="nav-link-text text-dark ms-1">Intents</span>
                        </a>
                    </li>
                <?php } ?>

                <?php if ($UserSupport->hasPermission('list_gains')) { ?>
                    <li class="nav-item">
                        <a class="nav-link <?php if (in_array($route, [JFStudio\Router::AdminGains])) { ?>active<?php } ?>" href="../../apps/admin-gains/all">
                            <span class="badge me-2 d-flex justify-content-center align-items-center icon"><i class="bi bi-person-circle"></i></span>
                            <span class="nav-link-text text-dark ms-1">Ganancias generales</span>
                        </a>
                    </li>
                <?php } ?>

                <?php if ($UserSupport->hasPermission('list_buys')) { ?>
                    <li class="nav-item">
                        <a class="nav-link <?php if (in_array($route, [JFStudio\Router::AdminBuys])) { ?>active<?php } ?>" href="../../apps/admin-buys">
                            <span class="badge me-2 d-flex justify-content-center align-items-center icon"><i class="bi bi-cart"></i></span>
                            <span class="nav-link-text text-dark ms-1"><?php echo JFStudio\Router::getName(JFStudio\Router::AdminBuys); ?></span>
                        </a>
                    </li>
                <?php } ?>

                <?php if ($UserSupport->hasPermission('list_buys')) { ?>
                    <li class="nav-item">
                        <a class="nav-link <?php if (in_array($route, [JFStudio\Router::AdminPaymentMethods])) { ?>active<?php } ?>" href="../../apps/admin-payment-methods">
                            <span class="badge me-2 d-flex justify-content-center align-items-center icon"><i class="bi bi-credit-card"></i></span>
                            <span class="nav-link-text text-dark ms-1"><?php echo JFStudio\Router::getName(JFStudio\Router::AdminPaymentMethods); ?></span>
                        </a>
                    </li>
                <?php } ?>

                <?php if ($UserSupport->hasPermission('list_cron')) { ?>
                    <li class="nav-item">
                        <a class="nav-link <?php if (in_array($route, [JFStudio\Router::AdminCron])) { ?>active<?php } ?>" href="../../apps/admin-cron">
                            <span class="badge me-2 d-flex justify-content-center align-items-center icon"><i class="bi bi-robot"></i></span>
                            <span class="nav-link-text text-dark ms-1"><?php echo JFStudio\Router::getName(JFStudio\Router::AdminCron); ?></span>
                        </a>
                    </li>
                <?php } ?>

                <?php if ($UserSupport->hasPermission('list_notices')) { ?>
                    <li class="nav-item">
                        <a class="nav-link <?php if (in_array($route, [JFStudio\Router::AdminNoticesAdd, JFStudio\Router::AdminNoticesEdit, JFStudio\Router::AdminNotices])) { ?>active<?php } ?>" href="../../apps/admin-news">
                            <span class="badge me-2 d-flex justify-content-center align-items-center icon"><i class="bi bi-newspaper"></i></span>
                            <span class="nav-link-text text-dark ms-1"><?php echo JFStudio\Router::getName(JFStudio\Router::AdminNotices); ?></span>
                        </a>
                    </li>
                <?php } ?>
                
                <?php if ($UserSupport->hasPermission('list_tickets')) { ?>
                    <li class="nav-item">
                        <a class="nav-link <?php if (in_array($route, [JFStudio\Router::AdminTicket])) { ?>active<?php } ?>" href="../../apps/admin-tickets">
                            <span class="badge me-2 d-flex justify-content-center align-items-center icon"><i class="bi bi-chat-left-fill"></i></span>
                            <span class="nav-link-text text-dark ms-1"><?php echo JFStudio\Router::getName(JFStudio\Router::AdminTicket); ?></span>
                        </a>
                    </li>
                <?php } ?>

                <?php if ($UserSupport->hasPermission('list_tools')) { ?>
                    <li class="nav-item">
                        <a class="nav-link <?php if (in_array($route, [JFStudio\Router::AdminTools])) { ?>active<?php } ?>" href="../../apps/admin-tools">
                            <span class="badge me-2 d-flex justify-content-center align-items-center icon"><i class="bi bi-chat-left-fill"></i></span>
                            <span class="nav-link-text text-dark ms-1"><?php echo JFStudio\Router::getName(JFStudio\Router::AdminTools); ?></span>
                        </a>
                    </li>
                <?php } ?>

                <?php if ($UserSupport->hasPermission('list_banners')) { ?>
                    <li class="nav-item">
                        <a class="nav-link <?php if (in_array($route, [JFStudio\Router::AdminBanner])) { ?>active<?php } ?>" href="../../apps/admin/banner">
                            <span class="badge me-2 d-flex justify-content-center align-items-center icon"><i class="bi bi-card-image"></i></span>
                            <span class="nav-link-text text-dark ms-1"><?php echo JFStudio\Router::getName(JFStudio\Router::AdminBanner); ?></span>
                        </a>
                    </li>
                <?php } ?>

                <?php if ($UserSupport->hasPermission('list_config')) { ?>
                    <li class="nav-item">
                        <a class="nav-link <?php if (in_array($route, [JFStudio\Router::AdminConfig])) { ?>active<?php } ?>" href="../../apps/admin-config">
                            <span class="badge me-2 d-flex justify-content-center align-items-center icon"><i class="bi bi-gear-fill"></i>></span>
                            <span class="nav-link-text text-dark ms-1"><?php echo JFStudio\Router::getName(JFStudio\Router::AdminConfig); ?></span>
                        </a>
                    </li>
                <?php } ?>

                <li class="nav-item mt-3">
                    <h6 class="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6">Sesión</h6>
                </li>

                <li class="nav-item">
                    <a class="nav-link" href="?adminLogout=true">
                        <span class="badge me-2 d-flex justify-content-center align-items-center icon"><i class="bi bi-door-closed"></i></span>
                        <span class="nav-link-text text-dark ms-1">Cerrar sesión</span>
                    </a>
                </li>
            </ul>
        </div>
        <div class="sidenav-footer mx-3 ">

        </div>
    </aside>
    <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">

        <nav class="navbar navbar-main navbar-expand-lg position-sticky mt-4 top-1 px-0 mx-4 border-radius-xl z-index-sticky shadow-none" id="navbarBlur" data-scroll="true">
            <div class="container-fluid py-1 px-3">
                <nav aria-label="breadcrumb">
                </nav>
                <div class="sidenav-toggler sidenav-toggler-inner d-xl-block d-none ">
                    <a href="javascript:;" class="nav-link p-0 text-body">
                        <div class="sidenav-toggler-inner">
                            <i class="sidenav-toggler-line"></i>
                            <i class="sidenav-toggler-line"></i>
                            <i class="sidenav-toggler-line"></i>
                        </div>
                    </a>
                </div>
                <div class="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
                    <ul class="navbar-nav  justify-content-end">
                        <li class="nav-item d-xl-none ps-3 d-flex align-items-center">
                            <a href="javascript:;" class="nav-link p-0 text-body" id="iconNavbarSidenav">
                                <div class="sidenav-toggler-inner">
                                    <i class="sidenav-toggler-line"></i>
                                    <i class="sidenav-toggler-line"></i>
                                    <i class="sidenav-toggler-line"></i>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <div class="row justify-content-center">
            <div class="row col-12 col-xl-11">
                {{content}}
            </div>
        </div>

        <footer class="container footer pt-3 fixed-bottom">
            <div class="container-fluid">
                <div class="row align-items-center justify-content-center">
                    <div class="col-auto text-center">
                        <div class="copyright text-center text-sm text-muted text-lg-start">
                            © <script>
                                document.write(new Date().getFullYear())
                            </script>,
                            made with <i class="bi bi-heart"></i> by
                            <a href="https://www.Sitegroup.io/" class="font-weight-bold" target="_blank">Site - admin site</a>
                            for a better web.
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </main>

    <script src="../../src/js/core/bootstrap.bundle.min.js" type="text/javascript"></script>
    <!--   Core JS Files   -->
    <script src="../../src/js/plugins/perfect-scrollbar.min.js" type="text/javascript"></script>
    <script src="../../src/js/plugins/smooth-scrollbar.min.js" type="text/javascript"></script>
    <script src="../../src/js/plugins/chartjs.min.js" type="text/javascript"></script>
    <script src="../../src/js/42d5adcbca.js" type="text/javascript"></script>
    <script src="../../src/js/jquery-3.1.1.js" type="text/javascript"></script>
    <script src="../../src/js/general.js?t=3" type="text/javascript"></script>
    <script src="../../src/js/alertCtrl.js?v=2.3.4" type="text/javascript"></script>

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
    <script src="../../src/js/soft-ui-dashboard.min.js?v=2.3.4.6"></script>

    <script src="../../src/js/vue.js"></script>

    {{js_scripts}}

</body>

</html>