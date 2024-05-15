-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mar. 14 mai 2024 à 09:50
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.1.25

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

CREATE TABLE `cancel` (
  `cancel_id` varchar(36) NOT NULL DEFAULT uuid(),
  `cancel_event_id` varchar(36) NOT NULL,
  `cancel_invoice_id` varchar(36) NOT NULL,
  `cancel_reason` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `categories`
--

INSERT INTO `categories` (`category_id`, `category_name`) VALUES
(1, 'Test');

-- --------------------------------------------------------

--
-- Structure de la table `events`
--

CREATE TABLE `events` (
  `event_id` varchar(16) GENERATED ALWAYS AS (uuid()) VIRTUAL,
  `event_desc` varchar(255) NOT NULL,
  `event_start` datetime NOT NULL,
  `event_end` datetime NOT NULL,
  `event_slots` int(11) NOT NULL,
  `event_ageneed` int(11) NOT NULL,
  `event_category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `events`
--

INSERT INTO `events` (`event_desc`, `event_start`, `event_end`, `event_slots`, `event_ageneed`, `event_category_id`) VALUES
('Festival des developpeurs', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 15, 18, 1),
('Festival des developpeurs', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 15, 18, 1),
('Festival des developpeurs', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 15, 18, 1),
('Festival des developpeurs', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 15, 18, 1);

-- --------------------------------------------------------

--
-- Structure de la table `invoices`
--

CREATE TABLE `invoices` (
  `invoice_id` varchar(36) NOT NULL DEFAULT uuid(),
  `invoice_user_id` varchar(36) NOT NULL,
  `invoice_event_id` varchar(36) NOT NULL,
  `invoice_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `user_id` varchar(16) GENERATED ALWAYS AS (uuid()) VIRTUAL,
  `user_username` varchar(45) NOT NULL,
  `user_mail` varchar(45) NOT NULL,
  `user_passwd` varchar(255) NOT NULL,
  `user_birth` date NOT NULL,
  `user_role` enum('user','admin') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `cancel`
--
ALTER TABLE `cancel`
  ADD PRIMARY KEY (`cancel_id`),
  ADD KEY `cancel_invoice_id_idx` (`cancel_invoice_id`),
  ADD KEY `cancel_event_id_idx` (`cancel_event_id`);

--
-- Index pour la table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`),
  ADD UNIQUE KEY `category_id_UNIQUE` (`category_id`);

--
-- Index pour la table `events`
--
ALTER TABLE `events`
  ADD KEY `event_category_id_idx` (`event_category_id`);

--
-- Index pour la table `invoices`
--
ALTER TABLE `invoices`
  ADD KEY `invoice_user_id_idx` (`invoice_user_id`),
  ADD KEY `invoice_event_id_idx` (`invoice_event_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `event_category_id` FOREIGN KEY (`event_category_id`) REFERENCES `categories` (`category_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
