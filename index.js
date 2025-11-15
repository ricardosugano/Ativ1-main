// Importando o Express
import express from "express";
// Iniciando o Express
const app = express();

//Importanto o Middleware de Autenticação
import Auth from "./middleware/Auth.js"

//importando o express -session (gerador de sessoes)
import session from "express-session";

// Importando o Sequelize
import connection from "./config/sequelize-config.js";

// Importando os Controllers
import DoadoresController from './controllers/DoadoresController.js'
import IdososController from './controllers/IdososController.js'
import VoluntariosController from './controllers/VoluntariosController.js'
import VisitasController from './controllers/VisitasController.js'
import FuncionariosController from './controllers/FuncionariosController.js'  
import EstoquesController from './controllers/EstoquesController.js'

//Importando Controller de usuário
import UsersController from "./controllers/UsersController.js";


// Importando os Models
import Doador from './models/Doador.js';
import Idoso from './models/Idoso.js';
import Voluntario from './models/Voluntario.js';
import Visita from './models/Visita.js';
import Funcionario from './models/Funcionario.js';
import Estoque from './models/Estoque.js';

// Configurando a sessão
app.use(session({
  secret: 'asiloSecret',
  cookie: { maxAge: 3600000 },
  saveUninitialized: false,
  resave: false
}));


// Realizando a conexão com o banco de dados
connection.authenticate().then(()=> {
console.log("Conexão com o banco de dados feita com sucesso!")
}).catch((error) => {
console.log(error)
})

// Criando o banco de dados se ele não existir
connection.query(`CREATE DATABASE IF NOT EXISTS asilo;`).then(() => {
console.log("O banco de dados está criado.")
}).catch((error) => {
console.log(error)
})


app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(express.urlencoded({extended: false }))
app.use(express.json());

// Configurando as rotas dos controllers  
app.use("/", DoadoresController);
app.use("/", IdososController);
app.use("/", VoluntariosController);
app.use("/", VisitasController);
app.use("/", FuncionariosController);
app.use("/", EstoquesController);
app.use("/", UsersController);

// ROTA PRINCIPAL
app.get("/", Auth, function (req, res) {
  res.render("index");
});

// INICIA O SERVIDOR NA PORTA 8080
const port = 8080;
app.listen(port, function (error) {
  if (error) {
    console.log(`Não foi possível iniciar o servidor. Erro: ${error}`);
  } else {
    console.log(`Servidor iniciado com sucesso em http://localhost:${port} !`);
  }
});

