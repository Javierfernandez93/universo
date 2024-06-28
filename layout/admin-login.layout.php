<!doctype html>
<html lang="es">
    <head>
        <meta charset="utf-8" />
        <title>{{title}}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        
        <meta content="<?php echo Site\SystemVar::_getValue("company_name"); ?> | <?php echo Site\SystemVar::_getValue("title"); ?>" name="author" />
        <meta content="<?php echo Site\SystemVar::_getValue("description"); ?>" name="description" />
        <meta property="og:site_name" content="<?php echo Site\SystemVar::_getValue("company_name"); ?>">
        <meta property="og:title" content="<?php echo Site\SystemVar::_getValue("company_name"); ?> | <?php echo Site\SystemVar::_getValue("title"); ?>" />
        <meta property="og:description" content="<?php echo Site\SystemVar::_getValue("description"); ?>" />
        <meta property="og:image" itemprop="image" content="<?php echo HCStudio\Connection::getMainPath() ?>/src/img/jade-social.png">
        <meta property="og:image:type" content="image/jpeg">
        <meta property="og:image:width" content="300">
        <meta property="og:image:height" content="300">

        <link rel="icon" type="image/x-icon" href="../../src/img/favicon.png">

        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.3/font/bootstrap-icons.css">
        
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet" />
        <!-- Nucleo Icons -->
        <link href="../../src/css/nucleo-icons.css" rel="stylesheet" />
        <link href="../../src/css/nucleo-svg.css" rel="stylesheet" />
        <link href="../../src/css/animate.css" rel="stylesheet" />
        
        <link id="pagestyle" href="../../src/css/soft-ui-dashboard.css?v=1.0.7" rel="stylesheet" />
        <link href="../../src/css/general.css?v=1-3-1" rel="stylesheet" type="text/css">
        {{css_scripts}}
    </head>
    <body class="bg-gradient-special">
        
        {{content}}
        
        <script src="../../src/js/jquery-3.1.1.js" type="text/javascript"></script>
        <script src="../../src/js/general.js" type="text/javascript"></script>
        
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" crossorigin="anonymous"></script>
        <script src="../../src/js/vue.js?v=1.0.3" type="text/javascript"></script>

        {{js_scripts}}

        <footer class="fixed-bottom w-100 text-center py-3 fw-semibold text-white">
            © <script> document.write(new Date().getFullYear()) </script>, made with <i class="bi bi-heart"></i> by <a href="<?php echo HCStudio\Connection::getMainPath(); ?>" class="font-weight-bold text-white" target="_blank"><?php echo JFStudio\Layout::PROYECT_NAME; ?></a> for a better web.
        </footer>
    </body>
</html>