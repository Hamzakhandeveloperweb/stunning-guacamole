module.exports = (sequelize, Sequelize) => {
    const VesselAlertsInfo = sequelize.define("vesselAlertsInfo", {
       id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        },
      imo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
      },
      speedAlert: {
        type: Sequelize.STRING
      },
      speedAlertGeofence: {
        type: Sequelize.STRING
      },
      geofenceSpeedAlert:{
        type:Sequelize.UUID
      },
      speedAlertVesselGeofence: {
        type:Sequelize.STRING
      },
      speedAlertVesselGeofenceVesselId: {
        type:Sequelize.UUID
      },
      speedAlertVesselGeofenceId: {
        type:Sequelize.UUID
      },
      userId:{
        type:Sequelize.UUID
      }
    });
  
    return VesselAlertsInfo;
  };
  