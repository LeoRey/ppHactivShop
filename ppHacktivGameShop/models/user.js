'use strict';
const {
  Model
} = require('sequelize');
const bycrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
  }, {
    hooks:{
      beforeCreate: function (User){
        User.isAdmin = false
        const salt = bycrypt.genSaltSync(5);
        User.password = bycrypt.hashSync(User.password,salt)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};