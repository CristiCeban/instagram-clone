-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Дек 21 2020 г., 11:01
-- Версия сервера: 10.4.17-MariaDB
-- Версия PHP: 8.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `db_insta`
--

-- --------------------------------------------------------

--
-- Структура таблицы `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(0, 'Electronics'),
(1, 'Cars'),
(3, 'Animals');

-- --------------------------------------------------------

--
-- Структура таблицы `hibernate_sequence`
--

CREATE TABLE `hibernate_sequence` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `hibernate_sequence`
--

INSERT INTO `hibernate_sequence` (`next_val`) VALUES
(83);

-- --------------------------------------------------------

--
-- Структура таблицы `products`
--

CREATE TABLE `products` (
  `id` bigint(20) NOT NULL,
  `long_description` varchar(1024) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` double DEFAULT NULL,
  `short_description` varchar(1024) DEFAULT NULL,
  `category_id` bigint(20) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `products`
--

INSERT INTO `products` (`id`, `long_description`, `name`, `price`, `short_description`, `category_id`, `user_id`) VALUES
(9, 'About this item\nNew, unlocked Android phone gives you the flexibility to change carriers and choose your own data plan; works with Verizon, T-Mobile, Sprint, AT&T, and other major carriers\nCapture great photos using your cell phone on the 12 MP dual pixel rear camera with features like Live HDR+, Night Sight, and Portrait Mode; share photos directly from the viewfinder of your Pixel camera to Google and popular third party apps\nThe Adaptive Battery lasts up to 24 hours [1] as it learns your favorite apps and reduces power to the ones you rarely use\nHDR+ makes your photos look better by automatically adjusting for color and lighting; Night Sight lets you capture rich detail and color even in the dark; Portrait Mode helps you take beautiful portraits with a DSLR quality look\nGet things done with just your voice: Send texts, get directions and reminders, and multitask on the go on your mobile phone with help from Google\n', 'Google Pixel 4a', 400, 'Google Pixel 4a - New Unlocked Android Smartphone - 128 GB of Storage', 0, 1),
(15, 'New, unlocked Android phone gives you the flexibility to change carriers and choose your own data plan; unlocked smartphone works with T-Mobile, Sprint, AT&T, Verizon, and other major carriers[1]\n5G capable [2] smartphone gives you an extra boost of speed so you can download a movie in seconds, [3] enjoy smooth streaming in ultra clear HD, play games at home and on the go, [4] and even share your 5G speed with friends [5]\nCharge your cell phone wirelessly [6] or use it to wirelessly charge other Qi-certified devices [7]\nThe all day battery can last up to 48 hours with Extreme Battery Saver [8]\nYour phone will automatically receive the latest OS and security updates for at least 3 years; [9] the custom-made Titan M chip helps secure the operating system and sensitive data, like passwords\n\n', 'Pixel 5', 700, 'Google Pixel 5 - 5G Android Phone - Water Resistant - Unlocked Smartphone with Night Sight ', 0, 1),
(20, 'Autopilot advanced safety and convenience features are designed to assist you with the most burdensome parts of driving.\nModel S is built with best in class storage, seating for up to five adults and an expansive 17-inch touchscreen. Advanced noise engineering creates sound dynamics comparable to a recording studio, while the standard Glass Roof provides a spacious interior experience for every passenger.\nModel S was designed for speed and endurance—with incredible aerodynamics, ludicrous performance and uncompromised aesthetics. Automatic door handles auto-present upon approach and withdraw when closed.', 'Tesla Model S', 70000, 'Model S sets an industry standard for performance and safety. Tesla’s all-electric powertrain', 1, 1),
(27, 'Model Y provides maximum versatility—able to carry 7 passengers and their cargo. Each second row seat folds flat independently, creating flexible storage for skis, furniture, luggage and more. The liftgate opens to a low trunk floor that makes loading and unloading easy and quick.\nTesla All-Wheel Drive has two ultra-responsive, independent electric motors that digitally control torque to the front and rear wheels—for far better handling, traction and stability control. Model Y is capable in rain, snow, mud and off-road.\nAll new Tesla cars come standard with emergency braking, collision warning, blind-spot monitoring and more. Model Y will have Full Self-Driving capability, enabling automatic driving on city streets and highways pending regulatory approval, as well as the ability to come find you anywhere in a parking lot.', 'Tesla Model Y', 60000, 'Like every Tesla, Model Y is designed to be the safest vehicle in its class. ', 1, 1),
(32, 'Siberian Huskies originated in Northeast Asia where they are bred by the Chukchi people for sled-pulling, guarding, and companionship.[5] It is an active, energetic, resilient breed, whose ancestors lived in the extremely cold and harsh environment of the Siberian Arctic. William Goosak, a Russian fur trader, introduced them to Nome, Alaska during the Nome Gold Rush, initially as sled dogs.[5]', 'Siberian Husky', 300, 'The Siberian Husky The Siberian Husky', 3, 1),
(40, 'It is one of the most ancient cat breeds known. In modern times, it remains the most popular pedigreed breed in its native country, as registered by the UK\'s Governing Council of the Cat Fancy (GCCF). A quarter of all kittens registered with the GCCF each year are British Shorthairs, making the British the most popular pedigree cat in the UK.\nThe breed\'s good-natured appearance and relatively calm temperament make it a frequent media star, notably as the inspiration for John Tenniel\'s famous illustration of the Cheshire Cat from Alice in Wonderland. The Cat Fanciers\' Association profile reads: \"When gracelessness is observed, the British Shorthair is duly embarrassed, quickly recovering with a \'Cheshire cat smile\'', 'British Cat', 150, 'The British Shorthair is the pedigreed version of the traditional British domestic cat,', 3, 1),
(44, 'The Scottish Fold is a breed of domestic cat with a natural dominant-gene mutation that affects cartilage throughout the body, causing the ears to \"fold\", bending forward and down towards the front of the head, which gives the cat what is often described as an \"owl-like\" appearance.[1]\n\nOriginally called lop-eared or lops after the lop-eared rabbit, Scottish Fold became the breed\'s name in 1966.[1] Depending on registries, longhaired Scottish Folds are varyingly known as Highland Fold, Scottish Fold Longhair, Longhair Fold and Coupari.[2]', 'scottish fold', 175, 'The Scottish Fold is a breed of domestic cat with a natural dominant-gene mutation.', 3, 1),
(58, 'About this item\nFully unlocked and compatible with any carrier of choice (e.g. AT&T, T-Mobile, Sprint, Verizon, US-Cellular, Cricket, Metro, etc.).\nThe device does not come with headphones or a SIM card. It does include a charger and charging cable that may be generic, in which case it will be UL or Mfi (Made for iPhone) Certified.\nInspected and guaranteed to have minimal cosmetic damage, which is not noticeable when the device is held at arms length.\nSuccessfully passed a full diagnostic test which ensures like-new functionality and removal of any prior-user personal information.\nTested for battery health and guaranteed to have a minimum battery capacity of 80%.', 'Apple iPhone 11 Pro', 700, 'Apple iPhone 11 Pro, 256GB, Space Gray, Fully Unlocked (Renewed)', 0, 50),
(63, 'OFFER INCLUDES: An Apple iPhone and a wireless plan with unlimited data/talk/text\nWIRELESS PLAN: Unlimited talk, text, and data with mobile hotspot, nationwide coverage, and international reach. No long-term contract required.\nPROGRAM DETAILS: When you add this offer to cart, it will reflect 3 items: the iPhone, SIM kit, and carrier subscription\nCeramic Shield, tougher than any smartphone glass\nA14 Bionic chip, the fastest chip ever in a smartphone\nPro camera system with 12MP Ultra Wide, Wide and Telephoto cameras; 5x optical zoom range; Night mode, Deep Fusion, Smart HDR 3, Apple ProRAW, 4K Dolby Vision HDR recording\nLiDAR Scanner for improved AR experiences, Night mode portraits\n12MP TrueDepth front camera with Night mode, 4K Dolby Vision HDR recording\nIndustry-leading IP68 water resistance\nSupports MagSafe accessories for easy attachment and faster wireless charging', 'Apple iPhone 12 Pro Max', 1200, 'New Apple iPhone 12 Pro Max (128GB, Silver) [Locked] + Carrier Subscription', 0, 50),
(69, 'bout this item\n15.6\" UHD, Anti-Glare Wide View Angle 4K Thin Bezel, Adobe 100%\nIntel Core i7-10875H 2.3 - 5.1GHz | Intel Wi-Fi 6 AX201(2*2 ax)\nNVIDIA GeForce RTX 2070 Super 8G GDDR6 | RTX Studio Drivers\n32GB (16G*2) DDR4 2666MHz, 2 Sockets; Max Memory 64GB | 1TB NVMe SSD\nINTEL/I225-V(SLN9D) | BT 5.1 | USB 3.2 Gen2*1 | Thunderbolt 3*1; USB-C Gen2*1\nWhite backlight keyboard (84 Key) | Silky Glass Multi Touch with Fingerprint reader | IR 720p HD Webcam', 'MSI Creator 15 A10SFS-287', 1569, 'MSI Creator 15 A10SFS-287 15.6\" UHD 4K Ultra Thin Bezel Adobe 100% Thin and Light', 0, 50),
(74, 'out this item\nWelcome to the next generation of gaming performance with the AMD Ryzen 7 4800H mobile processor, 16GB 3200MHz DDR4 memory, and 512GB M.2 NVMe PCIe SSD storage\nEnjoy fast refresh and deep colors with a 144 Hz refresh rate and outstanding clarity on a 15.6\" FHD (1920 x 1080) IPS display\nThe NVIDIA GeForce GTX 1660Ti GPU is a blazing-fast supercharger for your favorite games and the newest titles\nGet maximum performance via Dual Burn Support, which pushes the CPU and GPU together for improved framerates, and Legion Coldfront 2.0 for thermal tuning\nThe Legion TrueStrike keyboard with soft-landing switches delivers hair-trigger inputs', 'Lenovo Legion 5', 958, 'Lenovo Legion 5 Gaming Laptop, 15.6\" FHD (1920x1080) IPS Screen, AMD Ryzen 7 4800H Processor', 0, 50),
(77, 'More power: The 10th Gen Intel Core i7-10750H processor provides the ultimate level of performance with up to 5.0 GHz max turbo and 6 cores.\nRay-tracing: The NVIDIA GeForce RTX 2060 is powered by the NVIDIA Turing GPU architecture and brings cinematic-quality rendering to the most visually intense games.\nMore frames: Incredible performance paired with the fast 144Hz 15. 6\" full HD thin bezel display helps edge out the win.\nThin and compact: The CNC aluminum unibody frame houses incredible performance in the most compact footprint possible, while remaining remarkably durable and just 0.78\" thin.\nReady to connect: Fully loaded with Wi-Fi 6, Gigabit Ethernet, Thunderbolt 3, USB type-A and type-C ports, and HDMI, for a desktop-class experience\nMake it yours: Customize the backlight color of the keyboard with Razer Chroma, and expand the memory and storage, making the Razer Blade 15 uniquely yours.', 'Razer Blade 15', 1250, 'Razer Blade 15 Base Gaming Laptop 2020: Intel Core i7-10750H 6-Core, NVIDIA GeForce RTX 2060', 0, 50);

