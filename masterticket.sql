-- MySQL Script generated by MySQL Workbench
-- Mon May 13 17:59:19 2024
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema masterticket
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema masterticket
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `masterticket` DEFAULT CHARACTER SET utf8 ;
USE `masterticket` ;

-- -----------------------------------------------------
-- Table `masterticket`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `masterticket`.`users` (
  `user_id` VARCHAR(16) GENERATED ALWAYS AS () VIRTUAL,
  `user_username` VARCHAR(45) NOT NULL,
  `user_mail` VARCHAR(45) NOT NULL,
  `user_passwd` VARCHAR(255) NOT NULL,
  `user_birth` DATE NOT NULL,
  `user_role` ENUM('user', 'admin') NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `user_mail_UNIQUE` (`user_mail` ASC) VISIBLE,
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `masterticket`.`categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `masterticket`.`categories` (
  `category_id` INT NOT NULL AUTO_INCREMENT,
  `categories_name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE INDEX `category_id_UNIQUE` (`category_id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `masterticket`.`events`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `masterticket`.`events` (
  `event_id` VARCHAR(16) GENERATED ALWAYS AS () VIRTUAL,
  `event_name` VARCHAR(255) NOT NULL,
  `event_desc` VARCHAR(255) NOT NULL,
  `event_start` DATETIME NOT NULL,
  `event_end` DATETIME NOT NULL,
  `event_slots` INT NOT NULL,
  `event_ageneed` INT NOT NULL,
  `event_category_id` INT NOT NULL,
  PRIMARY KEY (`event_id`),
  INDEX `event_category_id_idx` (`event_category_id` ASC) VISIBLE,
  UNIQUE INDEX `event_id_UNIQUE` (`event_id` ASC) VISIBLE,
  UNIQUE INDEX `event_name_UNIQUE` (`event_name` ASC) VISIBLE,
  CONSTRAINT `event_category_id`
    FOREIGN KEY (`event_category_id`)
    REFERENCES `masterticket`.`categories` (`category_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `masterticket`.`invoices`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `masterticket`.`invoices` (
  `invoice_id` VARCHAR(16) GENERATED ALWAYS AS () VIRTUAL,
  `invoice_user_id` VARCHAR(64) NOT NULL,
  `invoice_event_id` VARCHAR(64) NOT NULL,
  `invoice_date` DATETIME NOT NULL,
  PRIMARY KEY (`invoice_id`),
  INDEX `invoice_user_id_idx` (`invoice_user_id` ASC) VISIBLE,
  INDEX `invoice_event_id_idx` (`invoice_event_id` ASC) VISIBLE,
  UNIQUE INDEX `invoice_id_UNIQUE` (`invoice_id` ASC) VISIBLE,
  CONSTRAINT `invoice_user_id`
    FOREIGN KEY (`invoice_user_id`)
    REFERENCES `masterticket`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `invoice_event_id`
    FOREIGN KEY (`invoice_event_id`)
    REFERENCES `masterticket`.`events` (`event_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `masterticket`.`cancel`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `masterticket`.`cancel` (
  `cancel_id` VARCHAR(16) GENERATED ALWAYS AS () VIRTUAL,
  `cancel_event_id` VARCHAR(64) NOT NULL,
  `cancel_invoice_id` VARCHAR(64) NOT NULL,
  `cancel_reason` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`cancel_id`),
  INDEX `cancel_invoice_id_idx` (`cancel_invoice_id` ASC) VISIBLE,
  INDEX `cancel_event_id_idx` (`cancel_event_id` ASC) VISIBLE,
  UNIQUE INDEX `cancel_id_UNIQUE` (`cancel_id` ASC) VISIBLE,
  CONSTRAINT `cancel_event_id`
    FOREIGN KEY (`cancel_event_id`)
    REFERENCES `masterticket`.`events` (`event_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `cancel_invoice_id`
    FOREIGN KEY (`cancel_invoice_id`)
    REFERENCES `masterticket`.`invoices` (`invoice_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;