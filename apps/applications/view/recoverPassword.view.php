<h3>Recuperar contraseña</h3>

<h3>
    Hemos recibido una petición para recuperar contraseña de <b><?php echo $email; ?></b>
</h3>

<h3>
    Para continuar por favor da clic en el siguiente enlace
</h3>
<h3>
    <a href="<?php echo HCStudio\Connection::getMainPath(); ?>/apps/login/newPassword?token=<?php echo $token;?>">Recuperar contraseña</a>
</h3>

<h3>
    <small>
        Si no has hecho la petición de recuperación de contraseña has caso omiso a éste mensaje
    </small>
</h3>