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
    
    <link id="pagestyle" href="../../src/css/soft-ui-dashboard-admin.css?v=1.3.1" rel="stylesheet" />
    
    <link rel="stylesheet" href="../../src/css/admin-general.css?v=1.3.1" />

    <link id="pagestyle" href="../../src/css/admin.min.css?v=1.3.1" rel="stylesheet" />
    {{css_scripts}}
</head>

<body class="g-sidenav-show bg-light">
    <aside class="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3" id="sidenav-main" data-color="danger">
        <div class="sidenav-header text-center">
            <i class="fas fa-times p-4 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
            <a class="navbar-brand text-primary pb-3 mb-3 text.center" href=" https://Sitegroup.io" target="_blank">
                <img src="../../src/img/logo-single-dark.svg" alt="logo" class="h-100"/>
            </a>
        </div>
    

        <div class="collapse navbar-collapse w-auto h-100" id="sidenav-collapse-main">
            <ul class="navbar-nav nav-admin">
                <li class="nav-item">
                    <a class="nav-link" href="../../apps/home">
                        <span class="badge me-2 d-flex justify-content-center align-items-center icon"><i class="bi bi-window"></i></span>
                        <span class="nav-link-text text-dark ms-1">Sitio <?php echo Site\SystemVar::_getValue("company_name");?></span>
                    </a>
                </li>

                <?php if ($UserSupport->hasPermission('list_dash')) { ?>
                    <li class="nav-item">
                        <a class="nav-link <?php if (in_array($route, [JFStudio\Router::AdminDash, JFStudio\Router::AdminStats])) { ?>active<?php } ?>" href="../../apps/admin">
                            <span class="badge me-2 d-flex justify-content-center align-items-center icon"><i class="bi bi-bar-chart-fill"></i></span>
                            <span class="nav-link-text text-dark ms-1">Dashboard</span>
                        </a>
                    </li>
                <?php } ?>
                
                <?php if ($UserSupport->hasPermission('list_users')) { ?>
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a data-bs-toggle="collapse" href="#users" class="nav-link <?php if (in_array($route, [JFStudio\Router::AdminUsers,JFStudio\Router::AdminUserAdd,JFStudio\Router::AdminUserEdit])) { ?>active<?php } ?>" aria-controls="users" role="button" aria-expanded="false">
                            <span class="badge me-2 d-flex justify-content-center align-items-center icon"><i class="bi bi-person-circle"></i></span>
                            <span class="nav-link-text ms-1">Vendedores</span>
                        </a>
                        <div class="collapse" id="users">
                        <ul class="nav ms-4 ps-3">
                            <li class="nav-item active">
                                <a class="nav-link active" href="../../apps/admin-users">
                                    <span class="sidenav-mini-icon"> D </span>
                                    <span class="sidenav-normal"> Listar </span>
                                </a>
                            </li>
                            <li class="nav-item active">
                                <a class="nav-link active" href="../../apps/admin-users/add">
                                    <span class="sidenav-mini-icon"> D </span>
                                    <span class="sidenav-normal"> Añadir </span>
                                </a>
                            </li>
                        </ul>
                    </ul>
                <?php } ?>
                <?php if ($UserSupport->hasPermission('list_clients')) { ?>
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a data-bs-toggle="collapse" href="#client" class="nav-link <?php if (in_array($route, [JFStudio\Router::Client,JFStudio\Router::AdminClientAdd])) { ?>active<?php } ?>" aria-controls="client" role="button" aria-expanded="false">
                            <span class="badge me-2 d-flex justify-content-center align-items-center icon"><i class="bi bi-people"></i></span>
                            <span class="nav-link-text ms-1">Clientes</span>
                        </a>
                        <div class="collapse" id="client">
                        <ul class="nav ms-4 ps-3">
                            <li class="nav-item active">
                                <a class="nav-link active" href="../../apps/admin-client">
                                    <span class="sidenav-mini-icon"> D </span>
                                    <span class="sidenav-normal"> Listar </span>
                                </a>
                            </li>
                            <li class="nav-item active">
                                <a class="nav-link active" href="../../apps/admin-client/add">
                                    <span class="sidenav-mini-icon"> D </span>
                                    <span class="sidenav-normal"> Añadir </span>
                                </a>
                            </li>
                        </ul>
                    </ul>
                <?php } ?>
                <?php if ($UserSupport->hasPermission('list_leads')) { ?>
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a data-bs-toggle="collapse" href="#leads" class="nav-link <?php if (in_array($route, [JFStudio\Router::Lead,JFStudio\Router::AdminLeadAdd])) { ?>active<?php } ?>" aria-controls="leads" role="button" aria-expanded="false">
                            <span class="badge me-2 d-flex justify-content-center align-items-center icon"><i class="bi bi-rocket-takeoff-fill"></i></span>
                            <span class="nav-link-text ms-1">Prospectos</span>
                        </a>
                        <div class="collapse" id="leads">
                        <ul class="nav ms-4 ps-3">
                            <li class="nav-item active">
                                <a class="nav-link active" href="../../apps/admin-lead">
                                    <span class="sidenav-mini-icon"> D </span>
                                    <span class="sidenav-normal"> Listar </span>
                                </a>
                            </li>
                            <li class="nav-item active">
                                <a class="nav-link active" href="../../apps/admin-lead/add">
                                    <span class="sidenav-mini-icon"> D </span>
                                    <span class="sidenav-normal"> Añadir </span>
                                </a>
                            </li>
                        </ul>
                    </ul>
                <?php } ?>

                <?php if ($UserSupport->hasPermission('list_administrators')) { ?>
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a data-bs-toggle="collapse" href="#administrators" class="nav-link <?php if (in_array($route, [JFStudio\Router::AdminAdministrators, JFStudio\Router::AdminAdministratorsAdd, JFStudio\Router::AdminAdministratorsEdit])) { ?>active<?php } ?>" aria-controls="administrators" role="button" aria-expanded="false">
                            <span class="badge me-2 d-flex justify-content-center align-items-center icon"><i class="bi bi-shield-fill-check"></i></span>
                            <span class="nav-link-text ms-1"><?php echo JFStudio\Router::getName(JFStudio\Router::AdminAdministrators); ?></span>
                        </a>
                        <div class="collapse" id="administrators">
                        <ul class="nav ms-4 ps-3">
                            <li class="nav-item active">
                                <a class="nav-link active" href="../../apps/admin-administrators">
                                    <span class="sidenav-mini-icon"> D </span>
                                    <span class="sidenav-normal"> Listar </span>
                                </a>
                            </li>
                            <li class="nav-item active">
                                <a class="nav-link active" href="../../apps/admin-administrators/add">
                                    <span class="sidenav-mini-icon"> D </span>
                                    <span class="sidenav-normal"> Añadir </span>
                                </a>
                            </li>
                            <li class="nav-item active">
                                <a class="nav-link active" href="../../apps/admin-administrators/permissions">
                                    <span class="sidenav-mini-icon"> D </span>
                                    <span class="sidenav-normal"> Permisos </span>
                                </a>
                            </li>
                        </ul>
                    </ul>
                <?php } ?>

                <?php if ($UserSupport->hasPermission('list_properties')) { ?>
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a data-bs-toggle="collapse" href="#properties" class="nav-link <?php if (in_array($route, [JFStudio\Router::AdminProperties, JFStudio\Router::AdminPropertiesAdd, JFStudio\Router::AdminPropertiesEdit])) { ?>active<?php } ?>" aria-controls="administrators" role="button" aria-expanded="false">
                            <span class="badge me-2 d-flex justify-content-center align-items-center icon"><i class="bi bi-building"></i></span>
                            <span class="nav-link-text ms-1"><?php echo JFStudio\Router::getName(JFStudio\Router::AdminProperties); ?></span>
                        </a>
                        <div class="collapse" id="properties">
                        <ul class="nav ms-4 ps-3">
                            <li class="nav-item active">
                                <a class="nav-link active" href="../../apps/admin-properties">
                                    <span class="sidenav-mini-icon"> D </span>
                                    <span class="sidenav-normal"> Listar </span>
                                </a>
                            </li>
                            <li class="nav-item active">
                                <a class="nav-link active" href="../../apps/admin-properties/add">
                                    <span class="sidenav-mini-icon"> D </span>
                                    <span class="sidenav-normal"> Añadir </span>
                                </a>
                            </li>
                        </ul>
                    </ul>
                <?php } ?>

                <?php if ($UserSupport->hasPermission('list_payments')) { ?>
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a data-bs-toggle="collapse" href="#payments" class="nav-link <?php if (in_array($route, [JFStudio\Router::AdminPayments])) { ?>active<?php } ?>" aria-controls="administrators" role="button" aria-expanded="false">
                            <span class="badge me-2 d-flex justify-content-center align-items-center icon"><i class="bi bi-list-check"></i></span>
                            <span class="nav-link-text ms-1"><?php echo JFStudio\Router::getName(JFStudio\Router::AdminPayments); ?></span>
                        </a>
                        <div class="collapse" id="payments">
                        <ul class="nav ms-4 ps-3">
                            <li class="nav-item active">
                                <a class="nav-link active" href="../../apps/admin-payments">
                                    <span class="sidenav-mini-icon"> D </span>
                                    <span class="sidenav-normal"> Listar </span>
                                </a>
                            </li>
                            <li class="nav-item active d-none">
                                <a class="nav-link active" href="../../apps/admin-payments/add">
                                    <span class="sidenav-mini-icon"> D </span>
                                    <span class="sidenav-normal"> Añadir </span>
                                </a>
                            </li>
                        </ul>
                    </ul>
                <?php } ?>
                <?php if ($UserSupport->hasPermission('list_tools')) { ?>
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a data-bs-toggle="collapse" href="#tools" class="nav-link <?php if (in_array($route, [JFStudio\Router::AdminTools, JFStudio\Router::AdminToolsAdd, JFStudio\Router::AdminToolsEdit])) { ?>active<?php } ?>" aria-controls="tools" role="button" aria-expanded="false">
                            <span class="badge me-2 d-flex justify-content-center align-items-center icon"><i class="bi bi-tools"></i></span>
                            <span class="nav-link-text ms-1"><?php echo JFStudio\Router::getName(JFStudio\Router::AdminTools); ?></span>
                        </a>
                        <div class="collapse" id="tools">
                        <ul class="nav ms-4 ps-3">
                            <li class="nav-item active">
                                <a class="nav-link active" href="../../apps/admin-tools">
                                    <span class="sidenav-mini-icon"> D </span>
                                    <span class="sidenav-normal"> Listar </span>
                                </a>
                            </li>
                            <li class="nav-item active">
                                <a class="nav-link active" href="../../apps/admin-tools/add">
                                    <span class="sidenav-mini-icon"> D </span>
                                    <span class="sidenav-normal"> Añadir </span>
                                </a>
                            </li>
                        </ul>
                    </ul>
                <?php } ?>
                <?php if ($UserSupport->hasPermission('list_real_state')) { ?>
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a data-bs-toggle="collapse" href="#realstate" class="nav-link <?php if (in_array($route, [JFStudio\Router::AdminRealState, JFStudio\Router::AdminRealStateAdd, JFStudio\Router::AdminRealStateEdit])) { ?>active<?php } ?>" aria-controls="realstate" role="button" aria-expanded="false">
                            <span class="badge me-2 d-flex justify-content-center align-items-center icon"><i class="bi bi-building-check"></i></span>
                            <span class="nav-link-text ms-1">Desarrolladoras</span>
                        </a>
                        <div class="collapse" id="realstate">
                        <ul class="nav ms-4 ps-3">
                            <li class="nav-item active">
                                <a class="nav-link active" href="../../apps/admin-realstate">
                                    <span class="sidenav-mini-icon"> D </span>
                                    <span class="sidenav-normal"> Listar </span>
                                </a>
                            </li>
                            <li class="nav-item active">
                                <a class="nav-link active" href="../../apps/admin-realstate/add">
                                    <span class="sidenav-mini-icon"> D </span>
                                    <span class="sidenav-normal"> Añadir </span>
                                </a>
                            </li>
                        </ul>
                    </ul>
                <?php } ?>
                <?php if ($UserSupport->hasPermission('list_banners')) { ?>
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a data-bs-toggle="collapse" href="#banner" class="nav-link <?php if (in_array($route, [JFStudio\Router::AdminBanner, JFStudio\Router::AdminBannerAdd, JFStudio\Router::AdminBannerEdit])) { ?>active<?php } ?>" aria-controls="banner" role="button" aria-expanded="false">
                            <span class="badge me-2 d-flex justify-content-center align-items-center icon"><i class="bi bi-card-image"></i></span>
                            <span class="nav-link-text ms-1">Banners</span>
                        </a>
                        <div class="collapse" id="banner">
                        <ul class="nav ms-4 ps-3">
                            <li class="nav-item active">
                                <a class="nav-link active" href="../../apps/admin-banner">
                                    <span class="sidenav-mini-icon"> D </span>
                                    <span class="sidenav-normal"> Listar </span>
                                </a>
                            </li>
                            <li class="nav-item active">
                                <a class="nav-link active" href="../../apps/admin-banner/add">
                                    <span class="sidenav-mini-icon"> D </span>
                                    <span class="sidenav-normal"> Añadir </span>
                                </a>
                            </li>
                        </ul>
                    </ul>
                <?php } ?>


                <?php if ($UserSupport->hasPermission('list_commissions')) { ?>
                    <li class="nav-item">
                        <a class="nav-link <?php if (in_array($route, [JFStudio\Router::AdminTransactions])) { ?>active<?php } ?>" href="../../apps/admin-transactions/">
                            <span class="badge me-2 d-flex justify-content-center align-items-center icon"><i class="bi bi-credit-card"></i></span>
                            <span class="nav-link-text text-dark ms-1">Comisiones</span>
                        </a>
                    </li>
                <?php } ?>

                <?php if ($UserSupport->hasPermission('list_tickets')) { ?>
                    <li class="nav-item">
                        <a class="nav-link <?php if (in_array($route, [JFStudio\Router::AdminTicket])) { ?>active<?php } ?>" href="../../apps/admin-tickets/">
                            <span class="badge me-2 d-flex justify-content-center align-items-center icon"><i class="bi bi-chat-left"></i></span>
                            <span class="nav-link-text text-dark ms-1">Soporte técnico</span>
                        </a>
                    </li>
                <?php } ?>


                <?php if ($UserSupport->hasPermission('list_logger')) { ?>
                    <li class="nav-item">
                        <a class="nav-link <?php if (in_array($route, [JFStudio\Router::AdminLoggs])) { ?>active<?php } ?>" href="../../apps/admin-logs/">
                            <span class="badge me-2 d-flex justify-content-center align-items-center icon"><i class="bi bi-clock-history"></i></span>
                            <span class="nav-link-text text-dark ms-1">Logs</span>
                        </a>
                    </li>
                <?php } ?>

                <?php if ($UserSupport->hasPermission('list_payment_methods')) { ?>
                    <li class="nav-item">
                        <a class="nav-link <?php if (in_array($route, [JFStudio\Router::AdminPaymentMethods])) { ?>active<?php } ?>" href="../../apps/admin-payment-methods">
                            <span class="badge me-2 d-flex justify-content-center align-items-center icon"><i class="bi bi-credit-card"></i></span>
                            <span class="nav-link-text text-dark ms-1">Métodos de pago</span>
                        </a>
                    </li>
                <?php } ?>

                <?php if ($UserSupport->hasPermission('list_config')) { ?>
                    <li class="nav-item">
                        <a class="nav-link <?php if (in_array($route, [JFStudio\Router::AdminConfig])) { ?>active<?php } ?>" href="../../apps/admin-config">
                            <span class="badge me-2 d-flex justify-content-center align-items-center icon"><i class="bi bi-gear-fill"></i></span>
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

    <main class="main-content container position-relative max-height-vh-100 h-100 border-radius-lg ">
        <nav class="navbar navbar-main navbar-expand-lg px-0 mx-4 border-radius-xl shadow-none" id="navbarBlur" navbar-scroll="true">
            <div class="container-fluid py-1 px-3">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                    <li class="breadcrumb-item text-sm"><a class="opacity-5 text-dark" href="javascript:;">Páginas</a></li>
                    <li class="breadcrumb-item text-sm text-dark active" aria-current="page"><?php echo JFStudio\Router::getName($route)?></li>
                </ol>
                <h6 class="font-weight-bolder mb-0"><?php echo JFStudio\Router::getName($route)?></h6>
            </nav>
            <div class="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
                <div class="ms-md-auto pe-md-3 d-flex align-items-center">
                    <div class="input-group">
                        <span class="input-group-text text-body"><i class="fas fa-search" aria-hidden="true"></i></span>
                        <input type="text" class="form-control" placeholder="Type here...">
                    </div>
                </div>
                <ul class="navbar-nav  justify-content-end">
                    <li class="nav-item d-flex align-items-center">
                        <a href="javascript:;" class="nav-link font-weight-bold px-0 text-body">
                        <i class="fa fa-user me-sm-1" aria-hidden="true"></i>
                        <span class="d-sm-inline d-none">Sign In</span>
                        </a>
                    </li>
                    <li class="nav-item d-xl-none ps-3 d-flex align-items-center">
                        <a href="javascript:;" class="nav-link p-0 text-body" id="iconNavbarSidenav">
                        <div class="sidenav-toggler-inner">
                            <i class="sidenav-toggler-line"></i>
                            <i class="sidenav-toggler-line"></i>
                            <i class="sidenav-toggler-line"></i>
                        </div>
                        </a>
                    </li>
                    <li class="nav-item px-3 d-flex align-items-center">
                        <a href="javascript:;" class="nav-link p-0 text-body">
                        <i class="fa fa-cog fixed-plugin-button-nav cursor-pointer" aria-hidden="true"></i>
                        </a>
                    </li>
                    <li class="nav-item dropdown pe-2 d-flex align-items-center">
                        <a href="javascript:;" class="nav-link p-0 text-body" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="fa fa-bell cursor-pointer" aria-hidden="true"></i>
                        </a>
                        <ul class="dropdown-menu  dropdown-menu-end  px-2 py-3 me-sm-n4" aria-labelledby="dropdownMenuButton">
                        <li class="mb-2">
                            <a class="dropdown-item border-radius-md" href="javascript:;">
                                <div class="d-flex py-1">
                                    <div class="my-auto">
                                    <img src="../assets/img/team-2.jpg" class="avatar avatar-sm  me-3 ">
                                    </div>
                                    <div class="d-flex flex-column justify-content-center">
                                    <h6 class="text-sm font-weight-normal mb-1">
                                        <span class="font-weight-bold">New message</span> from Laur
                                    </h6>
                                    <p class="text-xs text-secondary mb-0 ">
                                        <i class="fa fa-clock me-1" aria-hidden="true"></i>
                                        13 minutes ago
                                    </p>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li class="mb-2">
                            <a class="dropdown-item border-radius-md" href="javascript:;">
                                <div class="d-flex py-1">
                                    <div class="my-auto">
                                    <img src="../assets/img/small-logos/logo-spotify.svg" class="avatar avatar-sm bg-gradient-dark  me-3 ">
                                    </div>
                                    <div class="d-flex flex-column justify-content-center">
                                    <h6 class="text-sm font-weight-normal mb-1">
                                        <span class="font-weight-bold">New album</span> by Travis Scott
                                    </h6>
                                    <p class="text-xs text-secondary mb-0 ">
                                        <i class="fa fa-clock me-1" aria-hidden="true"></i>
                                        1 day
                                    </p>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a class="dropdown-item border-radius-md" href="javascript:;">
                                <div class="d-flex py-1">
                                    <div class="avatar avatar-sm bg-gradient-secondary  me-3  my-auto">
                                    <svg width="12px" height="12px" viewBox="0 0 43 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                        <title>credit-card</title>
                                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                            <g transform="translate(-2169.000000, -745.000000)" fill="#FFFFFF" fill-rule="nonzero">
                                                <g transform="translate(1716.000000, 291.000000)">
                                                <g transform="translate(453.000000, 454.000000)">
                                                    <path class="color-background" d="M43,10.7482083 L43,3.58333333 C43,1.60354167 41.3964583,0 39.4166667,0 L3.58333333,0 C1.60354167,0 0,1.60354167 0,3.58333333 L0,10.7482083 L43,10.7482083 Z" opacity="0.593633743"></path>
                                                    <path class="color-background" d="M0,16.125 L0,32.25 C0,34.2297917 1.60354167,35.8333333 3.58333333,35.8333333 L39.4166667,35.8333333 C41.3964583,35.8333333 43,34.2297917 43,32.25 L43,16.125 L0,16.125 Z M19.7083333,26.875 L7.16666667,26.875 L7.16666667,23.2916667 L19.7083333,23.2916667 L19.7083333,26.875 Z M35.8333333,26.875 L28.6666667,26.875 L28.6666667,23.2916667 L35.8333333,23.2916667 L35.8333333,26.875 Z"></path>
                                                </g>
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                    </div>
                                    <div class="d-flex flex-column justify-content-center">
                                    <h6 class="text-sm font-weight-normal mb-1">
                                        Payment successfully completed
                                    </h6>
                                    <p class="text-xs text-secondary mb-0 ">
                                        <i class="fa fa-clock me-1" aria-hidden="true"></i>
                                        2 days
                                    </p>
                                    </div>
                                </div>
                            </a>
                        </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>

        {{content}}

        <footer class="container footer pt-3 sticky">
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
    <script src="../../src/js/toastCtrl.js?v=2.4.3" type="text/javascript"></script>
    <script src="../../src/js/alertCtrl.js?v=2.4.3" type="text/javascript"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-select@1.14.0-beta2/dist/css/bootstrap-select.min.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap-select@1.14.0-beta2/dist/js/bootstrap-select.min.js"></script>
    
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
    <script src="../../src/js/soft-ui-dashboard.min.js?v=2.4.3.6"></script>

    <script src="../../src/js/vue.js"></script>

    {{js_scripts}}

</body>

</html>