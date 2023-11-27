<h2>¡Felicidades <?php echo ucwords(trim($names));?>!</b></h2>

<h3>Tu cuenta de prueba ya fue liberada.</h3>

<h3>
    Usuario: <b><?php echo $user_name;?></b>
</h3>
<h3>
    Contraseña: <b><?php echo $password;?></b>
</h3>
<h3>
    Dirección de acceso: <b><?php echo $url;?></b>
</h3>

<h2>Puedes ver tus datos en tu oficina virtual en el menú "Pruebas"</h2>

<h3>
    <b>
        Gracias de parte del equipo de <?php echo Site\SystemVar::_getValue("company_name");?>
    </b>
</h3>