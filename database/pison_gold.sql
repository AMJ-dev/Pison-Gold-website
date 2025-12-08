DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `full_name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(500) NOT NULL,
  `pics` varchar(200) NOT NULL DEFAULT 'avatar.png',
  `date_time` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `idx_user_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

LOCK TABLES `users` WRITE;

set autocommit=0;
INSERT INTO `users` VALUES (1,'Admin','admin@cyberpros.com.ng','$argon2i$v=19$m=65536,t=4,p=1$M3ZiZmFpZU9PcUtwMjlQbg$E4qFuucAckxpMoIaYiFOlQZTTgrKnfn62ZCLvWwSh1k','avatar.png','2025-12-05 17:14:06');

UNLOCK TABLES;
commit;

DROP TABLE IF EXISTS `otp`;

CREATE TABLE `otp` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `otp` varchar(20) DEFAULT NULL,
  `time_expire` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_otp_user` (`user_id`),
  CONSTRAINT `fk_otp_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

LOCK TABLES `otp` WRITE;

set autocommit=0;
INSERT INTO `otp` VALUES (1,1,'','');
UNLOCK TABLES;
commit;

DROP TABLE IF EXISTS `password_reset`;

CREATE TABLE `password_reset` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `link1` varchar(500) DEFAULT NULL,
  `link2` varchar(500) DEFAULT NULL,
  `time_expires` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_password_reset_user` (`user_id`),
  CONSTRAINT `fk_password_reset_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

LOCK TABLES `password_reset` WRITE;

set autocommit=0;
INSERT INTO `password_reset` VALUES (1,1,'','','');
UNLOCK TABLES;
commit;

DROP TABLE IF EXISTS `projects`;

