'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Item.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    availability: DataTypes.BOOLEAN,
    CategoryId: DataTypes.INTEGER
  }, {
    hooks:{
      afterUpdate: function (Item){
        if(Item.stock > 0){
          Item.availability = true
        }else{
          Item.availability = false
        }
      },
      beforeCreate: function (Item){
        if(Item.stock > 0){
          Items.availability = true
        }else{
          Item.availability = false
        }
      }
    },
    sequelize,
    modelName: 'Item',
  });
  return Item;
};