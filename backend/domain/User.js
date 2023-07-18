const { DataTypes } = require('sequelize');
const sequelize = require('../databaseConfig/db');

const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true
    },
    token: {
        type: DataTypes.STRING,
        allowNull: true
    }
  }, {
    tableName: 'User', // Tablo adını belirtin
    timestamps: true, // createdAt ve updatedAt alanlarını ekleyin
  });
  
module.exports = User;
