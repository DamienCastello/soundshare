'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Resource extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Resource.belongsTo(models.User);
    }
  }
  Resource.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    resourceLink: DataTypes.STRING,
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'Resource',
  });
  return Resource;
};