-- Active: 1680567559164@@127.0.0.1@3306

--------------------------------------Comandos que criam as tabelas--

--1 Cria a tabela Users
CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TEXT DEFAULT(DATETIME('now', 'localtime'))
    );

--2 Cria a tabela Purchases
CREATE TABLE
    purchases (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        buyer_id TEXT NOT NULL,
        total_price REAL NOT NULL,
        created_at TEXT DEFAULT(DATETIME('now', 'localtime')),
        paid INTEGER DEFAULT(0),
        FOREIGN KEY (buyer_id) REFERENCES users(id)
    );

--3 Cria a tabela Products
CREATE TABLE
    products (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        description TEXT NOT NULL,
        image_url TEXT NOT NULL
    );

--4 Cria a tabela purchase_products
CREATE TABLE
    purchases_products(
        purchase_id TEXT NOT NULL,
        product_id TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        FOREIGN KEY (purchase_id) REFERENCES purchases(id),
        FOREIGN KEY (product_id) REFERENCES products(id)
    );

--------------------------------------Comandos que excluem as tabelas--

-- Deleta a tabela Users
DROP TABLE users;

-- Deleta a tabela Purchases
DROP TABLE purchases;

-- Deleta a tabela Products
DROP TABLE products;

-- Deleta a tabela Purchase_Product
Drop TABLE purchases_products;

--------------------------------------Comandos que inserem informações nas tabelas--

-- Insere informações na tabela Users
INSERT INTO users (id,name,email,password)
VALUES  ("u001","Arthur","arthur@email.com","tututeste1"),
        ("u002","Maria","Maria@email.com","carolteste1"),
        ("u003","Everton","tonzera@email.com","tomteste1"),
        ("u004","Kieffer","kiefer@email.com","kieferteste1");

-- Insere informações na tabela Purchases
INSERT INTO purchases (id,total_price,created_at,paid,buyer_id)
    VALUES  ("c001",15.00,datetime("now"),1,"u001"),
            ("c002",22.00,datetime("now"),0,"u002"),
            ("c003", 35.00, null, 0, "u001"),
            ("c004", 64.00, null, 1, "u003");

-- Insere informações na tabela purchases_products
INSERT INTO
    purchases_products
VALUES ('c001', 'p001', 5),
       ('c002', 'p002', 5),
       ('c002', 'p003', 15),
       ('c003', 'p002', 5),
       ('c001', 'p001', 25);

-- Insere informações na tabela Products
INSERT INTO products
VALUES  ("p001","Banana",5.99,"Frutas","https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcTYSv-kmEqeAj6NRr09yPqvo3HGVdDsuw9ZGKRfpl9EtI6zttIJyRv7WSCMK_4eAsrm"),
        ("p002", "Kiwi", 15.99, "Frutas","data:image/jpeg;base64,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"),
        ("p003", "Maçã", 6.99, "Frutas","https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/280px-Red_Apple.jpg"),
        ("p004","Alicate",49.50,"Ferramentas","https://static3.tcdn.com.br/img/img_prod/602916/alicate_universal_8_polegadas_8vl_eda_23152873_1_72593290320ba21c978d6b1347814237.jpeg"),
        ("p005", "Pneus", 350, "Autos","https://cdn.autopapo.com.br/box/uploads/2022/10/11140845/prateleira-mercado-pneus-portal-732x488.jpg"),
        ("p006", "Pretinho", 30, "Autos","https://unitintas.vteximg.com.br/arquivos/ids/156539-1000-1000/Liquido-Pneus-Pretinho-500ml-Vonixx.jpg?v=637633680794430000");


--------------------------------------Comando que retorna as tabelas preenchidas--

-- Retorna a tabela Users

SELECT * FROM users;

-- Retorna a tabela Products

SELECT * FROM products;

-- Retorna a tabela Purchases

SELECT * FROM purchases;

SELECT * FROM purchases_products;

SELECT *
FROM purchases
    INNER JOIN users ON purchases.buyer_id = users.id
WHERE buyer_id = "u001";

SELECT *
FROM purchases
    LEFT JOIN purchases_products ON purchase_id = purchases.id
    LEFT JOIN products ON product_id = products.id;