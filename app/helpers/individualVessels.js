// const { Client } = require('pg');
const geofenceHelpers = require('./geofencing.js')
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const randomUUID = uuidv4();
let cron = require('node-cron');
const EventEmitter = require('events');
const eventEmitter = new EventEmitter();
const pg = require('pg');
// pg.defaults.ssl = true;
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

// const client = new Client({
//     user: 'postgres',
//     host: 'database-2.chmufimiqfva.us-east-1.rds.amazonaws.com',
//     database: 'postgres',
//     password: '0euiopy6',
//     port: 5432
// })

// // module.exports = {
// //   HOST: "database-2.chmufimiqfva.us-east-1.rds.amazonaws.com",
// //   USER: "postgres",
// //   PASSWORD: "0euiopy6",
// //   DB: "postgres",
// //   dialect: "postgres",
// //   dialectOptions: {
// //     ssl: {
// //       require: true,
// //       rejectUnauthorized: false 
// //     }
// //   },
// //   pool: {
// //     max: 5,
// //     min: 0,
// //     acquire: 30000,
// //     idle: 10000
// //   }
// // };
const clientConfig = {
  user: 'postgres',
  host: 'database-2.chmufimiqfva.us-east-1.rds.amazonaws.com',
  database: 'postgres',
  password: '0euiopy6',
  port: 5432,
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

let allGeofences;
let vesselGeofenceModels;

const client = new pg.Client(clientConfig);
const connectClient = async () => {
    await client.connect().then(()=>{
    })
}

let allAlerts;

const getAllVesselAlerts = async() => {
  const query = `SELECT * FROM public."vesselAlertsInfos"`
  allAlerts = await client.query(query);
}

const raiseSpeedAlert = async (imo,speed,name) => {
  allAlerts.rows?.forEach(async (elem) => {
    if(elem.imo == imo && elem.speedAlert != null) {
      
      let getInt = elem.speedAlert[0]
      let value = elem.speedAlert.substring(1);
      if(getInt) {
        if(getInt == '+' && value >= speed) {
          const insertAlert = await client.query(
          `INSERT INTO alerts (uuid, geofenceName, "alertType", "geofenceId","imo","vesselName","createdAt","updatedAt","geofencingId","userId")
          VALUES ('${randomUUID}', NULL, 2, NULL , '${imo}', '${name}' ,NULL,NULL,NULL,NULL)`);
          console.log("")
        }
        else  if( getInt == '-' && value <= speed) {
          const insertAlert = await client.query(
            `INSERT INTO alerts (uuid, geofenceName, "alertType", "geofenceId","imo","vesselName","createdAt","updatedAt","geofencingId","userId")
            VALUES ('${randomUUID}', NULL, 2, NULL , '${imo}', '${name}' ,NULL,NULL,NULL,NULL)`);
        }
      }
    }
  })
}

const getGeofences = async () => {
  const resp = await client.query(`SELECT * FROM public.geofencings`)
  allGeofences = resp.rows
}

const getVesselGeofences = async () => {
  const resp = await client.query(`SELECT * FROM public."vesselGeofenceModels"`)
  vesselGeofenceModels = resp.rows
}

const raisegetVesselGeofences = async (speed) => {
  
  vesselGeofenceModels?.forEach(async (elem) => {
    if(elem.speedAlert != null) {
      let getInt = elem.speedAlert[0]
      let value = elem.speedAlert.substring(1);
      if(getInt) {
        if(getInt == '+' && value >= speed) {
          console.log("treerterexceeds")
          const insertAlert = await client.query(
            `INSERT INTO alerts (uuid, "geofenceName", "alertType", "geofenceId" , "imo", "vesselName","speedAlert","createdAt","updatedAt","geofencingId","userId")
            VALUES ('${randomUUID}', '${elem.geofenceName}' , 4 , '${elem.geofenceId}' , '${elem.imo}' ,'${elem.vesselName}','${elem.speedAlert}',  NULL,NULL,'${elem.geofenceId}','${elem.userId}')`);
        }
        else if( getInt == '-' && value <= speed) {
          const insertAlert = await client.query(
            `INSERT INTO alerts (uuid, "geofenceName", "alertType", "geofenceId" , "imo", "vesselName","speedAlert","createdAt","updatedAt","geofencingId","userId")
            VALUES ('${randomUUID}', '${elem.geofenceName}' , 4 , '${elem.geofenceId}' , '${elem.imo}' ,'${elem.vesselName}','${elem.speedAlert}',  NULL,NULL,'${elem.geofenceId}','${elem.userId}')`);
        }
      }
    }
  })
}

const raiseSpeedAlertInGeofence = async (speed,name,imo) => {
  allGeofences?.forEach(async(elem) => {
   
    if(elem.speedAlert != null) {
      let getInt = elem.speedAlert[0]
      let value = elem.speedAlert.substring(1);
      if(getInt) {
        if(getInt == '+' && speed >= value ) {
          const insertAlert = await client.query(
            `INSERT INTO alerts (uuid, "geofenceName", "alertType", "geofenceId","imo","vesselName","speedAlert","createdAt","updatedAt","geofencingId","userId")
            VALUES ('${randomUUID}', '${elem.name}' , 3, '${elem.uuid}' , '${imo}', '${name}','${elem.speedAlert}' ,NULL,NULL,'${elem.uuid}','${elem.userId}')`);
        }
        else  if( getInt == '-' && speed <= value) {
          const insertAlert = await client.query(
            `INSERT INTO alerts (uuid, "geofenceName", "alertType", "geofenceId","imo","vesselName","speedAlert","createdAt","updatedAt","geofencingId","userId")
            VALUES ('${randomUUID}', '${elem.name}' , 3, '${elem.uuid}' , '${imo}', '${name}','${elem.speedAlert}' ,NULL,NULL,'${elem.uuid}','${elem.userId}')`);
        }
      }
    }
  })
}

const raiseSpeedAlerts = async (imo,speed,name) => {
  allAlerts.rows?.forEach(async(elem) => {
    if(elem.imo == imo && elem.speedAlert != null) {
      let getInt = elem.speedAlert[0]
      let value = elem.speedAlert.substring(1);
      if(getInt) {
        if(getInt == '+' && speed >= value ) {
          const insertAlert = await client.query(
            `INSERT INTO alerts (uuid, "geofenceName", "alertType", "geofenceId","imo","vesselName","speedAlert","createdAt","updatedAt","geofencingId","userId")
            VALUES ('${randomUUID}', NULL , 2, NULL , '${imo}', '${name}','${elem.speedAlert}' ,NULL,NULL,NULL,'${elem.userId}')`);
        }
        else if( getInt == '-' && speed <= value) {
          const insertAlert = await client.query(
            `INSERT INTO alerts (uuid, "geofenceName", "alertType", "geofenceId","imo","vesselName","speedAlert","createdAt","updatedAt","geofencingId","userId")
            VALUES ('${randomUUID}', NULL , 2, NULL , '${imo}', '${name}','${elem.speedAlert}' ,NULL,NULL,NULL,'${elem.userId}')`);
        }
      }
    }
  })
}

const dummyfun = async () => {
  for (const aisObject of aisData) {
    const {IMO,SPEED,NAME}= aisObject.AIS
    // await raiseSpeedAlerts(IMO,SPEED,NAME)
    await raiseSpeedAlertInGeofence(SPEED,NAME,IMO)
    // await raisegetVesselGeofences(SPEED)
  }
}

const getDatafromAIS= (async() => {
    for(let i=0;i<VesselAIS2.length;i++) {
        const resp=await axios.get(`https://api.vtexplorer.com/vessels?userkey=WS-096EE673-456A8B&imo=${VesselAIS2[i].IMO}&mmsi=${VesselAIS2[i].MMSI}`)
        aisData.push(resp.data[0])
        raiseSpeedAlert(VesselAIS2[i].IMO,resp.data[0].AIS.SPEED)
        break
  }
})

const getMasterDatafromAIS= (async() => {
  for(let i=0;i<VesselAIS2.length;i++) {
      const resp=await axios.get(`https://api.vtexplorer.com/masterdata?userkey=WS-096EE673-456A8B&imo=${VesselAIS2[i].IMO}`)
      aisMasterData.push(resp.data[0]);
}
});

const addDataToMaster = async() => {
  try{
    for (const aisObject of aisMasterData) {
        const {
          IMO,
          NAME,
          FLAG,
          TYPE,
          BUILT,
          BUILDER,
          OWNER,
          MANAGER,
          CLASS,
          LENGTH,
          BEAM,
          MAXDRAUGHT,
          GT,
          NT,
          DWT,
          TEU,
          CRUDE,
          GAS
        } = aisObject.MASTERDATA;
        const insertQuery = `
        INSERT INTO public."vesselsMasterData" (
          "id",
          "IMO",
          "NAME",
          "FLAG",
          "TYPE",
          "BUILT",
          "BUILDER",
          "OWNER",
          "MANAGER",
          "CLASS",
          "LENGTH",
          "BEAM",
          "MAXDRAUGHT",
          "GT",
          "NT",
          "DWT",
          "TEU",
          "CRUDE",
          "GAS"
            ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
            $11, $12, $13, $14, $15, $16, $17, $18,$19
            )`;
          const values = [
            IMO,
            IMO,
            NAME,
            FLAG,
            TYPE,
            BUILT,
            BUILDER,
            OWNER,
            MANAGER,
            CLASS,
            LENGTH,
            BEAM,
            MAXDRAUGHT,
            GT,
            NT,
            DWT,
            TEU,
            CRUDE,
            GAS
          ];
         const resp = await client.query(insertQuery, values);
        }
      }
      catch(error){
        console.error(error)
      }
 
}

const addDatatoAlerts = async () => {
  for(let i=0;i<VesselAIS2.length;i++) {
    const query = `INSERT INTO public."vesselAlertsInfos" (id,imo) VALUES (${VesselAIS2[i].IMO},${VesselAIS2[i].IMO})`
    await client.query(query);
  }
}

const addDataToPortCalls = async() => {
    const query = `DELETE FROM public."PortCalls"`
    const res = await client.query(query);
    
    for (const aisObject of aisData) {
        const {
            MMSI,
            TIMESTAMP,
            LATITUDE,
            LONGITUDE,
            COURSE,
            SPEED,
            HEADING,
            NAVSTAT,
            IMO,
            NAME,
            CALLSIGN,
            TYPE,
            A,
            B,
            C,
            D,
            DRAUGHT,
            DESTINATION,
            LOCODE,
            ETA_AIS,
            ETA,
            SRC,
            ZONE,
            ECA,
            DISTANCE_REMAINING,
            ETA_PREDICTED
        } = aisObject.AIS;
        const insertQuery = `
        INSERT INTO public."PortCalls" (
            "MMSI",
            "TIMESTAMP",
            "LATITUDE",
            "LONGITUDE",
            "COURSE",
            "SPEED",
            "HEADING",
            "NAVSTAT",
            "IMO",
            "NAME",
            "CALLSIGN",
            "TYPE",
            "A",
            "B",
            "C",
            "D",
            "DRAUGHT",
            "DESTINATION",
            "LOCODE",
            "ETA_AIS",
            "ETA",
            "SRC",
            "ZONE",
            "ECA",
            "DISTANCE_REMAINING",
            "ETA_PREDICTED",
            "vesselsMasterDataId",
            "vesselAlertsInfoId"
            ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
            $11, $12, $13, $14, $15, $16, $17, $18, $19, $20,
            $21, $22, $23, $24, $25, $26,$27,$28
            )`;
    
        const values = [
            MMSI,
            TIMESTAMP,
            LATITUDE,
            LONGITUDE,
            COURSE,
            SPEED,
            HEADING,
            NAVSTAT,
            IMO,
            NAME,
            CALLSIGN,
            TYPE,
            A,
            B,
            C,
            D,
            DRAUGHT,
            DESTINATION,
            LOCODE,
            ETA_AIS,
            ETA,
            SRC,
            ZONE,
            ECA,
            DISTANCE_REMAINING,
            ETA_PREDICTED,
            IMO,
            IMO
        ];
    
        await client.query(insertQuery, values);
        }
}

const addDataToHistoricPortCalls = async() => {
    for (const aisObject of aisData) {
        const {
            MMSI,
            TIMESTAMP,
            LATITUDE,
            LONGITUDE,
            COURSE,
            SPEED,
            HEADING,
            NAVSTAT,
            IMO,
            NAME,
            CALLSIGN,
            TYPE,
            A,
            B,
            C,
            D,
            DRAUGHT,
            DESTINATION,
            LOCODE,
            ETA_AIS,
            ETA,
            SRC,
            ZONE,
            ECA,
            DISTANCE_REMAINING,
            ETA_PREDICTED,
        } = aisObject.AIS;
        const insertQuery = `
        INSERT INTO public."PortCallHistorics" (
            "MMSI",
            "TIMESTAMP",
            "LATITUDE",
            "LONGITUDE",
            "COURSE",
            "SPEED",
            "HEADING",
            "NAVSTAT",
            "IMO",
            "NAME",
            "CALLSIGN",
            "TYPE",
            "A",
            "B",
            "C",
            "D",
            "DRAUGHT",
            "DESTINATION",
            "LOCODE",
            "ETA_AIS",
            "ETA",
            "SRC",
            "ZONE",
            "ECA",
            "DISTANCE_REMAINING",
            "ETA_PREDICTED"
        
            ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
            $11, $12, $13, $14, $15, $16, $17, $18, $19, $20,
            $21, $22, $23, $24, $25, $26
            )`;
    
        const values = [
            MMSI,
            TIMESTAMP,
            LATITUDE,
            LONGITUDE,
            COURSE,
            SPEED,
            HEADING,
            NAVSTAT,
            IMO,
            NAME,
            CALLSIGN,
            TYPE,
            A,
            B,
            C,
            D,
            DRAUGHT,
            DESTINATION,
            LOCODE,
            ETA_AIS,
            ETA,
            SRC,
            ZONE,
            ECA,
            DISTANCE_REMAINING,
            ETA_PREDICTED,
        ];
        // Execute the INSERT query for each AIS object
        // const query = `Delete * from public."PortCalls"`
        const res = await client.query(insertQuery,values);
        }
        
}

const getAllGeofences = async () => {
    const dataDb = await client.query(`SELECT * FROM public.geofencings`)
    let count =0
    aisData.forEach((elem) =>{
        dataDb.rows.forEach(async (elemNew) => {
                if(elemNew.geojson.geometry.type != 'Point') {
                    let pointInPolygon = await geofenceHelpers.pointInsideGeofence(elem.AIS.LATITUDE,elem.AIS.LONGITUDE,elemNew.geojson.geometry.coordinates)
                    if(pointInPolygon) {
                        count = count+1
                        const query = `INSERT INTO alerts (uuid, name, description, "alertType", "linkedModelId","createdAt","updatedAt","geofencingId","userId")
                        VALUES ('${randomUUID}', 'Alert Name', 'Fence crossed', 1, '${elemNew.uuid}','','','${elemNew.uuid}','${elemNew.userId}')`
                        eventEmitter.emit('notification',`${elemNew.uuid}` );
                        const insertAlert = await client.query(
                        `INSERT INTO alerts (uuid, geofenceName, "alertType", "geofenceId","imo","vesselName","createdAt","updatedAt","geofencingId","userId")
                        VALUES ('${randomUUID}', 'Alert Name', 1, '${elemNew.uuid}',NULL,NULL,NULL,NULL,'${elemNew.uuid}','${elemNew.userId}')`);
                    }
                }
            // }
          
        })
    })
}


async function runMethodsInSequence() {
  try {

    //must
    await connectClient()
    await getGeofences()
    await getVesselGeofences()
    await addDatatoAlerts()
    await getAllVesselAlerts()
    await addDataToHistoricPortCalls()
    // await dummyfun()
    await addDataToMaster()
    await getMasterDatafromAIS()
    await getDatafromAIS()
    await addDataToPortCalls()
    // await getAllGeofences()
    
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

runMethodsInSequence()



