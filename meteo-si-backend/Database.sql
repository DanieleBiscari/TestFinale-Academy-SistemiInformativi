CREATE DATABASE meteo_si;
USE meteo_si;

DROP TABLE IF EXISTS `utente_meteo`;
DROP TABLE IF EXISTS `utente`;
DROP TABLE IF EXISTS `meteo`;


CREATE TABLE `utente` (
  `ID_U` int NOT NULL AUTO_INCREMENT,
  `Nome` varchar(255) DEFAULT NULL,
  `Cognome` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID_U`),
  UNIQUE KEY `email_UNIQUE` (`email`)
);

CREATE TABLE `meteo` (
  `ID_M` int NOT NULL AUTO_INCREMENT,
  `Temperatura` DECIMAL(10,3) DEFAULT NULL,
  `Temperatura_apparente` DECIMAL(10,3) DEFAULT NULL,
  `Umidita` int DEFAULT NULL,
  `Longitudine` DECIMAL(10,4) DEFAULT NULL,
  `Latitudine` DECIMAL(10,4) DEFAULT NULL,
  PRIMARY KEY (`ID_M`)
);

CREATE TABLE `utente_meteo` (
  `FK_UM` int NOT NULL,
  `FK_MU` int NOT NULL,
  PRIMARY KEY (`FK_UM`,`FK_MU`),
  FOREIGN KEY (`FK_UM`) REFERENCES `utente` (`ID_U`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`FK_MU`) REFERENCES `meteo` (`ID_M`)
);


