const { db } = require('./db');

class UserModel {
  getAllUsers(callback) {
    const getAllUsersQuery = `SELECT * FROM Users`;
    db.query(getAllUsersQuery, (err, result) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, result);
    });
  }

  getMaqueiros(callback) {
    const getMaqueirosQuery = `SELECT * FROM Users WHERE role = 'Maqueiro'`;
    db.query(getMaqueirosQuery, (err, result) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, result);
    });
  }

  updateUser(userId, userData, callback) {
    const updateUserQuery = `
      UPDATE Users 
      SET username = ?, name = ?, role = ?, perms = ?
      WHERE id = ?
    `;
    const { username, name, role, perms } = userData;
    db.query(updateUserQuery, [username, name, role, perms, userId], (err, result) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, result);
    });
  }

  deleteUser(userId, callback) {
    const deleteUserQuery = `DELETE FROM Users WHERE id = ?`;
    db.query(deleteUserQuery, [userId], (err, result) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, result);
    });
  }
}

module.exports = UserModel;
