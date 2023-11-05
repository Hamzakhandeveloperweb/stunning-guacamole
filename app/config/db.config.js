// module.exports = {
//   HOST: "localhost",
//   USER: "postgres",
//   PASSWORD: "postgres",
//   DB: "postgres",
//   dialect: "postgres",
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   }
// };



module.exports = {
  HOST: "database-1.chmufimiqfva.us-east-1.rds.amazonaws.com",
  USER: "postgres",
  PASSWORD: "databaseworld",
  DB: "postgres",
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false 
    }
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};