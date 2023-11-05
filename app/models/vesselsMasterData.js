module.exports = (sequelize, Sequelize) => {
    const VesselsMasterData = sequelize.define("vesselsMasterData", {
       id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        // defaultValue: Sequelize.UUIDV4
        },
        IMO: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      NAME: {
        type: Sequelize.STRING
      },
      FLAG: {
        type: Sequelize.STRING
      },
      TYPE : {
        type: Sequelize.STRING
      },
      BUILT: {
        type: Sequelize.INTEGER
      },
      BUILDER:{
        type: Sequelize.STRING
      },
      OWNER:{
        type: Sequelize.STRING
      },
      MANAGER:{
        type: Sequelize.STRING
      },
      CLASS:{
        type: Sequelize.STRING
      },
      LENGTH:{
        type: Sequelize.FLOAT
      },
      BEAM:{
        type: Sequelize.FLOAT
      },
      MAXDRAUGHT:{
        type: Sequelize.FLOAT
      },
      GT:{
        type: Sequelize.INTEGER
      },
      NT:{
        type: Sequelize.INTEGER
      },
      DWT:{
        type: Sequelize.INTEGER
      },
      TEU:{
        type: Sequelize.INTEGER
      },
      CRUDE:{
        type: Sequelize.INTEGER
      },
      GAS:{
        type: Sequelize.INTEGER
      }
    });
  
    return VesselsMasterData;
  };
  