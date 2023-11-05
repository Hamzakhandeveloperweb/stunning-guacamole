module.exports = (sequelize, Sequelize) => {
  const Berth = sequelize.define("berth", {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    name: {
      type: Sequelize.STRING
    }

  });

  return Berth;
};
