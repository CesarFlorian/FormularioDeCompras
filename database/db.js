const mongoose = require("mongoose"); 

mongoose
  .connect("mongodb://127.0.0.1:27017/Formularios", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✔️ Conectado a MongoDB local"))
  .catch((err) => console.error("❌ Error al conectar a MongoDB:", err));

const db = mongoose.connection;

db.on("error", (error) => console.error("❌ Error en la conexión:", error));
db.once("open", () => console.log("🚀 ¡Conexión a MongoDB abierta y lista!"));

module.exports = mongoose;
