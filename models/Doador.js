import Sequelize from "sequelize";
import connection from "../config/sequelize-config.js";
// Definindo a estrutura da tabela
const Doador = connection.define('doadores', {
    nomeD: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cpfD: {
        type: Sequelize.STRING,
        allowNull: false
    },
    enderecoD: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});
// Sincronizando a tabela com o banco de dados
Doador.sync({force: false});

export default Doador;