-- DROP DATABASE
DROP DATABASE IF EXISTS ecommerce_db;

-- CREATE DATABASE
CREATE DATABASE ecommerce_db;

CREATE TABLE Category (
    id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (id),
    category_name VARCHAR(30) NOT NULL,
)

CREATE TABLE Product (
    id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (id),
    product_name VARCHAR(30) NOT NULL,
    price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    stock INT NOT NULL DEFAULT 10 CHECK (stock >= 0),
    category_id INT NOT NULL REFERENCES categories(id),
)

CREATE TABLE Tag (
    id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (id),
    tag_name VARCHAR(30),
)

CREATE TABLE ProductTag (
    id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (id),
    product_id INT REFERENCES product(id),
    tag_id INT REFERENCES tag(id),
)