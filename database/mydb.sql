CREATE TABLE `auth` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','admin','staff') DEFAULT 'user'
)
INSERT INTO `auth` (`id`, `username`, `password`, `role`) VALUES
(1, 'username', 'password', 'admin'),
(2, 'username1', 'password', 'user');
CREATE TABLE `user_detail` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `auth_id` INT(11) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `lastname` VARCHAR(100) NOT NULL,
  `phone` VARCHAR(20) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `address` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_email` (`email`)
);

CREATE TABLE `level_skill` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `auth_id` INT(11) NOT NULL,

  `reading_level` ENUM('A1','A2','B1','B2','C1','C2') NOT NULL DEFAULT 'A1',
  `reading_score` INT(11) NOT NULL DEFAULT 0,

  `listening_level` ENUM('A1','A2','B1','B2','C1','C2') NOT NULL DEFAULT 'A1',
  `listening_score` INT(11) NOT NULL DEFAULT 0,

  `speaking_level` ENUM('A1','A2','B1','B2','C1','C2') NOT NULL DEFAULT 'A1',
  `speaking_score` INT(11) NOT NULL DEFAULT 0,

  `writing_level` ENUM('A1','A2','B1','B2','C1','C2') NOT NULL DEFAULT 'A1',
  `writing_score` INT(11) NOT NULL DEFAULT 0,

  `grammar_level` ENUM('A1','A2','B1','B2','C1','C2') NOT NULL DEFAULT 'A1',
  `grammar_score` INT(11) NOT NULL DEFAULT 0,

  `vocabulary_level` ENUM('A1','A2','B1','B2','C1','C2') NOT NULL DEFAULT 'A1',
  `vocabulary_score` INT(11) NOT NULL DEFAULT 0,

  PRIMARY KEY (`id`)
);
