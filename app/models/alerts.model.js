module.exports = (sequelize, Sequelize) => {
    const Alert = sequelize.define('alerts', {
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      geofenceName: {
        type: Sequelize.STRING,
      },
      alertType: {
        type:Sequelize.INTEGER,
      },
      geofenceId: {
        type: Sequelize.UUID
      },
      imo:{
        type:Sequelize.INTEGER
      },
      vesselName:{
        type:Sequelize.STRING
      },
      speedAlert:{
        type: Sequelize.STRING
      }

    });
      return Alert;
    };
    
