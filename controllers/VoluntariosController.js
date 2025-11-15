import express from "express";
// Importando os Models
import Voluntario from "../models/Voluntario.js";
const router = express.Router();

import Auth from "../middleware/Auth.js";

// ROTA VOLUNTARIOS
router.get("/voluntarios", Auth, function (req, res) {
  Voluntario.findAll()
    .then((voluntarios) => {
      res.render("voluntarios", {
        voluntarios: voluntarios,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

//ROTA DE CADASTRO DE VOLUNTARIOS
router.post("/voluntarios/new", Auth, (req, res) => {
  //Recebendo dados do formulário
  const nome = req.body.nome;
  const cpf = req.body.cpf;
  const endereco = req.body.endereco;
  Voluntario.create({
    nome: nome,
    cpf: cpf,
    endereco: endereco,
  })
    .then(() => {
      res.redirect("/voluntarios");
    })
    .catch((error) => {
      console.log(error);
    });
});

// ROTA DE DELETAR VOLUNTARIOS
router.post("/voluntarios/delete/:id", Auth, (req, res) => {
  const id = req.params.id;
  Voluntario.destroy({
    where: {
      id: id,
    },
  })
    .then(() => {
      res.redirect("/voluntarios");
    })
    .catch((error) => {
      console.log(error);
    });
});

// ROTA DE EDITAR VOLUNTARIOS
router.get("/voluntarios/edit/:id", Auth, (req, res) => {
  const id = req.params.id;
  Voluntario.findByPk(id)
    .then(voluntario => {
      res.render("voluntariosEdit", {
        voluntario: voluntario
      });
    })
});

//ROTA DE ATUALIZAR VOLUNTARIOS
router.post("/voluntarios/update/:id", Auth, (req, res) => {
  const id = req.params.id;
  const nome = req.body.nome;
  const cpf = req.body.cpf;
  const endereco = req.body.endereco;

  Voluntario.update({
      nome: nome,
      cpf: cpf,
      endereco: endereco,
    },
    {where: {id: id}}
  ).then(() => {
      res.redirect("/voluntarios");
    }).catch(error => {
      console.log(error);
    });
}); 

export default router;
