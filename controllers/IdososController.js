import express from "express";
import Idoso from "../models/Idoso.js";

const router = express.Router();

import Auth from "../middleware/Auth.js";

// ROTA IDOSOS
router.get("/idosos", Auth, function (req, res) {
  Idoso.findAll()
    .then((idosos) => {
      res.render("idosos", {
        idosos: idosos,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

//ROTA DE CADASTRO DE IDOSOS
router.post("/idosos/new", Auth, (req, res) => {
  //Recebendo dados do formulário
  const nome = req.body.nome;
  const cpf = req.body.cpf;
  const endereco = req.body.endereco;
  Idoso.create({
    nome: nome,
    cpf: cpf,
    endereco: endereco,
  })
    .then(() => {
      res.redirect("/idosos");
    })
    .catch((error) => {
      console.log(error);
    });
});

// ROTA DE DELETAR IDOSO
router.post("/idosos/delete/:id", Auth, (req, res) => {
  const id = req.params.id;
  Idoso.destroy({
    where: {
      id: id,
    },
  })
    .then(() => {
      res.redirect("/idosos");
    })
    .catch((error) => {
      console.log(error);
    });
});

// ROTA DE EDITAR IDOSO
router.get("/idosos/edit/:id", Auth, (req, res) => {
  const id = req.params.id;
  Idoso.findByPk(id)
    .then(idoso => {
      res.render("idososEdit", {
        idoso: idoso
      });
    })
});

//ROTA DE ATUALIZAR IDOSO
router.post("/idosos/update/:id", Auth, (req, res) => {
  const id = req.params.id;
  const nome = req.body.nome;
  const cpf = req.body.cpf;
  const endereco = req.body.endereco;

  Idoso.update({
      nome: nome,
      cpf: cpf,
      endereco: endereco,
    },
    {where: {id: id}}
  ).then(() => {
      res.redirect("/idosos");
    }).catch(error => {
      console.log(error);
    });
}); 

export default router;
