-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 23, 2021 at 10:45 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.2.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `weekly_report`
--

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `depCode` varchar(20) NOT NULL,
  `deptName` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`depCode`, `deptName`) VALUES
('NDIT12', 'NATIONAL DIPLOMA: INFORMATION TECHNOLOGY'),
('NDITF1', 'NATIONAL DIPLOMA: INFORMATION TECHNOLOGY (Extended curriculum programme with foundation provision)');

-- --------------------------------------------------------

--
-- Table structure for table `hod`
--

CREATE TABLE `hod` (
  `headNum` int(10) DEFAULT NULL,
  `headName` varchar(100) DEFAULT NULL,
  `headSurname` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `depCode` varchar(20) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `hod`
--

INSERT INTO `hod` (`headNum`, `headName`, `headSurname`, `email`, `depCode`, `password`) VALUES
(1, 'Sibusiso', 'Mahlangu', 'mahlangu@gmail.com', 'NDIT12', 'mahlangus'),
(2, 'Sandile', 'Masilela', 'masilela', 'NDIT12', 'masilela'),
(1, 'Sibusiso', 'Mahlangu', 'mahlangu@gmail.com', 'NDIT12', 'mahlangus'),
(2, 'Sandile', 'Masilela', 'masilela', 'NDIT12', 'masilela');

-- --------------------------------------------------------

--
-- Table structure for table `lecture`
--

CREATE TABLE `lecture` (
  `lecNum` int(10) NOT NULL,
  `lecName` varchar(100) NOT NULL,
  `lecSurname` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `lecture`
--

INSERT INTO `lecture` (`lecNum`, `lecName`, `lecSurname`, `email`, `password`) VALUES
(123456, 'James', 'Makena', 'makena@gmail.com', '1234'),
(147896, 'Lebo', 'Kgaphola', 'kgaphola@gmail.com', '1234');

-- --------------------------------------------------------

--
-- Table structure for table `lecture_subject`
--

CREATE TABLE `lecture_subject` (
  `lecSubId` int(6) NOT NULL,
  `subjCode` varchar(10) DEFAULT NULL,
  `lecNum` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `lecture_subject`
--

INSERT INTO `lecture_subject` (`lecSubId`, `subjCode`, `lecNum`) VALUES
(1, 'cmk10at', 147896),
(2, 'dso17at', 147896),
(3, 'dso17at', 123456),
(4, 'cmk10at', 123456),
(5, 'dso17bt', 123456);

-- --------------------------------------------------------

--
-- Table structure for table `reports`
--

CREATE TABLE `reports` (
  `reportNum` int(6) NOT NULL,
  `numStudents` int(10) NOT NULL,
  `date` date NOT NULL,
  `topicsCovered` varchar(255) NOT NULL,
  `teachMode` varchar(255) NOT NULL,
  `presentMode` varchar(255) NOT NULL,
  `resource` varchar(255) NOT NULL,
  `attendAvg` int(4) NOT NULL,
  `activities` varchar(255) NOT NULL,
  `assess` varchar(255) NOT NULL,
  `challRecomm` varchar(255) NOT NULL,
  `lecSubId` int(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `reports`
--

INSERT INTO `reports` (`reportNum`, `numStudents`, `date`, `topicsCovered`, `teachMode`, `presentMode`, `resource`, `attendAvg`, `activities`, `assess`, `challRecomm`, `lecSubId`) VALUES
(1, 60, '2021-02-14', 'Welcome\nchapter 1', 'MS Teams\nClass', 'PowerPoint\nmyTUT', 'Slides\nWebsites', 20, 'Explanations\nExplainations', 'test 1', 'Some joined in late', 3),
(2, 60, '2021-02-14', 'Introduction to key accounting concepts: Financial, Cost & Management\nCosting concepts\nchapter 1', 'MS Teams\nClass', 'voice\nMS Word\nmyTUT', 'Slides\nAdditional notes\nWebsites', 30, 'Illustrations\nTopics examples\nExplainations', 'test 1', 'Some joined in late', 4),
(3, 20, '2021-02-08', 'assignment discussion', 'ms teams', 'mytutor', 'webside', 13, 'question and discussion', 'dish', 'late commers', 5),
(5, 80, '2021-02-14', 'Introduction\nChapter 1', 'MS Teams\nZoom', 'Voice', 'Slides', 30, 'Explainations', 'first test\ndish 2', 'Some delayed due to attending overrunning classes\nSome joined in late', 2),
(6, 70, '2021-02-14', 'Assignment discussion\nchapter 1', 'Zoom\nClass', 'Voice\nmyTUT', 'Slides\nWebsites', 30, 'Explainations', 'test 1', 'Some joined in late', 1);

-- --------------------------------------------------------

--
-- Table structure for table `subject`
--

CREATE TABLE `subject` (
  `subjCode` varchar(10) NOT NULL,
  `subjName` varchar(100) NOT NULL,
  `depCode` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `subject`
--

INSERT INTO `subject` (`subjCode`, `subjName`, `depCode`) VALUES
('cmk10at', 'computing skills IA', 'NDIT12'),
('dso17at', 'development software IA', 'NDIT12'),
('dso17bt', 'development software IB', 'NDIT12');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`depCode`);

--
-- Indexes for table `hod`
--
ALTER TABLE `hod`
  ADD KEY `depcode` (`depCode`);

--
-- Indexes for table `lecture`
--
ALTER TABLE `lecture`
  ADD PRIMARY KEY (`lecNum`);

--
-- Indexes for table `lecture_subject`
--
ALTER TABLE `lecture_subject`
  ADD PRIMARY KEY (`lecSubId`),
  ADD KEY `subcode` (`subjCode`),
  ADD KEY `lecCode` (`lecNum`);

--
-- Indexes for table `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`reportNum`),
  ADD KEY `repLecSub` (`lecSubId`);

--
-- Indexes for table `subject`
--
ALTER TABLE `subject`
  ADD PRIMARY KEY (`subjCode`),
  ADD KEY `subDep` (`depCode`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `lecture_subject`
--
ALTER TABLE `lecture_subject`
  MODIFY `lecSubId` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `reports`
--
ALTER TABLE `reports`
  MODIFY `reportNum` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `hod`
--
ALTER TABLE `hod`
  ADD CONSTRAINT `depcode` FOREIGN KEY (`depCode`) REFERENCES `department` (`depCode`);

--
-- Constraints for table `lecture_subject`
--
ALTER TABLE `lecture_subject`
  ADD CONSTRAINT `lecCode` FOREIGN KEY (`lecNum`) REFERENCES `lecture` (`lecNum`),
  ADD CONSTRAINT `subcode` FOREIGN KEY (`subjCode`) REFERENCES `subject` (`subjCode`);

--
-- Constraints for table `reports`
--
ALTER TABLE `reports`
  ADD CONSTRAINT `repLecSub` FOREIGN KEY (`lecSubId`) REFERENCES `lecture_subject` (`lecSubId`);

--
-- Constraints for table `subject`
--
ALTER TABLE `subject`
  ADD CONSTRAINT `subDep` FOREIGN KEY (`depCode`) REFERENCES `department` (`depCode`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
