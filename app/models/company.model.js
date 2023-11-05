module.exports = (sequelize, Sequelize) => {
  const Company = sequelize.define("company", {
    id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
    },
    name: {
      type: Sequelize.STRING
    },
    company_type:{
        type:Sequelize.STRING
    }

  });

  return Company;
};
