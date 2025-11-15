import Sequelize from "sequelize";
import connection from "../config/sequelize-config.js";
// Definindo a estrutura da tabela
const Estoque = connection.define('estoques', {
    produto: {
        type: Sequelize.STRING,
        allowNull: false
    },
    categoria: {
        type: Sequelize.STRING,
        allowNull: false
    },
    quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    preco: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
});
// Sincronizando a tabela com o banco de dados
Estoque.sync({force: false});

export default Estoque;