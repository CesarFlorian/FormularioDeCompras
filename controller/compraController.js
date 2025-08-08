const Compra = require("../models/Compra");


const showCompras = async (req, res) => {
  try {
    const compras = await Compra.find().sort({ fecha: -1 });
    res.render("ListaCompras", { compras });
  } catch (error) {
    console.error("Error al obtener las compras:", error);
    res.status(500).send("Error al obtener las compras");
  }
};


const showAddCompra = (req, res) => {
  res.render("AddCompras");
};


const addCompra = async (req, res) => {
  try {
    const { producto, cantidad, precio } = req.body;
    if (!producto || !cantidad || !precio) {
      return res.status(400).send("Todos los campos son obligatorios.");
    }
    const nuevaCompra = new Compra({ producto, cantidad, precio });
    await nuevaCompra.save();
    res.redirect("/compras");
  } catch (error) {
    console.error("Error al guardar la compra:", error);
    res.status(500).send("Error al guardar la compra.");
  }
};

const showEditCompra = async (req, res) => {
  try {
    const compra = await Compra.findById(req.params.id);
    if (!compra) return res.status(404).send("Compra no encontrada");
    res.render("EditCompra", { compra });
  } catch (error) {
    console.error("Error al cargar la compra:", error);
    res.status(500).send("Error al cargar la compra");
  }
};

const updateCompra = async (req, res) => {
  try {
    const { producto, cantidad, precio } = req.body;
    if (!producto || !cantidad || !precio) {
      return res.status(400).send("Todos los campos son obligatorios.");
    }
    await Compra.findByIdAndUpdate(req.params.id, {
      producto,
      cantidad,
      precio,
    });
    res.redirect("/compras");
  } catch (error) {
    console.error("Error al actualizar la compra:", error);
    res.status(500).send("Error al actualizar la compra");
  }
};

const deleteCompra = async (req, res) => {
  try {
    await Compra.findByIdAndDelete(req.params.id);
    res.redirect("/compras");
  } catch (error) {
    console.error("Error al borrar la compra:", error);
    res.status(500).send("Error al borrar la compra");
  }
};

module.exports = {
  showCompras,
  showAddCompra,
  addCompra,
  showEditCompra,
  updateCompra,
  deleteCompra,
};
