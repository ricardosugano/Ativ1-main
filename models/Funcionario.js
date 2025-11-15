import Sequelize from "sequelize";
import connection from "../config/sequelize-config.js";
// Definindo a estrutura da tabela
const Funcionario = connection.define('funcionarios', {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cpf: {
        type: Sequelize.STRING,
        allowNull: false
    },
    endereco: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});
// Sincronizando a tabela com o banco de dados
Funcionario.sync({force: false});

export default Funcionario;