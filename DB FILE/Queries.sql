-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 29, 2024 at 04:21 AM
-- Server version: 8.0.40-0ubuntu0.22.04.1
-- PHP Version: 8.1.2-1ubuntu2.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `student_result_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `adminDetails`
--


CREATE TABLE `adminDetails` (
  `ID` int NOT NULL,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `adminDetails`
--

INSERT INTO `adminDetails` (`ID`, `username`, `password`) VALUES
(1, 'MSI123', 'NSIT');

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `feedbackID` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `message` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `Notification_ID` int NOT NULL,
  `timestamp` timestamp NOT NULL,
  `Notification` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`Notification_ID`, `timestamp`, `Notification`) VALUES
(23, '2024-11-19 18:34:03', ' New semester results are available!'),
(32, '2024-11-28 17:49:39', 'Recent update on examination schedules.');

-- --------------------------------------------------------

--
-- Table structure for table `Results`
--

CREATE TABLE `Results` (
  `result_id` int NOT NULL,
  `SEMESTER` int DEFAULT NULL,
  `register_number` int DEFAULT NULL,
  `subjectCode` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `ST1` decimal(5,2) DEFAULT NULL,
  `ST2` decimal(5,2) DEFAULT NULL,
  `EndSemester` decimal(5,2) DEFAULT NULL,
  `Total` decimal(5,2) DEFAULT NULL,
  `Result` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Results`
--

INSERT INTO `Results` (`result_id`, `SEMESTER`, `register_number`, `subjectCode`, `ST1`, `ST2`, `EndSemester`, `Total`, `Result`) VALUES
(106, 2, 35123012, 'Machine Learning', '4.50', '20.00', '28.00', '52.50', 'PASS'),
(115, 2, 35123016, 'Data science', '12.00', '2.00', '23.00', '37.00', '--RA--'),
(121, 3, 35123011, 'TOC', '83.00', '1.00', '46.00', '130.00', 'PASS'),
(122, 1, 35123016, 'AI', '6.00', '1.00', '11.00', '18.00', '--RA--'),
(123, 2, 35123016, 'python', '11.00', '22.00', '22.00', '44.00', '--RA--'),
(129, 4, 35123016, 'Molestiae tenetur ve', '22.00', '22.00', '22.00', '66.00', 'PASS'),
(135, 1, 35123002, 'Dolores sed dolores ', '12.00', '20.00', '42.00', '74.00', 'PASS'),
(136, 2, 35123002, 'Iste aspernatur volu', '20.00', '10.00', '50.00', '80.00', 'PASS'),
(137, 3, 35123002, 'Iste dolor ex velit', '20.00', '20.00', '44.00', '84.00', 'PASS'),
(148, 2, 35123012, 'python', '12.00', '12.00', '55.00', '79.00', 'PASS'),
(163, 1, 35123001, 'Nihil duis quaerat u', '0.00', '20.00', '0.00', '0.00', '--RA--');

-- --------------------------------------------------------

--
-- Table structure for table `Students`
--

