module.exports = (sequelize, Sequelize) => {
    const VesselGeofenceModel = sequelize.define("vesselGeofenceModel", {
       id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
        },
      imo: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      vesselName:{
        type: Sequelize.STRING
      },
      geofenceId:{
        type:Sequelize.UUID
      },
      geofenceName:{
        type:Sequelize.STRING
      },
      speedAlert: {
        type: Sequelize.STRING
      },
      userId:{
        type:Sequelize.UUID
      }
    });
  
    return VesselGeofenceModel;
  };
  