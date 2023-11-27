-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql.Sitegroup.io
-- Generation Time: Nov 04, 2023 at 12:32 PM
-- Server version: 8.0.28-0ubuntu0.20.04.3
-- PHP Version: 8.1.2-1ubuntu2.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `app_Site`
--

-- --------------------------------------------------------

--
-- Table structure for table `api_credential`
--

CREATE TABLE `api_credential` (
  `api_credential_id` int NOT NULL,
  `user_login_id` int NOT NULL,
  `api_key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `api_secret` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `create_date` int NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `api_credential`
--

INSERT INTO `api_credential` (`api_credential_id`, `user_login_id`, `api_key`, `api_secret`, `create_date`, `status`) VALUES
(1, 1, 'y7pTc0qugK61YmWl', 'FKKQq+qBljSwlATRveDXAhF96m0nrkNb2k2IDU6XJg5CWLbZ6L/WVmN7X2lSVkF2ZTvz4XPhcgsDQiUm+yb7PSq5+lSDLdvpaqCqcE9GeRWHEluxsocET/vf36BBQtCN:VEFMRU5UT1VNQlJFTExBMg==', 1673916214, 1);

-- --------------------------------------------------------

--
-- Table structure for table `banner`
--

CREATE TABLE `banner` (
  `banner_id` int NOT NULL,
  `position` int NOT NULL,
  `link` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `create_date` int NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `banner`
--

INSERT INTO `banner` (`banner_id`, `position`, `link`, `image`, `create_date`, `status`) VALUES
(1, 1, 'www.google.com', '../../src/files/img/banners/1699066290.png', 1663615136, 1),
(2, 2, 'www.google.com', '../../src/files/img/banners/1699066420.png', 1663615136, 1);

-- --------------------------------------------------------

--
-- Table structure for table `banner_per_campaign`
--

CREATE TABLE `banner_per_campaign` (
  `banner_per_campaign_id` int NOT NULL,
  `campaign_banner_per_user_id` int NOT NULL,
  `catalog_banner_id` int NOT NULL,
  `source` varchar(255) NOT NULL,
  `link` text NOT NULL,
  `create_date` int NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `buy_per_user`
--

CREATE TABLE `buy_per_user` (
  `buy_per_user_id` int NOT NULL,
  `user_login_id` int NOT NULL,
  `user_support_id` int NOT NULL DEFAULT '0',
  `invoice_id` varchar(255) NOT NULL,
  `item` text NOT NULL,
  `amount` float NOT NULL,
  `fee` float NOT NULL DEFAULT '0',
  `catalog_payment_method_id` int NOT NULL,
  `catalog_currency_id` int NOT NULL,
  `shipping` float NOT NULL DEFAULT '0',
  `checkout_data` text NOT NULL,
  `ipn_data` text NOT NULL,
  `create_date` int NOT NULL,
  `approved_date` int NOT NULL,
  `catalog_validation_method_id` int NOT NULL DEFAULT '0',
  `status` int NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `campaign_banner_per_user`
--

CREATE TABLE `campaign_banner_per_user` (
  `campaign_banner_per_user_id` int NOT NULL,
  `user_login_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `country_ids` text NOT NULL,
  `create_date` int NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `campaign_banner_per_user`
--

INSERT INTO `campaign_banner_per_user` (`campaign_banner_per_user_id`, `user_login_id`, `name`, `description`, `country_ids`, `create_date`, `status`) VALUES
(1, 1, 'Evox campaña 2023', '', '', 1627354516, 1);

-- --------------------------------------------------------

--
-- Table structure for table `campaign_email`
--

CREATE TABLE `campaign_email` (
  `campaign_email_id` int NOT NULL,
  `catalog_mail_controller_id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_estonian_ci NOT NULL,
  `create_date` int NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `catalog_banner`
--

CREATE TABLE `catalog_banner` (
  `catalog_banner_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `position` int NOT NULL,
  `width` float NOT NULL,
  `height` float NOT NULL,
  `create_date` int NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `catalog_banner`
--

INSERT INTO `catalog_banner` (`catalog_banner_id`, `name`, `image`, `position`, `width`, `height`, `create_date`, `status`) VALUES
(1, 'Superior izquierdo', '../../src/img/banners/position/1.svg', 1, 690, 160, 1627354516, 1),
(2, 'Superior derecho', '../../src/img/banners/position/2.svg', 2, 690, 160, 1627354516, 1),
(3, 'Inferior izquierdo', '../../src/img/banners/position/3.svg', 3, 218, 420, 1627354516, 1),
(4, 'WhatsApp izquierdo', '../../src/img/banners/position/3.svg', 4, 218, 420, 1627354516, 0),
(5, 'WhatsApp derecho', '../../src/img/banners/position/3.svg', 5, 218, 420, 1627354516, 0);

-- --------------------------------------------------------

--
-- Table structure for table `catalog_bridge_buy_type`
--

CREATE TABLE `catalog_bridge_buy_type` (
  `catalog_bridge_buy_type_id` int NOT NULL,
  `type` varchar(255) NOT NULL,
  `create_date` int NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `catalog_bridge_buy_type`
--

INSERT INTO `catalog_bridge_buy_type` (`catalog_bridge_buy_type_id`, `type`, `create_date`, `status`) VALUES
(1, 'Bridge Funds', 1663615136, 1),
(2, 'PAMM', 1663615136, 1);

-- --------------------------------------------------------

--
-- Table structure for table `catalog_broker`
--

CREATE TABLE `catalog_broker` (
  `catalog_broker_id` int NOT NULL,
  `broker` varchar(255) NOT NULL,
  `create_date` int NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `catalog_broker`
--

INSERT INTO `catalog_broker` (`catalog_broker_id`, `broker`, `create_date`, `status`) VALUES
(1, 'Bridge', 1663615136, 1),
(2, 'Exma', 1663615136, 1);

-- --------------------------------------------------------

--
-- Table structure for table `catalog_campaign`
--

CREATE TABLE `catalog_campaign` (
  `catalog_campaign_id` int NOT NULL,
  `utm` varchar(255) NOT NULL,
  `create_date` int NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `catalog_campaign`
--

INSERT INTO `catalog_campaign` (`catalog_campaign_id`, `utm`, `create_date`, `status`) VALUES
(1, 'join', 1627354516, 1);

-- --------------------------------------------------------

--
-- Table structure for table `catalog_commission`
--

CREATE TABLE `catalog_commission` (
  `catalog_commission_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `amount` float NOT NULL,
  `is_percentaje` int NOT NULL DEFAULT '1',
  `catalog_commission_type_id` int NOT NULL,
  `level` int NOT NULL,
  `create_date` int NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `catalog_commission`
--

INSERT INTO `catalog_commission` (`catalog_commission_id`, `name`, `amount`, `is_percentaje`, `catalog_commission_type_id`, `level`, `create_date`, `status`) VALUES
(1, 'Bono Patrocinio', 10, 1, 1, 1, 1663615136, 1),
(2, 'Bono Unilevel', 5, 1, 1, 2, 1663615136, 1),
(3, 'Bono Unilevel', 10, 1, 1, 3, 1663615136, 1);

-- --------------------------------------------------------

--
-- Table structure for table `catalog_commission_type`
--

CREATE TABLE `catalog_commission_type` (
  `catalog_commission_type_id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `commission_type` varchar(255) NOT NULL,
  `create_date` int NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `catalog_commission_type`
--

INSERT INTO `catalog_commission_type` (`catalog_commission_type_id`, `title`, `commission_type`, `create_date`, `status`) VALUES
(1, 'PayBusiness', 'paybusiness', 1663615136, 1),
(2, 'PayAcademy', 'payacademy', 1663615136, 1);

-- --------------------------------------------------------

--
-- Table structure for table `catalog_conference`
--

CREATE TABLE `catalog_conference` (
  `catalog_conference_id` int NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `create_date` int NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `catalog_conference`
--

INSERT INTO `catalog_conference` (`catalog_conference_id`, `title`, `create_date`, `status`) VALUES
(1, 'Zoom', 1663615136, 1);

-- --------------------------------------------------------

--
-- Table structure for table `catalog_course`
--

CREATE TABLE `catalog_course` (
  `catalog_course_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `create_date` int NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `catalog_course`
--

INSERT INTO `catalog_course` (`catalog_course_id`, `name`, `create_date`, `status`) VALUES
(1, 'Marketing Digital', 1627354516, 1),
(2, 'Ilustración Digital', 1627354516, 1),
(3, 'Liderazgo', 1627354516, 1),
(4, 'Soft Skills', 1627354516, 1),
(5, 'Diseño Gráfico', 1627354516, 1),
(6, 'Dibujo y pintura', 1627354516, 1),
(7, 'Transformación digital e innovación', 1627354516, 1),
(8, 'Data y Analítica', 1627354516, 1),
(9, 'Ventas', 1627354516, 1),
(10, 'Diseño de Productos', 1627354516, 1),
(11, 'Fotografía', 1627354516, 1),
(12, 'Video', 1627354516, 1),
(13, 'Productividad y software', 1627354516, 1),
(14, 'Emprendimiento y negocios', 1627354516, 1),
(15, 'Estilo de vida', 1627354516, 1),
(16, 'Manualidades y cocina', 1627354516, 1),
(17, 'Desarrollo web y tecnología', 1627354516, 1),
(18, 'Modelado y animación 3D', 1627354516, 1),
(19, 'Animación 2D', 1627354516, 1),
(20, 'Administración y finanzas', 1627354516, 1),
(21, 'Servicio y atención al cliente', 1627354516, 1),
(22, 'Arquitectura digital', 1627354516, 1),
(23, 'Marketing Digital', 1627354516, 1),
(24, 'Ilustración Digital', 1627354516, 1),
(25, 'Liderazgo', 1627354516, 1),
(26, 'Soft Skills', 1627354516, 1),
(27, 'Diseño Gráfico', 1627354516, 1),
(28, 'Dibujo y pintura', 1627354516, 1),
(29, 'Transformación digital e innovación', 1627354516, 1),
(30, 'Data y Analítica', 1627354516, 1),
(31, 'Ventas', 1627354516, 1),
(32, 'Diseño de Productos', 1627354516, 1),
(33, 'Fotografía', 1627354516, 1),
(34, 'Video', 1627354516, 1),
(35, 'Productividad y software', 1627354516, 1),
(36, 'Emprendimiento y negocios', 1627354516, 1),
(37, 'Estilo de vida', 1627354516, 1),
(38, 'Manualidades y cocina', 1627354516, 1),
(39, 'Desarrollo web y tecnología', 1627354516, 1),
(40, 'Modelado y animación 3D', 1627354516, 1),
(41, 'Animación 2D', 1627354516, 1),
(42, 'Administración y finanzas', 1627354516, 1),
(43, 'Servicio y atención al cliente', 1627354516, 1),
(44, 'Arquitectura digital', 1627354516, 1),
(45, 'Forex y Criptomonedas', 1627354516, 1),
(46, 'ATI - Asistente de TRADING inteligente', 1627354516, 1),
(47, 'Índices sintéticos', 1627354516, 1);

-- --------------------------------------------------------

--
-- Table structure for table `catalog_course_type`
--

CREATE TABLE `catalog_course_type` (
  `catalog_course_type_id` int NOT NULL,
  `type` varchar(255) NOT NULL,
  `create_date` int NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `catalog_course_type`
--

INSERT INTO `catalog_course_type` (`catalog_course_type_id`, `type`, `create_date`, `status`) VALUES
(1, 'Standar', 1663615136, 1),
(2, 'Elite', 1663615136, 1);

-- --------------------------------------------------------

--
-- Table structure for table `catalog_currency`
--

CREATE TABLE `catalog_currency` (
  `catalog_currency_id` int NOT NULL,
  `image` varchar(255) NOT NULL,
  `currency` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `create_date` int NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `catalog_currency`
--

INSERT INTO `catalog_currency` (`catalog_currency_id`, `image`, `currency`, `description`, `code`, `create_date`, `status`) VALUES
(1, '', 'BTC', 'Bitcoin', '', 1627354516, 1),
(2, '', 'BCH', 'Bitcoin Cash', '', 1627354516, 1),
(3, '', 'ETH', 'Ethereum', '', 1627354516, 1),
(4, '../../src/img/catalogCurrencies/4.png', 'USDT.BEP20	', 'Tether USD (BSC Chain)\n', '', 1627354516, 1),
(5, '', 'USDT.TRC20	', 'Tether USD (Tron/TRC20)', '', 1627354516, 1),
(6, '', 'BTC', 'Bitcoin ', '', 1627354516, 1),
(7, '', 'LTC', 'LiteCoin', '', 1627354516, 1),
(8, '', 'USD', 'Dollar', '', 1627354516, 1),
(9, '', 'TRX', 'TRX', '', 1627354516, 1);

-- --------------------------------------------------------

--
-- Table structure for table `catalog_level`
--

CREATE TABLE `catalog_level` (
  `catalog_level_id` int NOT NULL,
  `level_name` varchar(255) NOT NULL,
  `amount` int NOT NULL,
  `create_date` int NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `catalog_level`
--

INSERT INTO `catalog_level` (`catalog_level_id`, `level_name`, `amount`, `create_date`, `status`) VALUES
(1, 'Primer nivel', 7, 1627354516, 1),
(2, 'Segundo nivel', 49, 1627354516, 1),
(3, 'Tercer nivel', 343, 1627354516, 1),
(4, 'Cuarto nivel', 2401, 1627354516, 1),
(5, 'Quinto nivel', 16807, 1627354516, 1),
(6, 'Sexto nivel', 117649, 1627354516, 1),
(7, 'Séptimo nivel', 823543, 1627354516, 1);

-- --------------------------------------------------------

--
-- Table structure for table `catalog_mail_controller`
--

CREATE TABLE `catalog_mail_controller` (
  `catalog_mail_controller_id` int NOT NULL,
  `capacity` int DEFAULT NULL,
  `mail` varchar(80) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(40) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `host` varchar(40) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `sender` varchar(255) NOT NULL,
  `port` varchar(5) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `protocol` enum('ssl','tls') CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `active` enum('-1','0','1') CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `catalog_mail_controller`
--

INSERT INTO `catalog_mail_controller` (`catalog_mail_controller_id`, `capacity`, `mail`, `password`, `host`, `sender`, `port`, `protocol`, `active`) VALUES
(1, 0, 'Sitecontactmail@gmail.com', 'svcsrjehpuonksob', 'smtp.gmail.com', 'Site', '587', 'tls', '1');

-- --------------------------------------------------------

--
-- Table structure for table `catalog_membership`
--

CREATE TABLE `catalog_membership` (
  `catalog_membership_id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `target` float NOT NULL,
  `package_id` int NOT NULL,
  `create_date` int NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `catalog_membership`
--

INSERT INTO `catalog_membership` (`catalog_membership_id`, `title`, `target`, `package_id`, `create_date`, `status`) VALUES
(1, 'Membersía 20 USDT', 40, 1, 1663615136, 1),
(2, 'Membersía 40 USDT', 80, 0, 1663615136, 1);

-- --------------------------------------------------------

--
-- Table structure for table `catalog_multimedia`
--

CREATE TABLE `catalog_multimedia` (
  `catalog_multimedia_id` int NOT NULL,
  `multimedia` varchar(255) NOT NULL,
  `create_date` int NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `catalog_multimedia`
--

INSERT INTO `catalog_multimedia` (`catalog_multimedia_id`, `multimedia`, `create_date`, `status`) VALUES
(1, 'Texto', 1664387035, 1),
(2, 'Audio', 1664387035, 1),
(3, 'Video', 1664387035, 1),
(4, 'Html', 1664387035, 1);

-- --------------------------------------------------------

--
-- Table structure for table `catalog_notice`
--

CREATE TABLE `catalog_notice` (
  `catalog_notice_id` int NOT NULL,
  `notice` varchar(255) NOT NULL,
  `create_date` int NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `catalog_notice`
--

INSERT INTO `catalog_notice` (`catalog_notice_id`, `notice`, `create_date`, `status`) VALUES
(1, 'Pop up', 1657817732, 0),
(2, 'Aviso', 1657817732, 1);

-- --------------------------------------------------------

--
-- Table structure for table `catalog_notification`
--

CREATE TABLE `catalog_notification` (
  `catalog_notification_id` int NOT NULL,
  `kind` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `extra` varchar(255) NOT NULL,
  `create_date` int NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `catalog_notification`
--

INSERT INTO `catalog_notification` (`catalog_notification_id`, `kind`, `description`, `extra`, `create_date`, `status`) VALUES
(1, 'Referidos', 'Notificaciones referente a tu equipo de trabajo', '<i class=\"fas fa-user-friends\"></i>', 1593746825, 1),
(2, 'Cuenta', 'Notificaciones referente a la edición de las hojas de tus proyectos', '<i class=\"fas fa-code text-muted\"></i>', 1593746825, 1),
(3, 'Comisiones', 'Ganancias', '<i class=\"fas fa-chart-line\"></i>', 1655863588, 1);

-- --------------------------------------------------------

--
-- Table structure for table `catalog_package_type`
--

CREATE TABLE `catalog_package_type` (
  `catalog_package_type_id` int NOT NULL,
  `package_type` varchar(255) NOT NULL,
  `create_date` int NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `catalog_package_type`
--

INSERT INTO `catalog_package_type` (`catalog_package_type_id`, `package_type`, `create_date`, `status`) VALUES
(1, 'paybusiness', 1627354516, 1),
(2, 'payacademy', 1627354516, 1);

-- --------------------------------------------------------

--
-- Table structure for table `catalog_payment_method`
--

CREATE TABLE `catalog_payment_method` (
  `catalog_payment_method_id` int NOT NULL,
  `payment_method` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `fee` float NOT NULL,
  `additional_info` varchar(255) NOT NULL,
  `additional_data` varchar(255) NOT NULL,
  `catalog_currency_ids` varchar(255) NOT NULL,
  `recomend` int NOT NULL DEFAULT '0',
  `create_date` int NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `catalog_payment_method`
--

INSERT INTO `catalog_payment_method` (`catalog_payment_method_id`, `payment_method`, `description`, `image`, `fee`, `additional_info`, `additional_data`, `catalog_currency_ids`, `recomend`, `create_date`, `status`) VALUES
(1, 'CoinPayments', 'Criptomonedas con CoinPayments', 'https://pbs.twimg.com/profile_images/1489308880408653825/NViPB0Ta_400x400.jpg', 0, '', '', '[4,5,6,7,9]', 0, 1627354516, -1),
(2, 'Stripe', '', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqhpK7dACB1liDjdZkx6lNHhjQUXsA_wVc_yzCBtXk_g&s', 0, '', '', '', 0, 1627354516, 0),
(3, 'Ewallet', '', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZm-Mt7YtVbM9FzK7GhQHDP2PGQYc5kFs6W6JVTz4&s', 0, '', '', '', 0, 1627354516, 1),
(4, 'PayPal', '', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS6T9F9oUCgbDetZOxfFznpbFyJrOi-ShkqYdOnBQ&s', 30, '', '', '', 0, 1627354516, 0),
(5, 'Airtm', '', 'https://media.glassdoor.com/sqll/2829402/airtm-squarelogo-1640073639098.png', 0, '', '', '', 0, 1627354516, 0),
(6, 'CapitalPayments', 'USDT.TRC20', 'https://www.capitalpayments.me/src/img/payment-logo.png', 0, '', '', '', 1, 1627354516, 1);

-- --------------------------------------------------------

--
-- Table structure for table `catalog_permission`
--

CREATE TABLE `catalog_permission` (
  `catalog_permission_id` int NOT NULL,
  `permission` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `create_date` int NOT NULL,
  `status` int DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `catalog_permission`
--

INSERT INTO `catalog_permission` (`catalog_permission_id`, `permission`, `description`, `create_date`, `status`) VALUES
(1, 'list_users', 'Listar usuarios', 1627354516, 1),
(2, 'list_administrators', 'Listar administradores', 1627354516, 1),
(3, 'add_user', 'Añadir usuario', 1627354516, 1),
(4, 'add_administrator', 'Añadir administrador', 1627354516, 1),
(5, 'edit_user', 'Editar usuario', 1627354516, 1),
(6, 'edit_administrator', 'Editar administrador', 1627354516, 1),
(7, 'activate_plan', 'Activar plan', 1627354516, 0),
(8, 'edit_permissions', 'Editar permisos', 1627354516, 1),
(9, 'delete_administrator', 'Eliminar administrador', 1627354516, 1),
(10, 'list_transactions', 'Ver transacciones', 1627354516, 1),
(11, 'add_transaction', 'Aprobar transacción', 1627354516, 1),
(12, 'delete_transaction', 'Declinar transacción', 1627354516, 1),
(13, 'backoffice_access', 'Acceder a backofice', 1656294435, 1),
(14, 'list_dash', 'Ver el dashboard', 1656294435, 1),
(15, 'add_old_commission', 'Correr comisiones pasadas', 1656294435, 0),
(16, 'add_deposit', 'Añadir fondeo', 1656294435, 0),
(17, 'list_deposit', 'Listar fondeos', 1656294435, 0),
(18, 'list_pending_deposit', 'Listar fondeos pendientes', 1656294435, 0),
(19, 'delete_deposit', 'Eliminar depósito', 1656294435, 0),
(20, 'apply_deposit', 'Aplicar depósitos', 1656294435, 1),
(21, 'delete_deposit', 'Eliminar depósito', 1656294435, 0),
(22, 'view_deposit', 'Ver depósito mediante api', 1656294435, 1),
(23, 'list_notices', 'Ver noticias', 1656294435, 1),
(24, 'add_notice', 'Añadir noticias', 1656294435, 1),
(25, 'edit_notice', 'Editar noticias', 1656294435, 1),
(26, 'delete_notice', 'Eliminar noticias', 1656294435, 1),
(27, 'publish_notice', 'Publicar noticia', 1656294435, 1),
(28, 'unpublish_notice', 'Despublicar noticia', 1656294435, 1),
(29, 'list_buys', 'Listar compras', 1656294435, 1),
(30, 'approbe_payment', 'Procesar pagos/compras', 1656294435, 1),
(31, 'pending_payment', 'Pasar pagos/compras a pendiente', 1656294435, 1),
(32, 'add_ewallet_transaction', 'Enviar dinero a ewallet de usuarios', 1656294435, 1),
(33, 'list_email', 'Listar campañas de correos', 1665166202, 0),
(34, 'list_payment_methods', 'Lista métodos de pago', 1665166202, 1),
(35, 'list_exercises', 'Lista ejercicios', 1665166202, 0),
(36, 'list_intents', 'Lista de entrenamiento IA', 1665166202, 1),
(37, 'delete_payment', 'Eliminar compra', 1665166202, 1),
(38, 'delete_user', 'Eliminar usuario', 1665166202, 1),
(39, 'view_ewallet', 'Ver e-wallet', 1665166202, 1),
(40, 'approbe_payout', 'Pagar dinero a billetera real de usuarios', 1665166202, 1),
(41, 'add_signals', 'Envíar señar a grupo de Telegram', 1665166202, 1),
(42, 'add_intents', 'Añadir intents para entrenar IA', 1665166202, 1),
(43, 'add_marketing_image', 'Añadir imagen en marketing', 1665166202, 1),
(44, 'list_cron', 'Ver tareas automatizadas', 1665166202, 1),
(45, 'list_tickets', 'Listar tickets de soporte técnico', 1665166202, 1),
(46, 'list_banners', 'Listar Banners de eventos', 1665166202, 1),
(47, 'list_config', 'Ver configuración del sitio', 1656294435, 1),
(48, 'list_tools', 'Listar herramientas', 1656294435, 1);

-- --------------------------------------------------------

--
-- Table structure for table `catalog_plan`
--

CREATE TABLE `catalog_plan` (
  `catalog_plan_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `profit` varchar(11) NOT NULL,
  `create_date` int NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `catalog_priority`
--

CREATE TABLE `catalog_priority` (
  `catalog_priority_id` int NOT NULL,
  `priority` varchar(255) NOT NULL,
  `create_date` int NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `catalog_priority`
--

INSERT INTO `catalog_priority` (`catalog_priority_id`, `priority`, `create_date`, `status`) VALUES
(1, 'Baja', 1657842205, 1),
(2, 'Normal', 1657842205, 1),
(3, 'Alta', 1657842205, 1);

-- --------------------------------------------------------

--
-- Table structure for table `catalog_profit`
--

CREATE TABLE `catalog_profit` (
  `catalog_profit_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `create_date` int NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `catalog_profit`
--

INSERT INTO `catalog_profit` (`catalog_profit_id`, `name`, `create_date`, `status`) VALUES
(1, 'Ganancias por inversión', 1627354516, 1),
(2, 'Ganancias por referido', 1627354516, 1);

-- --------------------------------------------------------

--
-- Table structure for table `catalog_range`
--

CREATE TABLE `catalog_range` (
  `catalog_range_id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `volumen` float NOT NULL,
  `percentage` float NOT NULL,
  `start_volumen` float NOT NULL,
  `end_volumen` float NOT NULL,
  `create_date` int NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `catalog_range`
--

INSERT INTO `catalog_range` (`catalog_range_id`, `title`, `volumen`, `percentage`, `start_volumen`, `end_volumen`, `create_date`, `status`) VALUES
(1, 'PayBussiness', 50000, 50, 50000, 99999, 1663615136, 1);

-- --------------------------------------------------------

--
-- Table structure for table `catalog_range_per_user`
--

CREATE TABLE `catalog_range_per_user` (
  `catalog_range_per_user_id` int NOT NULL,
  `user_login_id` int NOT NULL,
  `catalog_range_id` int NOT NULL,
  `create_date` int NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `catalog_speaker`
--

CREATE TABLE `catalog_speaker` (
  `catalog_speaker_id` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `sur_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `create_date` int NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `catalog_speaker`
--

INSERT INTO `catalog_speaker` (`catalog_speaker_id`, `name`, `last_name`, `sur_name`, `image`, `create_date`, `status`) VALUES
(1, 'Helio ', 'Laguna', '', 'https://images.contentstack.io/v3/assets/blt38dd155f8beb7337/blt06e3f442d21cbbc4/6231356fbb9a2416314e7a98/Position-trading.jpg', 1663615136, 1);

-- --------------------------------------------------------

--
-- Table structure for table `catalog_subtopic`
--

CREATE TABLE `catalog_subtopic` (
  `catalog_subtopic_id` int NOT NULL,
  `catalog_topic_id` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `create_date` int NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `catalog_subtopic`
--

INSERT INTO `catalog_subtopic` (`catalog_subtopic_id`, `catalog_topic_id`, `name`, `create_date`, `status`) VALUES
(1, 1, 'Información de perfil erronea', 1663615136, 1),
(2, 1, 'Patrocinador incorrecto', 1663615136, 0),
(3, 1, 'No puedo actualizar mi perfil', 1663615136, 1),
(4, 2, 'Comisión no dispersada', 1663615136, 1),
(5, 2, 'Comisión no generada', 1663615136, 1),
(6, 2, 'Comisión erronea', 1663615136, 1),
(7, 3, 'Compra no aprobada', 1663615136, 1),
(8, 3, 'Compra eliminada por error', 1663615136, 1),
(9, 3, 'Compra no reconocida', 1663615136, 1),
(10, 3, 'Realizar compra por Airtm', 1663615136, 1);

-- --------------------------------------------------------

--
-- Table structure for table `catalog_system_var`
--

CREATE TABLE `catalog_system_var` (
  `catalog_system_var_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `create_date` int NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `catalog_system_var`
--

INSERT INTO `catalog_system_var` (`catalog_system_var_id`, `name`, `create_date`, `status`) VALUES
(1, 'company_info', 1663615136, 1),
(2, 'social_network', 1663615136, 1),
(3, 'page_style', 1663615136, 1),
(4, 'stripe_configuration', 1663615136, 1),
(6, 'capitalpayments_configuration', 1663615136, 1),
(7, 'bot_config', 1663615136, 1);

-- --------------------------------------------------------

--
-- Table structure for table `catalog_tag_intent`
--

CREATE TABLE `catalog_tag_intent` (
  `catalog_tag_intent_id` int NOT NULL,
  `tag` varchar(255) NOT NULL,
  `has_response` int NOT NULL DEFAULT '0',
  `create_date` int NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `catalog_tag_intent`
--

INSERT INTO `catalog_tag_intent` (`catalog_tag_intent_id`, `tag`, `has_response`, `create_date`, `status`) VALUES
(1, 'agent.greeting', 1, 1699122612, 1),
(2, 'agent.about', 1, 1699125949, 1);

-- --------------------------------------------------------

--
-- Table structure for table `catalog_timezone`
--

CREATE TABLE `catalog_timezone` (
  `catalog_timezone_id` int NOT NULL,
  `timezone` varchar(255) NOT NULL,
  `create_date` int NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `catalog_timezone`
--

INSERT INTO `catalog_timezone` (`catalog_timezone_id`, `timezone`, `create_date`, `status`) VALUES
(1, 'America/Adak', 1663615136, 1),
(2, 'America/Anchorage', 1663615136, 1),
(3, 'America/Anguilla', 1663615136, 1),
(4, 'America/Antigua', 1663615136, 1),
(5, 'America/Araguaina', 1663615136, 1),
(6, 'America/Argentina/Buenos_Aires', 1663615136, 1),
(7, 'America/Argentina/Catamarca', 1663615136, 1),
(8, 'America/Argentina/Cordoba', 1663615136, 1),
(9, 'America/Argentina/Jujuy', 1663615136, 1),
(10, 'America/Argentina/La_Rioja', 1663615136, 1),
(11, 'America/Argentina/Mendoza', 1663615136, 1),
(12, 'America/Argentina/Rio_Gallegos', 1663615136, 1),
(13, 'America/Argentina/Salta', 1663615136, 1),
(14, 'America/Argentina/San_Juan', 1663615136, 1),
(15, 'America/Argentina/San_Luis', 1663615136, 1),
(16, 'America/Argentina/Tucuman', 1663615136, 1),
(17, 'America/Argentina/Ushuaia', 1663615136, 1),
(18, 'America/Aruba', 1663615136, 1),
(19, 'America/Asuncion', 1663615136, 1),
(20, 'America/Atikokan', 1663615136, 1),
(21, 'America/Bahia', 1663615136, 1),
(22, 'America/Bahia_Banderas', 1663615136, 1),
(23, 'America/Barbados', 1663615136, 1),
(24, 'America/Belem', 1663615136, 1),
(25, 'America/Belize', 1663615136, 1),
(26, 'America/Blanc-Sablon', 1663615136, 1),
(27, 'America/Boa_Vista', 1663615136, 1),
(28, 'America/Bogota', 1663615136, 1),
(29, 'America/Boise', 1663615136, 1),
(30, 'America/Cambridge_Bay', 1663615136, 1),
(31, 'America/Campo_Grande', 1663615136, 1),
(32, 'America/Cancun', 1663615136, 1),
(33, 'America/Caracas', 1663615136, 1),
(34, 'America/Cayenne', 1663615136, 1),
(35, 'America/Cayman', 1663615136, 1),
(36, 'America/Chicago', 1663615136, 1),
(37, 'America/Chihuahua', 1663615136, 1),
(38, 'America/Costa_Rica', 1663615136, 1),
(39, 'America/Creston', 1663615136, 1),
(40, 'America/Cuiaba', 1663615136, 1),
(41, 'America/Curacao', 1663615136, 1),
(42, 'America/Danmarkshavn', 1663615136, 1),
(43, 'America/Dawson', 1663615136, 1),
(44, 'America/Dawson_Creek', 1663615136, 1),
(45, 'America/Denver', 1663615136, 1),
(46, 'America/Detroit', 1663615136, 1),
(47, 'America/Dominica', 1663615136, 1),
(48, 'America/Edmonton', 1663615136, 1),
(49, 'America/Eirunepe', 1663615136, 1),
(50, 'America/El_Salvador', 1663615136, 1),
(51, 'America/Fort_Nelson', 1663615136, 1),
(52, 'America/Fortaleza', 1663615136, 1),
(53, 'America/Glace_Bay', 1663615136, 1),
(54, 'America/Godthab', 1663615136, 1),
(55, 'America/Goose_Bay', 1663615136, 1),
(56, 'America/Grand_Turk', 1663615136, 1),
(57, 'America/Grenada', 1663615136, 1),
(58, 'America/Guadeloupe', 1663615136, 1),
(59, 'America/Guatemala', 1663615136, 1),
(60, 'America/Guayaquil', 1663615136, 1),
(61, 'America/Guyana', 1663615136, 1),
(62, 'America/Halifax', 1663615136, 1),
(63, 'America/Havana', 1663615136, 1),
(64, 'America/Hermosillo', 1663615136, 1),
(65, 'America/Indiana/Indianapolis', 1663615136, 1),
(66, 'America/Indiana/Knox', 1663615136, 1),
(67, 'America/Indiana/Marengo', 1663615136, 1),
(68, 'America/Indiana/Petersburg', 1663615136, 1),
(69, 'America/Indiana/Tell_City', 1663615136, 1),
(70, 'America/Indiana/Vevay', 1663615136, 1),
(71, 'America/Indiana/Vincennes', 1663615136, 1),
(72, 'America/Indiana/Winamac', 1663615136, 1),
(73, 'America/Inuvik', 1663615136, 1),
(74, 'America/Iqaluit', 1663615136, 1),
(75, 'America/Jamaica', 1663615136, 1),
(76, 'America/Juneau', 1663615136, 1),
(77, 'America/Kentucky/Louisville', 1663615136, 1),
(78, 'America/Kentucky/Monticello', 1663615136, 1),
(79, 'America/Kralendijk', 1663615136, 1),
(80, 'America/La_Paz', 1663615136, 1),
(81, 'America/Lima', 1663615136, 1),
(82, 'America/Los_Angeles', 1663615136, 1),
(83, 'America/Lower_Princes', 1663615136, 1),
(84, 'America/Maceio', 1663615136, 1),
(85, 'America/Managua', 1663615136, 1),
(86, 'America/Manaus', 1663615136, 1),
(87, 'America/Marigot', 1663615136, 1),
(88, 'America/Martinique', 1663615136, 1),
(89, 'America/Matamoros', 1663615136, 1),
(90, 'America/Mazatlan', 1663615136, 1),
(91, 'America/Menominee', 1663615136, 1),
(92, 'America/Merida', 1663615136, 1),
(93, 'America/Metlakatla', 1663615136, 1),
(94, 'America/Mexico_City', 1663615136, 1),
(95, 'America/Miquelon', 1663615136, 1),
(96, 'America/Moncton', 1663615136, 1),
(97, 'America/Monterrey', 1663615136, 1),
(98, 'America/Montevideo', 1663615136, 1),
(99, 'America/Montserrat', 1663615136, 1),
(100, 'America/Nassau', 1663615136, 1),
(101, 'America/New_York', 1663615136, 1),
(102, 'America/Nipigon', 1663615136, 1),
(103, 'America/Nome', 1663615136, 1),
(104, 'America/Noronha', 1663615136, 1),
(105, 'America/North_Dakota/Beulah', 1663615136, 1),
(106, 'America/North_Dakota/Center', 1663615136, 1),
(107, 'America/North_Dakota/New_Salem', 1663615136, 1),
(108, 'America/Ojinaga', 1663615136, 1),
(109, 'America/Panama', 1663615136, 1),
(110, 'America/Pangnirtung', 1663615136, 1),
(111, 'America/Paramaribo', 1663615136, 1),
(112, 'America/Phoenix', 1663615136, 1),
(113, 'America/Port-au-Prince', 1663615136, 1),
(114, 'America/Port_of_Spain', 1663615136, 1),
(115, 'America/Porto_Velho', 1663615136, 1),
(116, 'America/Puerto_Rico', 1663615136, 1),
(117, 'America/Punta_Arenas', 1663615136, 1),
(118, 'America/Rainy_River', 1663615136, 1),
(119, 'America/Rankin_Inlet', 1663615136, 1),
(120, 'America/Recife', 1663615136, 1),
(121, 'America/Regina', 1663615136, 1),
(122, 'America/Resolute', 1663615136, 1),
(123, 'America/Rio_Branco', 1663615136, 1),
(124, 'America/Santarem', 1663615136, 1),
(125, 'America/Santiago', 1663615136, 1),
(126, 'America/Santo_Domingo', 1663615136, 1),
(127, 'America/Sao_Paulo', 1663615136, 1),
(128, 'America/Scoresbysund', 1663615136, 1),
(129, 'America/Sitka', 1663615136, 1),
(130, 'America/St_Barthelemy', 1663615136, 1),
(131, 'America/St_Johns', 1663615136, 1),
(132, 'America/St_Kitts', 1663615136, 1),
(133, 'America/St_Lucia', 1663615136, 1),
(134, 'America/St_Thomas', 1663615136, 1),
(135, 'America/St_Vincent', 1663615136, 1),
(136, 'America/Swift_Current', 1663615136, 1),
(137, 'America/Tegucigalpa', 1663615136, 1),
(138, 'America/Thule', 1663615136, 1),
(139, 'America/Thunder_Bay', 1663615136, 1),
(140, 'America/Tijuana', 1663615136, 1),
(141, 'America/Toronto', 1663615136, 1),
(142, 'America/Tortola', 1663615136, 1),
(143, 'America/Vancouver', 1663615136, 1),
(144, 'America/Whitehorse', 1663615136, 1),
(145, 'America/Winnipeg', 1663615136, 1),
(146, 'America/Yakutat', 1663615136, 1),
(147, 'America/Yellowknife', 1663615136, 1),
(148, 'America/Adak', 1663615136, 1),
(149, 'America/Anchorage', 1663615136, 1),
(150, 'America/Anguilla', 1663615136, 1),
(151, 'America/Antigua', 1663615136, 1),
(152, 'America/Araguaina', 1663615136, 1),
(153, 'America/Argentina/Buenos_Aires', 1663615136, 1),
(154, 'America/Argentina/Catamarca', 1663615136, 1),
(155, 'America/Argentina/Cordoba', 1663615136, 1),
(156, 'America/Argentina/Jujuy', 1663615136, 1),
(157, 'America/Argentina/La_Rioja', 1663615136, 1),
(158, 'America/Argentina/Mendoza', 1663615136, 1),
(159, 'America/Argentina/Rio_Gallegos', 1663615136, 1),
(160, 'America/Argentina/Salta', 1663615136, 1),
(161, 'America/Argentina/San_Juan', 1663615136, 1),
(162, 'America/Argentina/San_Luis', 1663615136, 1),
(163, 'America/Argentina/Tucuman', 1663615136, 1),
(164, 'America/Argentina/Ushuaia', 1663615136, 1),
(165, 'America/Aruba', 1663615136, 1),
(166, 'America/Asuncion', 1663615136, 1),
(167, 'America/Atikokan', 1663615136, 1),
(168, 'America/Bahia', 1663615136, 1),
(169, 'America/Bahia_Banderas', 1663615136, 1),
(170, 'America/Barbados', 1663615136, 1),
(171, 'America/Belem', 1663615136, 1),
(172, 'America/Belize', 1663615136, 1),
(173, 'America/Blanc-Sablon', 1663615136, 1),
(174, 'America/Boa_Vista', 1663615136, 1),
(175, 'America/Bogota', 1663615136, 1),
(176, 'America/Boise', 1663615136, 1),
(177, 'America/Cambridge_Bay', 1663615136, 1),
(178, 'America/Campo_Grande', 1663615136, 1),
(179, 'America/Cancun', 1663615136, 1),
(180, 'America/Caracas', 1663615136, 1),
(181, 'America/Cayenne', 1663615136, 1),
(182, 'America/Cayman', 1663615136, 1),
(183, 'America/Chicago', 1663615136, 1),
(184, 'America/Chihuahua', 1663615136, 1),
(185, 'America/Costa_Rica', 1663615136, 1),
(186, 'America/Creston', 1663615136, 1),
(187, 'America/Cuiaba', 1663615136, 1),
(188, 'America/Curacao', 1663615136, 1),
(189, 'America/Danmarkshavn', 1663615136, 1),
(190, 'America/Dawson', 1663615136, 1),
(191, 'America/Dawson_Creek', 1663615136, 1),
(192, 'America/Denver', 1663615136, 1),
(193, 'America/Detroit', 1663615136, 1),
(194, 'America/Dominica', 1663615136, 1),
(195, 'America/Edmonton', 1663615136, 1),
(196, 'America/Eirunepe', 1663615136, 1),
(197, 'America/El_Salvador', 1663615136, 1),
(198, 'America/Fort_Nelson', 1663615136, 1),
(199, 'America/Fortaleza', 1663615136, 1),
(200, 'America/Glace_Bay', 1663615136, 1),
(201, 'America/Godthab', 1663615136, 1),
(202, 'America/Goose_Bay', 1663615136, 1),
(203, 'America/Grand_Turk', 1663615136, 1),
(204, 'America/Grenada', 1663615136, 1),
(205, 'America/Guadeloupe', 1663615136, 1),
(206, 'America/Guatemala', 1663615136, 1),
(207, 'America/Guayaquil', 1663615136, 1),
(208, 'America/Guyana', 1663615136, 1),
(209, 'America/Halifax', 1663615136, 1),
(210, 'America/Havana', 1663615136, 1),
(211, 'America/Hermosillo', 1663615136, 1),
(212, 'America/Indiana/Indianapolis', 1663615136, 1),
(213, 'America/Indiana/Knox', 1663615136, 1),
(214, 'America/Indiana/Marengo', 1663615136, 1),
(215, 'America/Indiana/Petersburg', 1663615136, 1),
(216, 'America/Indiana/Tell_City', 1663615136, 1),
(217, 'America/Indiana/Vevay', 1663615136, 1),
(218, 'America/Indiana/Vincennes', 1663615136, 1),
(219, 'America/Indiana/Winamac', 1663615136, 1),
(220, 'America/Inuvik', 1663615136, 1),
(221, 'America/Iqaluit', 1663615136, 1),
(222, 'America/Jamaica', 1663615136, 1),
(223, 'America/Juneau', 1663615136, 1),
(224, 'America/Kentucky/Louisville', 1663615136, 1),
(225, 'America/Kentucky/Monticello', 1663615136, 1),
(226, 'America/Kralendijk', 1663615136, 1),
(227, 'America/La_Paz', 1663615136, 1),
(228, 'America/Lima', 1663615136, 1),
(229, 'America/Los_Angeles', 1663615136, 1),
(230, 'America/Lower_Princes', 1663615136, 1),
(231, 'America/Maceio', 1663615136, 1),
(232, 'America/Managua', 1663615136, 1),
(233, 'America/Manaus', 1663615136, 1),
(234, 'America/Marigot', 1663615136, 1),
(235, 'America/Martinique', 1663615136, 1),
(236, 'America/Matamoros', 1663615136, 1),
(237, 'America/Mazatlan', 1663615136, 1),
(238, 'America/Menominee', 1663615136, 1),
(239, 'America/Merida', 1663615136, 1),
(240, 'America/Metlakatla', 1663615136, 1),
(241, 'America/Mexico_City', 1663615136, 1),
(242, 'America/Miquelon', 1663615136, 1),
(243, 'America/Moncton', 1663615136, 1),
(244, 'America/Monterrey', 1663615136, 1),
(245, 'America/Montevideo', 1663615136, 1),
(246, 'America/Montserrat', 1663615136, 1),
(247, 'America/Nassau', 1663615136, 1),
(248, 'America/New_York', 1663615136, 1),
(249, 'America/Nipigon', 1663615136, 1),
(250, 'America/Nome', 1663615136, 1),
(251, 'America/Noronha', 1663615136, 1),
(252, 'America/North_Dakota/Beulah', 1663615136, 1),
(253, 'America/North_Dakota/Center', 1663615136, 1),
(254, 'America/North_Dakota/New_Salem', 1663615136, 1),
(255, 'America/Ojinaga', 1663615136, 1),
(256, 'America/Panama', 1663615136, 1),
(257, 'America/Pangnirtung', 1663615136, 1),
(258, 'America/Paramaribo', 1663615136, 1),
(259, 'America/Phoenix', 1663615136, 1),
(260, 'America/Port-au-Prince', 1663615136, 1),
(261, 'America/Port_of_Spain', 1663615136, 1),
(262, 'America/Porto_Velho', 1663615136, 1),
(263, 'America/Puerto_Rico', 1663615136, 1),
(264, 'America/Punta_Arenas', 1663615136, 1),
(265, 'America/Rainy_River', 1663615136, 1),
(266, 'America/Rankin_Inlet', 1663615136, 1),
(267, 'America/Recife', 1663615136, 1),
(268, 'America/Regina', 1663615136, 1),
(269, 'America/Resolute', 1663615136, 1),
(270, 'America/Rio_Branco', 1663615136, 1),
(271, 'America/Santarem', 1663615136, 1),
(272, 'America/Santiago', 1663615136, 1),
(273, 'America/Santo_Domingo', 1663615136, 1),
(274, 'America/Sao_Paulo', 1663615136, 1),
(275, 'America/Scoresbysund', 1663615136, 1),
(276, 'America/Sitka', 1663615136, 1),
(277, 'America/St_Barthelemy', 1663615136, 1),
(278, 'America/St_Johns', 1663615136, 1),
(279, 'America/St_Kitts', 1663615136, 1),
(280, 'America/St_Lucia', 1663615136, 1),
(281, 'America/St_Thomas', 1663615136, 1),
(282, 'America/St_Vincent', 1663615136, 1),
(283, 'America/Swift_Current', 1663615136, 1),
(284, 'America/Tegucigalpa', 1663615136, 1),
(285, 'America/Thule', 1663615136, 1),
(286, 'America/Thunder_Bay', 1663615136, 1),
(287, 'America/Tijuana', 1663615136, 1),
(288, 'America/Toronto', 1663615136, 1),
(289, 'America/Tortola', 1663615136, 1),
(290, 'America/Vancouver', 1663615136, 1),
(291, 'America/Whitehorse', 1663615136, 1),
(292, 'America/Winnipeg', 1663615136, 1),
(293, 'America/Yakutat', 1663615136, 1),
(294, 'America/Yellowknife', 1663615136, 1);

-- --------------------------------------------------------

--
-- Table structure for table `catalog_tool`
--

CREATE TABLE `catalog_tool` (
  `catalog_tool_id` int NOT NULL,
  `tool` varchar(255) NOT NULL,
  `create_date` int NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `catalog_tool`
--

INSERT INTO `catalog_tool` (`catalog_tool_id`, `tool`, `create_date`, `status`) VALUES
(1, 'Presentación de negocio', 1627354516, 1),
(2, 'Ebook', 1627354516, 1);

-- --------------------------------------------------------

--
-- Table structure for table `catalog_topic`
--

CREATE TABLE `catalog_topic` (
  `catalog_topic_id` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `create_date` int NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `catalog_topic`
--

INSERT INTO `catalog_topic` (`catalog_topic_id`, `name`, `create_date`, `status`) VALUES
(1, 'Cuentas MAM', 1663615136, 1),
(2, 'Bridge Funds', 1663615136, 1),
(3, 'Evox Marketing', 1663615136, 1),
(4, 'Ajustes de perfil', 1663615136, 1),
(5, 'Billetera Evox', 1663615136, 1);

-- --------------------------------------------------------

--
-- Table structure for table `catalog_user_type`
--

CREATE TABLE `catalog_user_type` (
  `catalog_user_type_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `create_date` int NOT NULL,
  `status` int DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `catalog_user_type`
--

INSERT INTO `catalog_user_type` (`catalog_user_type_id`, `name`, `create_date`, `status`) VALUES
(1, 'Evox', 1663615136, 1),
(2, 'Evox', 1663615136, 1);

-- --------------------------------------------------------

--
-- Table structure for table `catalog_validation_method`
--

CREATE TABLE `catalog_validation_method` (
  `catalog_validation_method_id` int NOT NULL,
  `validation_method` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `create_date` int NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `catalog_validation_method`
--

INSERT INTO `catalog_validation_method` (`catalog_validation_method_id`, `validation_method`, `description`, `create_date`, `status`) VALUES
(1, 'ADMINISTRATOR', 'Administrador', 1663615136, 1),
(2, 'COINPAYMENTS_IPN', 'IPN de CoinPayments', 1663615136, 1);

-- --------------------------------------------------------

--
-- Table structure for table `catalog_withdraw_method`
--

CREATE TABLE `catalog_withdraw_method` (
  `catalog_withdraw_method_id` int NOT NULL,
  `method` varchar(255) NOT NULL,
  `catalog_currency_id` int NOT NULL,
  `image` varchar(255) NOT NULL,
  `create_date` int NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `catalog_withdraw_method`
--

INSERT INTO `catalog_withdraw_method` (`catalog_withdraw_method_id`, `method`, `catalog_currency_id`, `image`, `create_date`, `status`) VALUES
(1, 'Crypto', 5, '../../src/img/usdt-tron.svg', 1627354516, 1);

-- --------------------------------------------------------

--
-- Table structure for table `click_per_banner`
--

CREATE TABLE `click_per_banner` (
  `click_per_banner_id` int NOT NULL,
  `banner_per_campaign_id` int NOT NULL,
  `user_login_id` int NOT NULL,
  `create_date` int NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `comment_per_course`
--

CREATE TABLE `comment_per_course` (
  `comment_per_course_id` int NOT NULL,
  `course_id` int NOT NULL,
  `user_login_id` int NOT NULL,
  `comment` varchar(255) NOT NULL,
  `create_date` int NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `commission_per_user`
--

CREATE TABLE `commission_per_user` (
  `commission_per_user_id` int NOT NULL,
  `user_login_id` int NOT NULL,
  `user_login_id_from` int NOT NULL,
  `buy_per_user_id` int NOT NULL,
  `gain_per_client_id` int NOT NULL,
  `service_per_client_id` int NOT NULL,
  `catalog_commission_type_id` int NOT NULL DEFAULT '0',
  `package_id` int NOT NULL,
  `amount` float NOT NULL,
  `transaction_per_wallet_id` int NOT NULL,
  `catalog_currency_id` int NOT NULL,
  `deposit_date` int NOT NULL,
  `create_date` int NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `conference`
--

CREATE TABLE `conference` (
  `conference_id` int NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `schedule` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `repeat_conference` int NOT NULL DEFAULT '1',
  `link` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `time` int NOT NULL,
  `catalog_conference_id` int NOT NULL,
  `catalog_speaker_id` int NOT NULL,
  `catalog_timezone_id` int NOT NULL,
  `create_date` int NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `conference`
--

INSERT INTO `conference` (`conference_id`, `title`, `description`, `schedule`, `repeat_conference`, `link`, `time`, `catalog_conference_id`, `catalog_speaker_id`, `catalog_timezone_id`, `create_date`, `status`) VALUES
(1, 'Plan de negocio', 'Enteráte del negocio del momento', '[0,2]', 1, 'https://zuum.link/zoomquickmoney', 72000, 1, 1, 94, 1663615136, -1),
(2, 'Plan de negocio', 'Enteráte del negocio del momento Funnels7', '[3]', 1, 'https://zuum.link/zoomfunnels7', 72000, 1, 1, 94, 1663615136, -1);

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `course_id` int NOT NULL,
  `user_support_id` int NOT NULL,
  `catalog_course_type_id` int NOT NULL,
  `catalog_currency_id` int NOT NULL,
  `catalog_course_id` int NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `description` varchar(255) NOT NULL,
  `price` float NOT NULL,
  `duration` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `target` int NOT NULL DEFAULT '-1',
  `full_description` text NOT NULL,
  `tag` varchar(255) NOT NULL,
  `create_date` int NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`course_id`, `user_support_id`, `catalog_course_type_id`, `catalog_currency_id`, `catalog_course_id`, `title`, `description`, `price`, `duration`, `image`, `target`, `full_description`, `tag`, `create_date`, `status`) VALUES
(1, 2, 1, 0, 45, 'Trader éxitoso', 'Introducción', 0, '', '../../src/img/trading-course.jpg', -1, 'Introducción', '', 1691700866, 1),
(2, 1, 1, 154, 1, 'Conoce Dummie Trading', '<p>En éste curso aprenderás a usar Dummie Trading:</p><ul><li>Abrir tu cuenta en un broker recomendado (Si no la tienes)</li><li>Conectar tu telegram a DummieTrading</li><li>Fondear tu ewallet de DummieTrading</li></ul>', 0, '01:00', '../../src/files/course/cover/1693277892.png?t=1693277893', -1, '', '\"[{\\\"value\\\":\\\"dummie\\\"},{\\\"value\\\":\\\"conoce\\\"},{\\\"value\\\":\\\"inicial\\\"},{\\\"value\\\":\\\"conocer dummie\\\"},{\\\"value\\\":\\\"abrir broker\\\"}]\"', 1693277990, 1),
(3, 2, 1, 154, 20, 'PAMMyTrading', '<p>&lt;div style=\"padding:62.5% 0 0 0;position:relative;\"&gt;&lt;iframe src=\"https://player.vimeo.com/video/852128745?badge=0&amp;amp;autopause=0&amp;amp;player_id=0&amp;amp;app_id=58479\" frameborder=\"0\" allow=\"autoplay; fullscreen; picture-in-picture\" st', 0, '2', '', -1, '', '\"[{\\\"value\\\":\\\"PAMMyTrading\\\"}]\"', 1693287591, 0),
(4, 2, 1, 154, 20, 'PAMMyTrading', '<p>&lt;div style=\"padding:62.5% 0 0 0;position:relative;\"&gt;&lt;iframe src=\"https://player.vimeo.com/video/852128745?badge=0&amp;amp;autopause=0&amp;amp;player_id=0&amp;amp;app_id=58479\" frameborder=\"0\" allow=\"autoplay; fullscreen; picture-in-picture\" st', 0, '2', '', -1, '', '\"[{\\\"value\\\":\\\"PAMMyTrading\\\"}]\"', 1693287608, 0),
(5, 2, 1, 154, 20, 'PAMMyTrading', '<p>&lt;div style=\"padding:62.5% 0 0 0;position:relative;\"&gt;&lt;iframe src=\"https://player.vimeo.com/video/852128745?badge=0&amp;amp;autopause=0&amp;amp;player_id=0&amp;amp;app_id=58479\" frameborder=\"0\" allow=\"autoplay; fullscreen; picture-in-picture\" st', 0, '2', '', -1, '', '\"[{\\\"value\\\":\\\"PAMMyTrading\\\"}]\"', 1693287614, 0),
(6, 2, 1, 154, 20, 'Trading en automatico', '<p>&lt;iframe src=\"https://player.vimeo.com/video/852128745?badge=0&amp;amp;autopause=0&amp;amp;player_id=0&amp;amp;app_id=58479\" width=\"1440\" height=\"900\" frameborder=\"0\" allow=\"autoplay; fullscreen; picture-in-picture\" title=\"PAMMyTrading\"&gt;&lt;/ifram', 0, '2', '', -1, '', '\"\"', 1693328315, 0),
(7, 2, 1, 154, 1, '', '<p><br></p>', 0, '', '', -1, '', '\"\"', 1693328484, 0),
(8, 2, 1, 154, 1, 'Trading en Automatico', '<p>https://vimeo.com/852128745?share=copy</p>', 0, '2', '', -1, '', '\"[{\\\"value\\\":\\\"trading\\\"}]\"', 1693330676, 0),
(9, 2, 1, 154, 1, 'Sistema Automatizado', '<p>x</p>', 0, '020:0', '../../src/files/course/cover/1693336044.jpg?t=1693336045', -1, '', '\"[{\\\"value\\\":\\\"sistema\\\"},{\\\"value\\\":\\\"automatizado\\\"},{\\\"value\\\":\\\"sistema automatico\\\"},{\\\"value\\\":\\\"automatico\\\"}]\"', 1693336065, 1),
(10, 1, 1, 154, 21, 'Webinarios Dummie Trading', '', 0, '2', '', -1, '', '\"[{\\\"value\\\":\\\"\\\\\\\"[{\\\\\\\\\\\\\\\"value\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"dummie trading\\\\\\\\\\\\\\\"}\\\"},{\\\"value\\\":\\\"{\\\\\\\\\\\\\\\"value\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"induccion\\\\\\\\\\\\\\\"}]\\\\\\\"\\\"}]\"', 1694483940, 1),
(11, 2, 1, 154, 13, 'Libro Escuela de Pipsología', '', 0, '', '', -1, '', '\"\"', 1693933674, 0),
(12, 2, 1, 154, 13, 'Libro Escuela de Pipsología', '<p><a href=\"https://drive.google.com/file/d/0BxEeO0Ialc4KeHVfd2RtSVlPc3M/view?usp=drivesdk&amp;resourcekey=0-AJu97fbO56wImGoLKLMo4A\" target=\"_blank\">Libro escuela de Pipsología</a></p>', 0, '', '', -1, '', '\"\"', 1693933740, 0),
(13, 2, 1, 154, 13, 'Libro Escuela de Pipsología', '<p><a href=\"https://drive.google.com/file/d/0BxEeO0Ialc4KeHVfd2RtSVlPc3M/view?usp=drivesdk&amp;resourcekey=0-AJu97fbO56wImGoLKLMo4A\" target=\"_blank\">https://drive.google.com/file/d/0BxEeO0Ialc4KeHVfd2RtSVlPc3M/view?usp=drivesdk&amp;resourcekey=0-AJu97fbO5', 0, '2', '', -1, '', '\"\"', 1693934541, 0),
(14, 2, 1, 154, 13, 'Libro escuela de Pipsología', '', 0, '2', '', -1, '', '\"[{\\\"value\\\":\\\"libro\\\"},{\\\"value\\\":\\\"forex\\\"},{\\\"value\\\":\\\"aprender forex\\\"}]\"', 1693934762, 0),
(15, 0, 1, 154, 1, '', '', 0, '', '', -1, '', '\"\"', 1698440439, 1);

-- --------------------------------------------------------

--
-- Table structure for table `cout`
--

CREATE TABLE `cout` (
  `cout_id` int NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `cout`
--

INSERT INTO `cout` (`cout_id`, `start_date`, `end_date`, `status`) VALUES
(1, '2023-01-01', '2023-02-18', 1);

-- --------------------------------------------------------

--
-- Table structure for table `email_per_campaign`
--

CREATE TABLE `email_per_campaign` (
  `email_per_campaign_id` int NOT NULL,
  `user_login_id` int NOT NULL,
  `campaign_email_id` int NOT NULL,
  `email` varchar(255) NOT NULL,
  `create_date` int NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `faq`
--

CREATE TABLE `faq` (
  `faq_id` int NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `catalog_subtopic_id` int NOT NULL,
  `create_date` int NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `faq`
--

INSERT INTO `faq` (`faq_id`, `title`, `description`, `catalog_subtopic_id`, `create_date`, `status`) VALUES
(1, '¿Como editar tu email?', '<div class=\"mb-3\">\n    Para editar tu correo electrónico es necesario te comuniques con nosotros a través de nuestro WhatsApp, ten en cuenta que pediremos información necesaria para validar tu identidad\n</div>', 1, 1663615136, 1),
(4, '¿Por qué no ha llegado mi rendimiento?', '<div class=\"mb-3\">\r\n    El tiempo de espera de dispersión de comisiones de 30 minutos máximo, cada media hora dispersamos dinero a las ewallets de nuestros socios. Si tu comisión aún está pendiente de dispersión por favor contacta con nosotros.\r\n</div>', 3, 1663615136, 1),
(2, '¿Cómo cambiar tu patrocinador?', '<div class=\"mb-3\">\n    Para editar tu patrocinador es necesario te comuniques con nosotros a través de nuestro WhatsApp, ten en cuenta que pediremos información necesaria para validar tu identidad\n</div>\n', 2, 1663615136, 0),
(3, '¿Cómo editar mi información?', '<div class=\"mb-3\">\n    Para actualizar la información básica de tu perfil da clic <a href=\"https://www.funnels7.com/apps/backoffice/profile\">aquí</a>\n</div>', 4, 1663615136, 1),
(5, '¿Por qué no se genero mi comisión?', '<div class=\"mb-3\">\r\n    Es necesario que valides que el plan de pagos al cual estás haciendo referencia no tenga reglas importantes como el que estés activo en el plan especificado o se tengan que cumplir ciertos requisitos. Si estás completamente seguro de esto puedes contactarte con nosotros\r\n</div>', 5, 1663615136, 1),
(6, 'Mi comisión tiene un monto mayor o menor (es erroneo)', '<div class=\"mb-3\">\n    Si tu comisión es erroneá te pedimos te contactes con nosotros para realizar el ajuste\n</div>', 6, 1663615136, 1),
(7, 'Mi compra no esta aprobada pero ya realice el pago', '<div class=\"mb-3\">\r\n    Si ya te descontamos tu dinero por cualquier medio y aún no está aprobada tu compra te pedimos nos contactes para poder apoyarte\r\n</div>', 7, 1663615136, 1),
(8, 'Compra eliminada por error', '<div class=\"mb-3\">\n    Si tu compra fue eliminada y la intentabas realizar, puedes realizar otra con los mismos elementos.\n</div>', 7, 1663615136, 1),
(9, 'Hicieron un cargo no reconocido', '<div class=\"mb-3\">\r\n    Si tienes algún cargo no reconocido en tu cuenta, por favor contacta con nosotros para poder ayudarte\r\n</div>', 7, 1663615136, 1);

-- --------------------------------------------------------

--
-- Table structure for table `image`
--

CREATE TABLE `image` (
  `image_id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `src` varchar(255) NOT NULL,
  `tag` varchar(255) NOT NULL,
  `create_date` int NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `intent`
--

CREATE TABLE `intent` (
  `intent_id` int NOT NULL,
  `words` text NOT NULL,
  `catalog_tag_intent_id` int NOT NULL,
  `create_date` int NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `intent`
--

INSERT INTO `intent` (`intent_id`, `words`, `catalog_tag_intent_id`, `create_date`, `status`) VALUES
(1, 'Hola buenas tardes', 1, 1699122612, 1),
(2, 'Hola buenas noches', 1, 1699122612, 1),
(3, 'Hola buenos dias', 1, 1699122612, 1),
(4, 'Buen dia', 1, 1699122612, 1),
(5, 'Que tal', 1, 1699122612, 1),
(6, 'Ey como estás?', 1, 1699122612, 1),
(7, '¿Qué es Site?', 2, 1699125949, 1),
(8, '¿Dime algo de Site?', 2, 1699125949, 1),
(9, '¿Info a  cerca de Site?', 2, 1699125949, 1),
(10, '¿Información de Site?', 2, 1699125949, 1);

-- --------------------------------------------------------

--
-- Table structure for table `ipn`
--

CREATE TABLE `ipn` (
  `ipn_id` int NOT NULL,
  `data` text NOT NULL,
  `create_date` int NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `item_per_ticket`
--

CREATE TABLE `item_per_ticket` (
  `item_per_ticket_id` int NOT NULL,
  `ticket_per_user_id` int NOT NULL,
  `message` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_support_id` int NOT NULL,
  `send_from` int NOT NULL DEFAULT '0',
  `create_date` int NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `landing_per_user`
--

CREATE TABLE `landing_per_user` (
  `landing_per_user_id` int NOT NULL,
  `user_login_id` int NOT NULL,
  `landing` varchar(255) NOT NULL,
  `lpoa` varchar(255) NOT NULL,
  `create_date` int NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `like_per_course`
--

CREATE TABLE `like_per_course` (
  `like_per_course_id` int NOT NULL,
  `course_id` int NOT NULL,
  `user_login_id` int NOT NULL,
  `positive` int NOT NULL DEFAULT '0',
  `create_date` int NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `log`
--

CREATE TABLE `log` (
  `log_id` int NOT NULL,
  `user_support_id` int NOT NULL,
  `additional_data` text NOT NULL,
  `log_type` int NOT NULL,
  `create_date` int NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `membership_per_user`
--

CREATE TABLE `membership_per_user` (
  `membership_per_user_id` int NOT NULL,
  `user_login_id` int NOT NULL,
  `catalog_membership_id` int NOT NULL,
  `amount` float NOT NULL,
  `amount_extra` float NOT NULL,
  `create_date` int NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `notice`
--

CREATE TABLE `notice` (
  `notice_id` int NOT NULL,
  `catalog_notice_id` int NOT NULL,
  `catalog_priority_id` int NOT NULL,
  `user_support_id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `preview` varchar(255) NOT NULL,
  `image` text NOT NULL,
  `description` longtext NOT NULL,
  `modal_class` varchar(255) NOT NULL,
  `target` int NOT NULL DEFAULT '-1',
  `button_action` int NOT NULL DEFAULT '1',
  `create_date` int NOT NULL,
  `start_date` int NOT NULL,
  `end_date` int NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `notice`
--

INSERT INTO `notice` (`notice_id`, `catalog_notice_id`, `catalog_priority_id`, `user_support_id`, `title`, `preview`, `image`, `description`, `modal_class`, `target`, `button_action`, `create_date`, `start_date`, `end_date`, `status`) VALUES
(1, 2, 1, 1, 'Aprender y Ganar: El Auge de la Educación en Línea y el Emprendimiento Digital', 'En un mundo cada vez más digital, la educación en línea y las oportunidades para ganar dinero por internet se han convertido en una combinación poderosa. Las academias de alto valor están desempeñando un papel fundamental en esta tendencia, permitiendo a ', '', '<p><em>Fecha: 3 de noviembre de 2023</em></p><p><br></p><p>En un mundo cada vez más digital, la educación en línea y las oportunidades para ganar dinero por internet se han convertido en una combinación poderosa. Las academias de alto valor están desempeñando un papel fundamental en esta tendencia, permitiendo a las personas aprender nuevas habilidades mientras generan ingresos desde la comodidad de sus hogares.</p><p>La pandemia de COVID-19 aceleró la transición hacia la educación en línea, y ahora, muchas instituciones educativas de prestigio ofrecen cursos en línea accesibles desde cualquier parte del mundo. Estos cursos, que abarcan desde tecnología y programación hasta marketing digital y finanzas, brindan a los estudiantes la oportunidad de adquirir habilidades valiosas sin necesidad de asistir físicamente a una institución.</p><p><br></p><p>Lo que hace que esta tendencia sea aún más emocionante es la posibilidad de ganar dinero en línea mientras se aprende. Cada vez más personas están recurriendo a trabajos independientes, comercio electrónico y marketing de afiliados para generar ingresos desde sus computadoras. Emprender un negocio en línea, crear contenido de calidad o utilizar las nuevas habilidades adquiridas en las academias en línea son solo algunas de las formas en que las personas están generando ingresos en internet.</p><p>Este enfoque de \"aprender y ganar\" ha llevado a muchas historias de éxito. Por ejemplo, emprendedores digitales han visto cómo sus sitios web o tiendas en línea generan ingresos significativos después de aplicar las estrategias de marketing digital aprendidas en cursos en línea. Además, los trabajadores independientes están encontrando oportunidades en plataformas de trabajo freelance que les permiten aplicar sus habilidades recién adquiridas.</p><p><br></p><p>Sin embargo, es importante recordar que el éxito en línea requiere dedicación, paciencia y un compromiso constante con el aprendizaje. No todas las oportunidades en línea son igualmente lucrativas, y el riesgo de estafas es una realidad que todos deben tener en cuenta.</p><p><br></p><p>En resumen, la educación en línea y las oportunidades de ingresos en internet están en auge, permitiendo a las personas aprender valiosas habilidades mientras exploran diversas formas de ganar dinero en línea. Las academias de alto valor desempeñan un papel esencial en esta tendencia, brindando a las personas la oportunidad de avanzar en sus carreras y emprender nuevos proyectos desde la comodidad de sus hogares.</p>', '', -1, 1, 1699077362, 0, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `notification_per_user`
--

CREATE TABLE `notification_per_user` (
  `notification_per_user_id` int NOT NULL,
  `user_login_id` int NOT NULL,
  `message` varchar(255) NOT NULL,
  `link` varchar(255) NOT NULL,
  `catalog_notification_id` int NOT NULL,
  `create_date` int NOT NULL,
  `see` int NOT NULL DEFAULT '0',
  `status` int NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `notification_per_user`
--

INSERT INTO `notification_per_user` (`notification_per_user_id`, `user_login_id`, `message`, `link`, `catalog_notification_id`, `create_date`, `see`, `status`) VALUES
(1, 2, 'Bienvenido a bordo Edwin, estamos felices de que te hayas registrado en Site', '', 2, 1699075717, 0, 1),
(2, 1, 'Felicitaciones, Edwin se unió a tu grupo de referidos', '', 1, 1699075717, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `package`
--

CREATE TABLE `package` (
  `package_id` int NOT NULL,
  `catalog_package_type_id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `sku` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `full_description` text NOT NULL,
  `image` varchar(255) NOT NULL,
  `product_ids` varchar(255) NOT NULL,
  `amount` float NOT NULL,
  `catalog_currency_id` int NOT NULL,
  `catalog_commission_ids` varchar(255) NOT NULL,
  `aviable` int NOT NULL DEFAULT '1',
  `create_date` int NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `package`
--

INSERT INTO `package` (`package_id`, `catalog_package_type_id`, `title`, `sku`, `description`, `full_description`, `image`, `product_ids`, `amount`, `catalog_currency_id`, `catalog_commission_ids`, `aviable`, `create_date`, `status`) VALUES
(1, 1, 'PayBusiness', 'PB1', 'PayBusiness suscription', '', '', '[{\"product_id\":1,\"quantity\":1}]', 20, 1, '[1,2,3]', 1, 1663615136, 1),
(2, 2, 'PayAcademy', 'PA1', 'PayAcademy Suscription', '', '', '[{\"product_id\":2,\"quantity\":1}]', 20, 1, '[1,2,3]', 1, 1663615136, 1);

-- --------------------------------------------------------

--
-- Table structure for table `payment_method_per_user`
--

CREATE TABLE `payment_method_per_user` (
  `payment_method_per_user_id` int NOT NULL,
  `user_login_id` int NOT NULL,
  `bank` varchar(255) NOT NULL,
  `account` varchar(255) NOT NULL,
  `clabe` varchar(255) NOT NULL,
  `paypal` varchar(255) NOT NULL,
  `create_date` varchar(11) NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `payment_method_per_user`
--

INSERT INTO `payment_method_per_user` (`payment_method_per_user_id`, `user_login_id`, `bank`, `account`, `clabe`, `paypal`, `create_date`, `status`) VALUES
(1, 1, '', '', '', '', '', 1);

-- --------------------------------------------------------

--
-- Table structure for table `permission_per_user_support`
--

CREATE TABLE `permission_per_user_support` (
  `permission_per_user_support_id` int NOT NULL,
  `user_support_id` int NOT NULL,
  `catalog_permission_id` int NOT NULL,
  `create_date` int NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `permission_per_user_support`
--

INSERT INTO `permission_per_user_support` (`permission_per_user_support_id`, `user_support_id`, `catalog_permission_id`, `create_date`, `status`) VALUES
(1, 1, 1, 1698810937, 1),
(2, 1, 2, 1698810937, 1),
(3, 1, 3, 1698810937, 1),
(4, 1, 4, 1698810937, 1),
(5, 1, 5, 1698810937, 1),
(6, 1, 6, 1698810937, 1),
(7, 1, 7, 1663615136, 1),
(8, 1, 8, 1698810937, 1),
(9, 1, 9, 1698810937, 1),
(10, 1, 10, 1698810937, 1),
(11, 1, 11, 1698810937, 1),
(12, 1, 12, 1698810937, 1),
(13, 1, 13, 1698810938, 1),
(14, 1, 14, 1698810938, 1),
(15, 1, 15, 1663615136, 1),
(16, 1, 16, 1663615136, 1),
(17, 1, 17, 1663615136, 1),
(18, 1, 18, 1663615136, 1),
(19, 1, 19, 1663615136, 1),
(20, 1, 20, 1698810938, 1),
(21, 1, 21, 1663615136, 1),
(22, 1, 22, 1698810938, 1),
(23, 1, 23, 1698810938, 1),
(24, 1, 24, 1698810938, 1),
(25, 1, 25, 1698810938, 1),
(26, 1, 26, 1698810938, 1),
(27, 1, 27, 1698810938, 1),
(28, 1, 28, 1698810938, 1),
(29, 1, 29, 1698810938, 1),
(30, 1, 30, 1698810938, 1),
(31, 1, 31, 1698810938, 1),
(32, 1, 32, 1698810938, 1),
(33, 1, 33, 1663615136, 1),
(34, 1, 34, 1698810938, 1),
(35, 1, 35, 1663615136, 1),
(36, 1, 36, 1698810938, 1),
(37, 1, 37, 1698810938, 1),
(38, 1, 38, 1698810938, 1),
(39, 1, 39, 1698810938, 1),
(40, 1, 40, 1698810938, 1),
(41, 1, 41, 1698810938, 1),
(42, 1, 42, 1698810938, 1),
(43, 1, 43, 1698810938, 1),
(44, 1, 44, 1698810938, 1),
(45, 1, 45, 1698810938, 1),
(46, 1, 46, 1698810938, 1),
(47, 1, 47, 1698810938, 1),
(48, 1, 48, 1698810938, 1);

-- --------------------------------------------------------

--
-- Table structure for table `print_per_banner`
--

CREATE TABLE `print_per_banner` (
  `print_per_banner_id` int NOT NULL,
  `banner_per_campaign_id` int NOT NULL,
  `user_login_id` int NOT NULL,
  `create_date` int NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `product_id` int NOT NULL,
  `sku` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `day` int NOT NULL,
  `description` varchar(255) NOT NULL,
  `amount` float NOT NULL,
  `image` varchar(255) NOT NULL,
  `create_date` int NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `sku`, `title`, `code`, `day`, `description`, `amount`, `image`, `create_date`, `status`) VALUES
(1, 'PPA', 'PayBusiness', 'pay_business', 30, 'membresía', 1, '', 1627354516, 1),
(2, 'PPB', 'PayAcademy', 'academy', 30, 'membresía', 1, '', 1627354516, 1);

-- --------------------------------------------------------

--
-- Table structure for table `product_permission`
--

CREATE TABLE `product_permission` (
  `product_permission_id` int NOT NULL,
  `product_id` int NOT NULL,
  `user_login_id` int NOT NULL,
  `create_date` int NOT NULL,
  `end_date` int NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product_permission`
--

INSERT INTO `product_permission` (`product_permission_id`, `product_id`, `user_login_id`, `create_date`, `end_date`, `status`) VALUES
(1, 1, 1401, 1698453961, 1701045961, 1),
(2, 2, 1401, 1698454007, 1701046007, 1),
(3, 1, 2, 1699060408, 1701652408, 1),
(4, 1, 1, 1699061754, 1701653754, 1);

-- --------------------------------------------------------

--
-- Table structure for table `reply_per_catalog_tag_intent`
--

CREATE TABLE `reply_per_catalog_tag_intent` (
  `reply_per_catalog_tag_intent_id` int NOT NULL,
  `catalog_tag_intent_id` int NOT NULL,
  `reply` text NOT NULL,
  `create_date` int NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `reply_per_catalog_tag_intent`
--

INSERT INTO `reply_per_catalog_tag_intent` (`reply_per_catalog_tag_intent_id`, `catalog_tag_intent_id`, `reply`, `create_date`, `status`) VALUES
(1, 1, 'Hola soy {{bot_name}} y estoy aquí para ayudarte y resolver tus dudas', 1699122612, 1),
(2, 1, '¡Ey! recuerda soy {{bot_name}}, estaré para ayudarte y resolver tus dudas', 1699122612, 1),
(3, 1, 'Yo soy {{bot_name}}, te puedo ayudar con las dudas que tengas de {{company_name}}', 1699122612, 1),
(4, 2, '¡{{company_name}} es una comunidad, con una academia que te permite alcanzar todas tus metas financieras!', 1699125949, 1);

-- --------------------------------------------------------

--
-- Table structure for table `session_per_course`
--

CREATE TABLE `session_per_course` (
  `session_per_course_id` int NOT NULL,
  `course_id` int NOT NULL,
  `course` text NOT NULL,
  `title` varchar(255) NOT NULL,
  `order_number` int NOT NULL,
  `has_previsualization` int NOT NULL DEFAULT '0',
  `catalog_multimedia_id` int NOT NULL,
  `aviable` int NOT NULL DEFAULT '1',
  `create_date` int NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `session_take_by_user_per_course`
--

CREATE TABLE `session_take_by_user_per_course` (
  `session_take_by_user_per_course_id` int NOT NULL,
  `session_per_course_id` int NOT NULL,
  `user_login_id` int NOT NULL,
  `comment` varchar(255) NOT NULL,
  `create_date` int NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `short_url`
--

CREATE TABLE `short_url` (
  `short_url_id` int NOT NULL,
  `user_login_id` int NOT NULL,
  `url` text NOT NULL,
  `title` varchar(255) NOT NULL,
  `domain` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `source` varchar(255) NOT NULL,
  `create_date` int NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `system_var`
--

CREATE TABLE `system_var` (
  `system_var_id` int NOT NULL,
  `catalog_system_var_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `label` varchar(255) NOT NULL,
  `val` varchar(255) NOT NULL,
  `create_date` int NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `system_var`
--

INSERT INTO `system_var` (`system_var_id`, `catalog_system_var_id`, `name`, `description`, `label`, `val`, `create_date`, `status`) VALUES
(1, 1, 'company_name', 'Compañía', '', 'Site', 1663615136, 1),
(2, 1, 'company_address', 'Dirección', '', 'Bucaramanga Colombia', 1663615136, 1),
(3, 1, 'company_address_latitude', 'json', '', '{ \"lat\": 20.6971379, \"lng\": -103.3933895 }', 1663615136, 1),
(4, 1, 'company_whatsapp_message', 'Mensaje para conectar con whatsapp', 'Este mensaje llegará cuando un usuario te contacte', '¡Hola! comparte este mensaje para integrarte a Mi sitio web', 1663615136, 1),
(5, 2, 'social_facebook', 'Facebook', 'URL completa', 'www.facebook.com/', 1663615136, 1),
(6, 2, 'social_instagram', 'Instagram', 'URL completa', 'www.instagram.com/', 1663615136, 1),
(7, 2, 'social_whatsapp', 'WhatsApp', 'Este número de whatsapp se verá para que te contacten (completo)', '+5711111111', 1663615136, 1),
(9, 3, 'backoffice_background_color_top_behivor', 'Color de fondo en Backoffice (Hex)', '', '#c52791', 1663615136, 1),
(8, 1, 'company_email', 'Correo de contacto', 'Se mostrará para que te contacten', 'customerservice@Sitegroup.io', 1663615136, 1),
(10, 3, 'backoffice_highlight_color_top_behivor', 'Color de texto en links en Backoffice (Hex)', '', '#ffaeb6', 1663615136, 1),
(11, 1, 'page_title', 'Título en página', '', 'Site', 1663615136, 1),
(12, 4, 'api_token', 'Token de Stripe', '', '', 1663615136, 1),
(13, 4, 'secret_key', 'Secret key', '', '', 1663615136, 1),
(14, 5, 'api_key', 'Api key', '', 'dqnUhBoE1ClMsgpI', 1663615136, 1),
(15, 5, 'api_secret', 'Api secret', '', 'M8wfcTx13SNDlivAWcO4G9Hf+pHaED06xMn0Tbqfgh1MxXEsMx/zlfhBT9nC5Q1XTli9OHU9UqCta9xBGzi3kA==:VEFMRU5UT1VNQlJFTExBMg==', 1663615136, 1),
(16, 5, 'ipn_secret', 'IPN secret', '', '1N9Vlj0Knp8LIayPo', 1663615136, 1),
(17, 7, 'bot_name', 'Nombre del bot', 'Se visualizará para tus usuarios', 'Bot con I.A.', 1663615136, 1),
(18, 7, 'quick_questions', 'Preguntas frecuentes del bot', 'Se visualizará para tus usuarios', '¿Qué es Site?,¿Cómo funciona Site?', 1663615136, 1),
(19, 7, 'welcome_message', 'Mensaje de bienvenida del bot', 'Se visualizará para tus usuarios', 'Bienvenido a {{company_name}}, por favor escribe una pregunta o selecciona un tema de ayuda rápida', 1663615136, 1);

-- --------------------------------------------------------

--
-- Table structure for table `test_per_exercise`
--

CREATE TABLE `test_per_exercise` (
  `test_per_exercise_id` int NOT NULL,
  `exercise_id` int NOT NULL,
  `score` int NOT NULL,
  `start_date` int NOT NULL,
  `end_date` int NOT NULL,
  `create_date` int NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `test_per_exercise`
--

INSERT INTO `test_per_exercise` (`test_per_exercise_id`, `exercise_id`, `score`, `start_date`, `end_date`, `create_date`, `status`) VALUES
(1, 1, 0, 0, 0, 1681586899, 1),
(2, 2, 0, 0, 0, 1681586916, 1),
(3, 3, 0, 0, 0, 1681586979, 1),
(4, 4, 0, 0, 0, 1681597226, 1),
(5, 5, 0, 0, 0, 1681850419, 1),
(6, 6, 0, 0, 0, 1681850688, 1),
(7, 7, 0, 0, 0, 1681851969, 1),
(8, 8, 0, 0, 0, 1681852059, 1),
(9, 9, 0, 0, 0, 1681866738, 1),
(10, 10, 0, 0, 0, 1682361937, 1),
(11, 11, 0, 0, 0, 1682362039, 1),
(12, 12, 0, 0, 0, 1682364231, 1),
(13, 13, 0, 0, 0, 1682366866, 1),
(14, 14, 0, 0, 0, 1682367869, 1),
(15, 15, 0, 0, 0, 1682369617, 1),
(16, 16, 0, 0, 0, 1682369628, 1),
(17, 17, 0, 0, 0, 1682369656, 1),
(18, 18, 0, 0, 0, 1682369888, 1),
(19, 19, 0, 0, 0, 1682372251, 1),
(20, 20, 0, 0, 0, 1682372284, 1),
(21, 21, 0, 0, 0, 1682378700, 1),
(22, 22, 0, 0, 0, 1682379268, 1),
(23, 23, 0, 0, 0, 1682379570, 1),
(24, 24, 0, 0, 0, 1682440433, 1),
(25, 25, 0, 0, 0, 1682718657, 1),
(26, 26, 0, 0, 0, 1682792059, 1),
(27, 27, 0, 0, 0, 1682792161, 1),
(28, 28, 0, 0, 0, 1682802420, 1),
(29, 29, 0, 0, 0, 1682802483, 1),
(30, 30, 0, 0, 0, 1682813176, 1),
(31, 31, 0, 0, 0, 1682813618, 1),
(32, 32, 0, 0, 0, 1682913609, 1),
(33, 33, 0, 0, 0, 1682913976, 1),
(34, 34, 0, 0, 0, 1682914114, 1),
(35, 35, 0, 0, 0, 1683141359, 1),
(36, 36, 0, 0, 0, 1683161143, 1),
(37, 37, 0, 0, 0, 1683576486, 1),
(38, 38, 0, 0, 0, 1683577047, 1),
(39, 39, 0, 0, 0, 1683578690, 1),
(40, 40, 0, 0, 0, 1683578708, 1),
(41, 41, 0, 0, 0, 1683578950, 1),
(42, 41, 0, 0, 0, 1683604062, 1),
(43, 42, 0, 0, 0, 1683735333, 1),
(44, 43, 0, 0, 0, 1683736170, 1),
(45, 44, 0, 0, 0, 1683736382, 1),
(46, 45, 0, 0, 0, 1683736493, 1),
(47, 46, 0, 0, 0, 1683736830, 1),
(48, 47, 0, 0, 0, 1683736909, 1),
(49, 48, 0, 0, 0, 1683815978, 1),
(50, 49, 0, 0, 0, 1683823208, 1),
(51, 50, 0, 0, 0, 1683834770, 2),
(52, 51, 0, 0, 0, 1684388392, 1),
(53, 52, 0, 0, 0, 1685577378, 1),
(54, 53, 0, 0, 0, 1685577449, 1),
(55, 54, 0, 0, 0, 1685577563, 1),
(56, 55, 0, 0, 0, 1687035343, 1),
(57, 56, 0, 0, 0, 1687035356, 1);

-- --------------------------------------------------------

--
-- Table structure for table `ticket_per_user`
--

CREATE TABLE `ticket_per_user` (
  `ticket_per_user_id` int NOT NULL,
  `unique_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `catalog_topic_id` int NOT NULL DEFAULT '0',
  `user_support_id` int NOT NULL,
  `user_login_id` int NOT NULL,
  `subject` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `create_date` int NOT NULL,
  `status` int NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ticket_per_user`
--

INSERT INTO `ticket_per_user` (`ticket_per_user_id`, `unique_id`, `catalog_topic_id`, `user_support_id`, `user_login_id`, `subject`, `create_date`, `status`) VALUES
(1, 'SoufC', 1, 2, 1381, 'Inconformidad de comisiones', 1687915242, 2),
(2, 'qLI0U', 1, 7, 1381, 'inconforme', 1687916111, 2),
(3, 'Blsd8', 4, 7, 5, 'Coloque el correo mal', 1687970577, 2),
(4, 'xBCW8', 4, 7, 126, 'A mí patrocinado le aparece otro patrocinador', 1688042438, 2),
(5, '1xpFV', 4, 0, 247, 'Me. Cambiaron de patrocinador ', 1688042733, 2),
(6, 'P8qIE', 4, 6, 1444, 'Ina', 1688183570, 1),
(7, '6R0OL', 4, 6, 1444, 'Ina', 1688183570, 1),
(8, 'Yrliw', 4, 6, 1444, 'Ina', 1688183570, 1),
(9, 'Z0Xco', 4, 6, 1444, 'Ina', 1688183570, 1),
(10, 'ybGEh', 4, 0, 1444, 'Ina', 1688183570, -1),
(11, 'Z8ygD', 4, 6, 1444, 'Ina', 1688183570, 1),
(12, 'vHQej', 4, 6, 1444, 'Ina', 1688183571, 1),
(13, 'R0Qyf', 1, 6, 44, 'Ya tengo cuenta en el broker', 1688401288, 1),
(14, 'HKfJI', 4, 6, 962, 'grupos de telegram', 1689096337, 2),
(15, 'elYzb', 4, 0, 1, 'Agradecimeinto', 1690057585, 2),
(16, 'QW0hk', 5, 0, 1447, 'hice retiro y no llega', 1693359478, 0),
(17, 'e1Qyx', 1, 0, 101, 'Clases grabadas', 1694014379, 0),
(18, 'Rhzla', 1, 0, 141, 'Retiro de exma', 1694620528, 0),
(19, 'ntdS4', 3, 0, 1543, 'link para registro no sirve', 1694661736, 0),
(20, 'VbNJZ', 3, 0, 1546, 'DEVOLUCIÓN INVERSIÓN ', 1695640629, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tool`
--

CREATE TABLE `tool` (
  `tool_id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `route` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `catalog_tool_id` int NOT NULL,
  `user_support_id` int NOT NULL,
  `create_date` int NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `tool`
--

INSERT INTO `tool` (`tool_id`, `title`, `route`, `image`, `description`, `catalog_tool_id`, `user_support_id`, `create_date`, `status`) VALUES
(1, 'Presentación de negocio', '../../src/files/tools/1699077788.pdf', '', '<p>PRESENTACIÓN OFICIAL DE Site </p>', 1, 1, 1699077790, 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_account`
--

CREATE TABLE `user_account` (
  `user_account_id` int NOT NULL,
  `user_login_id` int NOT NULL,
  `landing` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `image` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `referral_email` int NOT NULL DEFAULT '1',
  `referral_notification` int NOT NULL DEFAULT '1',
  `info_email` int NOT NULL DEFAULT '1',
  `catalog_timezone_id` int NOT NULL DEFAULT '94'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `user_account`
--

INSERT INTO `user_account` (`user_account_id`, `user_login_id`, `landing`, `image`, `referral_email`, `referral_notification`, `info_email`, `catalog_timezone_id`) VALUES
(1, 1, 'Site', '', 1, 1, 1, 94),
(2, 2, 'edwin', '../../src/img/user/user.png', 1, 1, 1, 94);

-- --------------------------------------------------------

--
-- Table structure for table `user_address`
--

CREATE TABLE `user_address` (
  `user_address_id` int NOT NULL,
  `user_login_id` int NOT NULL,
  `address` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `colony` varchar(40) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `zip_code` varchar(10) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `city` varchar(80) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `state` varchar(40) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `country` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `country_id` int NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `user_address`
--

INSERT INTO `user_address` (`user_address_id`, `user_login_id`, `address`, `colony`, `zip_code`, `city`, `state`, `country`, `country_id`) VALUES
(1, 1, '', '', '', '', '', '', 0),
(2, 2, '', '', '', '', '', '', 159);

-- --------------------------------------------------------

--
-- Table structure for table `user_card`
--

CREATE TABLE `user_card` (
  `user_card_id` int NOT NULL,
  `user_login_id` int NOT NULL,
  `user` varchar(255) NOT NULL,
  `create_date` int NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `user_contact`
--

CREATE TABLE `user_contact` (
  `user_contact_id` int NOT NULL,
  `user_login_id` int NOT NULL,
  `whatsapp` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `cellular` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `user_contact`
--

INSERT INTO `user_contact` (`user_contact_id`, `user_login_id`, `whatsapp`, `cellular`, `phone`) VALUES
(1, 1, '', '', ''),
(2, 2, '', '', '3317361196');

-- --------------------------------------------------------

--
-- Table structure for table `user_data`
--

CREATE TABLE `user_data` (
  `user_data_id` int NOT NULL,
  `user_login_id` int NOT NULL,
  `names` varchar(80) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `last_name` varchar(80) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `sur_name` varchar(80) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `birthday` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `gender` varchar(11) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `user_data`
--

INSERT INTO `user_data` (`user_data_id`, `user_login_id`, `names`, `last_name`, `sur_name`, `birthday`, `gender`) VALUES
(1, 1, 'Site', '', '', '', ''),
(2, 2, 'Edwin', '', '', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `user_enrolled_in_course`
--

CREATE TABLE `user_enrolled_in_course` (
  `user_enrolled_in_course_id` int NOT NULL,
  `user_login_id` int NOT NULL,
  `course_id` int NOT NULL,
  `create_date` int NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `user_login`
--

CREATE TABLE `user_login` (
  `user_login_id` int NOT NULL,
  `company_id` int NOT NULL,
  `catalog_campaing_id` int NOT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `secret` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `signup_date` int NOT NULL,
  `salt` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `last_login_date` int NOT NULL,
  `ip_user_address` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `uuid` varchar(55) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  `verified_mail` int NOT NULL DEFAULT '0',
  `verified` int NOT NULL DEFAULT '0',
  `update_password` int NOT NULL DEFAULT '0',
  `status` int NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `user_login`
--

INSERT INTO `user_login` (`user_login_id`, `company_id`, `catalog_campaing_id`, `email`, `password`, `secret`, `signup_date`, `salt`, `last_login_date`, `ip_user_address`, `uuid`, `verified_mail`, `verified`, `update_password`, `status`) VALUES
(1, 1, 0, 'financial@Sitegroup.io', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', '0MrNLlFbT5mHPeiqgKvOxV', 0, 'yJt3I', 1699118363, '201.139.102.30', '0', 1, 0, 0, 1),
(2, 2, 0, 'javier.fernandez.pa93@gmail.com', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'nZbg6u7lWvtwJIim0EyoUf', 1699075716, 'tuK7Q', 1699126304, '187.189.190.194', '0', 1, 0, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_referral`
--

CREATE TABLE `user_referral` (
  `user_referral_id` int NOT NULL,
  `sponsor_id` int NOT NULL,
  `referral_id` int NOT NULL,
  `user_login_id` int NOT NULL,
  `side` int NOT NULL DEFAULT '0',
  `create_date` int NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `user_referral`
--

INSERT INTO `user_referral` (`user_referral_id`, `sponsor_id`, `referral_id`, `user_login_id`, `side`, `create_date`, `status`) VALUES
(1, 0, 1, 2, 0, 1699078463, 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_support`
--

CREATE TABLE `user_support` (
  `user_support_id` int NOT NULL,
  `names` varchar(80) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `last_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `sur_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `image` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(80) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `secret` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `salt` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `gender` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT 'male',
  `phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `cellular` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `campaing` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `create_date` int NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `user_support`
--

INSERT INTO `user_support` (`user_support_id`, `names`, `last_name`, `sur_name`, `image`, `email`, `password`, `secret`, `salt`, `gender`, `phone`, `cellular`, `campaing`, `create_date`, `status`) VALUES
(1, 'Admin', '', '', '../../src/img/user.png', 'javier.fernandez.pa93@gmail.com', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', '', 'JCtwn', 'male', '', '', '0,1', 1656713453, 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_type`
--

CREATE TABLE `user_type` (
  `user_type_id` int NOT NULL,
  `user_login_id` int NOT NULL,
  `catalog_user_type_id` int NOT NULL,
  `create_date` int NOT NULL,
  `time` int NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `user_type`
--

INSERT INTO `user_type` (`user_type_id`, `user_login_id`, `catalog_user_type_id`, `create_date`, `time`) VALUES
(1, 1, 1, 1663615136, 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_wallet`
--

CREATE TABLE `user_wallet` (
  `user_wallet_id` int NOT NULL,
  `user_login_id` int NOT NULL,
  `create_date` int NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `video_class`
--

CREATE TABLE `video_class` (
  `video_class_id` int NOT NULL,
  `catalog_video_class_id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `link` varchar(255) NOT NULL,
  `video` varchar(255) NOT NULL,
  `speaker` text NOT NULL,
  `start_date` int NOT NULL,
  `create_date` int NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `video_class`
--

INSERT INTO `video_class` (`video_class_id`, `catalog_video_class_id`, `title`, `description`, `link`, `video`, `speaker`, `start_date`, `create_date`, `status`) VALUES
(1, 1, 'Índices Americanos', '', '', '', 'César Valenzuela', 0, 1663615136, -1),
(2, 2, 'Índices Americanos', '', '', '', 'César Valenzuela', 0, 1663615136, -1),
(3, 3, 'Índices Americanos', '', '', '', 'César Valenzuela', 0, 1663615136, -1),
(4, 4, 'Índices Americanos', '', '', '', 'César Valenzuela', 0, 1663615136, -1);

-- --------------------------------------------------------

--
-- Table structure for table `visit_per_course`
--

CREATE TABLE `visit_per_course` (
  `visit_per_course_id` int NOT NULL,
  `course_id` int NOT NULL,
  `user_login_id` int NOT NULL,
  `create_date` int NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `withdraw_method_per_user`
--

CREATE TABLE `withdraw_method_per_user` (
  `withdraw_method_per_user_id` int NOT NULL,
  `catalog_withdraw_method_id` int NOT NULL,
  `user_login_id` int NOT NULL,
  `wallet` varchar(255) NOT NULL,
  `create_date` int NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `withdraw_per_user`
--

CREATE TABLE `withdraw_per_user` (
  `withdraw_per_user_id` int NOT NULL,
  `user_login_id` int NOT NULL,
  `withdraw_method_per_user_id` int NOT NULL,
  `transaction_per_wallet_id` int NOT NULL,
  `result_data` varchar(255) NOT NULL,
  `amount` float NOT NULL,
  `tx_id` varchar(255) NOT NULL,
  `apply_date` int NOT NULL,
  `process_date` int NOT NULL,
  `pay_date` int NOT NULL,
  `create_date` int NOT NULL,
  `status` int NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `api_credential`
--
ALTER TABLE `api_credential`
  ADD PRIMARY KEY (`api_credential_id`);

--
-- Indexes for table `banner`
--
ALTER TABLE `banner`
  ADD PRIMARY KEY (`banner_id`);

--
-- Indexes for table `banner_per_campaign`
--
ALTER TABLE `banner_per_campaign`
  ADD PRIMARY KEY (`banner_per_campaign_id`);

--
-- Indexes for table `buy_per_user`
--
ALTER TABLE `buy_per_user`
  ADD PRIMARY KEY (`buy_per_user_id`);

--
-- Indexes for table `campaign_banner_per_user`
--
ALTER TABLE `campaign_banner_per_user`
  ADD PRIMARY KEY (`campaign_banner_per_user_id`);

--
-- Indexes for table `campaign_email`
--
ALTER TABLE `campaign_email`
  ADD PRIMARY KEY (`campaign_email_id`);

--
-- Indexes for table `catalog_banner`
--
ALTER TABLE `catalog_banner`
  ADD PRIMARY KEY (`catalog_banner_id`);

--
-- Indexes for table `catalog_bridge_buy_type`
--
ALTER TABLE `catalog_bridge_buy_type`
  ADD PRIMARY KEY (`catalog_bridge_buy_type_id`);

--
-- Indexes for table `catalog_broker`
--
ALTER TABLE `catalog_broker`
  ADD PRIMARY KEY (`catalog_broker_id`);

--
-- Indexes for table `catalog_commission`
--
ALTER TABLE `catalog_commission`
  ADD PRIMARY KEY (`catalog_commission_id`);

--
-- Indexes for table `catalog_commission_type`
--
ALTER TABLE `catalog_commission_type`
  ADD PRIMARY KEY (`catalog_commission_type_id`);

--
-- Indexes for table `catalog_conference`
--
ALTER TABLE `catalog_conference`
  ADD PRIMARY KEY (`catalog_conference_id`);

--
-- Indexes for table `catalog_course`
--
ALTER TABLE `catalog_course`
  ADD PRIMARY KEY (`catalog_course_id`);

--
-- Indexes for table `catalog_course_type`
--
ALTER TABLE `catalog_course_type`
  ADD PRIMARY KEY (`catalog_course_type_id`);

--
-- Indexes for table `catalog_currency`
--
ALTER TABLE `catalog_currency`
  ADD PRIMARY KEY (`catalog_currency_id`);

--
-- Indexes for table `catalog_level`
--
ALTER TABLE `catalog_level`
  ADD PRIMARY KEY (`catalog_level_id`);

--
-- Indexes for table `catalog_mail_controller`
--
ALTER TABLE `catalog_mail_controller`
  ADD PRIMARY KEY (`catalog_mail_controller_id`);

--
-- Indexes for table `catalog_membership`
--
ALTER TABLE `catalog_membership`
  ADD PRIMARY KEY (`catalog_membership_id`);

--
-- Indexes for table `catalog_multimedia`
--
ALTER TABLE `catalog_multimedia`
  ADD PRIMARY KEY (`catalog_multimedia_id`);

--
-- Indexes for table `catalog_notice`
--
ALTER TABLE `catalog_notice`
  ADD PRIMARY KEY (`catalog_notice_id`);

--
-- Indexes for table `catalog_notification`
--
ALTER TABLE `catalog_notification`
  ADD PRIMARY KEY (`catalog_notification_id`);

--
-- Indexes for table `catalog_package_type`
--
ALTER TABLE `catalog_package_type`
  ADD PRIMARY KEY (`catalog_package_type_id`);

--
-- Indexes for table `catalog_payment_method`
--
ALTER TABLE `catalog_payment_method`
  ADD PRIMARY KEY (`catalog_payment_method_id`);

--
-- Indexes for table `catalog_permission`
--
ALTER TABLE `catalog_permission`
  ADD PRIMARY KEY (`catalog_permission_id`);

--
-- Indexes for table `catalog_plan`
--
ALTER TABLE `catalog_plan`
  ADD PRIMARY KEY (`catalog_plan_id`);

--
-- Indexes for table `catalog_priority`
--
ALTER TABLE `catalog_priority`
  ADD PRIMARY KEY (`catalog_priority_id`);

--
-- Indexes for table `catalog_profit`
--
ALTER TABLE `catalog_profit`
  ADD PRIMARY KEY (`catalog_profit_id`);

--
-- Indexes for table `catalog_range`
--
ALTER TABLE `catalog_range`
  ADD PRIMARY KEY (`catalog_range_id`);

--
-- Indexes for table `catalog_range_per_user`
--
ALTER TABLE `catalog_range_per_user`
  ADD PRIMARY KEY (`catalog_range_per_user_id`);

--
-- Indexes for table `catalog_speaker`
--
ALTER TABLE `catalog_speaker`
  ADD PRIMARY KEY (`catalog_speaker_id`);

--
-- Indexes for table `catalog_subtopic`
--
ALTER TABLE `catalog_subtopic`
  ADD PRIMARY KEY (`catalog_subtopic_id`);

--
-- Indexes for table `catalog_system_var`
--
ALTER TABLE `catalog_system_var`
  ADD PRIMARY KEY (`catalog_system_var_id`);

--
-- Indexes for table `catalog_tag_intent`
--
ALTER TABLE `catalog_tag_intent`
  ADD PRIMARY KEY (`catalog_tag_intent_id`);

--
-- Indexes for table `catalog_timezone`
--
ALTER TABLE `catalog_timezone`
  ADD PRIMARY KEY (`catalog_timezone_id`);

--
-- Indexes for table `catalog_tool`
--
ALTER TABLE `catalog_tool`
  ADD PRIMARY KEY (`catalog_tool_id`);

--
-- Indexes for table `catalog_topic`
--
ALTER TABLE `catalog_topic`
  ADD PRIMARY KEY (`catalog_topic_id`);

--
-- Indexes for table `catalog_user_type`
--
ALTER TABLE `catalog_user_type`
  ADD PRIMARY KEY (`catalog_user_type_id`);

--
-- Indexes for table `catalog_validation_method`
--
ALTER TABLE `catalog_validation_method`
  ADD PRIMARY KEY (`catalog_validation_method_id`);

--
-- Indexes for table `catalog_withdraw_method`
--
ALTER TABLE `catalog_withdraw_method`
  ADD PRIMARY KEY (`catalog_withdraw_method_id`);

--
-- Indexes for table `click_per_banner`
--
ALTER TABLE `click_per_banner`
  ADD PRIMARY KEY (`click_per_banner_id`);

--
-- Indexes for table `comment_per_course`
--
ALTER TABLE `comment_per_course`
  ADD PRIMARY KEY (`comment_per_course_id`);

--
-- Indexes for table `commission_per_user`
--
ALTER TABLE `commission_per_user`
  ADD PRIMARY KEY (`commission_per_user_id`);

--
-- Indexes for table `conference`
--
ALTER TABLE `conference`
  ADD PRIMARY KEY (`conference_id`);

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`course_id`);

--
-- Indexes for table `cout`
--
ALTER TABLE `cout`
  ADD PRIMARY KEY (`cout_id`);

--
-- Indexes for table `email_per_campaign`
--
ALTER TABLE `email_per_campaign`
  ADD PRIMARY KEY (`email_per_campaign_id`);

--
-- Indexes for table `faq`
--
ALTER TABLE `faq`
  ADD PRIMARY KEY (`faq_id`);

--
-- Indexes for table `image`
--
ALTER TABLE `image`
  ADD PRIMARY KEY (`image_id`);

--
-- Indexes for table `intent`
--
ALTER TABLE `intent`
  ADD PRIMARY KEY (`intent_id`);

--
-- Indexes for table `ipn`
--
ALTER TABLE `ipn`
  ADD PRIMARY KEY (`ipn_id`);

--
-- Indexes for table `item_per_ticket`
--
ALTER TABLE `item_per_ticket`
  ADD PRIMARY KEY (`item_per_ticket_id`);

--
-- Indexes for table `landing_per_user`
--
ALTER TABLE `landing_per_user`
  ADD PRIMARY KEY (`landing_per_user_id`);

--
-- Indexes for table `like_per_course`
--
ALTER TABLE `like_per_course`
  ADD PRIMARY KEY (`like_per_course_id`);

--
-- Indexes for table `log`
--
ALTER TABLE `log`
  ADD PRIMARY KEY (`log_id`);

--
-- Indexes for table `membership_per_user`
--
ALTER TABLE `membership_per_user`
  ADD PRIMARY KEY (`membership_per_user_id`);

--
-- Indexes for table `notice`
--
ALTER TABLE `notice`
  ADD PRIMARY KEY (`notice_id`);

--
-- Indexes for table `notification_per_user`
--
ALTER TABLE `notification_per_user`
  ADD PRIMARY KEY (`notification_per_user_id`);

--
-- Indexes for table `package`
--
ALTER TABLE `package`
  ADD PRIMARY KEY (`package_id`);

--
-- Indexes for table `payment_method_per_user`
--
ALTER TABLE `payment_method_per_user`
  ADD PRIMARY KEY (`payment_method_per_user_id`);

--
-- Indexes for table `permission_per_user_support`
--
ALTER TABLE `permission_per_user_support`
  ADD PRIMARY KEY (`permission_per_user_support_id`);

--
-- Indexes for table `print_per_banner`
--
ALTER TABLE `print_per_banner`
  ADD PRIMARY KEY (`print_per_banner_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `product_permission`
--
ALTER TABLE `product_permission`
  ADD PRIMARY KEY (`product_permission_id`);

--
-- Indexes for table `reply_per_catalog_tag_intent`
--
ALTER TABLE `reply_per_catalog_tag_intent`
  ADD PRIMARY KEY (`reply_per_catalog_tag_intent_id`);

--
-- Indexes for table `session_per_course`
--
ALTER TABLE `session_per_course`
  ADD PRIMARY KEY (`session_per_course_id`);

--
-- Indexes for table `session_take_by_user_per_course`
--
ALTER TABLE `session_take_by_user_per_course`
  ADD PRIMARY KEY (`session_take_by_user_per_course_id`);

--
-- Indexes for table `short_url`
--
ALTER TABLE `short_url`
  ADD PRIMARY KEY (`short_url_id`);

--
-- Indexes for table `system_var`
--
ALTER TABLE `system_var`
  ADD PRIMARY KEY (`system_var_id`);

--
-- Indexes for table `test_per_exercise`
--
ALTER TABLE `test_per_exercise`
  ADD PRIMARY KEY (`test_per_exercise_id`);

--
-- Indexes for table `ticket_per_user`
--
ALTER TABLE `ticket_per_user`
  ADD PRIMARY KEY (`ticket_per_user_id`);

--
-- Indexes for table `tool`
--
ALTER TABLE `tool`
  ADD PRIMARY KEY (`tool_id`);

--
-- Indexes for table `user_account`
--
ALTER TABLE `user_account`
  ADD PRIMARY KEY (`user_account_id`);

--
-- Indexes for table `user_address`
--
ALTER TABLE `user_address`
  ADD PRIMARY KEY (`user_address_id`);

--
-- Indexes for table `user_card`
--
ALTER TABLE `user_card`
  ADD PRIMARY KEY (`user_card_id`);

--
-- Indexes for table `user_contact`
--
ALTER TABLE `user_contact`
  ADD PRIMARY KEY (`user_contact_id`);

--
-- Indexes for table `user_data`
--
ALTER TABLE `user_data`
  ADD PRIMARY KEY (`user_data_id`);

--
-- Indexes for table `user_enrolled_in_course`
--
ALTER TABLE `user_enrolled_in_course`
  ADD PRIMARY KEY (`user_enrolled_in_course_id`);

--
-- Indexes for table `user_login`
--
ALTER TABLE `user_login`
  ADD PRIMARY KEY (`user_login_id`);

--
-- Indexes for table `user_referral`
--
ALTER TABLE `user_referral`
  ADD PRIMARY KEY (`user_referral_id`);

--
-- Indexes for table `user_support`
--
ALTER TABLE `user_support`
  ADD PRIMARY KEY (`user_support_id`);

--
-- Indexes for table `user_type`
--
ALTER TABLE `user_type`
  ADD PRIMARY KEY (`user_type_id`);

--
-- Indexes for table `user_wallet`
--
ALTER TABLE `user_wallet`
  ADD PRIMARY KEY (`user_wallet_id`);

--
-- Indexes for table `video_class`
--
ALTER TABLE `video_class`
  ADD PRIMARY KEY (`video_class_id`);

--
-- Indexes for table `visit_per_course`
--
ALTER TABLE `visit_per_course`
  ADD PRIMARY KEY (`visit_per_course_id`);

--
-- Indexes for table `withdraw_method_per_user`
--
ALTER TABLE `withdraw_method_per_user`
  ADD PRIMARY KEY (`withdraw_method_per_user_id`);

--
-- Indexes for table `withdraw_per_user`
--
ALTER TABLE `withdraw_per_user`
  ADD PRIMARY KEY (`withdraw_per_user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `api_credential`
--
ALTER TABLE `api_credential`
  MODIFY `api_credential_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `banner`
--
ALTER TABLE `banner`
  MODIFY `banner_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `banner_per_campaign`
--
ALTER TABLE `banner_per_campaign`
  MODIFY `banner_per_campaign_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `buy_per_user`
--
ALTER TABLE `buy_per_user`
  MODIFY `buy_per_user_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `campaign_banner_per_user`
--
ALTER TABLE `campaign_banner_per_user`
  MODIFY `campaign_banner_per_user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `campaign_email`
--
ALTER TABLE `campaign_email`
  MODIFY `campaign_email_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `catalog_banner`
--
ALTER TABLE `catalog_banner`
  MODIFY `catalog_banner_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `catalog_bridge_buy_type`
--
ALTER TABLE `catalog_bridge_buy_type`
  MODIFY `catalog_bridge_buy_type_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `catalog_broker`
--
ALTER TABLE `catalog_broker`
  MODIFY `catalog_broker_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `catalog_commission`
--
ALTER TABLE `catalog_commission`
  MODIFY `catalog_commission_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `catalog_commission_type`
--
ALTER TABLE `catalog_commission_type`
  MODIFY `catalog_commission_type_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `catalog_conference`
--
ALTER TABLE `catalog_conference`
  MODIFY `catalog_conference_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `catalog_course`
--
ALTER TABLE `catalog_course`
  MODIFY `catalog_course_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `catalog_course_type`
--
ALTER TABLE `catalog_course_type`
  MODIFY `catalog_course_type_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `catalog_currency`
--
ALTER TABLE `catalog_currency`
  MODIFY `catalog_currency_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `catalog_level`
--
ALTER TABLE `catalog_level`
  MODIFY `catalog_level_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `catalog_mail_controller`
--
ALTER TABLE `catalog_mail_controller`
  MODIFY `catalog_mail_controller_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `catalog_membership`
--
ALTER TABLE `catalog_membership`
  MODIFY `catalog_membership_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `catalog_multimedia`
--
ALTER TABLE `catalog_multimedia`
  MODIFY `catalog_multimedia_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `catalog_notice`
--
ALTER TABLE `catalog_notice`
  MODIFY `catalog_notice_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `catalog_notification`
--
ALTER TABLE `catalog_notification`
  MODIFY `catalog_notification_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `catalog_package_type`
--
ALTER TABLE `catalog_package_type`
  MODIFY `catalog_package_type_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `catalog_payment_method`
--
ALTER TABLE `catalog_payment_method`
  MODIFY `catalog_payment_method_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `catalog_permission`
--
ALTER TABLE `catalog_permission`
  MODIFY `catalog_permission_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `catalog_plan`
--
ALTER TABLE `catalog_plan`
  MODIFY `catalog_plan_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `catalog_priority`
--
ALTER TABLE `catalog_priority`
  MODIFY `catalog_priority_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `catalog_profit`
--
ALTER TABLE `catalog_profit`
  MODIFY `catalog_profit_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `catalog_range`
--
ALTER TABLE `catalog_range`
  MODIFY `catalog_range_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `catalog_range_per_user`
--
ALTER TABLE `catalog_range_per_user`
  MODIFY `catalog_range_per_user_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `catalog_speaker`
--
ALTER TABLE `catalog_speaker`
  MODIFY `catalog_speaker_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `catalog_subtopic`
--
ALTER TABLE `catalog_subtopic`
  MODIFY `catalog_subtopic_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `catalog_system_var`
--
ALTER TABLE `catalog_system_var`
  MODIFY `catalog_system_var_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `catalog_tag_intent`
--
ALTER TABLE `catalog_tag_intent`
  MODIFY `catalog_tag_intent_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `catalog_timezone`
--
ALTER TABLE `catalog_timezone`
  MODIFY `catalog_timezone_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=295;

--
-- AUTO_INCREMENT for table `catalog_tool`
--
ALTER TABLE `catalog_tool`
  MODIFY `catalog_tool_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `catalog_topic`
--
ALTER TABLE `catalog_topic`
  MODIFY `catalog_topic_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `catalog_user_type`
--
ALTER TABLE `catalog_user_type`
  MODIFY `catalog_user_type_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `catalog_validation_method`
--
ALTER TABLE `catalog_validation_method`
  MODIFY `catalog_validation_method_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `catalog_withdraw_method`
--
ALTER TABLE `catalog_withdraw_method`
  MODIFY `catalog_withdraw_method_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `click_per_banner`
--
ALTER TABLE `click_per_banner`
  MODIFY `click_per_banner_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `comment_per_course`
--
ALTER TABLE `comment_per_course`
  MODIFY `comment_per_course_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `commission_per_user`
--
ALTER TABLE `commission_per_user`
  MODIFY `commission_per_user_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `conference`
--
ALTER TABLE `conference`
  MODIFY `conference_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `course`
--
ALTER TABLE `course`
  MODIFY `course_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `cout`
--
ALTER TABLE `cout`
  MODIFY `cout_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `email_per_campaign`
--
ALTER TABLE `email_per_campaign`
  MODIFY `email_per_campaign_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `faq`
--
ALTER TABLE `faq`
  MODIFY `faq_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `image`
--
ALTER TABLE `image`
  MODIFY `image_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `intent`
--
ALTER TABLE `intent`
  MODIFY `intent_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `ipn`
--
ALTER TABLE `ipn`
  MODIFY `ipn_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `item_per_ticket`
--
ALTER TABLE `item_per_ticket`
  MODIFY `item_per_ticket_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `landing_per_user`
--
ALTER TABLE `landing_per_user`
  MODIFY `landing_per_user_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `like_per_course`
--
ALTER TABLE `like_per_course`
  MODIFY `like_per_course_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `log`
--
ALTER TABLE `log`
  MODIFY `log_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `membership_per_user`
--
ALTER TABLE `membership_per_user`
  MODIFY `membership_per_user_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notice`
--
ALTER TABLE `notice`
  MODIFY `notice_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `notification_per_user`
--
ALTER TABLE `notification_per_user`
  MODIFY `notification_per_user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `package`
--
ALTER TABLE `package`
  MODIFY `package_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=229;

--
-- AUTO_INCREMENT for table `payment_method_per_user`
--
ALTER TABLE `payment_method_per_user`
  MODIFY `payment_method_per_user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `permission_per_user_support`
--
ALTER TABLE `permission_per_user_support`
  MODIFY `permission_per_user_support_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `print_per_banner`
--
ALTER TABLE `print_per_banner`
  MODIFY `print_per_banner_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `product_permission`
--
ALTER TABLE `product_permission`
  MODIFY `product_permission_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `reply_per_catalog_tag_intent`
--
ALTER TABLE `reply_per_catalog_tag_intent`
  MODIFY `reply_per_catalog_tag_intent_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `session_per_course`
--
ALTER TABLE `session_per_course`
  MODIFY `session_per_course_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `session_take_by_user_per_course`
--
ALTER TABLE `session_take_by_user_per_course`
  MODIFY `session_take_by_user_per_course_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `short_url`
--
ALTER TABLE `short_url`
  MODIFY `short_url_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `system_var`
--
ALTER TABLE `system_var`
  MODIFY `system_var_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `test_per_exercise`
--
ALTER TABLE `test_per_exercise`
  MODIFY `test_per_exercise_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `ticket_per_user`
--
ALTER TABLE `ticket_per_user`
  MODIFY `ticket_per_user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `tool`
--
ALTER TABLE `tool`
  MODIFY `tool_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user_account`
--
ALTER TABLE `user_account`
  MODIFY `user_account_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user_address`
--
ALTER TABLE `user_address`
  MODIFY `user_address_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user_card`
--
ALTER TABLE `user_card`
  MODIFY `user_card_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_contact`
--
ALTER TABLE `user_contact`
  MODIFY `user_contact_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user_data`
--
ALTER TABLE `user_data`
  MODIFY `user_data_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user_enrolled_in_course`
--
ALTER TABLE `user_enrolled_in_course`
  MODIFY `user_enrolled_in_course_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_login`
--
ALTER TABLE `user_login`
  MODIFY `user_login_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user_referral`
--
ALTER TABLE `user_referral`
  MODIFY `user_referral_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user_support`
--
ALTER TABLE `user_support`
  MODIFY `user_support_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user_type`
--
ALTER TABLE `user_type`
  MODIFY `user_type_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user_wallet`
--
ALTER TABLE `user_wallet`
  MODIFY `user_wallet_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `video_class`
--
ALTER TABLE `video_class`
  MODIFY `video_class_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `visit_per_course`
--
ALTER TABLE `visit_per_course`
  MODIFY `visit_per_course_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `withdraw_method_per_user`
--
ALTER TABLE `withdraw_method_per_user`
  MODIFY `withdraw_method_per_user_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `withdraw_per_user`
--
ALTER TABLE `withdraw_per_user`
  MODIFY `withdraw_per_user_id` int NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
