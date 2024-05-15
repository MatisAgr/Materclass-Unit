-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 15 mai 2024 à 12:47
-- Version du serveur : 10.4.28-MariaDB
-- Version de PHP : 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `masterticket`
--

-- --------------------------------------------------------

--
-- Structure de la table `cancel`
--
DROP DATABASE IF EXISTS masterticket;

CREATE DATABASE masterticket;
USE masterticket;

CREATE TABLE `users` (
  `user_id` int(11) AUTO_INCREMENT NOT NULL UNIQUE,
  `user_username` varchar(45) NOT NULL,
  `user_mail` varchar(45) NOT NULL UNIQUE,
  `user_passwd` varchar(255) NOT NULL,
  `user_birth` date NOT NULL,
  `user_role` enum('user','admin') NOT NULL DEFAULT 'user',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL AUTO_INCREMENT UNIQUE,
  `category_name` varchar(255) NOT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE `events` (
  `event_id` int(11) NOT NULL AUTO_INCREMENT UNIQUE,
  `event_desc` varchar(255) NOT NULL,
  `event_start` datetime NOT NULL,
  `event_end` datetime NOT NULL,
  `event_slots` int(11) NOT NULL,
  `event_ageneed` int(11) NOT NULL,
  `event_category_id` int(11) NOT NULL,
  PRIMARY KEY (`event_id`),
  FOREIGN KEY (`event_category_id`) REFERENCES `categories` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE `invoices` (
  `invoice_id` varchar(36) NOT NULL DEFAULT uuid(),
  `invoice_user_id` int(11) NOT NULL,
  `invoice_event_id` int(11) NOT NULL,
  `invoice_date` datetime NOT NULL,
  PRIMARY KEY (`invoice_id`),
  FOREIGN KEY (`invoice_user_id`) REFERENCES `users` (`user_id`),
  FOREIGN KEY (`invoice_event_id`) REFERENCES `events` (`event_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE `cancel` (
  `cancel_id` int(11) NOT NULL AUTO_INCREMENT UNIQUE,
  `cancel_event_id` int(11) NOT NULL,
  `cancel_invoice_id` varchar(36) NOT NULL,
  `cancel_reason` varchar(255) NOT NULL,
  PRIMARY KEY (`cancel_id`),
  FOREIGN KEY (`cancel_event_id`) REFERENCES `events` (`event_id`),
  FOREIGN KEY (`cancel_invoice_id`) REFERENCES `invoices` (`invoice_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

INSERT INTO `users` (`user_id`, `user_username`, `user_mail`, `user_passwd`, `user_birth`, `user_role`) VALUES
(1, 'admin', 'admin@admin.com', 'admin', '2024-05-14', 'admin');

INSERT INTO `categories` (`category_id`, `category_name`) VALUES
(1, 'Test'),
(2, 'Test2'),
(3, 'Test3');

INSERT INTO `events` (`event_desc`, `event_start`, `event_end`, `event_slots`, `event_ageneed`, `event_category_id`) VALUES
('Concert Musique', '2024-05-14 12:00:00', '2024-05-14 15:00:00', 250, 16, 1),
('Cinéma', '2024-05-14 12:00:00', '2024-05-14 15:00:00', 250, 16, 2),
('Karaoké', '2024-05-14 12:00:00', '2024-05-14 15:00:00', 250, 16, 3);

INSERT INTO `invoices` (`invoice_user_id`, `invoice_event_id`, `invoice_date`) VALUES
(1, 1, '2024-05-14 12:00:00'),
(1, 2, '2024-05-14 12:00:00'),
(1, 3, '2024-05-14 12:00:00');

-- wip --
-- INSERT INTO `cancel` (`cancel_event_id`, `cancel_invoice_id`, `cancel_reason`) VALUES
-- (1, '1', 'Raison 1'),
-- (2, '2', 'Raison 2'),
-- (3, '3', 'Raison 3');

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
