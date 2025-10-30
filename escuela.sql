-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 30, 2025 at 06:28 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `escuela`
--

-- --------------------------------------------------------

--
-- Table structure for table `alumnos`
--

CREATE TABLE `alumnos` (
  `id_alum` int(11) NOT NULL,
  `dni` varchar(8) NOT NULL,
  `nombre_alum` varchar(30) NOT NULL,
  `apellido_alum` varchar(30) NOT NULL,
  `id_curso` int(2) NOT NULL,
  `grupo` varchar(1) NOT NULL,
  `telefono` varchar(15) NOT NULL,
  `direccion` varchar(50) NOT NULL,
  `contactos_emergencia` varchar(255) NOT NULL,
  `observaciones` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `alumnos`
--

INSERT INTO `alumnos` (`id_alum`, `dni`, `nombre_alum`, `apellido_alum`, `id_curso`, `grupo`, `telefono`, `direccion`, `contactos_emergencia`, `observaciones`) VALUES
(1, '47963144', 'Patricio Joaquin', 'Muras Caravello', 47, 'A', '1122383785', 'Av. Debenedetti 2100', 'Juan Manuel Muras\r\nPadre\r\n1170384924', 'Ninguna');

-- --------------------------------------------------------

--
-- Table structure for table `cursos`
--

CREATE TABLE `cursos` (
  `id_curso` int(2) NOT NULL,
  `anio` int(1) NOT NULL,
  `division` varchar(1) NOT NULL,
  `id_especialidad` int(1) NOT NULL,
  `id_turno` int(1) NOT NULL,
  `id_precep_curricular` int(2) NOT NULL,
  `id_precep_taller` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `cursos`
--

INSERT INTO `cursos` (`id_curso`, `anio`, `division`, `id_especialidad`, `id_turno`, `id_precep_curricular`, `id_precep_taller`) VALUES
(1, 1, 'A', 1, 1, 0, 0),
(2, 1, 'B', 1, 1, 0, 0),
(3, 1, 'C', 1, 1, 0, 0),
(4, 1, 'G', 1, 1, 0, 0),
(5, 2, 'A', 1, 1, 0, 0),
(6, 2, 'B', 1, 1, 0, 0),
(7, 2, 'C', 1, 1, 0, 0),
(8, 2, 'G', 1, 1, 0, 0),
(9, 3, 'A', 1, 1, 0, 0),
(10, 3, 'B', 1, 1, 0, 0),
(11, 3, 'C', 1, 1, 0, 0),
(12, 3, 'G', 1, 1, 0, 0),
(13, 4, '1', 2, 1, 0, 0),
(14, 5, '1', 2, 1, 0, 0),
(15, 5, '2', 2, 1, 0, 0),
(16, 6, '1', 2, 1, 0, 0),
(17, 4, '1', 3, 1, 0, 0),
(19, 5, '1', 3, 1, 0, 0),
(20, 5, '2', 3, 1, 0, 0),
(21, 6, '1', 3, 1, 0, 0),
(22, 6, '2', 3, 1, 0, 0),
(23, 4, '2', 4, 1, 0, 0),
(24, 1, 'D', 1, 2, 0, 0),
(25, 1, 'E', 1, 2, 0, 0),
(26, 1, 'F', 1, 2, 0, 0),
(27, 1, 'H', 1, 2, 0, 0),
(28, 2, 'D', 1, 2, 0, 0),
(29, 2, 'E', 1, 2, 0, 0),
(30, 2, 'F', 1, 2, 0, 0),
(31, 3, 'D', 1, 2, 0, 0),
(32, 3, 'E', 1, 2, 0, 0),
(33, 3, 'F', 1, 2, 0, 0),
(34, 4, '3', 2, 2, 0, 0),
(35, 5, '3', 2, 2, 0, 0),
(36, 6, '3', 2, 2, 0, 0),
(37, 4, '3', 3, 2, 0, 0),
(38, 5, '3', 3, 2, 0, 0),
(39, 6, '3', 3, 2, 0, 0),
(40, 4, '1', 4, 2, 0, 0),
(41, 5, '1', 4, 2, 0, 0),
(42, 6, '1', 4, 2, 0, 0),
(43, 7, '2', 2, 3, 0, 0),
(44, 7, '1', 3, 3, 0, 0),
(45, 7, '2', 3, 3, 0, 0),
(46, 6, '2', 4, 1, 0, 0),
(47, 7, '1', 4, 3, 0, 0),
(49, 7, '1', 2, 3, 0, 0),
(50, 4, '2', 2, 1, 0, 0),
(51, 6, '2', 2, 1, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `especialidades`
--

CREATE TABLE `especialidades` (
  `id_especialidad` int(1) NOT NULL,
  `nombre_especialidad` varchar(10) NOT NULL,
  `descripcion_especialidad` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `especialidades`
--

INSERT INTO `especialidades` (`id_especialidad`, `nombre_especialidad`, `descripcion_especialidad`) VALUES
(1, 'CBT', 'Ciclo Básico Técnico'),
(2, 'IPP', 'Informática Profesional y Personal'),
(3, 'ADO', 'Administración de las Organizaciones'),
(4, 'PROG', 'Programación');

-- --------------------------------------------------------

--
-- Table structure for table `materias`
--

CREATE TABLE `materias` (
  `id_mat` int(11) NOT NULL,
  `nombre_mat` text NOT NULL,
  `anio_mat` int(1) NOT NULL,
  `id_especialidad` int(1) NOT NULL,
  `id_tm` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Dumping data for table `materias`
--

INSERT INTO `materias` (`id_mat`, `nombre_mat`, `anio_mat`, `id_especialidad`, `id_tm`) VALUES
(1, 'Ciencias Naturales', 1, 1, 1),
(2, 'Ciencias Sociales', 1, 1, 1),
(3, 'Educación Artistica', 1, 1, 1),
(4, 'Educación Física', 1, 1, 1),
(5, 'Inglés ', 1, 1, 1),
(6, 'Matemática ', 1, 1, 1),
(7, 'Práctica del Lenguaje ', 1, 1, 1),
(8, 'Construcción Ciudadana ', 1, 1, 1),
(9, 'Lenguajes Tecnológicos ', 1, 1, 2),
(10, 'Sistemas Tecnológicos ', 1, 1, 2),
(11, 'Procedimientos Técnicos ', 1, 1, 2),
(12, 'Biología', 2, 1, 1),
(13, 'Físico Química ', 2, 1, 1),
(14, 'Educación Artística', 2, 1, 1),
(15, 'Educación Física', 2, 1, 1),
(16, 'Inglés ', 2, 1, 1),
(17, 'Matemática ', 2, 1, 1),
(18, 'Práctica del Lenguaje ', 2, 1, 1),
(19, 'Construcción Ciudadana ', 2, 1, 1),
(20, 'Historia ', 2, 1, 1),
(21, 'Geografía ', 2, 1, 1),
(22, 'Lenguajes Tecnológicos ', 2, 1, 2),
(23, 'Sistemas Tecnológicos ', 2, 1, 2),
(24, 'Procedimientos Técnicos ', 2, 1, 2),
(25, 'Biología', 3, 1, 1),
(26, 'Físico Química ', 3, 1, 1),
(27, 'Educación Artística ', 3, 1, 1),
(28, 'Educación Física', 3, 1, 1),
(29, 'Inglés ', 3, 1, 1),
(30, 'Matemática ', 3, 1, 1),
(31, 'Práctica del Lenguaje ', 3, 1, 1),
(32, 'Construcción Ciudadana ', 3, 1, 1),
(33, 'Historia ', 3, 1, 1),
(34, 'Geografía ', 3, 1, 1),
(35, 'Lenguajes Tecnológicos ', 3, 1, 2),
(36, 'Sistemas Tecnológicos ', 3, 1, 2),
(37, 'Procedimientos Técnicos ', 3, 1, 2),
(38, 'Literatura', 4, 2, 1),
(39, 'Inglés', 4, 2, 1),
(40, 'Educación física', 4, 2, 1),
(41, 'SADO', 4, 2, 1),
(42, 'Historia', 4, 2, 1),
(43, 'Geografía', 4, 2, 1),
(44, 'Matemática Ciclo Sup.', 4, 2, 2),
(45, 'Física', 4, 2, 2),
(46, 'Química', 4, 2, 2),
(47, 'Tecnologías Electrónicas', 4, 2, 2),
(48, 'Laboratorio de Programación I', 4, 2, 2),
(49, 'Laboratorio de Hardware', 4, 2, 2),
(50, 'Laboratorio de Sistemas Operativos', 4, 2, 2),
(51, 'Laboratorio de Aplicaciones', 4, 2, 2),
(52, 'Literatura', 5, 2, 1),
(53, 'Inglés', 5, 2, 1),
(54, 'Educación física', 5, 2, 1),
(55, 'Polit. y Ciud.', 5, 2, 1),
(56, 'Historia', 5, 2, 1),
(57, 'Geografía', 5, 2, 1),
(58, 'Análisis Matemático', 5, 2, 2),
(59, 'Sistemas Digitales', 5, 2, 2),
(60, 'Teleinformática', 5, 2, 2),
(61, 'Laboratorio de Programación II', 5, 2, 2),
(62, 'Laboratorio de Hardware', 5, 2, 2),
(63, 'Laboratorio de Sistemas Operativos', 5, 2, 2),
(64, 'Laboratorio de Aplicaciones', 5, 2, 2),
(65, 'Literatura', 6, 2, 1),
(66, 'Inglés', 6, 2, 1),
(67, 'Educación física', 6, 2, 1),
(68, 'Filosofía', 6, 2, 1),
(69, 'Arte', 6, 2, 1),
(70, 'Matemática Aplicada', 6, 2, 2),
(71, 'Sistemas digitales', 6, 2, 2),
(72, 'Investigación Operativa', 6, 2, 2),
(73, 'Seguridad Informática', 6, 2, 2),
(74, 'Derechos del Trabajo', 6, 2, 2),
(75, 'Laboratorio de Programación III', 6, 2, 2),
(76, 'Laboratorio de Hardware', 6, 2, 2),
(77, 'Laboratorio de Sistemas Operativos', 6, 2, 2),
(78, 'Laboratorio de Aplicaciones', 6, 2, 2),
(79, 'Prácticas Profesionalizantes', 7, 2, 1),
(80, 'Emprend. Productivos y Desarrollo Local', 7, 2, 2),
(81, 'Evaluación de Proyectos', 7, 2, 2),
(82, 'Modelos y Sistemas', 7, 2, 2),
(83, 'Bases de Datos', 7, 2, 2),
(84, 'PDeI de Sist. Computacionales  ', 7, 2, 2),
(85, 'Inst., Mant. y Rep. de Sist. Computacionales', 7, 2, 2),
(86, 'Inst., Mant. y Rep. de Redes Informáticas', 7, 2, 2),
(87, 'Literatura', 4, 3, 1),
(88, 'Inglés', 4, 3, 1),
(89, 'Educación física', 4, 3, 1),
(90, 'SADO', 4, 3, 1),
(91, 'Historia', 4, 3, 1),
(92, 'Geografía', 4, 3, 1),
(93, 'Matemática Ciclo Sup.', 4, 3, 2),
(94, 'Física', 4, 3, 2),
(95, 'Química', 4, 3, 2),
(96, 'Comercialización', 4, 3, 2),
(97, 'Introducción a las Org.', 4, 3, 2),
(98, 'Tecnologías de la Inf. de la Gest.', 4, 3, 2),
(99, 'Gestión Comercial', 4, 3, 2),
(100, 'Administración y Gest. de RRHH', 4, 3, 2),
(101, 'Sistemas de Información Contable', 4, 3, 2),
(102, 'Literatura', 5, 3, 1),
(103, 'Inglés', 5, 3, 1),
(104, 'Educación física', 5, 3, 1),
(105, 'Polit. y Ciud.', 5, 3, 1),
(106, 'Historia', 5, 3, 1),
(107, 'Geografía', 5, 3, 1),
(108, 'Análisis Matemático', 5, 3, 2),
(109, 'Derecho', 5, 3, 2),
(110, 'Organización Industrial', 5, 3, 2),
(111, 'Costos', 5, 3, 2),
(112, 'Teoría de las Organizaciones', 5, 3, 2),
(113, 'Gestión de la Producción', 5, 3, 2),
(114, 'Administración y Gestión de RRHH', 5, 3, 2),
(115, 'Sistemas de Información Contable', 5, 3, 2),
(116, 'Literatura', 6, 3, 1),
(117, 'Inglés', 6, 3, 1),
(118, 'Educación física', 6, 3, 1),
(119, 'Filosofía', 6, 3, 1),
(120, 'Arte', 6, 3, 1),
(121, 'Matemática Aplicada', 6, 3, 2),
(122, 'Organización Industrial', 6, 3, 2),
(123, 'Planeamiento', 6, 3, 2),
(124, 'Economía', 6, 3, 2),
(125, 'Gastos Financiera, Bancaria y Seguros', 6, 3, 2),
(126, 'Teoría y Técnica Impositiva', 6, 3, 2),
(127, 'Derechos del Trabajo', 6, 3, 2),
(128, 'Producción y Comercio Exterior', 6, 3, 2),
(129, 'Admin. y Gest. de RRHH', 6, 3, 2),
(130, 'Sist. de Información Contable', 6, 3, 2),
(131, 'Prácticas Profesionalizantes', 7, 3, 1),
(132, 'Economía y Desarrollo Sustentable', 7, 3, 2),
(133, 'Auditoría y Control de Gestión', 7, 3, 2),
(134, 'Eval. y Gest. de Proyectos', 7, 3, 2),
(135, 'Capital Humano y Relaciones Laborales', 7, 3, 2),
(136, 'Análisis e Interpretación de Estados Contables', 7, 3, 2),
(137, 'Literatura', 4, 4, 1),
(138, 'Inglés', 4, 4, 1),
(139, 'Educación física', 4, 4, 1),
(140, 'SADO', 4, 4, 1),
(141, 'Historia', 4, 4, 1),
(142, 'Geografía', 4, 4, 1),
(143, 'Matemática Ciclo Sup.', 4, 4, 2),
(144, 'Física', 4, 4, 2),
(145, 'Química', 4, 4, 2),
(146, 'Tecnologías Electrónicas', 4, 4, 2),
(147, 'Laboratorio de Programación I', 4, 4, 2),
(148, 'Laboratorio de Hardware', 4, 4, 2),
(149, 'Laboratorio de Sistemas Operativos', 4, 4, 2),
(150, 'Laboratorio de Aplicaciones', 4, 4, 2),
(151, 'Literatura', 5, 4, 1),
(152, 'Inglés', 5, 4, 2),
(153, 'Educación física', 5, 4, 1),
(154, 'Polit. y Ciud.', 5, 4, 1),
(155, 'Historia', 5, 4, 1),
(156, 'Geografía', 5, 4, 2),
(157, 'Análisis Matemático', 5, 4, 2),
(158, 'Sistemas Digitales', 5, 4, 2),
(159, 'Base de Datos', 5, 4, 2),
(160, 'Modelos y sistemas', 5, 4, 2),
(161, 'Laboratorio de Programación II', 5, 4, 2),
(162, 'Laboratorio de Redes Informáticas', 5, 4, 2),
(163, 'Laboratorio de DiseÃ±o Web', 5, 4, 2),
(164, 'Laboratorio de Bases de Datos', 5, 4, 2),
(165, 'Literatura', 6, 4, 1),
(166, 'Inglés', 6, 4, 1),
(167, 'Educación física', 6, 4, 1),
(168, 'Filosofía', 6, 4, 1),
(169, 'Arte', 6, 4, 1),
(174, 'Derechos del Trabajo', 6, 4, 2),
(175, 'Laboratorio de Programación III', 6, 4, 2),
(176, 'Laboratorio de Procesos Industriales', 6, 4, 2),
(177, 'Laboratorio de Aplic. Web Dinámicas', 6, 4, 2),
(178, 'Laboratorio de Aplic. Web Estáticas', 6, 4, 2),
(179, 'Prácticas Profesionalizantes', 7, 4, 1),
(180, 'Emprend. Productivos y Desarrollo Local', 7, 4, 2),
(181, 'Evaluación de Proyectos', 7, 4, 2),
(182, 'Modelos y Sistemas', 7, 4, 2),
(183, 'Organización y Métodos', 7, 4, 2),
(184, 'PDeI de Sist. Computacionales', 7, 4, 2),
(185, 'Proyecto de Desarrollo de Soft. para Plat. Móv.', 7, 4, 2),
(186, 'Proyecto de Desarrollo de Implementación de Sitios Web Dinámicos', 7, 4, 2),
(187, 'Matemática Discreta', 6, 4, 1),
(188, 'Sistemas de Gestión y Autogestión', 6, 4, 1),
(189, 'Seguridad Informática', 6, 4, 1),
(190, 'Sistemas Digitales', 6, 4, 1);

-- --------------------------------------------------------

--
-- Table structure for table `preceptores`
--

CREATE TABLE `preceptores` (
  `id_precep` int(2) NOT NULL,
  `nombre_precep` varchar(30) NOT NULL,
  `apellido_precep` varchar(30) NOT NULL,
  `correo_inst_precep` varchar(60) NOT NULL,
  `correo_alt_precep` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci ROW_FORMAT=COMPACT;

-- --------------------------------------------------------

--
-- Table structure for table `profesores`
--

CREATE TABLE `profesores` (
  `id_prof` int(11) NOT NULL,
  `nombre_prof` varchar(30) NOT NULL,
  `apellido_prof` varchar(30) NOT NULL,
  `correo_inst_prof` varchar(60) NOT NULL,
  `correo_alt_prof` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tipomateria`
--

CREATE TABLE `tipomateria` (
  `id_tm` int(1) NOT NULL,
  `nombre_tm` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Dumping data for table `tipomateria`
--

INSERT INTO `tipomateria` (`id_tm`, `nombre_tm`) VALUES
(1, 'Curricular'),
(2, 'Taller');

-- --------------------------------------------------------

--
-- Table structure for table `turnos`
--

CREATE TABLE `turnos` (
  `id_turno` int(1) NOT NULL,
  `nombre_turno` varchar(15) NOT NULL,
  `descripcion_turno` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `turnos`
--

INSERT INTO `turnos` (`id_turno`, `nombre_turno`, `descripcion_turno`) VALUES
(1, 'M', 'Mañana'),
(2, 'T', 'Tarde'),
(3, 'V', 'Vespertino');

-- --------------------------------------------------------

--
-- Table structure for table `usuario_sistema`
--

CREATE TABLE `usuario_sistema` (
  `id_usuario` int(11) NOT NULL,
  `nombre_usuario` varchar(50) NOT NULL,
  `contraseña` varchar(255) NOT NULL,
  `admin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usuario_sistema`
--

INSERT INTO `usuario_sistema` (`id_usuario`, `nombre_usuario`, `contraseña`, `admin`) VALUES
(7, 'patitow', '$2b$12$.MxDcVU6465ZZSWpEgbAUuhdEDwomkKMLZAUGCPQobtG5l7p2LY1i', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `alumnos`
--
ALTER TABLE `alumnos`
  ADD PRIMARY KEY (`id_alum`),
  ADD KEY `id_curso` (`id_curso`);

--
-- Indexes for table `cursos`
--
ALTER TABLE `cursos`
  ADD PRIMARY KEY (`id_curso`),
  ADD KEY `id_turno` (`id_turno`),
  ADD KEY `id_preceptor` (`id_precep_curricular`),
  ADD KEY `id_especialidad` (`id_especialidad`);

--
-- Indexes for table `especialidades`
--
ALTER TABLE `especialidades`
  ADD PRIMARY KEY (`id_especialidad`);

--
-- Indexes for table `materias`
--
ALTER TABLE `materias`
  ADD PRIMARY KEY (`id_mat`),
  ADD KEY `id_tm` (`id_tm`);

--
-- Indexes for table `preceptores`
--
ALTER TABLE `preceptores`
  ADD PRIMARY KEY (`id_precep`);

--
-- Indexes for table `profesores`
--
ALTER TABLE `profesores`
  ADD PRIMARY KEY (`id_prof`);

--
-- Indexes for table `tipomateria`
--
ALTER TABLE `tipomateria`
  ADD PRIMARY KEY (`id_tm`);

--
-- Indexes for table `turnos`
--
ALTER TABLE `turnos`
  ADD PRIMARY KEY (`id_turno`);

--
-- Indexes for table `usuario_sistema`
--
ALTER TABLE `usuario_sistema`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `alumnos`
--
ALTER TABLE `alumnos`
  MODIFY `id_alum` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `cursos`
--
ALTER TABLE `cursos`
  MODIFY `id_curso` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `especialidades`
--
ALTER TABLE `especialidades`
  MODIFY `id_especialidad` int(1) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `preceptores`
--
ALTER TABLE `preceptores`
  MODIFY `id_precep` int(2) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `profesores`
--
ALTER TABLE `profesores`
  MODIFY `id_prof` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tipomateria`
--
ALTER TABLE `tipomateria`
  MODIFY `id_tm` int(1) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `turnos`
--
ALTER TABLE `turnos`
  MODIFY `id_turno` int(1) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `usuario_sistema`
--
ALTER TABLE `usuario_sistema`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `alumnos`
--
ALTER TABLE `alumnos`
  ADD CONSTRAINT `alumnos_ibfk_1` FOREIGN KEY (`id_curso`) REFERENCES `cursos` (`id_curso`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
