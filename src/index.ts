import { users, products, purchase } from "./database";
import { Product, Purchase, User } from "./types";
import express, { Request, Response } from "express";
import cors from "cors";

// console.log(users);
// console.log(products);
// console.log(purchase);

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3002, () => {
  console.log("Servidor rodando na porta 3002");
});

app.get("/ping", (req: Request, res: Response) => {
  res.send("pong");
});

app.get("/users", (req: Request, res: Response) => {
  res.status(200).send(users);
});

app.get("/products", (req: Request, res: Response) => {
  res.status(200).send(products);
});

app.get("/product/search", (req: Request, res: Response) => {
  const q = req.query.q as string;
  const resultado = products.filter((produto) =>
    produto.name.toLowerCase().includes(q.toLowerCase())
  );

  res.status(200).send(resultado);
});

app.post("/users", (req: Request, res: Response) => {
  const { id, email, password } = req.body;
  const newUser: User = {
    id,
    email,
    password,
  };

  users.push(newUser);

  res.status(201).send("Cadastro realizado com sucesso");
});

app.post("/product", (req: Request, res: Response) => {
  const { id, name, price, category } = req.body;
  const newProduct: Product = {
    id,
    name,
    price,
    category,
  };

  products.push(newProduct);
  res.status(201).send("Produto cadastrado com sucesso");
});

app.post("/purchase", (req: Request, res: Response) => {
  const { userId, productId, quantity, totalPrice } = req.body;
  const newPurchase : Purchase = {
    userId,
    productId,
    quantity,
    totalPrice
  }

  purchase.push(newPurchase)
  res.status(201).send("Compra realizada com sucesso")
});
