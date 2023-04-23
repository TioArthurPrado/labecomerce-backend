import express, { Request, Response } from "express";
import cors from "cors";
import { db } from "./database/knex";
import { verify } from "crypto";

const errorMessage = "Erro Inesperado";
const app = express();
app.use(express.json());
app.use(cors());
app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

// PEGA TODAS AS PURCHASES
app.get("/purchases", async (req: Request, res: Response) => {
  try {
    const result = await db.raw(`
    SELECT * FROM purchases
  `);
    res.status(200).send(result);
  } catch (error: any) {
    console.log(error);
    if (error.statuCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

//---------------------------------------------------------------------------------------------

// PROJETO
// 1- END POINT QUE PEGA TODOS OS USUARIOS
app.get("/users", async (req: Request, res: Response) => {
  /**
   * @name {Get All Users}
   * @path {"/users"}
   * @response {status 200, mensagem de sucesso}
   */
  try {
    const result = await db("users");
    if (result.length < 1) {
      res.status(404);
      throw new Error("Não existem usuarios criados");
    }
    res.status(200).send(result);
  } catch (error: any) {
    console.log(error);
    if (error.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

// 2- END POINT QUE CRIA O USUARIO
app.post("/users", async (req: Request, res: Response) => {
  /**
   * @name {Create User}
   * @path {"/users"}
   * @response {status 200, mensagem de sucesso}
   */
  try {
    const { id, name, email, password } = req.body;
    const verify = await db("users").where({ id });

    if (verify.length > 0) {
      res.status(404);
      throw new Error("Id do usuário já está em uso");
    }
    const result = await db("users").insert({
      id,
      name: name,
      email: email,
      password: password,
    });
    
    res.status(200).send(`Usuario cadastrado com sucesso`);
  } catch (error: any) {
    console.log(error);
    if (error.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

// 3- END POINT QUE CRIA PRODUTO NOVO
app.post("/products", async (req: Request, res: Response) => {
  /**
   * @name {Create Product}
   * @path {"/products"}
   * @response {status 200, mensagem de sucesso}
   */

  try {
    const { id, name, price, description, image_url } = req.body;
    const verify = await db("products").where({ id });

    if (verify.length > 0) {
      res.status(404);
      throw new Error("Id do produto já está em uso");
    } else {
      await db("products").insert({
        id,
        name: name,
        price: price,
        description: description,
        image_url: image_url,
      });
    }
    res.status(200).send("Produto cadastrado com sucesso");
  } catch (error: any) {
    console.log(error);
    if (error.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

// 4- END POINT QUE PEGA TODOS OS PRODUTOS
app.get("/products", async (req: Request, res: Response) => {
  /**
   * @name {Get all Products}
   * @path {"/products"}
   * @response {status 200, mensagem de sucesso}
   */
  try {
    const result = await db("products");
    if (result.length < 1) {
      res.status(404);
      throw new Error("Não existem produtos criados.");
    }
    res.status(200).send(result);
  } catch (error: any) {
    console.log(error);
    if (error.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

// 5- END POINT QUE PEGA O PRODUTO PELO NOME
app.get("/products/search", async (req: Request, res: Response) => {
  /**
   * @name {Search products by name}
   * @path {"/products/search"}
   * @response {status 200, mensagem de sucesso}
   */

  try {
    const name = req.query.name as string;
    const result = await db
      .select("*")
      .from("products")
      .whereRaw("LOWER(name) like ?", [`%${name.toLowerCase()}%`]);
    if (result.length === 0) {
      res.status(404);
      throw new Error("Produto não encontrado");
    }
    res.status(200).send(result);
  } catch (error: any) {
    console.log(error);
    if (error.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro Inesperado");
    }
  }
});

// 6- END POINT QUE EDITA O PRODUTO PELO ID **********
app.put("/products/:id", async (req: Request, res: Response) => {
  /**
   * @name {Edit product by id}
   * @path {"/product/:id"}
   * @params {id}
   * @response {status 200, mensagem de sucesso}
   */

  try {
    const { id, name, price, description, image_url } = req.body;

    const [verify] = await db.select("*").from("products").where({ id });
    if (verify) {
      await db("products")
        .where({ id })
        .update({
          id: id || verify.id,
          name: name || verify.name,
          price: price || verify.price,
          description: description || verify.description,
          image_url: image_url || verify.image_url,
        });
    }

    res.status(200).send("Produto editado com sucesso!");
  } catch (error: any) {
    console.log(error);
    if (error.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

// 7- END POINT QUE CRIA NOVA COMPRA
app.post("/purchases", async (req: Request, res: Response) => {
  try {
    const { id, totalPrice, buyerId } = req.body;
    const verify = await db("purchases").where({ id });

    if (verify.length > 0) {
      res.status(404);
      throw new Error("Id da compra já está em uso");
    } else {
      await db("purchases").insert({
        id,
        total_price: totalPrice,
        buyer_id: buyerId,
      });
    }
    res.status(200).send("Purchase cadastrada com sucesso");
  } catch (error: any) {
    console.log(error);
    if (error.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

// 8- END POINT QUE DELETA A COMPRA PELO ID
app.delete("/purchases/:id", async (req: Request, res: Response) => {
  /**
   * @name {Delete purchase by id}
   * @path {"/product/:id"}
   * @params {id}
   * @response {status 200, mensagem de sucesso}
   */
  try {
    const id = req.params.id;
    const verify = await db("purchases").where({
      id: id,
    });
    if (verify.length < 0) {
      res.status(404);
      throw new Error("Compra não cadastrada");
    }

    await db("purchases").del().where({
      id: id,
    });
    res.status(200).send("Compra deletada com sucesso.");
  } catch (error: any) {
    console.log(error);
    if (error.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

// 9- END POINT QUE PEGA AS COMPRAS PELO ID
app.get("/purchases/:id", async (req: Request, res: Response) => {
  try {
    /**
     * @name {Get Purchases by id}
     * @path {"/purchases/:id"}
     * @response {status 200, mensagem de sucesso}
     */
    const { id } = req.params; //Utilizado para descobrir o usuario que está comprando
    const verify = await db("purchases").where({
      id: id,
    });
    if (verify.length < 1) {
      res.status(400);
      throw new Error("Compra inexistente!");
    }
    const result = await db("purchases")
      .select()
      .where({
        "purchases.id": id,
      })
      .innerJoin("users", "purchases.buyer_id", "=", "users.id");

    //O código acima seleciona todos os produtos que fazem parte de uma compra específica,
    //usando o ID da compra como filtro, e retorna informações tanto da tabela
    //"purchases_products" quanto da tabela "products".
    const produtos = await db("purchases_products")
      .select()
      .where({
        purchase_id: id,
      })
      .innerJoin(
        "products",
        "purchases_products.product_id",
        "=",
        "products.id"
      );

    const compra = {
      ...result,
      produtos: produtos, // Spread operator que junta as variaveis que guardam cada busca feita
    };
    res.status(200).send(compra);
  } catch (error: any) {
    console.log(error);
    if (error.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});