CREATE TABLE `Students` (
  `register_number` int NOT NULL,
  `Dob` date DEFAULT NULL,
  `student_name` varchar(100) DEFAULT NULL,
  `class` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Students`
--

INSERT INTO `Students` (`register_number`, `Dob`, `student_name`, `class`) VALUES
(35123001, '2024-09-17', 'Abirami V', 'IT'),
(35123002, '2003-06-18', 'Anusiya R', 'IT'),
(35123003, '2002-08-02', 'Ashwini R', 'IT'),
(35123004, '2024-09-13', 'Jayabharathi K', 'IT'),
(35123005, '2003-06-13', 'kirubanjali S', 'IT'),
(35123006, '2024-09-20', 'P. Kanimozhi', 'IT'),
(35123007, '2003-06-11', 'Ragini R', 'IT'),
(35123008, '2003-06-14', 'Shalini S', 'IT'),
(35123009, '2002-06-23', 'Aravind V', 'IT'),
(35123010, '1900-01-13', 'Ashish S', 'IT'),
(35123011, '2024-09-12', 'Balamurali E', 'IT'),
(35123012, '1906-12-18', 'Bharath S', 'IT'),
(35123013, '1925-12-01', 'Jagadeesh Kumar R', 'IT'),
(35123014, '2024-09-12', 'Mohamed Arkham Suhail K', 'IT'),
(35123015, '2001-12-02', 'Mohammed Afsal Fayaz S', 'IT'),
(35123016, '2003-06-23', 'Muhamed Ibrahim S', 'IT'),
(35123017, '1906-12-12', 'Prasanth B', 'IT'),
(35123018, '2024-09-12', 'Teja kumar G S', 'IT'),
(35123019, '1910-08-17', 'Vignesh V', 'IT'),
(35123020, '1919-12-18', 'Yoganathan V', 'IT');

-- --------------------------------------------------------

--
-- Table structure for table `Subjects`
--

CREATE TABLE `Subjects` (
  `subjectCode` varchar(20) NOT NULL,
  `SubjectName` varchar(100) NOT NULL,
  `Semester` int DEFAULT NULL,
  `SubjectType` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Subjects`
--

INSERT INTO `Subjects` (`subjectCode`, `SubjectName`, `Semester`, `SubjectType`) VALUES
('MSIC501', 'Applied Mathematics For Computer Science', 1, 'Core'),
('MSIC502', 'Advanced Data Structures and Algorithms', 1, 'CORE'),
('MSIC503', 'Advanced Computer Architecture', 1, 'CORE'),
('MSIC504', 'Artificial Intelligence', 1, 'CORE'),
('MSIC505', 'Advanced Data Structures Laboratory', 1, 'CORE'),
('MSIC506', 'Machine Learning', 2, 'CORE'),
('MSIC507', 'Advanced Computer Network', 2, 'CORE'),
('MSIC508', 'Theory Of Computation', 2, 'CORE'),
('MSIC509', 'Advanced Database Systems', 2, 'CORE'),
('MSIC510', 'Networking Laboratory ML', 2, 'CORE'),
('MSIC511', 'Advanced Database Systems Lab', 2, 'CORE'),
('MSIC512', 'Deep Learning And Neural Networks', 3, 'CORE'),
('MSIC513', 'Cryptography and Information security', 3, 'CORE'),
('MSIC514', 'Wireless Networks And Mobile Computing', 3, 'CORE'),
('MSIC515', 'DeepLearning and Miniproject Lab', 3, 'CORE'),
('MSIC516', 'Project Work', 4, 'CORE'),
('MSIE501', 'Data Science', NULL, 'ELECTIVE'),
('MSIE502', 'Problem Solving Techniques And Applications', NULL, 'ELECTIVE'),
('MSIE503', 'Natural Language Processing', NULL, 'ELECTIVE'),
('MSIE504', 'Social Network Analysis', NULL, 'ELECTIVE'),
('MSIE505', 'Advanced Object Oriented Programming', NULL, 'ELECTIVE'),
('MSIE506', 'Embedded System In Computing', NULL, 'ELECTIVE'),
('MSIE507', 'Advanced Java Programming', NULL, 'ELECTIVE'),
('MSIE508', 'Advanced Image Processing', NULL, 'ELECTIVE'),
('MSIE509', 'Big Data Analytics', NULL, 'ELECTIVE'),
('MSIE510', 'Internet Of Things', NULL, 'ELECTIVE'),
('MSIE511', 'Data Mining And Warehousing', NULL, 'ELECTIVE'),
('MSIE512', 'Distributed And Cloud Computing', NULL, 'ELECTIVE'),
('MSIE513', 'Software Quality Assurance and Testing', NULL, 'ELECTIVE'),
('MSIE514', 'Computer Vision', NULL, 'ELECTIVE'),
('MSIE515', 'Parallel Algorithms And Programming', NULL, 'ELECTIVE'),
('MSIE516', 'Cyber Forensics', NULL, 'ELECTIVE'),
('MSIE518', 'Cyber Security and Ethical Hacking', NULL, 'ELECTIVE'),
('MSIE519', 'Programming In Python', NULL, 'ELECTIVE'),
('UOMI001', 'Internship', 3, 'S'),
('UOMS230', 'Basic Computer Skills', NULL, 'SOFTSKILL'),
('UOMS231', 'Interview Preparation Skills', NULL, 'SOFTSKILL'),
('UOMS232', 'Communication Skills For IT Engineers', NULL, 'SOFTSKILL'),
('UOMS233', 'Software Development Team Project', NULL, 'SOFTSKILL');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `adminDetails`
--
ALTER TABLE `adminDetails`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`feedbackID`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`Notification_ID`);

--
-- Indexes for table `Results`
--
ALTER TABLE `Results`
  ADD PRIMARY KEY (`result_id`),
  ADD KEY `subjectCode` (`subjectCode`),
  ADD KEY `subjectCode_2` (`subjectCode`),
  ADD KEY `Results_ibfk_1` (`register_number`);

--
-- Indexes for table `Students`
--
ALTER TABLE `Students`
  ADD PRIMARY KEY (`register_number`);

--
-- Indexes for table `Subjects`
--
ALTER TABLE `Subjects`
  ADD PRIMARY KEY (`subjectCode`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `adminDetails`
--
ALTER TABLE `adminDetails`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `feedbackID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `Notification_ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `Results`
--
ALTER TABLE `Results`
  MODIFY `result_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=164;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Results`
--
ALTER TABLE `Results`
  ADD CONSTRAINT `Results_ibfk_1` FOREIGN KEY (`register_number`) REFERENCES `Students` (`register_number`) ON DELETE CASCADE ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