CREATE TABLE `projects` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `short_desc` varchar(500) NOT NULL,
  `long_desc` text NOT NULL,
  `challenges` text DEFAULT NULL,
  `solution` text DEFAULT NULL,
  `impact` text DEFAULT NULL,
  `duration` varchar(50) DEFAULT NULL,
  `budget` varchar(100) DEFAULT NULL,
  `team_size` varchar(50) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `key_results` text DEFAULT NULL,
  `sector` varchar(150) DEFAULT NULL,
  `cover_image` text DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_projects_sector` (`sector`),
  KEY `idx_projects_duration` (`duration`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

LOCK TABLES `projects` WRITE;

set autocommit=0;
INSERT INTO `projects` VALUES
(1,'Nationwide JAMB CBT Center Installation & Infrastructure Upgrade','A comprehensive nationwide project to install and upgrade 150+ JAMB CBT centers across Nigeria, featuring state-of-the-art computer-based testing infrastructure, robust power solutions, and high-speed','This strategic initiative involved the design, deployment, and commissioning of modern Computer-Based Testing (CBT) centers across Nigeria for the Joint Admissions and Matriculation Board (JAMB). The project encompassed end-to-end solutions including hardware procurement, network infrastructure setup, power management systems, security implementation, and technical support frameworks. \r\n\r\nEach center was equipped with high-performance workstations, biometric verification systems, CCTV surveillance, and redundant internet connections to guarantee zero-downtime during critical examination periods. \r\n\r\nThe project followed international standards for testing center infrastructure while adapting to Nigeria\'s unique operational challenges.','1. Infrastructure Limitations\r\nPower Instability: Unreliable grid electricity across multiple locations\r\n\r\nNetwork Connectivity: Poor internet infrastructure in remote areas\r\n\r\nBuilding Standards: Many existing facilities lacked basic ICT infrastructure\r\n\r\nGeographic Spread: Centers located across diverse terrains and climate zones\r\n\r\n2. Technical Complexities\r\nHardware Compatibility: Ensuring uniform performance across different hardware batches\r\n\r\nSoftware Integration: Seamless integration with JAMB\'s existing examination platform\r\n\r\nNetwork Security: Protecting sensitive examination data from breaches\r\n\r\nBiometric System Accuracy: Achieving 99.9% accuracy in candidate verification\r\n\r\n3. Operational Challenges\r\nTimeline Pressure: Tight deadlines before examination seasons\r\n\r\nMultiple Stakeholders: Coordinating with JAMB officials, facility owners, and local authorities\r\n\r\nTraining Requirements: Need for extensive technical staff training across locations\r\n\r\nMaintenance Logistics: Establishing support systems for 150+ centers nationwide\r\n\r\n4. Security Concerns\r\nExamination Integrity: Preventing malpractice and system manipulation\r\n\r\nPhysical Security: Protecting expensive equipment from theft/vandalism\r\n\r\nData Protection: Securing candidate information and examination content\r\n\r\nNetwork Security: Preventing external attacks during live examinations','1. Customized Infrastructure Design\r\nModular Center Layout: Standardized yet adaptable designs for different facility sizes\r\n\r\nHybrid Power Solutions: Solar-grid-generator triple redundancy systems\r\n\r\nNetwork Architecture: Fiber-WiMAX-LTE multi-path connectivity\r\n\r\nClimate Control: Specialized cooling for server rooms and testing halls\r\n\r\n2. Technology Implementation\r\nHardware Standardization: Deployed 20,000+ high-specification workstations\r\n\r\nCentralized Management: Cloud-based monitoring and control systems\r\n\r\nBiometric Integration: Multi-factor authentication (fingerprint + facial recognition)\r\n\r\nBackup Systems: Real-time data replication and disaster recovery protocols\r\n\r\n3. Security Framework\r\nMulti-Layer Security: Physical, network, and application-level protection\r\n\r\nSurveillance Systems: 360-degree CCTV with remote monitoring\r\n\r\nAccess Control: Biometric entry systems and time-limited access protocols\r\n\r\nData Encryption: End-to-end encryption for all examination data\r\n\r\n4. Support & Training\r\nRegional Technical Teams: Established 6 regional support centers\r\n\r\nComprehensive Training: Trained 500+ technical staff across all locations\r\n\r\n24/7 Support Center: Round-the-clock technical assistance during examination periods\r\n\r\nPreventive Maintenance: Scheduled maintenance protocols and spare parts inventory','1. Examination Delivery\r\nIncreased Capacity: Accommodated 1.8 million candidates annually (20% increase)\r\n\r\nReduced Malpractice: 95% reduction in examination malpractice cases\r\n\r\nFaster Results: Result processing time reduced from 6 weeks to 48 hours\r\n\r\nImproved Accuracy: 99.8% system uptime during critical examination periods\r\n\r\n2. Operational Efficiency\r\nCost Reduction: 40% decrease in operational costs through automation\r\n\r\nEnergy Efficiency: 60% power savings via optimized energy management\r\n\r\nResource Optimization: 30% reduction in manpower requirements through automation\r\n\r\nScalability: Infrastructure supports 50% expansion without major upgrades\r\n\r\n3. Quality Enhancement\r\nCandidate Experience: 98% satisfaction rate in post-examination surveys\r\n\r\nSystem Reliability: 99.9% system availability during 5 consecutive examination cycles\r\n\r\nTechnical Performance: Zero system failures during critical examination windows\r\n\r\nData Integrity: 100% accurate result computation and transmission\r\n\r\n4. National Impact\r\nEducational Access: Extended CBT access to 25 previously underserved states\r\n\r\nTechnology Adoption: Accelerated digital literacy among educational institutions\r\n\r\nEmployment Generation: Created 1,200+ direct and indirect jobs\r\n\r\nStandard Setting: Established Nigeria\'s first national standard for CBT centers','6-12 Months','Confidental','10-20 Experts','36 States + FCT, Nigeria','150 CBT Centers successfully installed and operational nationwide,20,000+ Workstations deployed with 99.5% uptime record,1.8 Million Candidates capacity achieved annually,95% Reduction in examination malpractice incidents,99.9% System Availability during 5 consecutive examination cycles','Technology Solutions','uploads/8aea0b0920_2025_12_08_02_00_28_curement.jpeg','2025-12-08 02:00:28','2025-12-08 02:13:52');

UNLOCK TABLES;
commit;

DROP TABLE IF EXISTS `project_gallery`;

CREATE TABLE `project_gallery` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `project_id` bigint(20) unsigned NOT NULL,
  `image` text NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `project_id` (`project_id`),
  CONSTRAINT `project_gallery_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;


