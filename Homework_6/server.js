import express from "express";
import productRouter from "./routes/routes.js";

const server = express();

const port = 3000;
const host = "localhost";

server.use(express.json());

server.get("/", (req, res) => {
  res.send("Default route");
});

server.use("/products", productRouter);

server.get("*", (req, res) => {
  res.status(404).send("Route does not exists");
});

server.post("*", (req, res) => {
  res.status(404).send("Route does not exists");
});

server.listen(port, host, () => {
  console.log(`Server is up and running on PORT: ${port}, on HOST: ${host}.`);
});
