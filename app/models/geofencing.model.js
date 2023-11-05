module.exports = (sequelize, Sequelize) => {
const Geofencing = sequelize.define('geofencing', {
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
  // display:{
  //   type:Sequelize.INTEGER,
  //   allowNull:true
  // }
  speedAlert:{
    type:Sequelize.STRING
  }
});

  return Geofencing;
};
