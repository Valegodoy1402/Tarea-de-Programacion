document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formPedidos");
  const tabla = document.querySelector("#tablaPedidos tbody");
  let pedidos = [];
  let modoEditar = false;
  let idEditar = null;

  async function cargarPedidos() {
    const res = await fetch("/electrodomestico/pedidos");
    const data = await res.json();
    pedidos = data.pedidos || [];

    tabla.innerHTML = "";
    pedidos.forEach(p => {
      const fechaFormateada = new Date(p.fechaEntrega).toLocaleDateString();

      let badgeColor = "secondary";
      if (p.estado === "Pendiente") badgeColor = "warning";
      if (p.estado === "En camino") badgeColor = "primary";
      if (p.estado === "Entregado") badgeColor = "success";

      tabla.insertAdjacentHTML("beforeend", `
        <tr>
          <td>${p.producto}</td>
          <td>${p.cantidad}</td>
          <td>${p.proveedor}</td>
          <td>${fechaFormateada}</td>
          <td><span class="badge bg-${badgeColor}">${p.estado}</span></td>
          <td>
            <button class="btn btn-sm btn-outline-primary me-1 editar" data-id="${p._id}">Editar</button>
            <button class="btn btn-sm btn-outline-danger eliminar" data-id="${p._id}">Eliminar</button>
          </td>
        </tr>
      `);
    });

    document.querySelectorAll(".editar").forEach(b => b.addEventListener("click", editarPedido));
    document.querySelectorAll(".eliminar").forEach(b => b.addEventListener("click", eliminarPedido));
  }

  form.addEventListener("submit", async e => {
    e.preventDefault();

    const nuevoPedido = {
      producto: document.getElementById("producto").value,
      cantidad: document.getElementById("cantidad").value,
      proveedor: document.getElementById("proveedor").value,
      fechaEntrega: document.getElementById("fechaEntrega").value,
      estado: "Pendiente"
    };

    if (modoEditar) {
      await fetch(`/electrodomestico/pedidos/${idEditar}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoPedido)
      });
      modoEditar = false;
      idEditar = null;
    } else {
      await fetch("/electrodomestico/pedidos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoPedido)
      });
    }

    form.reset();
    cargarPedidos();
  });

  function editarPedido(e) {
    const id = e.target.dataset.id;
    const pedido = pedidos.find(p => p._id === id);
    if (!pedido) return;

    document.getElementById("producto").value = pedido.producto;
    document.getElementById("cantidad").value = pedido.cantidad;
    document.getElementById("proveedor").value = pedido.proveedor;
    document.getElementById("fechaEntrega").value = pedido.fechaEntrega.split("T")[0];

    modoEditar = true;
    idEditar = id;
  }

  async function eliminarPedido(e) {
    const id = e.target.dataset.id;
    const confirmar = confirm("¿Deseas eliminar este pedido?");
    if (!confirmar) return;

    await fetch(`/electrodomestico/pedidos/${id}`, { method: "DELETE" });
    cargarPedidos();
  }

  cargarPedidos();
});

document.getElementById("formPedidos").addEventListener("submit", e => {
  e.preventDefault();
});
