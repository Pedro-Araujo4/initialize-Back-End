import 'dotenv/config';
// Importa a função para conectar ao banco de dados
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

// Conecta ao banco de dados usando a string de conexão do ambiente
const conexaodb = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para obter todos os posts
export async function getAllPosts() {
  // Seleciona o banco de dados 'imersao-backend'
  const db = conexaodb.db("imersao-backend");

  // Seleciona a coleção 'posts'
  const collection = db.collection("posts");

  // Busca todos os documentos da coleção e retorna como um array
  return collection.find().toArray();
}

// Função assíncrona para criar um novo post
export async function criarPost(novoPost) {
  // Seleciona o banco de dados 'imersao-backend'
  const db = conexaodb.db("imersao-backend");

  // Seleciona a coleção 'posts'
  const collection = db.collection("posts");

  // Insere o novo post na coleção e retorna o resultado da operação
  return collection.insertOne(novoPost);
}

export async function atualizarPost(id, novoPost) {
  const db = conexaodb.db("imersao-backend");
  const collection = db.collection("posts");
  const objId = ObjectId.createFromHexString(id)
  return collection.updateOne({_id: new ObjectId(objId)}, {$set:novoPost});
}