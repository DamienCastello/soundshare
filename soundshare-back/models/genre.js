'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Genre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const Track_Genres = sequelize.define('Track_Genres');
      Genre.belongsToMany(models.Track, { through: 'Track_Genres', foreignKey: 'GenreId', otherKey: 'TrackId'});
    }
  }
  Genre.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Genre',
  });
  return Genre;
};