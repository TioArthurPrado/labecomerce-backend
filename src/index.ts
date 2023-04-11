import { users, products, purchase } from "./database";
import { Product, Purchase, User } from "./types";
import express, { Request, Response } from "express";
import cors from "cors";
import { db } from "./database/knex";

// console.log(users);
// console.log(products);
// console.log(purchase);
const errorMessage = "Erro Inesperado";
const app = express();

app.use(express.json());
app.use(cors());

app.listen(3002, () => {
  console.log("Servidor rodando na porta 3002");
});

app.get("/ping", (req: Request, res: Response) => {
  res.send("pong");
});

app.get("/users", async (req: Request, res: Response) => {
  try {
    const result = await db.raw(`
      SELECT * FROM users;
    `);
    if (result.length < 1) {
      res.status(400);
      throw new Error("Não existem usuarios cadastrados");
    }
    res.status(200).send(users);
  } catch (error: any) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
  }
});

app.get("/products", async (req: Request, res: Response) => {
  try {
    const result = await db.raw(`
      SELECT * FROM products;
    `);
    if (result.length < 1) {
      res.status(400);
      throw new Error("Não existem produtos cadastrados");
    }
    res.status(200).send(products);
  } catch (error: any) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
  }
});
// ATENÇÃO PARA CORREÇÃO
app.get("/product/search", async (req: Request, res: Response) => {
  try {
    const q = req.query.q as string;
    const result = await db.raw(`
      SELECT * FROM products WHERE name = "${q}"
    `);
    if (result.length === 0) {
      res.status(400).send("A Query params deve conter pelo menos 1 caractere");
    }
    res.status(400).send(result);
  } catch (error: any) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
  }
});

app.post("/users", async (req: Request, res: Response) => {
  try {
    const { id, email, password } = req.body;

    if (
      typeof id !== "string" &&
      typeof email !== "string" &&
      typeof password !== "string"
    ) {
      res
        .status(400)
        .send("O Id, Email e Password devem ter o formato de string.");
    }
    const verificaId = users.find((user) => user.id === id);
    if (verificaId) {
      res.status(400).send("O id enviado já está em uso por outro usuário.");
    }
    const verificaEmail = users.find((user) => user.email === email);
    if (verificaEmail) {
      res.status(400).send("O email enviado já está em uso por outro usuário.");
    }
    if(verificaEmail || verificaId){
      const newUser = await db.raw(`
      INSERT INTO users ("${id}","${email}","${password}")
      `)
    }
    res.status(201).send("Cadastro realizado com sucesso");
  } catch (error: any) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
  }
});

app.post("/product", (req: Request, res: Response) => {
  try {
    const { id, name, price, category } = req.body;
    if (
      typeof id !== "string" &&
      typeof name !== "string" &&
      typeof price !== "number" &&
      typeof category !== "string"
    ) {
      res
        .status(400)
        .send(
          "O id, name e category devem receber uma string. Já o price deve receber um number"
        );
    }
    const verificaId = products.find((user) => user.id === id);
    if (verificaId) {
      res.status(400).send("O id informado está em uso por outro produto");
    }
    if (!verificaId) {
      const newProduct: Product = {
        id,
        name,
        price,
        category,
      };

      products.push(newProduct);
      res.status(201).send("Produto cadastrado com sucesso");
    }
  } catch (error: any) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
  }
});

//CODIGO COM ERRO, CORRIGIR DEPOIS
app.post("/purchase", (req: Request, res: Response) => {
  try {
    const { userId, productId, quantity, totalPrice } = req.body;
    if (
      typeof userId !== "string" &&
      typeof productId !== "string" &&
      typeof quantity !== "number" &&
      typeof totalPrice !== "number"
    ) {
      res.status(400);
      throw new Error(
        "O userId e productId devem receber valores do tipo string. Já as propriedades quantity e totalPrice devem receber o valor do tipo Number"
      );
    }
    const verificaUseId = users.find((user) => user.id === userId);
    if (verificaUseId) {
      res.status(400);
      throw new Error("O userId enviado não existe no array de usuarios");
    }
    const verificaProduto = products.find((user) => user.id === productId);
    if (verificaProduto) {
      res.status(400);
      throw new Error("O productId enviado não existe no array de produtos");
    }
    // FAZER CALCULO DE PREÇO TOTAL

    if (!verificaUseId && !verificaProduto) {
      const newPurchase: Purchase = {
        userId,
        productId,
        quantity,
        totalPrice,
      };

      purchase.push(newPurchase);
      res.status(201).send("Compra realizada com sucesso");
    }
  } catch (error: any) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});

app.get("/products/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = products.find((product) => product.id === id);
    if (!result) {
      res.status(404);
      throw new Error("O produto buscado não existe");
    }
    res.status(200).send(result);
  } catch (error: any) {
    console.log(error);
    if (error.statusCode === 200) {
      res.status(500).send(errorMessage);
    }
    res.send(error.message);
  }
});

app.get("/users/:id/purchases", (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = purchase.find((user) => user.userId === id);
    if (result) {
      res.status(200).send(result);
    }
    res.status(404);
    throw new Error("Usuario da compra não encontrado");
  } catch (error: any) {
    console.log(error);
    if (error.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});

app.delete("/users/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const find = users.findIndex((user) => user.id === id);
    console.log(find);
    if (find >= 0) {
      users.splice(find, 1), res.status(200).send("User apagado com sucesso");
    }
    res.status(404);
    throw new Error("Usuario não encontrado");
  } catch (error: any) {
    console.log(error);
    if (error.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});

app.delete("/product/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const find = products.findIndex((product) => product.id === id);
    if (find >= 0) {
      products.splice(find, 1),
        res.status(200).send("Produto apagado com sucesso");
    }
    res.status(404);
    throw new Error("Produto não encontrado");
  } catch (error: any) {
    console.log(error);
    if (error.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});

app.put("/users/:id", (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const { id, email, password } = req.body;
    const find = users.find((user) => user.id === userId);
    if (find) {
      (find.id = id),
        (find.email = email),
        (find.password = password),
        res.status(200).send("Cadastro atualizado com sucesso");
    }
    res.status(404);
    throw new Error("Usuario não encontrado");
  } catch (error: any) {
    console.log(error);
    if (error.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});

app.put("/products/:id", (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const { name, price, category } = req.body;
    const find = products.find((product) => product.id === productId);

    if (find) {
      (find.name = name),
        (find.price = price),
        (find.category = category),
        res.status(200).send("Produto atualizado com sucesso");
    }
    res.status(404);
    throw new Error("Produto não encontrado");
  } catch (error: any) {
    console.log(error);
    if (error.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});
