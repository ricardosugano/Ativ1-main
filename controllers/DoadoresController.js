import express from "express";
// Importando os Models
import Doador from "../models/Doador.js";
const router = express.Router();

import Auth from "../middleware/Auth.js";

// ROTA ESTOQUES
router.get("/doadores", Auth, function (req, res) {
  Doador.findAll().then((doadores) => {
      res.render("doadores", {
        doadores: doadores,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

//ROTA DE CADASTRO DE ESTOQUES
router.post("/doadores/new", Auth, (req, res) => {
  //Recebendo dados do formulário
  const nomeD = req.body.nomeD;
  const cpfD = req.body.cpfD;
  const enderecoD = req.body.enderecoD;
  Doador.create({
    nomeD: nomeD,
    cpfD: cpfD,
    enderecoD: enderecoD,
  })
    .then(() => {
      res.redirect("/doadores");
    })
    .catch((error) => {
      console.log(error);
    });
});

// ROTA DE DELETAR ESTOQUES
router.post("/doadores/delete/:id", Auth, (req, res) => {
  const id = req.params.id;
  Doador.destroy({
    where: {
      id: id,
    },
  })
    .then(() => {
      res.redirect("/doadores");
    })
    .catch((error) => {
      console.log(error);
    });
});

// ROTA DE EDITAR DO ESTOQUE
router.get("/doadores/edit/:id", Auth, (req, res) => {
  const id = req.params.id;
  Doador.findByPk(id).then((doador) => {
    res.render("doadoresEdit", {
      doador: doador,
    });
  });
});

//ROTA DE ATUALIZAR DO ESTOQUE
router.post("/doadores/update/:id", Auth, (req, res) => {
  const id = req.params.id;
  const nomeD = req.body.nomeD;
  const cpfD = req.body.cpfD;
  const enderecoD = req.body.enderecoD;
  
  Doador.update(
    {
      nomeD: nomeD,
      cpfD: cpfD,
      enderecoD: enderecoD,
    },
    { where: { id: id } }
  )
    .then(() => {
      res.redirect("/doadores");
    })
    .catch((error) => {
      console.log(error);
    });
});

export default router;