-- --------------------------------------------------------

--
-- Структура таблицы `product_images`
--

CREATE TABLE `product_images` (
  `id` bigint(20) NOT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `product_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `product_images`
--

INSERT INTO `product_images` (`id`, `image_path`, `product_id`) VALUES
(10, 'products/dtH8WHh4Gw5310bb17ef93560c75332268b834bb342b462a8fcd0837c5bd2507b23f11ac3d.jfif', 9),
(11, 'products/Uzq6ICPZP45310bb17ef93560c75332268b834bb342b462a8fcd0837c5bd2507b23f11ac3d.jpg', 9),
(12, 'products/7vqi3JYfaO5310bb17ef93560c75332268b834bb342b462a8fcd0837c5bd2507b23f11ac3d.jpg', 9),
(13, 'products/C5XCJuNa1r5310bb17ef93560c75332268b834bb342b462a8fcd0837c5bd2507b23f11ac3d.jpg', 9),
(16, 'products/G7zuspBYbf1332addaaee9ed54d697b3f45dc89cb0d4f4b4cbf9546fdcf635c880b841cb71.jpg', 15),
(17, 'products/KBfCMSE6hv1332addaaee9ed54d697b3f45dc89cb0d4f4b4cbf9546fdcf635c880b841cb71.jpg', 15),
(18, 'products/vqRiMBugdb1332addaaee9ed54d697b3f45dc89cb0d4f4b4cbf9546fdcf635c880b841cb71.jfif', 15),
(19, 'products/bbHS9rpht81332addaaee9ed54d697b3f45dc89cb0d4f4b4cbf9546fdcf635c880b841cb71.jpg', 15),
(21, 'products/P3gg0iMvv7c370297bca4f71e501bd3081324d9add53438f4fe26c578f8568537e9154f71c.jpg', 20),
(22, 'products/P60eG4mqLWc370297bca4f71e501bd3081324d9add53438f4fe26c578f8568537e9154f71c.jfif', 20),
(23, 'products/q22nu4jzlOc370297bca4f71e501bd3081324d9add53438f4fe26c578f8568537e9154f71c.jfif', 20),
(24, 'products/dCXwgzNlAHc370297bca4f71e501bd3081324d9add53438f4fe26c578f8568537e9154f71c.jpg', 20),
(25, 'products/QEuflLaPW3c370297bca4f71e501bd3081324d9add53438f4fe26c578f8568537e9154f71c.jpg', 20),
(26, 'products/XtLYJO39Ayc370297bca4f71e501bd3081324d9add53438f4fe26c578f8568537e9154f71c.jpg', 20),
(28, 'products/deyrbliMO5f69bb4296b6fdf2aca5574a99aa9dd7edb61c1b6829cb702a8e2775170deb6d6.jpg', 27),
(29, 'products/bla877wq0Hf69bb4296b6fdf2aca5574a99aa9dd7edb61c1b6829cb702a8e2775170deb6d6.jpg', 27),
(30, 'products/E9tv7MhmH3f69bb4296b6fdf2aca5574a99aa9dd7edb61c1b6829cb702a8e2775170deb6d6.jpg', 27),
(31, 'products/HmS5kFgIOmf69bb4296b6fdf2aca5574a99aa9dd7edb61c1b6829cb702a8e2775170deb6d6.jpg', 27),
(33, 'products/AnNGAGayeld60ab0c8d2b677dcc395c959901ae4727ee1b14c172fce4e53e2e8f41e090e17.jpg', 32),
(34, 'products/Y65KI2o9Uyd60ab0c8d2b677dcc395c959901ae4727ee1b14c172fce4e53e2e8f41e090e17.jpg', 32),
(35, 'products/4HRIFU7R5Yd60ab0c8d2b677dcc395c959901ae4727ee1b14c172fce4e53e2e8f41e090e17.webp', 32),
(41, 'products/DME5A9pIQSd3065bec1927025fa45a838223b6656b333dbc33c6bd7d9094345b3adcd5b357.jpg', 40),
(42, 'products/ddSD8muEuKd3065bec1927025fa45a838223b6656b333dbc33c6bd7d9094345b3adcd5b357.jfif', 40),
(43, 'products/1xYWIQ8Encd3065bec1927025fa45a838223b6656b333dbc33c6bd7d9094345b3adcd5b357.jpg', 40),
(45, 'products/3lzePwAvsI2b42a7b742fc326aa11c5e9dfca2cf0863d5820695100b1656c08def8f53e4d9.jpg', 44),
(46, 'products/7n0fxL6XBU2b42a7b742fc326aa11c5e9dfca2cf0863d5820695100b1656c08def8f53e4d9.jpg', 44),
(47, 'products/IyMl0tlrco2b42a7b742fc326aa11c5e9dfca2cf0863d5820695100b1656c08def8f53e4d9.jpg', 44),
(48, 'products/AbqVvNExoF2b42a7b742fc326aa11c5e9dfca2cf0863d5820695100b1656c08def8f53e4d9.jpg', 44),
(59, 'products/WeN7q5lhFRabc94453035a010589465cca24cf290d46c18db9f3caa44b49b7d1f6af47c306.jfif', 58),
(60, 'products/GYyHarSz1Wabc94453035a010589465cca24cf290d46c18db9f3caa44b49b7d1f6af47c306.jfif', 58),
(61, 'products/YDgynMDxqyabc94453035a010589465cca24cf290d46c18db9f3caa44b49b7d1f6af47c306.png', 58),
(62, 'products/pfG1HgXFDsabc94453035a010589465cca24cf290d46c18db9f3caa44b49b7d1f6af47c306.png', 58),
(64, 'products/kIkZKZVg7dd672d515e40b2dc889643f50f1bccba5863154c30db2eb1628a1ab39891e9cfe.png', 63),
(65, 'products/8V38drITNNd672d515e40b2dc889643f50f1bccba5863154c30db2eb1628a1ab39891e9cfe.png', 63),
(66, 'products/Fy1quVryPVd672d515e40b2dc889643f50f1bccba5863154c30db2eb1628a1ab39891e9cfe.png', 63),
(67, 'products/01wTR42JsOd672d515e40b2dc889643f50f1bccba5863154c30db2eb1628a1ab39891e9cfe.png', 63),
(70, 'products/TcQQgiGRzOeb1dbf925ab4ae9318bc08afe4679076de19f5ffd94515b4cb63acf18ee98eb7.jfif', 69),
(71, 'products/2qzMjeZU8meb1dbf925ab4ae9318bc08afe4679076de19f5ffd94515b4cb63acf18ee98eb7.jpg', 69),
(72, 'products/51SSgVEeUfeb1dbf925ab4ae9318bc08afe4679076de19f5ffd94515b4cb63acf18ee98eb7._AC_SL1443_', 69),
(73, 'products/yWwGiz2KF2eb1dbf925ab4ae9318bc08afe4679076de19f5ffd94515b4cb63acf18ee98eb7._AC_SL1500_', 69),
(75, 'products/azca5YsrSJ77e024344bd814a7362cd8f364562c16778008f1664d90a6090b848cfb8a1b99.0', 74),
(76, 'products/236aNJ1bp177e024344bd814a7362cd8f364562c16778008f1664d90a6090b848cfb8a1b99.jpg', 74),
(78, 'products/nzERVp2E4tc691a1a50f8270656e68fd3bd35570bed26cd7704766c8a36cd1bba40d37427f.jpg', 77),
(79, 'products/RgusakFLh7c691a1a50f8270656e68fd3bd35570bed26cd7704766c8a36cd1bba40d37427f.jpg', 77),
(80, 'products/SESwbNkFdtc691a1a50f8270656e68fd3bd35570bed26cd7704766c8a36cd1bba40d37427f.jpg', 77),
(81, 'products/FqGlEgyQ8Qc691a1a50f8270656e68fd3bd35570bed26cd7704766c8a36cd1bba40d37427f._AC_SL1500_', 77);

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `user_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `email`, `image_path`, `name`, `password`, `phone`, `role`, `user_name`) VALUES
(1, 'a@mail.com', 'products/RafL1ZdMc09745e629280020d7202c993533c22e566726f84bf070f7fd42207b000d70c31f.jpg', 'Tatar Cristi', '$2a$10$riOhkhmqa.bTzVAJhk46l.xOU1PqJ4wuTOkoqgPQTMFeaQn8WsPAe', '748890329', NULL, 'tatarCristi'),
(50, 'test@mail.com', 'products/7wVOzojlDg54c41c2193515d45041e31f4df78c3fe6580e3582041bf165db074692aed8394.jpg', 'Ceban Cristi', '$2a$10$bA5OYhZNndWoNIozjkRdPu8iYSoZCMekJ9LWtHNbB4X8YpmnWaSFq', '748893092', NULL, 'CristiCeban');

