const Sequelize = require('sequelize');
const db = require('./db');

const User = db.define('fatura_client2', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allwNull: false,
        primaryKey:true
    },
    nome:{
        type: Sequelize.STRING,
        allwNull: false
    },
    plano:{
        type: Sequelize.STRING,
        allwNull: false
    },
    servico:{
        type: Sequelize.STRING,
        allwNull: false
    },
    status:{
        type: Sequelize.STRING,
        allwNull: false
    },
    data:{
        type: Sequelize.STRING,
        allwNull: false
    },
    msg:{
        type: Sequelize.STRING,
        allwNull: false
    },
    token:{
        type: Sequelize.STRING,
        allwNull: false
    },
    criador:{
        type: Sequelize.STRING,
        allwNull: false
    },
});
//se nao existe tabela cria uma tabel
User.sync();
//se tiver uma alteraão na models atera a tabela
//User.sync({alter:true});
module.exports = User;