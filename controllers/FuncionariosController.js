import express from "express";
// Importando os Models
import Funcionario from "../models/Funcionario.js";
const router = express.Router();

import Auth from "../middleware/Auth.js";

// ROTA funcionarioes
router.get("/funcionarios", Auth, function (req, res) {
  Funcionario.findAll()
    .then((funcionarios) => {
      res.render("funcionarios", {
        funcionarios: funcionarios,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

//ROTA DE CADASTRO DOS FUNCIONARIOS
router.post("/funcionarios/new", Auth, (req, res) => {
  //Recebendo dados do formulário
  const nome = req.body.nome;
  const cpf = req.body.cpf;
  const endereco = req.body.endereco;
  Funcionario.create({
    nome: nome,
    cpf: cpf,
    endereco: endereco,
  })
    .then(() => {
      res.redirect("/funcionarios");
    })
    .catch((error) => {
      console.log(error);
    });
});

// ROTA DE DELETAR UM FUNCIONARIO
router.post("/funcionarios/delete/:id", Auth, (req, res) => {
  const id = req.params.id;
  Funcionario.destroy({
    where: {
      id: id,
    },
  })
    .then(() => {
      res.redirect("/funcionarios");
    })
    .catch((error) => {
      console.log(error);
    });
});

// ROTA DE EDITAR FUNCIONARIOS
router.get("/funcionarios/edit/:id", Auth, (req, res) => {
  const id = req.params.id;
  Funcionario.findByPk(id).then((funcionario) => {
    res.render("funcionariosEdit", {
      funcionario: funcionario,
    });
  });
});

//ROTA DE ATUALIZAR FUNCIONARIOS
router.post("/funcionarios/update/:id", Auth, (req, res) => {
  const id = req.params.id;
  const nome = req.body.nome;
  const cpf = req.body.cpf;
  const endereco = req.body.endereco;

  Funcionario.update(
    {
      nome: nome,
      cpf: cpf,
      endereco: endereco,
    },
    { where: { id: id } }
  )
    .then(() => {
      res.redirect("/funcionarios");
    })
    .catch((error) => {
      console.log(error);
    });
});

export default router;
