import express from "express";
// Importando os Models
import Estoque from "../models/Estoque.js";
const router = express.Router();

import Auth from "../middleware/Auth.js";

// ROTA ESTOQUES
router.get("/estoques", Auth, function (req, res) {
  Estoque.findAll()
    .then((estoques) => {
      res.render("estoques", {
        estoques: estoques,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

//ROTA DE CADASTRO DE ESTOQUES
router.post("/estoques/new", Auth, (req, res) => {
  //Recebendo dados do formulário
  const produto = req.body.produto;
  const categoria = req.body.categoria;
  const quantidade = req.body.quantidade;
  const preco = req.body.preco;
  Estoque.create({
    produto: produto,
    categoria: categoria,
    quantidade: quantidade,
    preco: preco,
  })
    .then(() => {
      res.redirect("/estoques");
    })
    .catch((error) => {
      console.log(error);
    });
});

// ROTA DE DELETAR ESTOQUES
router.post("/estoques/delete/:id", Auth, (req, res) => {
  const id = req.params.id;
  Estoque.destroy({
    where: {
      id: id,
    },
  })
    .then(() => {
      res.redirect("/estoques");
    })
    .catch((error) => {
      console.log(error);
    });
});

// ROTA DE EDITAR DO ESTOQUE
router.get("/estoques/edit/:id", Auth, (req, res) => {
  const id = req.params.id;
  Estoque.findByPk(id).then((estoque) => {
    res.render("estoquesEdit", {
      estoque: estoque,
    });
  });
});

//ROTA DE ATUALIZAR DO ESTOQUE
router.post("/estoques/update/:id", Auth, (req, res) => {
  const id = req.params.id;
  const produto = req.body.produto;
  const categoria = req.body.categoria;
  const quantidade = req.body.quantidade;
  const preco = req.body.preco;
  
  Estoque.update(
    {
      produto: produto,
      categoria: categoria,
      quantidade: quantidade,
      preco: preco,
    },
    { where: { id: id } }
  )
    .then(() => {
      res.redirect("/estoques");
    })
    .catch((error) => {
      console.log(error);
    });
});

export default router;
