import conectarAoBanco from "../config/dbConfig.js"
const conexaodb = await conectarAoBanco(process.env.STRING_CONEXAO)

export async function getAllPosts() {
    const db = conexaodb.db("imersao-backend")
    const collection = db.collection("posts")
    return collection.find().toArray()
    }

