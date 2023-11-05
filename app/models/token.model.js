module.exports = (sequelize, Sequelize) => {
  const Token = sequelize.define("token", {
     id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
      },
    verificationToken : {
      type: Sequelize.STRING
    }
  });

  return Token;
};
