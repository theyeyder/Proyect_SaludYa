require("dotenv").config();
const app = require("../app");
const connectDB = require("./database");

const PORT = process.env.PORT || 4000;
connectDB();

app.listen(PORT, () => {
  console.log(`Servidor SaludYa corriendo en puerto ${PORT}`);
});
