module.exports = (sequelize, Sequelize) => {
  const Terminal = sequelize.define("terminal", {
    
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    name: {
      type: Sequelize.STRING
    }

  });

  return Terminal;
};
