import express from "express";
import conectarAoBanco from "./src/config/dbConfig.js";
await conectarAoBanco(process.env.STRING_CONEXAO)


const app = express();
app.use(express.json());

app.listen(3000, () => {
    console.log("Servidor escutando...");
});








