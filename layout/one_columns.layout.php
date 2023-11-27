<!doctype html>
<html lang="es">
    <head>
        <meta charset="utf-8" />
        <title>{{title}}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        
        <meta content="<?php echo JFStudio\Layout::PROYECT_NAME; ?>" name="description" />
        <meta content="<?php echo JFStudio\Layout::PROYECT_NAME; ?>" name="author" />

        <meta name="HandheldFriendly" content="True" />
        <meta name="theme-color" content="#2D2250">   

        <link rel="icon" type="image/png" href="../../src/img/favicon.png">
        
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.3/font/bootstrap-icons.css">
        
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet" />
        <!-- Nucleo Icons -->
        <link href="../../src/css/nucleo-icons.css" rel="stylesheet" />
        <link href="../../src/css/nucleo-svg.css" rel="stylesheet" />
        <link href="../../src/css/animate.css" rel="stylesheet" />
        
        <link href="<?php echo HCStudio\Connection::getMainPath();?>/src/css/general.css" rel="stylesheet" type="text/css">
        <link id="pagestyle" href="../../src/css/soft-ui-dashboard.css?v=1.3.1" rel="stylesheet" />
        {{css_scripts}}
    </head>
    <body>
        {{content}}
        
        <script src="<?php echo HCStudio\Connection::getMainPath();?>/src/js/jquery-3.1.1.js" type="text/javascript"></script>
        <script src="<?php echo HCStudio\Connection::getMainPath();?>/src/js/general.js" type="text/javascript"></script>
        
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" crossorigin="anonymous"></script>
        <script src="https://unpkg.com/vue@3"></script>

        {{js_scripts}}

        <footer class="fixed-bottom w-100 text-end p-3 fw-semibold">
            © <script> document.write(new Date().getFullYear()) </script>, made with <i class="bi bi-heart"></i> by <a href="<?php echo HCStudio\Connection::getMainPath(); ?>/" class="font-weight-bold text-primary" target="_blank"><?php echo JFStudio\Layout::PROYECT_NAME; ?></a> for a better web.
        </footer>
    </body>
</html>