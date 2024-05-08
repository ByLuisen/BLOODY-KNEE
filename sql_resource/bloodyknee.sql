-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 06-05-2024 a las 13:18:31
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bloodyknee`
--
DROP DATABASE IF EXISTS `bloodyknee`;
CREATE DATABASE IF NOT EXISTS `bloodyknee` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `bloodyknee`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `brands`
--

DROP TABLE IF EXISTS `brands`;
CREATE TABLE `brands` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `brands`
--

INSERT INTO `brands` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Venum', '2024-05-04 17:14:01', '2024-05-04 17:14:01'),
(2, 'Buddha', '2024-05-04 17:14:01', '2024-05-04 17:14:01'),
(3, 'Rival', '2024-05-04 17:14:02', '2024-05-04 17:14:02'),
(4, 'Nike', '2024-05-04 17:14:02', '2024-05-04 17:14:02');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carts`
--

DROP TABLE IF EXISTS `carts`;
CREATE TABLE `carts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cart_store_products`
--

DROP TABLE IF EXISTS `cart_store_products`;
CREATE TABLE `cart_store_products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `cart_id` bigint(20) UNSIGNED NOT NULL,
  `quantity` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Clothes', '2024-05-04 17:14:00', '2024-05-04 17:14:00'),
(2, 'Equipment', '2024-05-04 17:14:01', '2024-05-04 17:14:01'),
(3, 'Accessories', '2024-05-04 17:14:01', '2024-05-04 17:14:01');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `countries`
--

DROP TABLE IF EXISTS `countries`;
CREATE TABLE `countries` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `iso_code` varchar(255) NOT NULL,
  `currency` varchar(255) NOT NULL,
  `tax` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `diets`
--

DROP TABLE IF EXISTS `diets`;
CREATE TABLE `diets` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `content` longtext NOT NULL,
  `author` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `migrations`
--

DROP TABLE IF EXISTS `migrations`;
CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(2, '2019_08_19_000000_create_failed_jobs_table', 1),
(3, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(4, '2024_04_09_081125_create_quotes_table', 1),
(5, '2024_04_09_082043_create_permission_tables', 1),
(6, '2024_04_10_090625_create_countries_table', 1),
(7, '2024_04_10_091041_create_regions_table', 1),
(8, '2024_04_10_091240_create_provinces_table', 1),
(9, '2024_04_10_091346_create_users_table', 1),
(10, '2024_04_10_092512_create_user_subscribe_quotes_table', 1),
(11, '2024_04_10_112858_create_modalities_table', 1),
(12, '2024_04_10_112859_create_types_table', 1),
(13, '2024_04_10_121842_create_videos_table', 1),
(14, '2024_04_10_123000_create_brands_table', 1),
(15, '2024_04_10_123054_create_user_comment_videos_table', 1),
(16, '2024_04_10_123100_create_categories_table', 1),
(17, '2024_04_10_123200_create_products_table', 1),
(18, '2024_04_10_123450_create_user_like_dislike_videos_table', 1),
(19, '2024_04_10_123605_create_user_visit_videos_table', 1),
(20, '2024_04_10_123814_create_diets_table', 1),
(21, '2024_04_10_124049_create_user_favorite_diets_table', 1),
(22, '2024_04_10_124940_create_carts_table', 1),
(23, '2024_04_10_125150_create_cart_store_products_table', 1),
(24, '2024_04_10_125426_create_orders_table', 1),
(25, '2024_04_10_130515_create_order_details_table', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `modalities`
--

DROP TABLE IF EXISTS `modalities`;
CREATE TABLE `modalities` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `modalities`
--

INSERT INTO `modalities` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'boxeo', '2024-05-04 17:13:52', '2024-05-04 17:13:52'),
(2, 'thai', '2024-05-04 17:13:52', '2024-05-04 17:13:52'),
(3, 'fitness', '2024-05-04 17:13:52', '2024-05-04 17:13:52');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `model_has_permissions`
--

DROP TABLE IF EXISTS `model_has_permissions`;
CREATE TABLE `model_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `model_has_roles`
--

