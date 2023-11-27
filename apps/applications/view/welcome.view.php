<h2>¡Hola! <b><?php echo $names; ?></b></h2>

<h4>
    Bienvenido a <?php echo Site\SystemVar::_getValue("company_name");?>, tu puerta de entrada a un mundo de oportunidades financieras. Estamos emocionados de tenerte a bordo. Aquí tienes tres pasos para comenzar:
</h4>

<h4>
    Explora nuestros cursos: Descubre la gama de cursos diseñados para ayudarte a ganar dinero y alcanzar tus objetivos financieros.
</h4>
<h4>
    Únete a la comunidad: Conéctate con otros miembros, comparte tus experiencias y aprende de expertos en nuestro foro en línea.
</h4>
<h4>
    Soporte personalizado: Si necesitas ayuda o tienes preguntas, estamos aquí para ti. Contáctanos en <?php echo Site\SystemVar::_getValue("company_email");?> o visita nuestro sitio web.
</h4>


<h3>
    Por favor para verificar tu cuenta haz clic <a href="<?php echo HCStudio\Connection::getMainPath(); ?>/apps/login/verify?secret=<?php echo $secret;?>&email=<?php echo $email;?>">aquí</a>
</h3>

<h3>
    <b>
        Gracias de parte del equipo de <?php echo Site\SystemVar::_getValue("company_name");?>
    </b>
</h3>