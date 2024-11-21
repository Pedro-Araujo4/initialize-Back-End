import conectarAoBanco from "../config/dbConfig.js"


const conexao = await conectarAoBanco(process.env.STRING_CONEXAO)

export default async function getAllPosts() {
    const db = conexao.db("imersao-backend")
    const colletion = db.collection("posts")
    return colletion.find().toArray()
  }