DROP TABLE IF EXISTS `model_has_roles`;
CREATE TABLE `model_has_roles` (
  `role_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `date` date NOT NULL DEFAULT '2024-05-04',
  `total` int(11) NOT NULL,
  `status` enum('Pending','In process','Confirmed','On the way','Delivered','Cancelled','Refunded') NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `order_details`
--

DROP TABLE IF EXISTS `order_details`;
CREATE TABLE `order_details` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `order_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `quantity` int(11) NOT NULL,
  `unit_price` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permissions`
--

DROP TABLE IF EXISTS `permissions`;
CREATE TABLE `permissions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `brand_id` bigint(20) UNSIGNED NOT NULL,
  `category_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` int(11) NOT NULL,
  `stock` int(11) NOT NULL,
  `url_img1` text NOT NULL,
  `url_img2` text NOT NULL,
  `url_img3` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `brand_id`, `category_id`, `name`, `description`, `price`, `stock`, `url_img1`, `url_img2`, `url_img3`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'Jogger Venum', 'Cómodos y estilosos joggers, perfectos tanto para entrenamiento como para uso casual.', 76, 50, 'VenumJogger_1', 'VenumJogger_2', 'VenumJogger_3', '2024-05-04 17:14:02', '2024-05-04 17:14:02'),
(2, 1, 2, 'Mochila Venum', 'Mochila resistente diseñada para satisfacer todas tus necesidades de gimnasio y viaje.', 65, 50, 'VenumSportBag_1', 'VenumSportBag_2', 'VenumSportBag_3', '2024-05-04 17:14:02', '2024-05-04 17:14:02'),
(3, 1, 2, 'Mochila Xtream Venum', 'Mochila de gran capacidad, ideal para atletas y aventureros por igual.', 130, 30, 'VenumXtreamBackpack_1', 'VenumXtreamBackpack_2', 'VenumXtreamBackpack_3', '2024-05-04 17:14:03', '2024-05-04 17:14:03'),
(4, 1, 2, 'Bolsa deportiva Venum', 'Bolsa deportiva versátil con excelente espacio de almacenamiento y fácil acceso.', 90, 30, 'VenumBackpack_1', 'VenumBackpack_2', 'VenumBackpack_3', '2024-05-04 17:14:03', '2024-05-04 17:14:03'),
(5, 1, 3, 'Gorra Venum Color Arena', 'Gorra elegante color arena con correa ajustable para un ajuste cómodo.', 90, 30, 'CapSand_1', 'CapSand_2', 'CapSand_3', '2024-05-04 17:14:03', '2024-05-04 17:14:03'),
(6, 1, 3, 'Gorra Venum Marrón', 'Gorra de moda en color marrón, hecha con tela transpirable, perfecta para actividades al aire libre.', 26, 30, 'CapBrown_1', 'CapBrown_2', 'CapBrown_3', '2024-05-04 17:14:03', '2024-05-04 17:14:03'),
(7, 1, 3, 'Gorra Venum Marrón Oscuro', 'Gorra marrón oscuro que combina estilo y comodidad, ideal para uso diario.', 26, 30, 'CapDarkBrown_1', 'CapDarkBrown_2', 'CapDarkBrown_3', '2024-05-04 17:14:03', '2024-05-04 17:14:03'),
(8, 2, 2, 'Guantes Piel Edition', 'Guantes de boxeo de cuero premium para profesionales, ofreciendo comodidad y protección.', 80, 30, 'GuantesPiel_1', 'GuantesPiel_2', 'GuantesPiel_3', '2024-05-04 17:14:04', '2024-05-04 17:14:04'),
(9, 2, 2, 'Guantes Fantasy Edition', 'Guantes coloridos diseñados tanto para entrenamiento como competición, ofreciendo excelente soporte de muñeca.', 50, 30, 'GuantesFantasy_1', 'GuantesFantasy_2', 'GuantesFantasy_3', '2024-05-04 17:14:04', '2024-05-04 17:14:04'),
(10, 1, 2, 'Guantes Venum MMA', 'Guantes MMA diseñados para máxima destreza y mejora de agarre durante los combates.', 48, 50, 'GuantesVenumMMA_1', 'GuantesVenumMMA_2', 'GuantesVenumMMA_3', '2024-05-04 17:14:04', '2024-05-04 17:14:04'),
(11, 1, 1, 'Camiseta Venum Bronze', 'Camiseta ligera y transpirable, perfecta para entrenar o para uso casual.', 30, 50, 'CamisetaVenumBronze_1', 'CamisetaVenumBronze_2', 'CamisetaVenumBronze_3', '2024-05-04 17:14:04', '2024-05-04 17:14:04'),
(12, 1, 1, 'Camiseta Venum Negra', 'Camiseta Venum negra que combina comodidad con un diseño elegante.', 25, 50, 'CamisetaVenum_1', 'CamisetaVenum_2', 'CamisetaVenum_3', '2024-05-04 17:14:05', '2024-05-04 17:14:05');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `provinces`
--

