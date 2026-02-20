-- Progettazione Web 
DROP DATABASE if exists Calvani_672819; 
CREATE DATABASE Calvani_672819; 
USE Calvani_672819; 
-- MySQL dump 10.13  Distrib 5.7.28, for Win64 (x86_64)
--
-- Host: localhost    Database: Calvani_672819
-- ------------------------------------------------------
-- Server version	5.7.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `abilita`
--

DROP TABLE IF EXISTS `abilita`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `abilita` (
  `Nome` varchar(25) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `DescrizioneBreve` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`Nome`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `abilita`
--

LOCK TABLES `abilita` WRITE;
/*!40000 ALTER TABLE `abilita` DISABLE KEYS */;
INSERT INTO `abilita` VALUES ('--Seleziona un\'abilità--','--Seleziona un\'abilità--'),('Carta','Copre temporaneamente parti di schermo tentando di schiacciare il giocatore'),('Ciliegine','Pioggia del frutto preferito da PacMan'),('Fantasmi','Qualche fantasma proverà a prenderti'),('Fiori','Spuntano dal terreno delle piante piranha'),('Forbici','Delle forbici scorrono all\'interno del campo da parte a parte '),('Gusci','Appariranno dei gusci di koopa che si romperanno al quarto rimbaso sulla parete'),('MangiaTutto','PacMan tenterà di mangiarti'),('PallaDiFuoco','Fa apparire una palla di fuoco lungo il campo'),('Sasso','Fa cadere una pioggia di sassi');
/*!40000 ALTER TABLE `abilita` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER set_default_abilita_before_delete
BEFORE DELETE ON Abilita
FOR EACH ROW
BEGIN
    UPDATE Personaggi
    SET Abilita1 = 'Sasso'
    WHERE Abilita1 = OLD.Nome;

    UPDATE Personaggi
    SET Abilita2 = 'Carta'
    WHERE Abilita2 = OLD.Nome;

    UPDATE Personaggi
    SET Abilita3 = 'Forbici'
    WHERE Abilita3 = OLD.Nome;
    
    UPDATE NPC
    SET Abilita1 = 'Sasso'
    WHERE Abilita1 = OLD.Nome;

    UPDATE NPC
    SET Abilita2 = 'Carta'
    WHERE Abilita2 = OLD.Nome;

    UPDATE NPC
    SET Abilita3 = 'Forbici'
    WHERE Abilita3 = OLD.Nome;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `anime`
--

DROP TABLE IF EXISTS `anime`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `anime` (
  `Nome` varchar(25) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `DescrizioneBreve` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `Percorso` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`Percorso`),
  UNIQUE KEY `Nome` (`Nome`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `anime`
--

LOCK TABLES `anime` WRITE;
/*!40000 ALTER TABLE `anime` DISABLE KEYS */;
INSERT INTO `anime` VALUES ('cyan','La Forza, aumenta la forza di 2','/Calvani_672819/IMG/ANIMA/cyan.svg'),('red','La Determinazione, aumenta i PV di 2','/Calvani_672819/IMG/ANIMA/red.svg'),('yellow','L\'intelligenza, le interazioni sono il 25% più efficaci','/Calvani_672819/IMG/ANIMA/yellow.svg');
/*!40000 ALTER TABLE `anime` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER set_default_anima_before_delete
BEFORE DELETE ON Anime
FOR EACH ROW
BEGIN
    UPDATE Personaggi
    SET Anima = '/Calvani_672819/IMG/ANIMA/red.svg'
    WHERE Anima = OLD.Percorso;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `imgpg`
--

DROP TABLE IF EXISTS `imgpg`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `imgpg` (
  `Nome` varchar(25) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `Percorso` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`Percorso`),
  UNIQUE KEY `Nome` (`Nome`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imgpg`
--

LOCK TABLES `imgpg` WRITE;
/*!40000 ALTER TABLE `imgpg` DISABLE KEYS */;
INSERT INTO `imgpg` VALUES ('Frisk','/Calvani_672819/IMG/PG/Frisk.png'),('Toad','/Calvani_672819/IMG/PG/Toad.png');
/*!40000 ALTER TABLE `imgpg` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER set_default_imgpg_before_delete
BEFORE DELETE ON ImgPG
FOR EACH ROW
BEGIN
    UPDATE Personaggi
    SET ImmagineProfilo = '/Calvani_672819/IMG/PG/Frisk.png'
    WHERE ImmagineProfilo = OLD.Percorso;
    
    UPDATE NPC
    SET ImmagineProfilo = '/Calvani_672819/IMG/PG/Frisk.png'
    WHERE ImmagineProfilo = OLD.Percorso;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `impostazioni`
--

DROP TABLE IF EXISTS `impostazioni`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `impostazioni` (
  `Giocatore` int(11) NOT NULL,
  `Su` varchar(25) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'w',
  `Giu` varchar(25) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 's',
  `Sinistra` varchar(25) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'a',
  `Destra` varchar(25) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'd',
  `Sfondo` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'carosello',
  PRIMARY KEY (`Giocatore`),
  CONSTRAINT `fk_giocatore_id` FOREIGN KEY (`Giocatore`) REFERENCES `player` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `impostazioni`
--

LOCK TABLES `impostazioni` WRITE;
/*!40000 ALTER TABLE `impostazioni` DISABLE KEYS */;
INSERT INTO `impostazioni` VALUES (1,'w','s','a','d','carosello');
/*!40000 ALTER TABLE `impostazioni` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nemici`
--

DROP TABLE IF EXISTS `nemici`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nemici` (
  `Nome` varchar(25) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `Percorso` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`Percorso`),
  UNIQUE KEY `Nome` (`Nome`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nemici`
--

LOCK TABLES `nemici` WRITE;
/*!40000 ALTER TABLE `nemici` DISABLE KEYS */;
INSERT INTO `nemici` VALUES ('Asriel','/Calvani_672819/IMG/NPC/asriel.png'),('PacMan','/Calvani_672819/IMG/NPC/Original_PacMan.png'),('Super Mario','/Calvani_672819/IMG/NPC/Super_Mario.png');
/*!40000 ALTER TABLE `nemici` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nemicididefault`
--

DROP TABLE IF EXISTS `nemicididefault`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nemicididefault` (
  `Nome` varchar(25) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `ImmagineProfilo` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '/Calvani_672819/IMG/NPC/Super_Mario.png',
  `PuntiVita` int(11) NOT NULL DEFAULT '20',
  `Abilita1` varchar(25) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'Sasso',
  `Abilita2` varchar(25) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'Carta',
  `Abilita3` varchar(25) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'Forbici',
  `Danno` int(11) DEFAULT '5',
  `Fandom` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'SuperMario',
  PRIMARY KEY (`Nome`),
  KEY `fk_ndd_imgpg` (`ImmagineProfilo`),
  KEY `fk_ndd_abilita1` (`Abilita1`),
  KEY `fk_ndd_abilita2` (`Abilita2`),
  KEY `fk_ndd_abilita3` (`Abilita3`),
  CONSTRAINT `fk_ndd_abilita1` FOREIGN KEY (`Abilita1`) REFERENCES `abilita` (`Nome`),
  CONSTRAINT `fk_ndd_abilita2` FOREIGN KEY (`Abilita2`) REFERENCES `abilita` (`Nome`),
  CONSTRAINT `fk_ndd_abilita3` FOREIGN KEY (`Abilita3`) REFERENCES `abilita` (`Nome`),
  CONSTRAINT `fk_ndd_imgpg` FOREIGN KEY (`ImmagineProfilo`) REFERENCES `nemici` (`Percorso`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nemicididefault`
--

LOCK TABLES `nemicididefault` WRITE;
/*!40000 ALTER TABLE `nemicididefault` DISABLE KEYS */;
INSERT INTO `nemicididefault` VALUES ('Asriel','/Calvani_672819/IMG/NPC/asriel.png',40,'PallaDiFuoco','Sasso','Carta',3,'Undertale'),('PacMan','/Calvani_672819/IMG/NPC/Original_PacMan.png',40,'MangiaTutto','Ciliegine','Fantasmi',3,'PacMan'),('Super Mario','/Calvani_672819/IMG/NPC/Super_Mario.png',40,'PallaDiFuoco','Fiori','Gusci',3,'SuperMario');
/*!40000 ALTER TABLE `nemicididefault` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `npc`
--

DROP TABLE IF EXISTS `npc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `npc` (
  `Nome` varchar(25) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `Proprietario` int(11) NOT NULL,
  `ImmagineProfilo` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '/Calvani_672819/IMG/PG/Frisk.png',
  `PuntiVita` int(11) NOT NULL DEFAULT '20',
  `Abilita1` varchar(25) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'Sasso',
  `Abilita2` varchar(25) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'Carta',
  `Abilita3` varchar(25) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'Forbici',
  `Danno` int(11) DEFAULT '5',
  PRIMARY KEY (`Nome`,`Proprietario`),
  UNIQUE KEY `uniq_proprietario_nome` (`Proprietario`,`Nome`),
  KEY `fk_npc_imgpg` (`ImmagineProfilo`),
  KEY `fk_npc_abilita1` (`Abilita1`),
  KEY `fk_npc_abilita2` (`Abilita2`),
  KEY `fk_npc_abilita3` (`Abilita3`),
  CONSTRAINT `fk_npc_abilita1` FOREIGN KEY (`Abilita1`) REFERENCES `abilita` (`Nome`),
  CONSTRAINT `fk_npc_abilita2` FOREIGN KEY (`Abilita2`) REFERENCES `abilita` (`Nome`),
  CONSTRAINT `fk_npc_abilita3` FOREIGN KEY (`Abilita3`) REFERENCES `abilita` (`Nome`),
  CONSTRAINT `fk_npc_imgpg` FOREIGN KEY (`ImmagineProfilo`) REFERENCES `imgpg` (`Percorso`) ON UPDATE CASCADE,
  CONSTRAINT `fk_npc_player` FOREIGN KEY (`Proprietario`) REFERENCES `player` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `npc`
--

LOCK TABLES `npc` WRITE;
/*!40000 ALTER TABLE `npc` DISABLE KEYS */;
INSERT INTO `npc` VALUES ('Frisko',1,'/Calvani_672819/IMG/PG/Frisk.png',22,'Sasso','Carta','Forbici',5),('Toad',1,'/Calvani_672819/IMG/PG/Toad.png',20,'MangiaTutto','Fantasmi','Ciliegine',7);
/*!40000 ALTER TABLE `npc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personaggi`
--

DROP TABLE IF EXISTS `personaggi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `personaggi` (
  `Nome` varchar(25) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `Proprietario` int(11) NOT NULL,
  `ImmagineProfilo` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '/Calvani_672819/IMG/PG/Frisk.png',
  `PuntiVita` int(11) NOT NULL DEFAULT '20',
  `Abilita1` varchar(25) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'Sasso',
  `Abilita2` varchar(25) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'Carta',
  `Abilita3` varchar(25) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'Forbici',
  `Danno` int(11) DEFAULT '5',
  `Anima` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '/Calvani_672819/IMG/ANIMA/red.svg',
  `Slot` int(11) NOT NULL,
  `Kills` int(11) NOT NULL DEFAULT '0',
  `Pacific` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`Nome`,`Proprietario`),
  KEY `fk_personaggi_player` (`Proprietario`),
  KEY `fk_personaggi_anime` (`Anima`),
  KEY `fk_personaggi_imgpg` (`ImmagineProfilo`),
  KEY `fk_personaggi_abilita1` (`Abilita1`),
  KEY `fk_personaggi_abilita2` (`Abilita2`),
  KEY `fk_personaggi_abilita3` (`Abilita3`),
  CONSTRAINT `fk_personaggi_abilita1` FOREIGN KEY (`Abilita1`) REFERENCES `abilita` (`Nome`),
  CONSTRAINT `fk_personaggi_abilita2` FOREIGN KEY (`Abilita2`) REFERENCES `abilita` (`Nome`),
  CONSTRAINT `fk_personaggi_abilita3` FOREIGN KEY (`Abilita3`) REFERENCES `abilita` (`Nome`),
  CONSTRAINT `fk_personaggi_anime` FOREIGN KEY (`Anima`) REFERENCES `anime` (`Percorso`) ON UPDATE CASCADE,
  CONSTRAINT `fk_personaggi_imgpg` FOREIGN KEY (`ImmagineProfilo`) REFERENCES `imgpg` (`Percorso`) ON UPDATE CASCADE,
  CONSTRAINT `fk_personaggi_player` FOREIGN KEY (`Proprietario`) REFERENCES `player` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personaggi`
--

LOCK TABLES `personaggi` WRITE;
/*!40000 ALTER TABLE `personaggi` DISABLE KEYS */;
INSERT INTO `personaggi` VALUES ('Frisko',1,'/Calvani_672819/IMG/PG/Frisk.png',22,'Sasso','Carta','Forbici',5,'/Calvani_672819/IMG/ANIMA/red.svg',2,0,0),('Toad',1,'/Calvani_672819/IMG/PG/Toad.png',20,'MangiaTutto','Fantasmi','Ciliegine',7,'/Calvani_672819/IMG/ANIMA/cyan.svg',1,0,0);
/*!40000 ALTER TABLE `personaggi` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER clone_personaggio_to_npc
AFTER INSERT ON Personaggi
FOR EACH ROW
BEGIN
    INSERT INTO NPC (
        Nome,
        Proprietario,
        ImmagineProfilo,
        PuntiVita,
        Abilita1,
        Abilita2,
        Abilita3,
        Danno
    )
    VALUES (
        NEW.Nome,
        NEW.Proprietario,
        NEW.ImmagineProfilo,
        NEW.PuntiVita,
        NEW.Abilita1,
        NEW.Abilita2,
        NEW.Abilita3,
        NEW.Danno
    )
    ON DUPLICATE KEY UPDATE
    ImmagineProfilo = NEW.ImmagineProfilo,
    PuntiVita = NEW.PuntiVita,
    Abilita1 = NEW.Abilita1,
    Abilita2 = NEW.Abilita2,
    Abilita3 = NEW.Abilita3,
    Danno = NEW.Danno;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `player`
--

DROP TABLE IF EXISTS `player`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `player` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Username` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `Password` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `Salvataggi` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`),
  UNIQUE KEY `Username` (`Username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `player`
--

LOCK TABLES `player` WRITE;
/*!40000 ALTER TABLE `player` DISABLE KEYS */;
INSERT INTO `player` VALUES (1,'Asia','$2y$10$dLS7.9Kq0VqGBEl/Pakwguq66u.BryAsPpqBfpI0yt5.hcSV74m2G',2);
/*!40000 ALTER TABLE `player` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER after_player_insert
AFTER INSERT ON Player
FOR EACH ROW
BEGIN
    INSERT INTO Impostazioni (Giocatore)
    VALUES (NEW.ID);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `registrobattaglie`
--

DROP TABLE IF EXISTS `registrobattaglie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `registrobattaglie` (
  `IDBattaglia` int(11) NOT NULL AUTO_INCREMENT,
  `Utente` int(11) NOT NULL,
  `Giocatore` varchar(25) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `Nemico` varchar(25) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `Autore` int(11) DEFAULT NULL,
  `Vittoria` tinyint(1) DEFAULT NULL,
  `TipoVittoria` varchar(25) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `DataOra` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`IDBattaglia`),
  KEY `fk_giocatore_pg` (`Giocatore`),
  KEY `fk_giocatore_utente` (`Utente`),
  CONSTRAINT `fk_giocatore_pg` FOREIGN KEY (`Giocatore`) REFERENCES `personaggi` (`Nome`),
  CONSTRAINT `fk_giocatore_utente` FOREIGN KEY (`Utente`) REFERENCES `personaggi` (`Proprietario`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registrobattaglie`
--

LOCK TABLES `registrobattaglie` WRITE;
/*!40000 ALTER TABLE `registrobattaglie` DISABLE KEYS */;
INSERT INTO `registrobattaglie` VALUES (1,1,'Frisko','PacMan',NULL,0,'nessuno','2026-02-13 15:32:38'),(2,1,'Toad','PacMan',NULL,0,'nessuno','2026-02-14 16:13:10');
/*!40000 ALTER TABLE `registrobattaglie` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-14 16:21:51
