module.exports = (sequelize, Sequelize) => {
  const Permission = sequelize.define("permission", {
     id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    name: {
      type: Sequelize.STRING
    }

  });

  return Permission;
};
