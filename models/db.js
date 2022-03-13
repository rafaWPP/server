const Sequelize = require('sequelize');

const sequelize = new Sequelize("u988201660_basenewgestor", "root", "", {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate()
.then(function(){
    console.log('Sucesso: Conexão estabelecida com Banco de dados');
}).catch(function(){
    console.log('Erro: Conexão nao estabelecida com Banco de dados');
});

module.exports = sequelize;