LOCK TABLES `project_gallery` WRITE;

set autocommit=0;
INSERT INTO `project_gallery` VALUES
(1,1,'uploads/140a4d6a71_2025_12_08_02_00_28_k_Eket_7.webp','2025-12-08 02:00:28',NULL),
(2,1,'uploads/1090e760e4_2025_12_08_02_00_28_ages__6_.jpeg','2025-12-08 02:00:28',NULL),
(3,1,'uploads/774df4b0b1_2025_12_08_02_00_28_ages__5_.jpeg','2025-12-08 02:00:28',NULL),
(4,1,'uploads/2abb476d25_2025_12_08_02_00_28_ages__4_.jpeg','2025-12-08 02:00:28',NULL),
(5,1,'uploads/16281937eb_2025_12_08_02_00_28_ages__3_.jpeg','2025-12-08 02:00:28',NULL),
(6,1,'uploads/2da264e24f_2025_12_08_02_00_28_ages__2_.jpeg','2025-12-08 02:00:28',NULL),
(7,1,'uploads/0e38f3a223_2025_12_08_02_00_28_ages__1_.jpeg','2025-12-08 02:00:28',NULL);

DROP TABLE IF EXISTS `teams`;

CREATE TABLE `teams` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `position` varchar(255) NOT NULL,
  `bio` text NOT NULL,
  `image` text DEFAULT NULL,
  `facebook` varchar(255) DEFAULT NULL,
  `linkedin` varchar(255) DEFAULT NULL,
  `twitter` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

LOCK TABLES `teams` WRITE;

set autocommit=0;
INSERT INTO `teams` VALUES
(2,'Sam Ibekwe','admin@data.com','+2348545555','Software','A visionary leader with over 12 years of experience in multi-sector project execution across Real Estate, Technology Infrastructure, Healthcare Equipment Deployment, and Procurement Solutions.','uploads/4144ccb019_2025_12_06_00_47_43_ew_1127a.webp','http://facebook.com','http://linklin.com','http://twitter.com','2025-12-06 00:47:43');

UNLOCK TABLES;
commit;

DROP TABLE IF EXISTS `testimonies`;

CREATE TABLE `testimonies` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `full_name` varchar(150) NOT NULL,
  `position` varchar(150) DEFAULT NULL,
  `company` varchar(150) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `testimonial` text NOT NULL,
  `rating` tinyint(3) unsigned DEFAULT 5,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

LOCK TABLES `testimonies` WRITE;

set autocommit=0;
INSERT INTO `testimonies` VALUES
(3,'Samuel Jackson',NULL,NULL,'uploads/c026849655_2025_12_06_02_05_11_rdner_31.jpg','A visionary leader with over 12 years of experience in multi-sector project execution across Real Estate, Technology Infrastructure, Healthcare Equipment Deployment, and Procurement Solutions.',5,'2025-12-06 01:05:11'),
(4,'Samuel Jackson','CEO','','uploads/36121dca92_2025_12_06_02_06_03_rdner_31.jpg','A visionary leader with over 12 years of experience in multi-sector project execution across Real Estate, Technology Infrastructure, Healthcare Equipment Deployment, and Procurement Solutions.',5,'2025-12-06 01:06:03');
UNLOCK TABLES;
commit;
