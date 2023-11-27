<h3>Site tiene un nuevo cliente para ti ! </h3>

<h3>Exma Trading porque confiamos en ti, enviamos los datos del siguiente cliente para apertura su cuenta </h3>

<h3>
    Nombre completo:
    <b><?php echo ucwords(strtolower($names));?></b>
</h3>
<h3>
    Correo electrónico de registro:
    <b><?php echo $email;?></b>
</h3>
<h3>
    Hash de la transacción:
    <b><?php echo $tx_id;?></b> USDT.TRC20
</h3>
<h3>
    Número de su cuenta de trading:
    <b><?php echo $account;?></b>
</h3>
<h3>
    Fondeado:
    <b>$ <?php echo $amountReal;?></b>
</h3>
<h3>
    Tipo de servicio o producto que desea:
    <b><?php echo $type;?> 

    <?php if($mam_type) { ?>
        - (<?php echo $mam_type;?>)
    <?php } ?>

    (operada por Alpha Investor)
    </b>
</h3>

<h3>Site</h3>