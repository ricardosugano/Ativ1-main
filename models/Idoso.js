import Sequelize from "sequelize";
import connection from "../config/sequelize-config.js";
// Definindo a estrutura da tabela
const Idoso = connection.define('idosos', {
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
Idoso.sync({force: false});

export default Idoso;