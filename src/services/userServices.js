const User = require('../models/userModel');
const repo = require('../repositories/userRepository');
const { v4: uuidv4 } = require('uuid');

const getUsers = () => {
  return repo.getAllUsers();
};

const getUserByEmail = async (email) => {
  return await repo.findByEmail(email);
};

const getUserById = async (id) => {
  return await repo.findById(id); 
};
const createUser = async (userData) => {
  const requiredFields = ['nombre', 'identificacion', 'email', 'rol'];
  const missingFields = requiredFields.filter(field => !userData[field]);

  if (missingFields.length > 0) {
    throw new Error(`Faltan campos obligatorios: ${missingFields.join(', ')}`);
  }
  return await repo.create(userData);
};

const updateUser = async (id, data) => {
  if (!id || !data || typeof data !== 'object') {
    throw { status: 400, message: 'Datos inválidos para actualización' };
  }

  const { id: _, ...validData } = data;
  const allowedFields = ['name','identificacion' ,'telefono','email', 'rol'];
  const updateData = Object.keys(validData)
    .filter(key => allowedFields.includes(key))
    .reduce((obj, key) => {
      obj[key] = validData[key];
      return obj;
    }, {});

  return await repo.update(id, updateData);
};

const deleteUser = async (id) => {
  if (!id) {
    throw { status: 400, message: 'ID es requerido' };
  }
  return await repo.remove(id);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail
};
