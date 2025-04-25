const { get } = require('http');
const UserModel = require('../models/userModel');


const getAllUsers = () => {
  return UserModel.findAll()
};


const findById = async (id) => {
  return await UserModel.findByPk(id); 
};
const findByEmail = async (email) => {
  return await UserModel.findOne({ where: { email } });
}

const create = async (userData) => {
  try {
    return await UserModel.create(userData);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      const duplicateField = error.errors[0].path;
      throw { 
        status: 400, 
        message: 'Dato duplicado: ' + duplicateField,
        duplicateField 
      };
    }
    throw error;
  }
};

const update = async (id, updatedData) => {
  try {
    const [affectedRows] = await UserModel.update(updatedData, {
      where: { id },
      returning: true
    });

    if (affectedRows === 0) return null;

    return await UserModel.findByPk(id);
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};
const remove = async (id) => {
  try {
    const deleted = await UserModel.destroy({
      where: { id },
      limit: 1
    });
    return deleted === 1;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

module.exports = {
  getAllUsers,
  findById,
  create,
  update,
  remove,
  findByEmail
};
