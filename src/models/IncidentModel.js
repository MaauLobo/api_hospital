// models/IncidentModel.js

const { db } = require('./db');

class IncidentModel {
  getAllIncidents(callback) {
    const query = `
      SELECT Incident.*, 
             transportrequests.patient_name, 
             transportrequests.initial_point, 
             transportrequests.destination_point,
             transportrequests.maqueiro_id,
             users.name AS maqueiro_name
      FROM incident
      JOIN transportrequests ON incident.solicitacaoId = transportRequests.id
      JOIN users ON transportrequests.maqueiro_id = users.id
    `;
    db.query(query, (err, results) => {
      if (err) {
        console.error('Erro ao consultar todos os incidentes:', err);
        return callback(err, null);
      }
      return callback(null, results);
    });
  }

  getIncidentById(id, callback) {
    const query = `
      SELECT incident.*, 
             transportrequests.patient_name, 
             transportrequests.initial_point, 
             transportrequests.destination_point,
             transportrequests.maqueiro_id,
             users.name AS maqueiro_name
      FROM incident
      JOIN transportrequests ON incident.solicitacaoId = transportRequests.id
      JOIN users ON transportrequests.maqueiro_id = users.id
      WHERE incident.id = ?
    `;
    db.query(query, [id], (err, result) => {
      if (err) {
        console.error('Erro ao consultar incidente por ID:', err);
        return callback(err, null);
      }
      return callback(null, result[0]);
    });
  }

  getIncidentsByMaqueiroId(maqueiro_id, callback) {
    const query = `
      SELECT incident.*, 
             transportrequests.patient_name, 
             transportrequests.initial_point, 
             transportrequests.destination_point,
             transportrequests.maqueiro_id,
             users.name AS maqueiro_name
      FROM incident
      JOIN transportrequests ON incident.solicitacaoId = transportrequests.id
      JOIN users ON rransportrequests.maqueiro_id = users.id
      WHERE transportrequests.maqueiro_id = ?
    `;
    db.query(query, [maqueiro_id], (err, results) => {
      if (err) {
        console.error('Erro ao consultar incidentes por ID do maqueiro:', err);
        return callback(err, null);
      }
      return callback(null, results);
    });
  }

  createIncident(data, callback) {
    const query = `
      INSERT INTO incident (solicitacaoId, descricao, dataHora)
      VALUES (?, ?, COALESCE(?, NOW()))
    `;
    const params = [data.solicitacaoId, data.descricao, data.dataHora || null];
    db.query(query, params, (err, result) => {
      if (err) {
        console.error('Erro ao criar incidente:', err);
        return callback(err);
      }
      return callback(null, result.insertId);
    });
  }

  updateIncident(id, data, callback) {
    const query = `
      UPDATE incident
      SET solicitacaoId = ?, descricao = ?, dataHora = ?
      WHERE id = ?
    `;
    const params = [data.solicitacaoId, data.descricao, data.dataHora, id];
    db.query(query, params, (err) => {
      if (err) {
        console.error('Erro ao atualizar incidente:', err);
        return callback(err);
      }
      return callback(null);
    });
  }

  deleteIncident(id, callback) {
    const query = 'DELETE FROM incident WHERE id = ?';
    db.query(query, [id], (err) => {
      if (err) {
        console.error('Erro ao deletar incidente:', err);
        return callback(err);
      }
      return callback(null);
    });
  }
}

module.exports = IncidentModel;
