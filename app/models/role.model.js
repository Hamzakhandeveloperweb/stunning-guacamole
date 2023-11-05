module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define("roles", {
     id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    name: {
      type: Sequelize.STRING
    }
  });

  return Role;
};
