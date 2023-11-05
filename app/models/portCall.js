
module.exports = (sequelize, Sequelize) => {
    const PortCall = sequelize.define('PortCall', {
        MMSI: { type: Sequelize.BIGINT, allowNull: false },
        TIMESTAMP: { type: Sequelize.DATE, allowNull: false },
        LATITUDE: { type: Sequelize.FLOAT, allowNull: false },
        LONGITUDE: { type: Sequelize.FLOAT, allowNull: false },
        COURSE: Sequelize.FLOAT,
        SPEED: Sequelize.FLOAT,
        HEADING: Sequelize.FLOAT,
        NAVSTAT: Sequelize.INTEGER,
        IMO: Sequelize.BIGINT,
        NAME: Sequelize.STRING,
        CALLSIGN: Sequelize.STRING,
        TYPE: Sequelize.INTEGER,
        A: Sequelize.INTEGER,
        B: Sequelize.INTEGER,
        C: Sequelize.INTEGER,
        D: Sequelize.INTEGER,
        DRAUGHT: Sequelize.FLOAT,
        DESTINATION: Sequelize.STRING,
        LOCODE: Sequelize.STRING,
        ETA_AIS: Sequelize.STRING,
        ETA: Sequelize.DATE,
        SRC: Sequelize.STRING,
        ZONE: Sequelize.STRING,
        ECA: Sequelize.BOOLEAN,
        DISTANCE_REMAINING: Sequelize.INTEGER,
        ETA_PREDICTED: Sequelize.DATE,
      });

      return PortCall
}