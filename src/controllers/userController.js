const service = require('../services/userServices.js');
const User = require('../models/userModel.js');
const {buildResponse, buildValidationError }= require('../utils/responseBuilder.js');

const getAllUsers = async (req, res) => {
  try {
    const users = await service.getUsers();
    if (!users || users.length === 0) {
      return res.status(404).json(buildResponse({ message: 'No hay usuarios registrados', status: 404, data: null }));
    }
    res.status(200).json(buildResponse({ message: 'Lista de usuarios', status: 200, data: users }));
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    res.status(500).json(buildResponse({ message: 'Error al obtener los usuarios', status: 500, data: null }));
  }
};

const getUserByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await service.getUserByEmail(email);
    if (!user) {
      return res.status(404).json(buildResponse({
        status: 404,
        message: "Usuario no encontrado",
        data: null
      }));
    }
    res.status(200).json(buildResponse({
      status: 200,
      message: "Usuario encontrado",
      data: user
    }));
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    res.status(500).json(buildResponse({
      status: 500,
      message: "Error interno del servidor",
      data: null
    }));
  }
};


const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await service.getUserById(id);

    if (!user) {
      return res.status(404).json(buildResponse({
        status: 404,
        message: "Usuario no encontrado",
        data: null
      }));
    }
    res.status(200).json(buildResponse({
      status: 200,
      message: "Usuario encontrado",
      data: user
    }));
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    res.status(500).json(buildResponse({
      status: 500,
      message: "Error interno del servidor",
      data: null
    }));
  }
};

const createUser = async (req, res) => {
  try {
    const newUser = await service.createUser(req.body);
    res.status(201).json({
      status: 201,
      message: "Recurso creado",
      data: newUser
    });
  } catch (error) {
    res.status(error.status || 400).json({
      status: error.status || 400,
      message: "bad request",
      data: {
        errorDetails: error.message || 'Error de validación'
      }
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await service.updateUser(req.params.id, req.body);
    if (!updatedUser) {
      return res.status(404).json({
        status: 404,
        message: 'Usuario no encontrado',
        data: null
      });
    }

    res.status(200).json({
      status: 200,
      message: 'Usuario actualizado correctamente',
      data: updatedUser
    });

  } catch (error) {
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message || 'Error al actualizar usuario',
      data: null
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const wasDeleted = await service.deleteUser(req.params.id);
    if (!wasDeleted) {
      return res.status(404).json({
        status: 404,
        message: 'Usuario no encontrado',
        data: null
      });
    }
    res.status(200).json({
      status: 200,
      message: 'Usuario eliminado correctamente',
      data: null
    });
  } catch (error) {
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message || 'Error al eliminar usuario',
      data: null
    });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail
};
