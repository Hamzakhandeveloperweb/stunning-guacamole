module.exports = (sequelize, Sequelize) => {
  const Ship = sequelize.define("ship", {
    
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    name: {
      type: Sequelize.STRING
    }

  });

  return Ship;
};