DROP TABLE IF EXISTS `provinces`;
CREATE TABLE `provinces` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `region_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `quotes`
--

DROP TABLE IF EXISTS `quotes`;
CREATE TABLE `quotes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `price` int(11) NOT NULL,
  `description` text NOT NULL,
  `advantages` text NOT NULL,
  `type` enum('Basic','Standard','Premium') NOT NULL,
  `price_id` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `quotes`
--

INSERT INTO `quotes` (`id`, `price`, `description`, `advantages`, `type`, `price_id`, `created_at`, `updated_at`) VALUES
(1, 0, 'Plan inicial para los usuarios que inician y poder probar Bloody Knee gratis.', 'Acceso a videos gratis.;Acceso a dietas gratis.;Comprar productos en nuestra tienda.', 'Basic', NULL, '2024-05-04 17:13:50', '2024-05-04 17:13:50'),
(2, 5, 'Para los usuarios que quieren difrutar la experiencia de todo lo que ofrece nuestra web.', 'Lo misimo que el plan Basic pero más.;Acceso a videos exclusivojs.;Acceso a dietas exclusivas.', 'Standard', 'price_1P66JXByhCj4S0lhBWZF1Xe0', '2024-05-04 17:13:50', '2024-05-04 17:13:50'),
(3, 10, 'Para quien quiera disfrutar de una experiencia más personalizada.', 'Lo misimo que el plan Standard pero más.;Asistencia personalizada con dietistas.;Acceso a nuestro chatbot.', 'Premium', 'price_1P66ZDByhCj4S0lh4TjKxngd', '2024-05-04 17:13:50', '2024-05-04 17:13:50');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `regions`
--

DROP TABLE IF EXISTS `regions`;
CREATE TABLE `regions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `country_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `role_has_permissions`
--

DROP TABLE IF EXISTS `role_has_permissions`;
CREATE TABLE `role_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `types`
--

DROP TABLE IF EXISTS `types`;
CREATE TABLE `types` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `types`
--

INSERT INTO `types` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'con pareja', '2024-05-04 17:13:51', '2024-05-04 17:13:51'),
(2, 'con saco', '2024-05-04 17:13:51', '2024-05-04 17:13:51'),
(3, 'sin equipamiento', '2024-05-04 17:13:52', '2024-05-04 17:13:52'),
(4, 'con equipamiento', '2024-05-04 17:13:52', '2024-05-04 17:13:52');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `province_id` bigint(20) UNSIGNED DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `connection` varchar(255) NOT NULL,
  `postal_code` varchar(255) DEFAULT NULL,
  `adress` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `province_id`, `full_name`, `nickname`, `email`, `password`, `connection`, `postal_code`, `adress`, `phone`, `created_at`, `updated_at`) VALUES
(1, NULL, NULL, NULL, 'luisenric32@gmail.com', NULL, 'google-oauth2', NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_comment_videos`
--

DROP TABLE IF EXISTS `user_comment_videos`;
CREATE TABLE `user_comment_videos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `video_id` bigint(20) UNSIGNED NOT NULL,
  `date` date NOT NULL DEFAULT '2024-05-04',
  `comment` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_favorite_diets`
--

DROP TABLE IF EXISTS `user_favorite_diets`;
CREATE TABLE `user_favorite_diets` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `diet_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_like_dislike_videos`
--

DROP TABLE IF EXISTS `user_like_dislike_videos`;
CREATE TABLE `user_like_dislike_videos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `video_id` bigint(20) UNSIGNED NOT NULL,
  `type` enum('Like','Dislike') NOT NULL,
  `date` date NOT NULL DEFAULT '2024-05-04',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_subscribe_quotes`
--

DROP TABLE IF EXISTS `user_subscribe_quotes`;
CREATE TABLE `user_subscribe_quotes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `quote_id` bigint(20) UNSIGNED NOT NULL,
  `start_date` date NOT NULL DEFAULT '2024-05-04',
  `expiration_date` date NOT NULL DEFAULT '2024-06-04',
  `status` enum('Active','Expirated','Cancelled') NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_visit_videos`
--

