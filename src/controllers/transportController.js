const TransportModel = require('../models/transportModel');
const HistoricModel = require('../models/historicModel');
const UserModel = require('../models/userModel');

class TransportRequestController {
  constructor() {
    this.transportModel = new TransportModel();
    this.historicModel = new HistoricModel();
    this.userModel = new UserModel();
  }

  async getAllTransportRequests(req, res) {
    this.transportModel.getAllTransportRequests((err, requests) => {
      if (err) {
        return res.status(500).json({ message: 'Erro interno do servidor' });
      }
      return res.status(200).json(requests);
    });
  }

  async getTransportRequestById(req, res) {
    const { id } = req.params;
    this.transportModel.getTransportRequestById(id, (err, request) => {
      if (err) {
        return res.status(500).json({ message: 'Erro interno do servidor' });
      }
      if (!request) {
        return res.status(404).json({ message: 'Solicitação de transporte não encontrada' });
      }
      return res.status(200).json(request);
    });
  }

  async getTransportRequestsByMaqueiroId(req, res) {
    const { maqueiro_id } = req.params;
    this.transportModel.getTransportRequestsByMaqueiroId(maqueiro_id, (err, requests) => {
      if (err) {
        return res.status(500).json({ message: 'Erro interno do servidor' });
      }
      if (!requests || requests.length === 0) {
        return res.status(404).json({ message: 'Nenhuma solicitação de transporte encontrada para o maqueiro especificado' });
      }
      return res.status(200).json(requests);
    });
  }

  async createTransportRequest(req, res) {
    const data = req.body;
    this.transportModel.insertTransportRequest(data, (err, insertId) => {
      if (err) {
        return res.status(500).json({ message: 'Erro interno do servidor' });
      }
      const description = 'Solicitação de transporte criada';

      this.historicModel.registrarHistorico(insertId, description, (err) => {
        if (err) {
          console.log("Erro ao registrar no histórico: ", err);
        }
      });
      return res.status(201).json({ message: 'Solicitação de transporte criada com sucesso', id: insertId });
    });
  }

  async updateTransportRequest(req, res) {
    const { id } = req.params;
    const data = req.body;
    this.transportModel.updateTransportRequest(id, data, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Erro interno do servidor' });
      }
      const description = 'Solicitação de transporte atualizada';

      this.historicModel.registrarHistorico(id, description, (err) => {
        if (err) {
          console.log("Erro ao registrar no histórico: ", err);
        }
      });
      return res.status(200).json({ message: 'Solicitação de transporte atualizada com sucesso' });
    });
  }

  async deleteTransportRequest(req, res) {
    const { id } = req.params;
    this.transportModel.deleteTransportRequest(id, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Erro interno do servidor' });
      }
      return res.status(200).json({ message: 'Solicitação de transporte deletada com sucesso' });
    });
  }

  async updateTransportRequestPriority(req, res) {
    const { id } = req.params;
    const { priority } = req.body;

    this.transportModel.updateTransportRequestPriority(id, priority, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Erro interno do servidor' });
      }

      const description = `Solicitação de transporte priorizada como ${priority}`;

      this.historicModel.registrarHistorico(id, description, (err) => {
        if (err) {
          console.log("Erro ao registrar no histórico: ", err);
        }
      });
      return res.status(200).json({ message: 'Prioridade da solicitação de transporte atualizada com sucesso' });
    });
  }

  async updateTransportRequestStatus(req, res) {
    const { id } = req.params;
    const { request_status, maqueiro_id } = req.body;

    this.transportModel.updateTransportRequestStatus(id, request_status, maqueiro_id, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Erro interno do servidor' });
      }

      const description = `Status da solicitação de transporte atualizado para ${request_status}`;

      this.historicModel.registrarHistorico(id, description, (err) => {
        if (err) {
          console.log("Erro ao registrar no histórico: ", err);
        }
      });
      return res.status(200).json({ message: 'Status da solicitação de transporte atualizado com sucesso' });
    });
  }

  async updateTransportStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body;

    this.transportModel.updateTransportStatus(id, status, (err) => {
      if (err) {
        console.log('Erro ao atualizar status:', err);
        return res.status(500).json({ message: 'Erro interno do servidor' });
      }

      const description = `Status atualizado para ${status}`;

      this.historicModel.registrarHistorico(id, description, (err) => {
        if (err) {
          console.log("Erro ao registrar no histórico: ", err);
        }
      });
      return res.status(200).json({ message: 'Status atualizado com sucesso' });
    });
  }

  async rejectTransportRequest(req, res) {
    const { id } = req.params;
    const { maqueiro_id } = req.body;
  
    this.transportModel.rejectTransportRequest(id, maqueiro_id, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Erro interno do servidor' });
      }
  
      const description = `Solicitação de transporte recusada pelo maqueiro ${maqueiro_id}`;
  
      this.historicModel.registrarHistorico(id, description, (err) => {
        if (err) {
          console.log("Erro ao registrar no histórico: ", err);
        }
      });
      return res.status(200).json({ message: 'Solicitação de transporte recusada com sucesso' });
    });
  }

  async getMaqueiros(req, res) {
    this.userModel.getMaqueiros((err, users) => {
      if (err) {
        return res.status(500).json({ message: 'Erro interno do servidor' });
      }
      return res.status(200).json(users);
    });
  }
}

module.exports = TransportRequestController;
