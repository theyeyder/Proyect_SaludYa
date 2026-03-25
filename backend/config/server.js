
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/saludya")
.then(()=>console.log("MongoDB conectado"))
.catch(err=>console.log(err));

app.get("/", (req,res)=>{
  res.json({message:"API SaludYa funcionando"});
});

app.listen(4000, ()=>{
  console.log("Servidor en http://localhost:4000");
});
