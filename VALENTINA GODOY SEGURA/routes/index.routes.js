import { Router } from "express";
import pedido from "./pedido.routes.js";

const indexRoutes = Router();
indexRoutes.use("/pedidos", pedido);

export default indexRoutes;
