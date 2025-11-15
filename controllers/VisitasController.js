import express from "express";
// Importando os Models
import Visita from "../models/Visita.js";
const router = express.Router();

import Auth from "../middleware/Auth.js";

// ROTA VISITAS
router.get("/visitas", Auth, function (req, res) {
  Visita.findAll()
    .then((visitas) => {
      res.render("visitas", {
        visitas: visitas,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

//ROTA DE CADASTRO DE VISITAS
router.post("/visitas/new", Auth, (req, res) => {
  //Recebendo dados do formulário
  const nome = req.body.nome;
  const cpf = req.body.cpf;
  const endereco = req.body.endereco;
  Visita.create({
    nome: nome,
    cpf: cpf,
    endereco: endereco,
  })
    .then(() => {
      res.redirect("/visitas");
    })
    .catch((error) => {
      console.log(error);
    });
});

// ROTA DE DELETAR VISITAS
router.post("/visitas/delete/:id", Auth, (req, res) => {
  const id = req.params.id;
  Visita.destroy({
    where: {
      id: id,
    },
  })
    .then(() => {
      res.redirect("/visitas");
    })
    .catch((error) => {
      console.log(error);
    });
});

// ROTA DE EDITAR VISITAS
router.get("/visitas/edit/:id", Auth, (req, res) => {
  const id = req.params.id;
  Visita.findByPk(id)
    .then(visita => {
      res.render("visitasEdit", {
        visita: visita
      });
    })
});

//ROTA DE ATUALIZAR VISITAS
router.post("/visitas/update/:id", Auth, (req, res) => {
  const id = req.params.id;
  const nome = req.body.nome;
  const cpf = req.body.cpf;
  const endereco = req.body.endereco;
  Visita.update({
      nome: nome,
      cpf: cpf,
      endereco: endereco,
    },
    {where: {id: id}}
  ).then(() => {
      res.redirect("/visitas");
    }).catch(error => {
      console.log(error);
    });
}); 

export default router;
