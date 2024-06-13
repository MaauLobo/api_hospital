const UserModel = require('../models/userModel');

class UserController {
  constructor() {
    this.userModel = new UserModel();
  }

  async getAllUsers(req, res) {
    this.userModel.getAllUsers((err, result) => {
      if (err) {
        console.error('Erro ao obter todos os usuários:', err);
        return res.status(500).json({ message: 'Erro interno do servidor' });
      }
      return res.status(200).json(result);
    });
  }

  async updateUser(req, res) {
    const userId = req.params.id;
    const userData = req.body;

    this.userModel.updateUser(userId, userData, (err, result) => {
      if (err) {
        console.error('Erro ao atualizar usuário:', err);
        return res.status(500).json({ message: 'Erro interno do servidor' });
      }
      return res.status(200).json({ message: 'Usuário atualizado com sucesso' });
    });
  }

  async deleteUser(req, res) {
    const userId = req.params.id;

    this.userModel.deleteUser(userId, (err, result) => {
      if (err) {
        console.error('Erro ao deletar usuário:', err);
        return res.status(500).json({ message: 'Erro interno do servidor' });
      }
      return res.status(200).json({ message: 'Usuário deletado com sucesso' });
    });
  }
}

module.exports = UserController;
