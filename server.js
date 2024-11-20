import express from "express";

const posts = [
  {
    id: 1,
    nome: "Pedro",
    idade: 18,
    cpf: "231312312-23"
  },
  {
    id: 2,
    nome: "Maria",
    idade: 25,
    cpf: "123456789-01"
  },
  {
    id: 3,
    nome: "João",
    idade: 30,
    cpf: "987654321-02"
  }
]

const app = express();
app.use(express.json());


app.listen(3000, () => {
    console.log("Servidor escutando...");
});

app.get("/posts", (req, res) => {
    res.status(200).json(posts);
});

function pegarPostPorId(id){
  return posts.findIndex((post) => {
    return post.id === Number(id);
  });
};

app.get("/posts/:id", (req, res) => {
  const index = pegarPostPorId(req.params.id)
  res.status(200).json(posts[index]);
});

