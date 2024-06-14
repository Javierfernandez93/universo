<h2>¡Hola! <b><?php echo $names; ?></b></h2>

<h3>Recientemente te registraste en <?php echo Site\SystemVar::_getValue("company_name");?></h3>

<h3>Puedes ingresar al sitio en cualquier momento desde la siguiente dirección <a href="https://www.universodejade.com/apps/admin">Acceder</a></h3>  

<h3>Tus datos de acceso son los siguientes</h3>
<h3>
    <ul class="list-group">
        <li>Email: <?php echo $email; ?></li>
        <li>Contraseña: <?php echo $password; ?></li>
    </ul>
</h3>

<h3>
    <b>
        Gracias de parte del equipo de <?php echo Site\SystemVar::_getValue("company_name");?>
    </b>
</h3>