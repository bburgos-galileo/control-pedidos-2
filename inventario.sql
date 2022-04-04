CREATE DATABASE  IF NOT EXISTS `inventario` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `inventario`;
-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: inventario
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria` (
  `idCategoria` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(100) NOT NULL,
  PRIMARY KEY (`idCategoria`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` (`idCategoria`, `descripcion`) VALUES (12,'Limpieza y Cuidado del Hogar'),(13,'Abarrotes'),(14,'Verduras'),(16,'Carnes'),(17,'Bebidas'),(18,'Lacteos'),(19,'Congelados'),(20,'Bebes'),(21,'Frutas');
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedidos`
--

DROP TABLE IF EXISTS `pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedidos` (
  `idPedidos` int NOT NULL AUTO_INCREMENT,
  `idProducto` int NOT NULL,
  `idProveedor` int NOT NULL,
  `cantidad` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`idPedidos`),
  KEY `fk_producto_idx` (`idProducto`),
  KEY `fk_proveedor_idx` (`idProveedor`),
  CONSTRAINT `fk_producto` FOREIGN KEY (`idProducto`) REFERENCES `productos` (`idProducto`),
  CONSTRAINT `fk_proveedor` FOREIGN KEY (`idProveedor`) REFERENCES `proveedores` (`idProveedor`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidos`
--

LOCK TABLES `pedidos` WRITE;
/*!40000 ALTER TABLE `pedidos` DISABLE KEYS */;
INSERT INTO `pedidos` (`idPedidos`, `idProducto`, `idProveedor`, `cantidad`) VALUES (6,16,9,100),(7,7,6,15),(8,22,8,100),(9,17,8,78),(10,14,7,10);
/*!40000 ALTER TABLE `pedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `idProducto` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(100) NOT NULL,
  `idCategoria` int NOT NULL,
  `existencia` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`idProducto`),
  KEY `fk_categoria_idx` (`idCategoria`),
  CONSTRAINT `fk_categoria` FOREIGN KEY (`idCategoria`) REFERENCES `categoria` (`idCategoria`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` (`idProducto`, `descripcion`, `idCategoria`, `existencia`) VALUES (5,'Cloro Campos Lavanda',12,10),(6,'Desinfectante Citronela',12,74),(7,'Desinfectante Manzana',12,23),(8,'Jabon Bola Rendimiento Xtra 3 pack',12,51),(9,'Pañal Desechable Talla 4',20,78),(10,'Shampoo Miel y Manzanilla',20,45),(11,'Biberón 2 onz.',20,8),(12,'Shampoo Manzanilla',20,19),(13,'Jabón Cremoso Humectante',20,1),(14,'Toallas Humedas',20,147),(15,'Loción Besitos',20,5),(16,'Arroz Precocido Gallo Dorado',13,1247),(17,'Frijol La Campana',13,71),(18,'Lentejas',13,3),(19,'Pasta Fideos',13,12),(20,'Pasta Caracolitos',13,11),(21,'Tomate Manzano',14,151),(22,'Aguacate',14,12),(23,'Lechuga Romana',14,87),(24,'Mango Tomy',21,71),(25,'Espinaca',14,17),(26,'Limones',21,752);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proveedores`
--

DROP TABLE IF EXISTS `proveedores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proveedores` (
  `idProveedor` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  PRIMARY KEY (`idProveedor`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proveedores`
--

LOCK TABLES `proveedores` WRITE;
/*!40000 ALTER TABLE `proveedores` DISABLE KEYS */;
INSERT INTO `proveedores` (`idProveedor`, `nombre`) VALUES (6,'Industria La Popular'),(7,'Procter & Gamble'),(8,'La Carreta'),(9,'Molinos Modernos');
/*!40000 ALTER TABLE `proveedores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `idusuario` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(200) NOT NULL,
  `correo` varchar(250) DEFAULT NULL,
  `clave` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`idusuario`),
  UNIQUE KEY `cons_email` (`correo`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` (`idusuario`, `nombre`, `correo`, `clave`) VALUES (1,'Byron Burgos','bburgos@galileo.com','$2b$10$dZ/g24hLdX6S6RkMNVZg4.39ratB0xPI2bvZUizGH288oA2LLq082'),(2,'Byron Burgos','byron_online@yahoo.com','$2b$10$7oQ5EGderIT793jDLizfDemG35jW64NFL/mnGmYKgJNe3EZ2qKeB6');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `vw_pedidos`
--

DROP TABLE IF EXISTS `vw_pedidos`;
/*!50001 DROP VIEW IF EXISTS `vw_pedidos`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vw_pedidos` AS SELECT 
 1 AS `idProducto`,
 1 AS `descripcion`,
 1 AS `categoria`,
 1 AS `cant_pedida`,
 1 AS `proveedor`,
 1 AS `ex_cant`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `vw_pedidos`
--

/*!50001 DROP VIEW IF EXISTS `vw_pedidos`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vw_pedidos` AS select `a`.`idProducto` AS `idProducto`,`a`.`descripcion` AS `descripcion`,`c`.`descripcion` AS `categoria`,ifnull(`p`.`cantidad`,0) AS `cant_pedida`,ifnull(`pr`.`nombre`,'') AS `proveedor`,concat(`a`.`existencia`,concat(concat(' (',ifnull(`p`.`cantidad`,0)),')')) AS `ex_cant` from (((`productos` `a` join `categoria` `c` on((`a`.`idCategoria` = `c`.`idCategoria`))) left join `pedidos` `p` on((`a`.`idProducto` = `p`.`idProducto`))) left join `proveedores` `pr` on((`p`.`idProveedor` = `pr`.`idProveedor`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-04  8:53:09
