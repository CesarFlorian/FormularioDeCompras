const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Compra = require("../models/Compra");


const isLoggedIn = (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    res.redirect("/login");
  }
};

-

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.send("Usuario no encontrado");

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.send("Contraseña incorrecta");

  req.session.user = user;
  res.redirect("/compras");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.send("Completa todos los campos");

  const existingUser = await User.findOne({ username });
  if (existingUser) return res.send("Usuario ya existe");

  const hashed = await bcrypt.hash(password, 10);
  const newUser = new User({ username, password: hashed });
  await newUser.save();

  res.redirect("/login");
});

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});



router.get("/compras", isLoggedIn, async (req, res) => {
  try {
    const compras = await Compra.find().sort({ fecha: -1 });
    res.render("ListaCompras", { compras });
  } catch {
    res.status(500).send("Error al obtener las compras");
  }
});

router.get("/compras/nueva", isLoggedIn, (req, res) => {
  res.render("AddCompras");
});

router.post("/compras", isLoggedIn, async (req, res) => {
  try {
    const { producto, cantidad, precio } = req.body;
    if (!producto || !cantidad || !precio) {
      return res.status(400).send("Todos los campos son obligatorios.");
    }
    const nuevaCompra = new Compra({ producto, cantidad, precio });
    await nuevaCompra.save();
    res.redirect("/compras");
  } catch {
    res.status(500).send("Error al guardar la compra.");
  }
});

router.get("/compras/editar/:id", isLoggedIn, async (req, res) => {
  try {
    const compra = await Compra.findById(req.params.id);
    if (!compra) return res.status(404).send("Compra no encontrada");
    res.render("EditCompra", { compra });
  } catch {
    res.status(500).send("Error al cargar la compra");
  }
});

router.post("/compras/editar/:id", isLoggedIn, async (req, res) => {
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
  } catch {
    res.status(500).send("Error al actualizar la compra.");
  }
});

router.post("/compras/borrar/:id", isLoggedIn, async (req, res) => {
  try {
    await Compra.findByIdAndDelete(req.params.id);
    res.redirect("/compras");
  } catch {
    res.status(500).send("Error al borrar la compra.");
  }
});

module.exports = router;
