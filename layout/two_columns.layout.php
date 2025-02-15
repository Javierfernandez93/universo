<!doctype html>
<html lang="es">
    <head>
        <meta charset="utf-8" />
        <title>{{title}}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta content="Site" name="description" />
        <meta content="Site" name="author" />
        <link rel="icon" type="image/x-icon" href="../../src/img/favicon.png">

        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.3/font/bootstrap-icons.css">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.4/font/bootstrap-icons.css">
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet" />
        <!-- Nucleo Icons -->
        <link href="../../src/css/nucleo-icons.css" rel="stylesheet" />
        <link href="../../src/css/nucleo-svg.css" rel="stylesheet" />
        <link href="../../src/css/animate.css" rel="stylesheet" />
        
        <link id="pagestyle" href="../../src/css/soft-ui-dashboard.css?v=1.1.8" rel="stylesheet" />
        <link href="../../src/css/general.css?t=1" rel="stylesheet" type="text/css">
        {{css_scripts}}
    </head>
    <body class="bg-light-dark">
        {{content}}
        
        
        <script src="../../src/js/constants.js?v=1.1.8" type="text/javascript"></script>
        <script src="../../src/js/alertCtrl.js?v=1.1.8" type="text/javascript"></script>
        <script src="../../src/js/jquery-3.5.1.min.js" type="text/javascript"></script>
        <script src="../../src/js/general.js?v=1.1.8" type="text/javascript"></script>
        
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
        <script src="https://unpkg.com/vue@3"></script>

        {{js_scripts}}

        <footer class="fixed-bottom d-none w-100 text-center py-3 fw-semibold">
            © <script> document.write(new Date().getFullYear()) </script>, made with <i class="bi bi-heart"></i> by <a href="https://www.universodejade.com/" class="font-weight-bold" target="_blank"><?php echo Site\SystemVar::_getValue('company_name'); ?></a> for a better web.
        </footer>
    </body>
</html>