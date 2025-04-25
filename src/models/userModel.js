
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { table } = require('console');
const bcrypt = require('bcrypt');
const { supabase } = require('../config/database');



const User = supabase.define('User', {
  id : {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
    nombre: { type: DataTypes.STRING, allowNull: false },
    identificacion: { type: DataTypes.STRING, allowNull: false },
    document_type: { type: DataTypes.STRING, allowNull: false },
    telefono: { 
      type: DataTypes.STRING, 
      allowNull: false,
      validate: {
        isNumeric: true
      }
    },
    telefono: { type: DataTypes.STRING, allowNull: true }, // Cambiado a opcional
    email: { type: DataTypes.STRING, unique: true,allowNull: false },
    password: { 
      type: DataTypes.STRING, 
      allowNull: false,
      validate: {
        len: [3,30]
      }
    },
    rol: { type: DataTypes.STRING, allowNull: false }
  },{
    freezeTableName: true,
    tableName: 'User',
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed('password')) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      }
    }
  });

  
  
module.exports = User;