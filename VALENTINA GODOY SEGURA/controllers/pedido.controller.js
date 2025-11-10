import Pedido from "../models/pedido.model.js";
import mongoose from "mongoose";

export const getAllPedidos = async (req, res) => {
    try {
        const pedidos = await Pedido.find({}, { __v: 0 });
        if (pedidos.length === 0) {
            return res.status(404).json({ msg: "No se encontraron pedidos" });
        }
        return res.status(200).json({ pedidos });
    } catch {
        res.status(500).json({ msg: "Error al obtener los pedidos" });
    }
};

export const getPedidoById = async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: "Id no válido" });
    }
    try {
        const pedido = await Pedido.findById(id);
        if (!pedido) return res.status(404).json({ msg: "Pedido no encontrado" });
        res.status(200).json({ pedido });
    } catch {
        res.status(500).json({ msg: "Error al obtener el pedido" });
    }
};

export const postPedido = async (req, res) => {
    const body = req.body;
    const pedido = new Pedido(body);
    try {
        await pedido.save();
        res.status(201).json({ pedido });
    } catch {
        res.status(500).json({ msg: "Error al guardar el pedido" });
    }
};

export const putPedido = async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: "Id no válido" });
    }
    try {
        const pedido = await Pedido.findByIdAndUpdate(id, req.body, { new: true });
        if (!pedido) return res.status(404).json({ msg: "Pedido no encontrado" });
        res.status(200).json({ pedido });
    } catch {
        res.status(500).json({ msg: "Error al actualizar el pedido" });
    }
};

export const deletePedido = async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: "Id no válido" });
    }
    try {
        const pedido = await Pedido.findByIdAndDelete(id);
        if (!pedido) return res.status(404).json({ msg: "Pedido no encontrado" });
        res.status(200).json({ msg: "Pedido eliminado correctamente" });
    } catch {
        res.status(500).json({ msg: "Error al eliminar el pedido" });
    }
};
