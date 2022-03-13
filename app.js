const express = require('express');
const app = express();
const mysql = require('mysql2/promise');

const rimraf = require('rimraf');
const pino = require('pino')
const logger = pino({
    level: "debug",
        prettyPrint:{
                levelFirst:true,
                colorize: true,
                ignore:"pid",
                translateTime:"SYS:dd-mm-yyyy HH:MM:ss"
        }
      
});


const createConnection = async () => {
	return await mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '',
		database: 'u988201660_basenewgestor'
	});
}

app.use(express.json());

app.get("/", async (req, res) => {
    res.send("Servidor Iniciado");
});

app.post("/cadastrar-faturas", async (req, res) => {
    console.log(req.body);
    await User.create(req.body)
    .then(() => {
       return res.json({
           erro: false,
           mensagem: "Fatura criada com sucesso"
       })
    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: "Não foi possivel criar a fatura"
        })
    })
});
app.post("/validar-faturas", async (req, res) => {
    const connection = await createConnection();
   await connection.execute('UPDATE fatura_client SET status = "Vencida" WHERE data < "2022-03-10"  && status = "Em Aberto"')
	
   .then(() => {
    logger.info('Fatura validada com sucesso');
     return res.json({
         erro: false,
        mensagem: "Fatura validada com sucesso"
     })
  }).catch(() => {
    logger.error();('Erro ao validar faturas');
      return res.status(400).json({
          erro: true,
          mensagem: "Não foi possivel validar a fatura"
     })
  })

});
app.post("/apagaseesao", async (req, res) => {
    //console.log(req.body.sessao);
rimraf("../wppconnect-server/src/userDataDir/"+req.body.sessao, function(){
    logger.info('Sessao reiniciada => '+req.body.sessao);
         return res.json({
            mensagem: 'Sessão reiniciada => '+req.body.sessao
         })
})      
});
app.listen(8080, () =>{
    logger.info("Server iniciado na porta 8080: http://localhost:8080");
});