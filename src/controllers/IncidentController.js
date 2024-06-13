// controllers/IncidentController.js

const IncidentModel = require('../models/IncidentModel');

class IncidentController {
  constructor() {
    this.incidentModel = new IncidentModel();
  }

  async getAllIncidents(req, res) {
    this.incidentModel.getAllIncidents((err, incidents) => {
      if (err) {
        return res.status(500).json({ message: 'Erro interno do servidor' });
      }
      return res.status(200).json(incidents);
    });
  }

  async getIncidentById(req, res) {
    const { id } = req.params;
    this.incidentModel.getIncidentById(id, (err, incident) => {
      if (err) {
        return res.status(500).json({ message: 'Erro interno do servidor' });
      }
      if (!incident) {
        return res.status(404).json({ message: 'Incidente não encontrado' });
      }
      return res.status(200).json(incident);
    });
  }

  async getIncidentsByMaqueiroId(req, res) {
    const { maqueiro_id } = req.params;
    this.incidentModel.getIncidentsByMaqueiroId(maqueiro_id, (err, incidents) => {
      if (err) {
        return res.status(500).json({ message: 'Erro interno do servidor' });
      }
      if (!incidents || incidents.length === 0) {
        return res.status(404).json({ message: 'Nenhum incidente encontrado para o maqueiro especificado' });
      }
      return res.status(200).json(incidents);
    });
  }

  async createIncident(req, res) {
    const data = req.body;
    this.incidentModel.createIncident(data, (err, insertId) => {
      if (err) {
        return res.status(500).json({ message: 'Erro interno do servidor' });
      }
      return res.status(201).json({ message: 'Incidente criado com sucesso', id: insertId });
    });
  }

  async updateIncident(req, res) {
    const { id } = req.params;
    const data = req.body;
    this.incidentModel.updateIncident(id, data, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Erro interno do servidor' });
      }
      return res.status(200).json({ message: 'Incidente atualizado com sucesso' });
    });
  }

  async deleteIncident(req, res) {
    const { id } = req.params;
    this.incidentModel.deleteIncident(id, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Erro interno do servidor' });
      }
      return res.status(200).json({ message: 'Incidente deletado com sucesso' });
    });
  }
}

module.exports = IncidentController;
