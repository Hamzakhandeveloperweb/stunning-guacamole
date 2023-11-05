const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    },
    options: { 
      dialect: "postgres",
      native: true, 
      ssl: true, 
      dialectOptions: {
        ssl: true
      }
    }
  }
);

// const sequelize = new Sequelize(
//   config.DB,
//   config.USER,
//   config.PASSWORD,
//   {
//     host: config.HOST,
//     dialect: 'postgres',
//     pool: {
//       max: config.pool.max,
//       min: config.pool.min,
//       acquire: config.pool.acquire,
//       idle: config.pool.idle
//     },
//     options: { 
//       dialect: "postgres",
//       native: true, 
//       ssl: true, 
//       dialectOptions: {
//         ssl: true
//       }
//     }
//   }
// );

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);
db.company = require("./company.model.js")(sequelize, Sequelize);
db.terminal = require("./terminal.model.js")(sequelize, Sequelize);
db.berth = require("./berth.model.js")(sequelize, Sequelize);
db.ship = require("./ship.model.js")(sequelize, Sequelize);
db.permission = require("./permission.model.js")(sequelize, Sequelize);
db.userpermission = require("./userpermission.model.js")(sequelize, Sequelize);
db.event = require("./events.model.js")(sequelize, Sequelize);
db.eventType = require("./eventType.model.js")(sequelize, Sequelize);
db.annotation = require("./annotation.model.js")(sequelize, Sequelize);
db.token = require("./token.model.js")(sequelize, Sequelize);
db.geofencing = require("./geofencing.model.js")(sequelize, Sequelize);
db.voyage = require("./voyage.model.js")(sequelize, Sequelize);
db.userEventPermissions = require('./userEventPermissions.model.js')(sequelize,Sequelize);
db.userEventPivot = require('./userEventPivot.model.js')(sequelize,Sequelize);
db.PortCall = require('./portCall.js')(sequelize,Sequelize);
db.alert = require('./alerts.model.js')(sequelize,Sequelize);
db.PortCallHistoric = require('./portCall-Historic.js')(sequelize,Sequelize)
db.vesselsMasterData = require('./vesselsMasterData.js')(sequelize,Sequelize)
db.vesselAlertsInfo = require('./vesselAlertsInfo.js')(sequelize,Sequelize)
db.vesselGeofenceModel = require('./vesselGeofenceModel.js')(sequelize,Sequelize)


db.user.hasOne(db.role);
db.user.belongsTo(db.company, {
  foreignKey: 'companyId',
  onDelete: 'CASCADE'
});

db.PortCall.hasOne(db.vesselsMasterData);
db.PortCall.belongsTo(db.vesselsMasterData,{
  foreignKey:'vesselsMasterDataId'
})

db.PortCall.hasOne(db.vesselAlertsInfo);
db.PortCall.belongsTo(db.vesselAlertsInfo,{
  foreignKey:'vesselAlertsInfoId'
})


db.company.hasMany(db.user, {
  foreignKey: 'companyId',
  onDelete: 'CASCADE'
});

db.terminal.belongsTo(db.company, {
  foreignKey: 'companyId',
  onDelete: 'CASCADE'
});

db.company.hasMany(db.terminal, {
  foreignKey: 'companyId',
  onDelete: 'CASCADE'
});

db.terminal.hasMany(db.berth, {
  foreignKey: 'terminalId',
  onDelete: 'CASCADE'
});

db.berth.belongsTo(db.terminal, {
  foreignKey: 'terminalId',
  onDelete: 'CASCADE'
});

db.berth.hasMany(db.ship, {
  foreignKey: 'berthId',
  onDelete: 'CASCADE'
});

db.ship.belongsTo(db.berth, {
  foreignKey: 'berthId',
  onDelete: 'CASCADE'
});

db.role.belongsToMany(db.permission, { through: db.userpermission });
db.permission.belongsToMany(db.role, { through:  db.userpermission });

db.event.belongsTo(db.eventType, { foreignKey: 'eventTypeId' })
db.eventType.hasOne(db.event,{ foreignKey: 'eventTypeId' })

db.event.belongsTo(db.user)
db.user.hasMany(db.event)

db.voyage.belongsTo(db.ship)
db.ship.hasMany(db.voyage)

db.user.hasMany(db.annotation, {
  foreignKey: 'userId', 
  onDelete: 'CASCADE', 
});

db.userEventPermissions.belongsToMany(db.user, { through: db.userEventPivot });
db.user.belongsToMany(db.userEventPermissions, { through: db.userEventPivot });

db.userEventPermissions.belongsTo(db.eventType,{
  foreignKey: 'eventTypeId'
})

db.annotation.belongsTo(db.user, {
  foreignKey: 'userId', 
});

db.user.hasMany(db.geofencing, {
  foreignKey: 'userId', 
  onDelete: 'CASCADE', 
});

db.geofencing.belongsTo(db.user, {
  foreignKey: 'userId', 
});

db.geofencing.hasMany(db.alert, {
  foreignKey: 'geofencingId', 
  onDelete: 'CASCADE', 
});

db.alert.belongsTo(db.geofencing, {
  foreignKey: 'geofencingId', 
});

db.user.hasMany(db.alert, {
  foreignKey: 'userId', 
  onDelete: 'CASCADE', 
});

db.alert.belongsTo(db.user, {
  foreignKey: 'userId', 
});

db.user.hasOne(db.token,{foreignKey:"userId"})
db.token.belongsTo(db.user,{foreignKey:"userId"})

// db.user.belongsTo(db.user, {
//   through: "user_roles"
// });
// db.user.belongsToMany(db.role, {
//   through: "user_roles"
// });

db.ROLES = ["user", "admin", "superadmin"];
db.Company_types = ["Shipping", "Transportation", "Airplanes"];

module.exports = db;
