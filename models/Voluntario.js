import Sequelize from "sequelize";
import connection from "../config/sequelize-config.js";
// Definindo a estrutura da tabela
const voluntario = connection.define('voluntarios', {
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
voluntario.sync({force: false});

export default voluntario;