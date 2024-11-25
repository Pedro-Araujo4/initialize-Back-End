// Importa o módulo 'fs' para operações de sistema de arquivos
import fs from "fs";
import gerarDescricaoComGemini from "../services/serviceGemini.js";
// Importa as funções para obter todos os posts e criar um novo post
import { getAllPosts, criarPost, atualizarPost} from "../models/postsModel.js";

// Função assíncrona para listar todos os posts
export async function listPosts(req, res) {
  // Obtém todos os posts do modelo
  const posts = await getAllPosts();

  // Envia uma resposta HTTP com status 200 e os posts como JSON
  res.status(200).json(posts);
}

// Função assíncrona para criar um novo post
export async function postarNovoPost(req, res) {
  // Obtém o novo post do corpo da requisição
  const novoPost = req.body;

  // Tenta criar o novo post
  try {
    const postCriado = await criarPost(novoPost);
    res.status(200).json(postCriado);
  } catch (erro) {
    // Em caso de erro, loga a mensagem de erro no console
    console.error(erro.message);
    // Envia uma resposta HTTP com status 500 e uma mensagem de erro
    res.status(500).send({ "Erro": "Falha na requisição!" });
  }
}

// Função assíncrona para fazer upload de uma imagem
export async function uploadImagem(req, res) {
  // Cria um novo objeto de post com a descrição, URL da imagem e alt text
  const novoPost = {
    descricao: "",
    imgUrl: req.file.originalname,
    alt: ""
  };

  // Tenta criar o novo post e renomear a imagem
  try {
    const postCriado = await criarPost(novoPost);
    const imgAtualizada = `uploads/${postCriado.insertedId}.png`;
    fs.renameSync(req.file.path, imgAtualizada);
    res.status(200).json(postCriado);
  } catch (erro) {
    // Em caso de erro, loga a mensagem de erro no console
    console.error(erro.message);
    // Envia uma resposta HTTP com status 500 e uma mensagem de erro
    res.status(500).json({ "Erro": "Falha na requisição!" });
  }
}

export async function atualizarNovoPost(req, res) {
  const id = req.params.id;
  const urlImg = `http://localhost:3000/${id}.png`;
  try {
    const imgBuffer = fs.readFileSync(`/Programaçao/Aula01BackEnd/uploads/${id}.png`);
    const descricao = await gerarDescricaoComGemini(imgBuffer);

    const post = {
      imgUrl: urlImg,
      descricao: descricao,
      alt: req.body.alt
    }

    const Atualizarpost = await atualizarPost(id, post);
    res.status(200).json(Atualizarpost);
  } catch (erro) {
    console.error(erro.message);
    res.status(500).send({ "Erro": "Falha na requisição!" });
  }
}