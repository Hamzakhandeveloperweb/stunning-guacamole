module.exports = (sequelize, Sequelize) => {
  const Event = sequelize.define("event", {
     id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
      },
    name: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    linked_to: {
      type: Sequelize.STRING,
    },
    linkedId: {
      type: Sequelize.STRING,
    },
    status:{
      type: Sequelize.INTEGER,
    },
    eventdate:{
      type: Sequelize.DATE,
      allowNull: true,
    }

  });

  return Event;
};
