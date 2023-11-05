module.exports = (sequelize, Sequelize) => {
  const EventType = sequelize.define("eventType", {
     id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
      },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    remarks:{
      type: Sequelize.STRING,
      allowNull: true,
    }
  });

  return EventType;
};
