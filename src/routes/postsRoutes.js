import express from "express";
import multer from "multer";
import cors from "cors";
import { listPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controller/postsController.js";

const corsOptions = {
 origin: "http://localhost:8000",
 optionsSuccessStatus: 200,
}
// Configura o armazenamento em disco usando o Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define o diretório de destino para os arquivos enviados
    cb(null, 'uploads/');  // Altere este caminho se necessário
  },
  filename: function (req, file, cb) {
    // Usa o nome original do arquivo com a extensão
    cb(null, file.originalname);
  }
});

// Cria uma instância do Multer com a configuração de armazenamento
const upload = multer({dest: "./uploads" });  // Utiliza o mecanismo de armazenamento definido

// Alternativa para sistemas Linux/macOS (mais simples para um único diretório)
// const upload = multer({ dest: "./uploads" }); // Comentado

// Define as rotas do aplicativo Express
export default function routes(app) {
  // Analisa dados JSON em requisições
  app.use(express.json());
  app.use(cors(corsOptions))

  // Rota para obter todos os posts
  app.get("/posts", listPosts);

  // Rota para criar um novo post
  app.post("/posts", postarNovoPost);

  // Rota para enviar uma imagem com o middleware Multer
  app.post("/upload", upload.single("imagem"), uploadImagem); // Manipula usando o campo "imagem" na requisição

  app.put("/upload/:id", atualizarNovoPost)
}