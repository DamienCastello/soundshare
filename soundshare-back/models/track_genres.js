'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Track_Genres extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Track_Genres.init({
    TrackId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Tracks',
        key: 'id'
      }
    },
    GenreId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Genres',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Track_Genres',
  });
  return Track_Genres;
};