const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'viaduct.proxy.rlwy.net',
  user: 'root',
  password: 'sJCsOsHPzeeghrvKkOCqlNaHHrZNeZIK',
  database: 'railway',
  port: 33956
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar-se ao banco de dados:', err);
  } else {
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
  }
});

module.exports = { db };
