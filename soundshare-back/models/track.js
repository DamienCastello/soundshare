'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Track extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const Track_Genres = sequelize.define('Track_Genres');
      Track.belongsTo(models.User);
      Track.belongsToMany(models.Genre, { through: Track_Genres });
    }
  }
  Track.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT('long'),
    image: DataTypes.STRING,
    music: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Track',
  });
  return Track;
};