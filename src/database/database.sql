-- Active: 1680567559164@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

DROP TABLE users;

INSERT INTO users 
VALUES
("u001", "arthur@email.com", "tututeste1"),
("u002", "carol@email.com", "carolteste1"),
("u003", "tonzera@email.com", "tomteste1"),
("u004", "kiefer@email.com", "kieferteste1");

CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL
);

DROP TABLE products;

INSERT INTO products 
VALUES
("p001", "Banana", 5.99, "Frutas"),
("p002", "Kiwi", 15.99, "Frutas"),
("p003", "Maçã", 6.99, "Frutas"),
("p004", "Alicate", 49.50, "Ferramentas"),
("p005", "Pneus", 350, "Autos"),
("p006", "Pretinho", 30, "Autos");

-- Retorna todos os usuarios cadastrados
SELECT * FROM users;
SELECT * FROM products;

SELECT * FROM products WHERE name = "Banana";

SELECT * FROM products WHERE id = "p002";

DELETE FROM users WHERE id = "u001";

DELETE FROM products WHERE id = "p001";

UPDATE users SET email="arthur@email.com" WHERE id = "u002";

UPDATE products SET name="Acerola" WHERE id = "p002"; 

SELECT * FROM users ORDER BY email ASC;

SELECT * FROM products ORDER BY price ASC;

SELECT * FROM products WHERE price >= 10 AND price <= 150 ORDER BY price ASC;



-- IMPLEMENTANDO RELAÇÕES
------------------------------------------------------------------------------------------------------------------------------------------------
--IMPRIME A TABELA PURCHASES
SELECT * FROM purchases;
--APAGA A TABELA PURCHASES
DROP TABLE purchases;

--CRIA A TABELA PURCHASES
CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    total_price REAL NOT NULL,
    paid INTEGER NOT NULL,
    delivered_at TEXT,
    buyer_id TEXT NOT NULL,
    FOREIGN KEY (buyer_id) REFERENCES users(id)
);
-- ADICIONA AS COMPRAS NA TABELA PURCHASES
INSERT INTO purchases (id, total_price, delivered_at, paid, buyer_id)
VALUES
("c001",50.00, datetime("now"), 1,"u001"),
("c002",35.00, null, 0,"u001"),
("c003",22.00, datetime("now"), 0,"u002"),
("c004",64.00, null, 1,"u003");

--ATUALIZA A TABELA PURCHASES NO PARAMETRO DELIVERED-AT COM DATE NOW
UPDATE purchases SET delivered_at = datetime("now") WHERE id = "c002";
--ATUALIZA A TABELA PURCHASES NO PARAMETRO DELIVERED-AT COM DATE NOW
UPDATE purchases SET delivered_at = datetime("now") WHERE id = "c004";

--IMPRIME AS COMPRAS BASEADO NO USUARIO
SELECT * FROM purchases 
INNER JOIN users 
ON purchases.buyer_id = users.id WHERE buyer_id = "u001";

CREATE TABLE purchases_products(
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES purchases(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

INSERT INTO purchases_products(purchase_id, product_id, quantity)
VALUES
('c001','p001',5),
('c002','p002',5),
('c002','p003',15),
('c003','p002',5),
('c001','p001',25);

SELECT * FROM purchases_products;

SELECT * FROM purchases
LEFT JOIN purchases_products
ON purchase_id = purchases.id
LEFT JOIN products
ON product_id = products.id;