DROP TABLE IF EXISTS `user_visit_videos`;
CREATE TABLE `user_visit_videos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `video_id` bigint(20) UNSIGNED NOT NULL,
  `date` date NOT NULL DEFAULT '2024-05-04',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `user_visit_videos`
--

INSERT INTO `user_visit_videos` (`id`, `user_id`, `video_id`, `date`, `created_at`, `updated_at`) VALUES
(1, 1, 18, '2024-05-06', '2024-05-06 10:20:35', '2024-05-06 10:20:35');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `videos`
--

DROP TABLE IF EXISTS `videos`;
CREATE TABLE `videos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `type_id` bigint(20) UNSIGNED NOT NULL,
  `modality_id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `coach` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `url` varchar(255) NOT NULL,
  `visits` int(11) NOT NULL,
  `likes` int(11) NOT NULL,
  `dislikes` int(11) NOT NULL,
  `upload_date` date NOT NULL DEFAULT '2024-05-04',
  `duration` varchar(255) NOT NULL,
  `exclusive` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `videos`
--

INSERT INTO `videos` (`id`, `type_id`, `modality_id`, `title`, `coach`, `description`, `url`, `visits`, `likes`, `dislikes`, `upload_date`, `duration`, `exclusive`, `created_at`, `updated_at`) VALUES
(1, 2, 1, 'Entrenamiento de boxeo #1', 'Entrenador Principal', '🥊 ¡Entrenamiento de boxeo enfocado en técnicas y movimientos para mejorar tu golpeo y defensa! ¡Sigue el ritmo y siente cómo mejora tu técnica! 💥 #Boxeo #Entrenamiento #Técnica', 'https://player.vimeo.com/video/941907991?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479', 0, 0, 0, '2024-05-04', '12:00', 0, '2024-05-04 17:13:53', '2024-05-04 17:13:53'),
(2, 3, 1, 'Entrenamiento de boxeo #2', 'Entrenador Principal', '🥊 ¡Entrenamiento de boxeo enfocado en técnicas y movimientos para mejorar tu golpeo y defensa! ¡Sigue el ritmo y siente cómo mejora tu técnica! 💥 #Boxeo #Entrenamiento #Técnica', 'https://player.vimeo.com/video/941907991?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479', 0, 0, 0, '2024-05-04', '12:00', 0, '2024-05-04 17:13:53', '2024-05-04 17:13:53'),
(3, 4, 1, 'Entrenamiento de boxeo #3', 'Entrenador Principal', '🥊 ¡Entrenamiento de boxeo enfocado en técnicas y movimientos para mejorar tu golpeo y defensa! ¡Sigue el ritmo y siente cómo mejora tu técnica! 💥 #Boxeo #Entrenamiento #Técnica', 'https://player.vimeo.com/video/941907991?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479', 0, 0, 0, '2024-05-04', '12:00', 0, '2024-05-04 17:13:53', '2024-05-04 17:13:53'),
(4, 1, 1, 'Entrenamiento de boxeo #4', 'Entrenador Principal', '🥊 ¡Entrenamiento de boxeo enfocado en técnicas y movimientos para mejorar tu golpeo y defensa! ¡Sigue el ritmo y siente cómo mejora tu técnica! 💥 #Boxeo #Entrenamiento #Técnica', 'https://player.vimeo.com/video/941907991?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479', 0, 0, 0, '2024-05-04', '12:00', 1, '2024-05-04 17:13:53', '2024-05-04 17:13:53'),
(5, 2, 1, 'Entrenamiento de boxeo #5', 'Entrenador Principal', '🥊 ¡Entrenamiento de boxeo enfocado en técnicas y movimientos para mejorar tu golpeo y defensa! ¡Sigue el ritmo y siente cómo mejora tu técnica! 💥 #Boxeo #Entrenamiento #Técnica', 'https://player.vimeo.com/video/941907991?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479', 0, 0, 0, '2024-05-04', '12:00', 0, '2024-05-04 17:13:54', '2024-05-04 17:13:54'),
(6, 3, 1, 'Entrenamiento de boxeo #6', 'Entrenador Principal', '🥊 ¡Entrenamiento de boxeo enfocado en técnicas y movimientos para mejorar tu golpeo y defensa! ¡Sigue el ritmo y siente cómo mejora tu técnica! 💥 #Boxeo #Entrenamiento #Técnica', 'https://player.vimeo.com/video/941907991?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479', 0, 0, 0, '2024-05-04', '12:00', 0, '2024-05-04 17:13:54', '2024-05-04 17:13:54'),
(7, 4, 1, 'Entrenamiento de boxeo #7', 'Entrenador Principal', '🥊 ¡Entrenamiento de boxeo enfocado en técnicas y movimientos para mejorar tu golpeo y defensa! ¡Sigue el ritmo y siente cómo mejora tu técnica! 💥 #Boxeo #Entrenamiento #Técnica', 'https://player.vimeo.com/video/941907991?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479', 0, 0, 0, '2024-05-04', '12:00', 1, '2024-05-04 17:13:54', '2024-05-04 17:13:54'),
(8, 1, 1, 'Entrenamiento de boxeo #8', 'Entrenador Principal', '🥊 ¡Entrenamiento de boxeo enfocado en técnicas y movimientos para mejorar tu golpeo y defensa! ¡Sigue el ritmo y siente cómo mejora tu técnica! 💥 #Boxeo #Entrenamiento #Técnica', 'https://player.vimeo.com/video/941907991?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479', 0, 0, 0, '2024-05-04', '12:00', 1, '2024-05-04 17:13:54', '2024-05-04 17:13:54'),
(9, 2, 1, 'Entrenamiento de boxeo #9', 'Entrenador Principal', '🥊 ¡Entrenamiento de boxeo enfocado en técnicas y movimientos para mejorar tu golpeo y defensa! ¡Sigue el ritmo y siente cómo mejora tu técnica! 💥 #Boxeo #Entrenamiento #Técnica', 'https://player.vimeo.com/video/941907991?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479', 0, 0, 0, '2024-05-04', '12:00', 1, '2024-05-04 17:13:55', '2024-05-04 17:13:55'),
(10, 3, 1, 'Entrenamiento de boxeo #10', 'Entrenador Principal', '🥊 ¡Entrenamiento de boxeo enfocado en técnicas y movimientos para mejorar tu golpeo y defensa! ¡Sigue el ritmo y siente cómo mejora tu técnica! 💥 #Boxeo #Entrenamiento #Técnica', 'https://player.vimeo.com/video/941907991?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479', 0, 0, 0, '2024-05-04', '12:00', 0, '2024-05-04 17:13:55', '2024-05-04 17:13:55'),
(11, 2, 2, 'Entrenamiento de thai #1', 'Entrenador Principal', '🥊 ¡Entrenamiento de thai que combina movimientos tradicionales con técnicas modernas! ¡Mejora tu flexibilidad, fuerza y resistencia con esta rutina! 🥊 #Thai #Entrenamiento #Flexibilidad', 'https://player.vimeo.com/video/941907991?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479', 0, 0, 0, '2024-05-04', '13:00', 1, '2024-05-04 17:13:55', '2024-05-04 17:13:55'),
(12, 3, 2, 'Entrenamiento de thai #2', 'Entrenador Principal', '🥊 ¡Entrenamiento de thai que combina movimientos tradicionales con técnicas modernas! ¡Mejora tu flexibilidad, fuerza y resistencia con esta rutina! 🥊 #Thai #Entrenamiento #Flexibilidad', 'https://player.vimeo.com/video/941907991?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479', 0, 0, 0, '2024-05-04', '13:00', 0, '2024-05-04 17:13:55', '2024-05-04 17:13:55'),
(13, 4, 2, 'Entrenamiento de thai #3', 'Entrenador Principal', '🥊 ¡Entrenamiento de thai que combina movimientos tradicionales con técnicas modernas! ¡Mejora tu flexibilidad, fuerza y resistencia con esta rutina! 🥊 #Thai #Entrenamiento #Flexibilidad', 'https://player.vimeo.com/video/941907991?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479', 0, 0, 0, '2024-05-04', '13:00', 0, '2024-05-04 17:13:56', '2024-05-04 17:13:56'),
(14, 1, 2, 'Entrenamiento de thai #4', 'Entrenador Principal', '🥊 ¡Entrenamiento de thai que combina movimientos tradicionales con técnicas modernas! ¡Mejora tu flexibilidad, fuerza y resistencia con esta rutina! 🥊 #Thai #Entrenamiento #Flexibilidad', 'https://player.vimeo.com/video/941907991?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479', 0, 0, 0, '2024-05-04', '13:00', 1, '2024-05-04 17:13:56', '2024-05-04 17:13:56'),
(15, 2, 2, 'Entrenamiento de thai #5', 'Entrenador Principal', '🥊 ¡Entrenamiento de thai que combina movimientos tradicionales con técnicas modernas! ¡Mejora tu flexibilidad, fuerza y resistencia con esta rutina! 🥊 #Thai #Entrenamiento #Flexibilidad', 'https://player.vimeo.com/video/941907991?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479', 0, 0, 0, '2024-05-04', '13:00', 0, '2024-05-04 17:13:56', '2024-05-04 17:13:56'),
(16, 3, 2, 'Entrenamiento de thai #6', 'Entrenador Principal', '🥊 ¡Entrenamiento de thai que combina movimientos tradicionales con técnicas modernas! ¡Mejora tu flexibilidad, fuerza y resistencia con esta rutina! 🥊 #Thai #Entrenamiento #Flexibilidad', 'https://player.vimeo.com/video/941907991?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479', 0, 0, 0, '2024-05-04', '13:00', 1, '2024-05-04 17:13:57', '2024-05-04 17:13:57'),
(17, 4, 2, 'Entrenamiento de thai #7', 'Entrenador Principal', '🥊 ¡Entrenamiento de thai que combina movimientos tradicionales con técnicas modernas! ¡Mejora tu flexibilidad, fuerza y resistencia con esta rutina! 🥊 #Thai #Entrenamiento #Flexibilidad', 'https://player.vimeo.com/video/941907991?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479', 0, 0, 0, '2024-05-04', '13:00', 1, '2024-05-04 17:13:57', '2024-05-04 17:13:57'),
(18, 1, 2, 'Entrenamiento de thai #8', 'Entrenador Principal', '🥊 ¡Entrenamiento de thai que combina movimientos tradicionales con técnicas modernas! ¡Mejora tu flexibilidad, fuerza y resistencia con esta rutina! 🥊 #Thai #Entrenamiento #Flexibilidad', 'https://player.vimeo.com/video/941907991?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479', 1, 0, 0, '2024-05-04', '13:00', 0, '2024-05-04 17:13:57', '2024-05-06 10:20:35'),
(19, 2, 2, 'Entrenamiento de thai #9', 'Entrenador Principal', '🥊 ¡Entrenamiento de thai que combina movimientos tradicionales con técnicas modernas! ¡Mejora tu flexibilidad, fuerza y resistencia con esta rutina! 🥊 #Thai #Entrenamiento #Flexibilidad', 'https://player.vimeo.com/video/941907991?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479', 0, 0, 0, '2024-05-04', '13:00', 1, '2024-05-04 17:13:57', '2024-05-04 17:13:57'),
(20, 3, 2, 'Entrenamiento de thai #10', 'Entrenador Principal', '🥊 ¡Entrenamiento de thai que combina movimientos tradicionales con técnicas modernas! ¡Mejora tu flexibilidad, fuerza y resistencia con esta rutina! 🥊 #Thai #Entrenamiento #Flexibilidad', 'https://player.vimeo.com/video/941907991?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479', 0, 0, 0, '2024-05-04', '13:00', 0, '2024-05-04 17:13:58', '2024-05-04 17:13:58'),
(21, 2, 3, 'Entrenamiento de fitness #1', 'Entrenador Principal', '🥊 ¡Entrenamiento de fitness que combina ejercicios aeróbicos con ejercicios de fuerza! ¡Quema calorías, fortalece tu cuerpo y mejora tu condición física con esta rutina! 💪 #Fitness #Entrenamiento #Salud', 'https://player.vimeo.com/video/941907991?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479', 0, 0, 0, '2024-05-04', '14:00', 0, '2024-05-04 17:13:58', '2024-05-04 17:13:58'),
(22, 3, 3, 'Entrenamiento de fitness #2', 'Entrenador Principal', '🥊 ¡Entrenamiento de fitness que combina ejercicios aeróbicos con ejercicios de fuerza! ¡Quema calorías, fortalece tu cuerpo y mejora tu condición física con esta rutina! 💪 #Fitness #Entrenamiento #Salud', 'https://player.vimeo.com/video/941907991?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479', 0, 0, 0, '2024-05-04', '14:00', 1, '2024-05-04 17:13:58', '2024-05-04 17:13:58'),
(23, 4, 3, 'Entrenamiento de fitness #3', 'Entrenador Principal', '🥊 ¡Entrenamiento de fitness que combina ejercicios aeróbicos con ejercicios de fuerza! ¡Quema calorías, fortalece tu cuerpo y mejora tu condición física con esta rutina! 💪 #Fitness #Entrenamiento #Salud', 'https://player.vimeo.com/video/941907991?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479', 0, 0, 0, '2024-05-04', '14:00', 1, '2024-05-04 17:13:58', '2024-05-04 17:13:58'),
(24, 1, 3, 'Entrenamiento de fitness #4', 'Entrenador Principal', '🥊 ¡Entrenamiento de fitness que combina ejercicios aeróbicos con ejercicios de fuerza! ¡Quema calorías, fortalece tu cuerpo y mejora tu condición física con esta rutina! 💪 #Fitness #Entrenamiento #Salud', 'https://player.vimeo.com/video/941907991?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479', 0, 0, 0, '2024-05-04', '14:00', 0, '2024-05-04 17:13:59', '2024-05-04 17:13:59'),
(25, 2, 3, 'Entrenamiento de fitness #5', 'Entrenador Principal', '🥊 ¡Entrenamiento de fitness que combina ejercicios aeróbicos con ejercicios de fuerza! ¡Quema calorías, fortalece tu cuerpo y mejora tu condición física con esta rutina! 💪 #Fitness #Entrenamiento #Salud', 'https://player.vimeo.com/video/941907991?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479', 0, 0, 0, '2024-05-04', '14:00', 0, '2024-05-04 17:13:59', '2024-05-04 17:13:59'),
(26, 3, 3, 'Entrenamiento de fitness #6', 'Entrenador Principal', '🥊 ¡Entrenamiento de fitness que combina ejercicios aeróbicos con ejercicios de fuerza! ¡Quema calorías, fortalece tu cuerpo y mejora tu condición física con esta rutina! 💪 #Fitness #Entrenamiento #Salud', 'https://player.vimeo.com/video/941907991?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479', 0, 0, 0, '2024-05-04', '14:00', 1, '2024-05-04 17:13:59', '2024-05-04 17:13:59'),
(27, 4, 3, 'Entrenamiento de fitness #7', 'Entrenador Principal', '🥊 ¡Entrenamiento de fitness que combina ejercicios aeróbicos con ejercicios de fuerza! ¡Quema calorías, fortalece tu cuerpo y mejora tu condición física con esta rutina! 💪 #Fitness #Entrenamiento #Salud', 'https://player.vimeo.com/video/941907991?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479', 0, 0, 0, '2024-05-04', '14:00', 0, '2024-05-04 17:13:59', '2024-05-04 17:13:59'),
(28, 1, 3, 'Entrenamiento de fitness #8', 'Entrenador Principal', '🥊 ¡Entrenamiento de fitness que combina ejercicios aeróbicos con ejercicios de fuerza! ¡Quema calorías, fortalece tu cuerpo y mejora tu condición física con esta rutina! 💪 #Fitness #Entrenamiento #Salud', 'https://player.vimeo.com/video/941907991?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479', 0, 0, 0, '2024-05-04', '14:00', 0, '2024-05-04 17:14:00', '2024-05-04 17:14:00'),
(29, 2, 3, 'Entrenamiento de fitness #9', 'Entrenador Principal', '🥊 ¡Entrenamiento de fitness que combina ejercicios aeróbicos con ejercicios de fuerza! ¡Quema calorías, fortalece tu cuerpo y mejora tu condición física con esta rutina! 💪 #Fitness #Entrenamiento #Salud', 'https://player.vimeo.com/video/941907991?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479', 0, 0, 0, '2024-05-04', '14:00', 1, '2024-05-04 17:14:00', '2024-05-04 17:14:00'),
(30, 3, 3, 'Entrenamiento de fitness #10', 'Entrenador Principal', '🥊 ¡Entrenamiento de fitness que combina ejercicios aeróbicos con ejercicios de fuerza! ¡Quema calorías, fortalece tu cuerpo y mejora tu condición física con esta rutina! 💪 #Fitness #Entrenamiento #Salud', 'https://player.vimeo.com/video/941907991?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479', 0, 0, 0, '2024-05-04', '14:00', 1, '2024-05-04 17:14:00', '2024-05-04 17:14:00');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `carts_user_id_foreign` (`user_id`);

--
-- Indices de la tabla `cart_store_products`
--
ALTER TABLE `cart_store_products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cart_store_products_product_id_foreign` (`product_id`),
  ADD KEY `cart_store_products_cart_id_foreign` (`cart_id`);

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `diets`
--
ALTER TABLE `diets`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indices de la tabla `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `modalities`
--
ALTER TABLE `modalities`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  ADD KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indices de la tabla `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  ADD KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indices de la tabla `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orders_user_id_foreign` (`user_id`);

--
-- Indices de la tabla `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_details_order_id_foreign` (`order_id`),
  ADD KEY `order_details_product_id_foreign` (`product_id`);

--
-- Indices de la tabla `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indices de la tabla `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indices de la tabla `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `products_brand_id_foreign` (`brand_id`),
  ADD KEY `products_category_id_foreign` (`category_id`);

