-- Create database if not exists
CREATE DATABASE IF NOT EXISTS ecocrush;
USE ecocrush;

-- Users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'manager') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    status ENUM('active', 'inactive') DEFAULT 'active',
    INDEX idx_email (email),
    INDEX idx_role (role),
    INDEX idx_status (status)
);

-- Function halls table
CREATE TABLE function_halls (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    hall_name VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(50) NOT NULL,
    postal_code VARCHAR(10) NOT NULL,
    contact_person VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    capacity INT NOT NULL,
    status ENUM('active', 'inactive') DEFAULT 'active',
    FOREIGN KEY (user_id) REFERENCES users(id),
    INDEX idx_city (city),
    INDEX idx_status (status)
);

-- Event notifications table
CREATE TABLE event_notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hall_id INT NOT NULL,
    event_date DATE NOT NULL,
    event_time TIME NOT NULL,
    event_type VARCHAR(50) NOT NULL,
    expected_waste_kg DECIMAL(10,2) NOT NULL,
    notes TEXT,
    status ENUM('pending', 'scheduled', 'completed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    collection_date DATE,
    permit_file_path VARCHAR(255),
    FOREIGN KEY (hall_id) REFERENCES function_halls(id),
    INDEX idx_event_date (event_date),
    INDEX idx_status (status),
    INDEX idx_collection_date (collection_date)
);

-- Composters and recyclers table
CREATE TABLE composters_recyclers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    contact_person VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL,
    waste_types_accepted TEXT NOT NULL,
    service_area TEXT NOT NULL,
    status ENUM('active', 'inactive') DEFAULT 'active',
    INDEX idx_status (status),
    INDEX idx_email (email)
);

-- Products table
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type ENUM('compost', 'bioenzyme') NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT NOT NULL,
    image_path VARCHAR(255),
    status ENUM('available', 'out_of_stock') DEFAULT 'available',
    INDEX idx_type (type),
    INDEX idx_status (status)
);

-- Orders table
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(10,2) NOT NULL,
    status ENUM('pending', 'processing', 'delivered') DEFAULT 'pending',
    delivery_address TEXT NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    payment_status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
    FOREIGN KEY (user_id) REFERENCES users(id),
    INDEX idx_user_id (user_id),
    INDEX idx_order_date (order_date),
    INDEX idx_status (status)
);

-- Order items table
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id),
    INDEX idx_order_id (order_id),
    INDEX idx_product_id (product_id)
);

-- Waste collections table
CREATE TABLE waste_collections (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_id INT NOT NULL,
    collector_id INT NOT NULL,
    collection_date DATE NOT NULL,
    actual_waste_kg DECIMAL(10,2) NOT NULL,
    notes TEXT,
    status ENUM('pending', 'in_progress', 'completed', 'cancelled') DEFAULT 'pending',
    FOREIGN KEY (event_id) REFERENCES event_notifications(id),
    FOREIGN KEY (collector_id) REFERENCES composters_recyclers(id),
    INDEX idx_collection_date (collection_date),
    INDEX idx_status (status)
);

-- Insert sample data

-- Sample users
INSERT INTO users (name, email, password, role) VALUES
('Admin User', 'admin@ecocrush.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj2NXFbs3vXm', 'admin'),
('Manager User', 'manager@ecocrush.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj2NXFbs3vXm', 'manager');

-- Sample function halls
INSERT INTO function_halls (user_id, hall_name, address, city, postal_code, contact_person, phone, capacity) VALUES
(2, 'Grand Ballroom', '123 Main St', 'Mumbai', '400001', 'John Doe', '+91-9876543210', 500),
(2, 'Royal Convention', '456 Park Ave', 'Delhi', '110001', 'Jane Smith', '+91-9876543211', 800);

-- Sample composters/recyclers
INSERT INTO composters_recyclers (name, address, contact_person, phone, email, waste_types_accepted, service_area) VALUES
('Green Waste Solutions', '789 Eco Street', 'Mike Johnson', '+91-9876543212', 'contact@greenwaste.com', 'Food waste, Organic waste', 'Mumbai Region'),
('Bio Recyclers', '321 Earth Road', 'Sarah Williams', '+91-9876543213', 'info@biorecyclers.com', 'All organic waste', 'Delhi NCR');

-- Sample products
INSERT INTO products (name, type, description, price, stock_quantity, status) VALUES
('Premium Compost', 'compost', 'High-quality organic compost', 299.99, 100, 'available'),
('Bio Enzyme Cleaner', 'bioenzyme', 'Natural cleaning solution', 199.99, 50, 'available');

-- Sample event notifications
INSERT INTO event_notifications (hall_id, event_date, event_time, event_type, expected_waste_kg, status) VALUES
(1, DATE_ADD(CURRENT_DATE, INTERVAL 7 DAY), '14:00:00', 'Wedding', 100.00, 'pending'),
(2, DATE_ADD(CURRENT_DATE, INTERVAL 14 DAY), '18:00:00', 'Corporate Event', 150.00, 'scheduled');