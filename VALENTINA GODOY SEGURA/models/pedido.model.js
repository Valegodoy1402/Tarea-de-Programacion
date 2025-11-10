import mongoose from "mongoose";

const pedidoSchema = new mongoose.Schema({
    producto: {
        type: String,
        required: true
    },
    cantidad: {
        type: Number,
        required: true
    },
    fechaEntrega: {
        type: Date,
        required: true
    },
    proveedor: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        enum: ["Pendiente", "En camino", "Entregado"],
        default: "Pendiente"
    }
});

const Pedido = mongoose.model("Pedido", pedidoSchema);

export default Pedido;
