module.exports = (sequelize, Sequelize) => {
const Annotation = sequelize.define('annotation', {
  uuid: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
  },
  geometry: {
    type: Sequelize.TEXT, 
  },
  geojson: {
    type: Sequelize.JSONB, 
    allowNull: true,
  },
});

  return Annotation;
};
