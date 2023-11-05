module.exports = (sequelize, Sequelize) => {
    const Voyage = sequelize.define("voyage", {
      
      id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4
      },
      name: {
        type: Sequelize.STRING
      }
  
    });
  
    return Voyage;
  };
  