module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
     id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
      },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    verificationToken : {
      type: Sequelize.STRING
    },
    verified: {
      type: Sequelize.STRING,
      defaultValue: false
    },
    user_role:{
      type: Sequelize.STRING
    }
  });

  return User;
};
