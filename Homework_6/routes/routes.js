import express from "express";
import fileService from "../file-service.js";
import { v4 as uuidv4 } from "uuid";

const productRouter = express.Router();

// Middleware
const logEndpoint = (req, res, next) => {
  console.log(
    `Request on the route ${
      req.originalUrl
    } was made at ${new Date().toLocaleString()}.`
  );
  next();
};

// List all products
productRouter.get("/", logEndpoint, async (req, res) => {
  const rawProducts = await fileService.readFile("./products.json");
  const products = JSON.parse(rawProducts);

  res.send(products);
});

// Add product by ID
productRouter.post("/", logEndpoint, async (req, res) => {
  const rawProducts = await fileService.readFile("./products.json");
  const products = JSON.parse(rawProducts);
  const body = req.body;

  const product = {
    id: uuidv4(),
    name: body.name,
    price: body.price,
    rating: body.rating,
    description: body.description,
    category: body.category,
    isInStock: body.isInStock,
  };

  // mi go dodava samo ID-to vo products.json fajlot bez ostanatite params. Rabotam so Postman aplikacijata

  products.push(product);
  await fileService.writeFile(
    "./products.json",
    JSON.stringify(products, null, 2)
  );
  res.status(201).send({ message: "Product was added in the products.json." });
});

// Get product by ID
productRouter.get("/:id", logEndpoint, async (req, res) => {
  const id = req.params.id;
  const rawProducts = await fileService.readFile("./products.json");
  const products = JSON.parse(rawProducts);

  const foundProduct = products.find((product) => product.id === id);
  if (foundProduct === undefined) {
    res.status(404).send({ message: `Product with ID: ${id} was not found` });
  } else {
    res.send(foundProduct);
  }
});

// Remove all products
productRouter.delete("/", logEndpoint, async (req, res) => {
  const rawProducts = await fileService.readFile("./products.json");
  const products = JSON.parse(rawProducts);
  products.length = 0;
  res.sendStatus(204);
});

// Remove product by ID
productRouter.delete("/:id", logEndpoint, async (req, res) => {
  const id = req.params.id;
  const rawProducts = await fileService.readFile("./products.json");
  const products = JSON.parse(rawProducts);

  const filteredProducts = products.filter((product) => product.id !== id);
  if (filteredProducts.length === products.length) {
    res.status(404).send({ message: `Product with ID: ${id} does not exist.` });
    return;
  }

  await fileService.writeFile(
    "./products.json",
    JSON.stringify(filteredProducts, null, 2)
  );
  res.send({ message: "Product was deleted." });
});

// Edit a product by ID
productRouter.put("/:id", logEndpoint, async (req, res) => {
  const id = req.params.id;
  const rawProducts = await fileService.readFile("./products.json");
  const products = JSON.parse(rawProducts);

  const index = products.findIndex((product) => product.id === id);
  if (index === -1) {
    res.status(404).send({ message: "Product not found." });
  } else {
    products[index] = { ...products[index], ...req.body };
    res.send(products[index]);
  }
});

export default productRouter;