--
-- Indices de la tabla `provinces`
--
ALTER TABLE `provinces`
  ADD PRIMARY KEY (`id`),
  ADD KEY `provinces_region_id_foreign` (`region_id`);

--
-- Indices de la tabla `quotes`
--
ALTER TABLE `quotes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `regions`
--
ALTER TABLE `regions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `regions_country_id_foreign` (`country_id`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indices de la tabla `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`role_id`),
  ADD KEY `role_has_permissions_role_id_foreign` (`role_id`);

--
-- Indices de la tabla `types`
--
ALTER TABLE `types`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `users_province_id_foreign` (`province_id`);

--
-- Indices de la tabla `user_comment_videos`
--
ALTER TABLE `user_comment_videos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_comment_videos_user_id_foreign` (`user_id`),
  ADD KEY `user_comment_videos_video_id_foreign` (`video_id`);

--
-- Indices de la tabla `user_favorite_diets`
--
ALTER TABLE `user_favorite_diets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_favorite_diets_diet_id_foreign` (`diet_id`),
  ADD KEY `user_favorite_diets_user_id_foreign` (`user_id`);

--
-- Indices de la tabla `user_like_dislike_videos`
--
ALTER TABLE `user_like_dislike_videos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_like_dislike_videos_user_id_foreign` (`user_id`),
  ADD KEY `user_like_dislike_videos_video_id_foreign` (`video_id`);

--
-- Indices de la tabla `user_subscribe_quotes`
--
ALTER TABLE `user_subscribe_quotes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_subscribe_quotes_user_id_foreign` (`user_id`),
  ADD KEY `user_subscribe_quotes_quote_id_foreign` (`quote_id`);

--
-- Indices de la tabla `user_visit_videos`
--
ALTER TABLE `user_visit_videos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_visit_videos_user_id_foreign` (`user_id`),
  ADD KEY `user_visit_videos_video_id_foreign` (`video_id`);

--
-- Indices de la tabla `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `videos_type_id_foreign` (`type_id`),
  ADD KEY `videos_modality_id_foreign` (`modality_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `brands`
--
ALTER TABLE `brands`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `carts`
--
ALTER TABLE `carts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cart_store_products`
--
ALTER TABLE `cart_store_products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `countries`
--
ALTER TABLE `countries`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `diets`
--
ALTER TABLE `diets`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `modalities`
--
ALTER TABLE `modalities`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `order_details`
--
ALTER TABLE `order_details`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `provinces`
--
ALTER TABLE `provinces`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `quotes`
--
ALTER TABLE `quotes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `regions`
--
ALTER TABLE `regions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `types`
--
ALTER TABLE `types`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `user_comment_videos`
--
ALTER TABLE `user_comment_videos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `user_favorite_diets`
--
ALTER TABLE `user_favorite_diets`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `user_like_dislike_videos`
--
ALTER TABLE `user_like_dislike_videos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `user_subscribe_quotes`
--
ALTER TABLE `user_subscribe_quotes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `user_visit_videos`
--
ALTER TABLE `user_visit_videos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `videos`
--
ALTER TABLE `videos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `cart_store_products`
--
ALTER TABLE `cart_store_products`
  ADD CONSTRAINT `cart_store_products_cart_id_foreign` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cart_store_products_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `order_details`
--
ALTER TABLE `order_details`
  ADD CONSTRAINT `order_details_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_details_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_brand_id_foreign` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `products_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `provinces`
--
ALTER TABLE `provinces`
  ADD CONSTRAINT `provinces_region_id_foreign` FOREIGN KEY (`region_id`) REFERENCES `regions` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `regions`
--
ALTER TABLE `regions`
  ADD CONSTRAINT `regions_country_id_foreign` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_province_id_foreign` FOREIGN KEY (`province_id`) REFERENCES `provinces` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `user_comment_videos`
--
ALTER TABLE `user_comment_videos`
  ADD CONSTRAINT `user_comment_videos_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_comment_videos_video_id_foreign` FOREIGN KEY (`video_id`) REFERENCES `videos` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `user_favorite_diets`
--
ALTER TABLE `user_favorite_diets`
  ADD CONSTRAINT `user_favorite_diets_diet_id_foreign` FOREIGN KEY (`diet_id`) REFERENCES `diets` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_favorite_diets_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `user_like_dislike_videos`
--
ALTER TABLE `user_like_dislike_videos`
  ADD CONSTRAINT `user_like_dislike_videos_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_like_dislike_videos_video_id_foreign` FOREIGN KEY (`video_id`) REFERENCES `videos` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `user_subscribe_quotes`
--
ALTER TABLE `user_subscribe_quotes`
  ADD CONSTRAINT `user_subscribe_quotes_quote_id_foreign` FOREIGN KEY (`quote_id`) REFERENCES `quotes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_subscribe_quotes_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `user_visit_videos`
--
ALTER TABLE `user_visit_videos`
  ADD CONSTRAINT `user_visit_videos_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_visit_videos_video_id_foreign` FOREIGN KEY (`video_id`) REFERENCES `videos` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `videos`
--
ALTER TABLE `videos`
  ADD CONSTRAINT `videos_modality_id_foreign` FOREIGN KEY (`modality_id`) REFERENCES `modalities` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `videos_type_id_foreign` FOREIGN KEY (`type_id`) REFERENCES `types` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
