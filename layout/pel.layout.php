<!DOCTYPE html>
<html lang="es">
  <head>
  <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="apple-touch-icon" sizes="76x76" href="../../src/img/apple-icon.png">
    <link rel="icon" type="image/png" href="../../src/img/favicon.png">
    <link rel="shortcut icon" href="../../src/img/favicon.png" />

    <title>
        {{title}}
    </title>
    <!--     Fonts and icons     -->
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet" />
    <!-- Nucleo Icons -->
    <link rel="stylesheet" href="../../src/css/nucleo-icons.css" />
    <link rel="stylesheet" href="../../src/css/nucleo-svg.css" />
    <!-- Font Awesome Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css">
    
    <link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;900&display=swap" rel="stylesheet">

    <link href="../../src/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="../../src/css/z-loader.css" />
    <link rel="stylesheet" href="../../src/css/general.css?v=1.1.5" />
    <link rel="stylesheet" href="../../src/css/nucleo-svg.css" />
    <!-- CSS Files -->

    <link id="pagestyle" href="../../src/css/soft-ui-dashboard.css?v=1.1.5" rel="stylesheet" />
  </head>

  <div class="bg-gradient-primary header-Site-signature" style="height: 0.3rem;">
  </div>


  <body class="bg-light py-5">
    {{content}}

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    
    <!--   Core JS Files   -->
    <script src="../../src/js/plugins/perfect-scrollbar.min.js" type="text/javascript"></script>
    <script src="../../src/js/plugins/smooth-scrollbar.min.js" type="text/javascript"></script>
    <script src="../../src/js/plugins/chartjs.min.js" type="text/javascript"></script>
    <script src="../../src/js/42d5adcbca.js" type="text/javascript"></script>
    
    <script src="../../src/js/constants.js?v=1.1.5" type="text/javascript"></script>
    <script src="../../src/js/alertCtrl.js?v=1.1.5" type="text/javascript"></script>
    <script src="../../src/js/jquery-3.5.1.min.js" type="text/javascript"></script>
    <script src="../../src/js/general.js?v=1.1.5" type="text/javascript"></script>
    <!-- Github buttons -->
    
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
    <script src="../../src/js/soft-ui-dashboard.min.js?v=1.1.5"></script>
    
    <script src="../../src/js/cookie.js?v=1.1.5" type="text/javascript"></script>
    <script src="../../src/js/vue.js?v=1.1.5" type="text/javascript"></script>

    {{js_scripts}}
    {{css_scripts}}
  </body>
</html>