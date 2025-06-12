-- =====================================================
-- Moroccan Artisanal Market - Sample Data SQL Script
-- =====================================================
-- This script creates realistic sample data for an e-commerce platform
-- featuring Moroccan artisanal products and crafts

-- Clear existing data (use with caution in production)
-- TRUNCATE TABLE "Review" CASCADE;
-- TRUNCATE TABLE "OrderItem" CASCADE;
-- TRUNCATE TABLE "Order" CASCADE;
-- TRUNCATE TABLE "Product" CASCADE;
-- TRUNCATE TABLE "Category" CASCADE;
-- TRUNCATE TABLE "Artisan" CASCADE;
-- TRUNCATE TABLE "Customer" CASCADE;

-- =====================================================
-- CATEGORIES DATA
-- =====================================================
INSERT INTO "Category" (category_id, name, image_url) VALUES
(1, 'Pottery & Ceramics', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500'),
(2, 'Textiles & Rugs', 'https://images.unsplash.com/photo-1555085878-0f9dc8d58b29?w=500'),
(3, 'Leather Goods', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500'),
(4, 'Jewelry & Accessories', 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=500'),
(5, 'Metalwork & Lamps', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500'),
(6, 'Woodwork & Furniture', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500'),
(7, 'Home Decor', 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500'),
(8, 'Traditional Clothing', 'https://images.unsplash.com/photo-1534126416832-7c20d90d96a2?w=500');

-- =====================================================
-- ARTISANS DATA
-- =====================================================
INSERT INTO "Artisan" (artisan_id, name, email, password_hash, bio, image_url, location) VALUES
(1, 'Hassan Benali', 'hassan.benali@artisans.ma', '$2b$10$hash1', 'Master potter from Fez with 25 years of experience in traditional Moroccan ceramics. Specializes in hand-painted tagines and decorative tiles.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300', 'Fez, Morocco'),
(2, 'Fatima El Mansouri', 'fatima.mansouri@artisans.ma', '$2b$10$hash2', 'Third-generation weaver from the Atlas Mountains. Expert in traditional Berber rugs and kilims using ancient techniques passed down through generations.', 'https://images.unsplash.com/photo-1494790108755-2616b612b1c2?w=300', 'Atlas Mountains, Morocco'),
(3, 'Omar Tazi', 'omar.tazi@artisans.ma', '$2b$10$hash3', 'Skilled leather craftsman from Marrakech. Creates beautiful handbags, shoes, and traditional babouches using the finest Moroccan leather.', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300', 'Marrakech, Morocco'),
(4, 'Aicha Berrada', 'aicha.berrada@artisans.ma', '$2b$10$hash4', 'Jewelry designer inspired by Amazigh heritage. Creates stunning silver pieces incorporating traditional symbols and precious stones.', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300', 'Tiznit, Morocco'),
(5, 'Youssef Chami', 'youssef.chami@artisans.ma', '$2b$10$hash5', 'Metalwork artisan specializing in traditional Moroccan lanterns and brass decorative items. Based in the historic medina of Fez.', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300', 'Fez, Morocco'),
(6, 'Khadija Amrani', 'khadija.amrani@artisans.ma', '$2b$10$hash6', 'Woodworking expert known for intricate mashrabiya screens and traditional furniture. Combines modern design with ancient techniques.', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300', 'Tetouan, Morocco'),
(7, 'Mohammed Benkirane', 'mohammed.benkirane@artisans.ma', '$2b$10$hash7', 'Home decor specialist creating beautiful mirror frames, decorative boxes, and traditional Moroccan home accessories.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300', 'Casablanca, Morocco'),
(8, 'Lalla Zineb', 'lalla.zineb@artisans.ma', '$2b$10$hash8', 'Traditional clothing designer specializing in caftans, djellabas, and authentic Moroccan wedding attire with hand-embroidered details.', 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=300', 'Rabat, Morocco');

-- =====================================================
-- CUSTOMERS DATA
-- =====================================================
INSERT INTO "Customer" (customer_id, email, password_hash, name) VALUES
(1, 'sarah.johnson@email.com', '$2b$10$customerhash1', 'Sarah Johnson'),
(2, 'mohamed.alami@email.com', '$2b$10$customerhash2', 'Mohamed Alami'),
(3, 'emma.wilson@email.com', '$2b$10$customerhash3', 'Emma Wilson'),
(4, 'ahmed.benjelloun@email.com', '$2b$10$customerhash4', 'Ahmed Benjelloun'),
(5, 'lisa.martinez@email.com', '$2b$10$customerhash5', 'Lisa Martinez'),
(6, 'youssef.idrissi@email.com', '$2b$10$customerhash6', 'Youssef Idrissi'),
(7, 'anna.petrov@email.com', '$2b$10$customerhash7', 'Anna Petrov'),
(8, 'omar.benali@email.com', '$2b$10$customerhash8', 'Omar Benali'),
(9, 'marie.dubois@email.com', '$2b$10$customerhash9', 'Marie Dubois'),
(10, 'david.smith@email.com', '$2b$10$customerhash10', 'David Smith');

-- =====================================================
-- PRODUCTS DATA
-- =====================================================
INSERT INTO "Product" (product_id, name, description, price, is_featured, image_url, rating, category_id, artisan_id) VALUES
-- Pottery & Ceramics (Category 1)
(1, 'Hand-Painted Tagine Pot', 'Authentic Moroccan tagine with traditional blue and white geometric patterns. Perfect for slow cooking and serving traditional dishes. Handcrafted in Fez using traditional techniques.', 89.99, true, 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500', 4.8, 1, 1),
(2, 'Decorative Ceramic Plates Set', 'Set of 6 beautifully decorated ceramic plates featuring traditional Moroccan motifs. Each plate is hand-painted and unique. Perfect for special occasions or display.', 129.99, false, 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500', 4.6, 1, 1),
(3, 'Moroccan Tea Glasses Set', 'Set of 12 traditional Moroccan tea glasses with golden rim. Essential for authentic Moroccan tea ceremony. Dishwasher safe and beautifully crafted.', 45.99, false, 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500', 4.7, 1, 1),

-- Textiles & Rugs (Category 2)
(4, 'Berber Wool Rug - Large', 'Authentic handwoven Berber rug from the Atlas Mountains. Made with natural wool and traditional geometric patterns. Each rug tells a unique story through its symbols.', 299.99, true, 'https://images.unsplash.com/photo-1555085878-0f9dc8d58b29?w=500', 4.9, 2, 2),
(5, 'Kilim Runner Rug', 'Beautiful flat-weave kilim runner perfect for hallways and entryways. Features vibrant colors and traditional Berber patterns. Hand-loomed using ancient techniques.', 149.99, false, 'https://images.unsplash.com/photo-1555085878-0f9dc8d58b29?w=500', 4.5, 2, 2),
(6, 'Moroccan Throw Pillows Set', 'Set of 4 decorative throw pillows with traditional Moroccan embroidery. Made with high-quality cotton and featuring intricate geometric designs.', 79.99, false, 'https://images.unsplash.com/photo-1555085878-0f9dc8d58b29?w=500', 4.4, 2, 2),

-- Leather Goods (Category 3)
(7, 'Handcrafted Leather Handbag', 'Elegant leather handbag made from premium Moroccan leather. Features traditional tooling and brass hardware. Perfect for daily use or special occasions.', 189.99, true, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500', 4.7, 3, 3),
(8, 'Traditional Babouche Slippers', 'Authentic Moroccan babouche slippers in soft leather. Available in multiple colors. Comfortable and perfect for indoor wear or casual outings.', 49.99, false, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500', 4.3, 3, 3),
(9, 'Leather Passport Holder', 'Compact leather passport holder with traditional Moroccan embossing. Perfect for travelers. Made from genuine leather with multiple card slots.', 29.99, false, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500', 4.6, 3, 3),

-- Jewelry & Accessories (Category 4)
(10, 'Berber Silver Necklace', 'Stunning silver necklace featuring traditional Amazigh symbols. Handcrafted by skilled artisans in Tiznit. Each piece is unique and carries cultural significance.', 159.99, true, 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=500', 4.8, 4, 4),
(11, 'Traditional Silver Bracelet', 'Elegant silver bracelet with intricate engraving and semi-precious stones. Adjustable size and comes with authenticity certificate.', 89.99, false, 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=500', 4.5, 4, 4),
(12, 'Moroccan Amber Earrings', 'Beautiful earrings featuring genuine Moroccan amber set in silver. Lightweight and comfortable for daily wear. Each amber piece has unique inclusions.', 69.99, false, 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=500', 4.7, 4, 4),

-- Metalwork & Lamps (Category 5)
(13, 'Moroccan Brass Lantern', 'Ornate brass lantern with intricate geometric cutouts. Creates beautiful light patterns when lit. Perfect for indoor or outdoor use. Includes LED candle.', 119.99, true, 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500', 4.6, 5, 5),
(14, 'Decorative Brass Tray', 'Large decorative brass tray with traditional engravings. Perfect for serving tea or as a centerpiece. Hand-hammered finish gives each piece unique character.', 79.99, false, 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500', 4.4, 5, 5),
(15, 'Moroccan Tea Set - Brass', 'Complete brass tea set including teapot, sugar container, and tray. Perfect for traditional Moroccan tea ceremony. Beautifully engraved with floral motifs.', 199.99, false, 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500', 4.8, 5, 5),

-- Woodwork & Furniture (Category 6)
(16, 'Carved Wooden Mirror Frame', 'Intricately carved wooden mirror frame featuring traditional Moroccan patterns. Made from sustainable cedar wood. Perfect statement piece for any room.', 149.99, false, 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500', 4.5, 6, 6),
(17, 'Moroccan Jewelry Box', 'Beautiful handcrafted jewelry box with multiple compartments. Features traditional inlay work and soft velvet lining. Perfect for organizing jewelry.', 89.99, false, 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500', 4.6, 6, 6),
(18, 'Wooden Chess Set', 'Handcrafted wooden chess set with pieces inspired by Moroccan architecture. Includes wooden board with storage compartments. Perfect for chess enthusiasts.', 129.99, true, 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500', 4.7, 6, 6),

-- Home Decor (Category 7)
(19, 'Mosaic Decorative Bowl', 'Large decorative bowl featuring colorful mosaic tiles in traditional patterns. Perfect as a centerpiece or for storing fruits. Food-safe finish.', 69.99, false, 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500', 4.3, 7, 7),
(20, 'Moroccan Wall Art Set', 'Set of 3 framed Moroccan-inspired wall art pieces. Features traditional geometric patterns in warm earth tones. Ready to hang hardware included.', 99.99, false, 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500', 4.5, 7, 7),
(21, 'Decorative Candle Holders', 'Set of 5 brass candle holders in varying heights. Creates ambient lighting and adds Moroccan flair to any space. Includes white pillar candles.', 59.99, false, 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500', 4.4, 7, 7),

-- Traditional Clothing (Category 8)
(22, 'Embroidered Caftan', 'Elegant traditional caftan with hand-embroidered details. Made from high-quality cotton with intricate beadwork. Available in multiple sizes and colors.', 249.99, true, 'https://images.unsplash.com/photo-1534126416832-7c20d90d96a2?w=500', 4.9, 8, 8),
(23, 'Traditional Djellaba', 'Comfortable traditional djellaba perfect for casual wear or special occasions. Features hood and front pockets. Made from soft wool blend.', 179.99, false, 'https://images.unsplash.com/photo-1534126416832-7c20d90d96a2?w=500', 4.6, 8, 8),
(24, 'Moroccan Silk Scarf', 'Luxurious silk scarf with traditional Moroccan patterns. Hand-finished edges and vibrant colors. Perfect accessory for any outfit.', 49.99, false, 'https://images.unsplash.com/photo-1534126416832-7c20d90d96a2?w=500', 4.7, 8, 8);

-- =====================================================
-- ORDERS DATA
-- =====================================================
INSERT INTO "Order" (order_id, status, total, customer_id) VALUES
(1, 'completed', 219.98, 1),
(2, 'shipped', 299.99, 2),
(3, 'completed', 159.99, 3),
(4, 'pending', 89.99, 4),
(5, 'completed', 349.98, 5),
(6, 'shipped', 189.99, 6),
(7, 'completed', 129.99, 7),
(8, 'pending', 79.99, 8),
(9, 'completed', 199.99, 9),
(10, 'shipped', 149.99, 10);

-- =====================================================
-- ORDER ITEMS DATA
-- =====================================================
INSERT INTO "OrderItem" (order_item_id, quantity, order_id, product_id) VALUES
(1, 1, 1, 1),  -- Tagine Pot
(2, 1, 1, 2),  -- Ceramic Plates Set
(3, 1, 2, 4),  -- Berber Rug
(4, 1, 3, 10), -- Silver Necklace
(5, 1, 4, 1),  -- Tagine Pot
(6, 1, 5, 4),  -- Berber Rug
(7, 1, 5, 3),  -- Tea Glasses
(8, 1, 6, 7),  -- Leather Handbag
(9, 1, 7, 2),  -- Ceramic Plates Set
(10, 1, 8, 5), -- Kilim Runner
(11, 1, 9, 15), -- Brass Tea Set
(12, 1, 10, 5); -- Kilim Runner

-- =====================================================
-- REVIEWS DATA
-- =====================================================
INSERT INTO "Review" (review_id, rating, comment, product_id, customer_id) VALUES
(1, 5, 'Absolutely beautiful tagine! The craftsmanship is exceptional and it works perfectly for cooking. The blue patterns are stunning.', 1, 1),
(2, 4, 'Great quality ceramic plates. Each one is unique and the hand-painting is gorgeous. Perfect for entertaining guests.', 2, 2),
(3, 5, 'This rug is even more beautiful in person. The quality is outstanding and it really ties my living room together.', 4, 3),
(4, 5, 'The silver necklace is absolutely stunning. You can tell it''s made by skilled hands. I get compliments every time I wear it.', 10, 3),
(5, 4, 'Beautiful leather handbag with great attention to detail. The leather is soft and the craftsmanship is evident.', 7, 4),
(6, 5, 'Perfect tea glasses for our Moroccan tea ceremony. The quality is excellent and they''re the perfect size.', 3, 5),
(7, 4, 'Love this kilim runner! The colors are vibrant and it''s well-made. Adds a nice touch to our hallway.', 5, 6),
(8, 5, 'The brass lantern creates the most beautiful lighting. Perfect for our patio dinners. Very well made.', 13, 7),
(9, 4, 'Great quality caftan with beautiful embroidery. Comfortable to wear and looks elegant.', 22, 8),
(10, 5, 'This decorative bowl is perfect as a centerpiece. The mosaic work is intricate and colorful.', 19, 9),
(11, 3, 'Nice babouche slippers but they run a bit small. The leather is good quality though.', 8, 10),
(12, 5, 'The brass tea set is absolutely gorgeous. Perfect for special occasions and the engraving is beautiful.', 15, 1),
(13, 4, 'Beautiful wooden chess set. The pieces are well-crafted and the board is solid. Great for chess lovers.', 18, 2),
(14, 5, 'Love this traditional djellaba. Very comfortable and well-made. Perfect for casual wear.', 23, 4),
(15, 4, 'The silk scarf is luxurious and the patterns are beautiful. Perfect accessory for any outfit.', 24, 6);

-- =====================================================
-- UPDATE SEQUENCES (PostgreSQL)
-- =====================================================
-- Reset auto-increment sequences to continue from the highest inserted ID
SELECT setval('"Category_category_id_seq"', (SELECT MAX(category_id) FROM "Category"));
SELECT setval('"Artisan_artisan_id_seq"', (SELECT MAX(artisan_id) FROM "Artisan"));
SELECT setval('"Customer_customer_id_seq"', (SELECT MAX(customer_id) FROM "Customer"));
SELECT setval('"Product_product_id_seq"', (SELECT MAX(product_id) FROM "Product"));
SELECT setval('"Order_order_id_seq"', (SELECT MAX(order_id) FROM "Order"));
SELECT setval('"OrderItem_order_item_id_seq"', (SELECT MAX(order_item_id) FROM "OrderItem"));
SELECT setval('"Review_review_id_seq"', (SELECT MAX(review_id) FROM "Review"));

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================
-- Run these queries to verify the data was inserted correctly:

-- SELECT COUNT(*) as total_categories FROM "Category";
-- SELECT COUNT(*) as total_artisans FROM "Artisan";
-- SELECT COUNT(*) as total_customers FROM "Customer";
-- SELECT COUNT(*) as total_products FROM "Product";
-- SELECT COUNT(*) as total_orders FROM "Order";
-- SELECT COUNT(*) as total_order_items FROM "OrderItem";
-- SELECT COUNT(*) as total_reviews FROM "Review";

-- =====================================================
-- SUMMARY
-- =====================================================
-- Data inserted:
-- - 8 Categories (Pottery, Textiles, Leather, Jewelry, Metalwork, Woodwork, Home Decor, Clothing)
-- - 8 Artisans (Master craftspeople from different Moroccan cities)
-- - 10 Customers (Mix of Moroccan and international customers)
-- - 24 Products (3 products per category with detailed descriptions)
-- - 10 Orders (Various statuses: completed, shipped, pending)
-- - 12 Order Items (Products purchased in each order)
-- - 15 Reviews (Customer feedback with ratings and comments)
--
-- This data provides a realistic foundation for testing and demonstrating
-- the Moroccan artisanal marketplace e-commerce platform.
-- =====================================================
