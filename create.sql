CREATE TABLE IF NOT EXISTS `users` (`id` INT NOT NULL AUTO_INCREMENT, `username` TEXT NOT NULL, `password` text NOT NULL, `client_id` text NOT NULL, `salt` text NOT NULL, PRIMARY KEY (`id`));

CREATE TABLE IF NOT EXISTS `access_tokens` (`id` INT NOT NULL AUTO_INCREMENT, `user_id` INT NOT NULL, `client_id` TEXT NOT NULL, `access_token` TEXT, PRIMARY KEY (`id`));

CREATE TABLE IF NOT EXISTS `clients` (`id` INT NOT NULL AUTO_INCREMENT, `client_id` TEXT NOT NULL, `client_secret` TEXT NOT NULL, PRIMARY KEY (`id`));

CREATE TABLE IF NOT EXISTS `authorization_codes` (`id` INT NOT NULL AUTO_INCREMENT, `client_id` TEXT NOT NULL, `redirect_uri` TEXT NOT NULL, `user_id` INT NOT NULL, PRIMARY KEY (`id`));
