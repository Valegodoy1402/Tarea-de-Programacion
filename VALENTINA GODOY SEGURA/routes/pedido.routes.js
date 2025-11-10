import { Router } from "express";
import {
    getAllPedidos,
    getPedidoById,
    postPedido,
    putPedido,
    deletePedido
} from "../controllers/pedido.controller.js";

const pedido = Router();

pedido.get("/", getAllPedidos);
pedido.get("/:id", getPedidoById);
pedido.post("/", postPedido);
pedido.put("/:id", putPedido);
pedido.delete("/:id", deletePedido);

export default pedido;
