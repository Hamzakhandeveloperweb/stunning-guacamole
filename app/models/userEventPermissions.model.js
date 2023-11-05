module.exports = (sequelize, Sequelize) => {
    const UserEventPermissions = sequelize.define("userEventPermissions", {
       id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4
      },
      name: {
        type: Sequelize.STRING
      }
  
    });
  
    return UserEventPermissions;
  };
  