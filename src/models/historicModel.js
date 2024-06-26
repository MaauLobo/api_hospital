const { db } = require('./db');

class HistoricModel {
  registrarHistorico(solicitacaoId, descricao, callback) {
    const timestamp = new Date();
    const query = 'INSERT INTO transporthistoric (solicitacaoId, descricao, timestamp) VALUES (?, ?, ?)';
    db.query(query, [solicitacaoId, descricao, timestamp], (err, result) => {
      callback(err);
    });
  }

  getHistoricoBySolicitacaoId(solicitacaoId, callback) {
    const query = 'SELECT * FROM transporthistoric WHERE solicitacaoId = ? ORDER BY timestamp DESC';
    db.query(query, [solicitacaoId], (err, results) => {
      if (err) {
        console.error('Erro ao consultar histórico:', err);
        return callback(err, null);
      }
      return callback(null, results);
    });
  }
}

module.exports = HistoricModel;