-- --------------------------------------------------------

--
-- Структура таблицы `wish_list`
--

CREATE TABLE `wish_list` (
  `id` bigint(20) NOT NULL,
  `product_id` bigint(20) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `wish_list`
--

INSERT INTO `wish_list` (`id`, `product_id`, `user_id`) VALUES
(37, 32, 1),
(38, 27, 1),
(39, 15, 1),
(49, 44, 1),
(51, 44, 50),
(52, 40, 50),
(68, 63, 50),
(82, 77, 50);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKog2rp4qthbtt2lfyhfo32lsw9` (`category_id`),
  ADD KEY `FKdb050tk37qryv15hd932626th` (`user_id`);

--
-- Индексы таблицы `product_images`
--
ALTER TABLE `product_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKqnq71xsohugpqwf3c9gxmsuy` (`product_id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_6dotkott2kjsp8vw4d0m25fb7` (`email`);

--
-- Индексы таблицы `wish_list`
--
ALTER TABLE `wish_list`
  ADD PRIMARY KEY (`id`);

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `FKdb050tk37qryv15hd932626th` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `FKog2rp4qthbtt2lfyhfo32lsw9` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);

--
-- Ограничения внешнего ключа таблицы `product_images`
--
ALTER TABLE `product_images`
  ADD CONSTRAINT `FKqnq71xsohugpqwf3c9gxmsuy` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
