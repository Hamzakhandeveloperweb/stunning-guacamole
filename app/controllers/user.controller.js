const db = require("../models");
const config = require("../config/auth.config");
const Annotation = db.annotation;
const Geofencing = db.geofencing;
const Event = db.event;
const EventTypes = db.eventType;
const EventPermissions = db.userEventPermissions
const User = db.user;
const PortCall = db.PortCall;
const VesselsMasterData = db.vesselsMasterData
const vesselAlertsInfo = db.vesselAlertsInfo
const vesselGeofenceModel = db.vesselGeofenceModel

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

exports.createAnnotation = async (req, res) => {
   try{
     const {userId,geojson} = req.body
     const annotation = await Annotation.create({
      name:"",
      userId: userId, 
      geojson:geojson
    });
    res.status(201).json(annotation);
   }
   
   catch(err) {
     console.error(err);
     res.status(500).json({ error: 'An error occurred while saving the annotation.' });
   }
}

exports.createGeofence = async (req, res) => {
   try{
     const {userId,geojson,name} = req.body
     const geofence = await Geofencing.create({
      userId: userId,
      name:name,
      geojson:geojson 
    });
    res.status(201).json(geofence);
   }
   catch(err) {
     console.error(err);
     res.status(500).json({ error: 'An error occurred while saving the annotation.' });
   }
}

exports.createCompany = async (req, res) => {
   try{
     const {userId,name} = req.body
     const annotation = await Company.create({
      name:name,
    });
    res.status(201).json(annotation);

   }
   catch(err) {
     console.error(error);
     res.status(500).json({ error: 'An error occurred while saving the annotation.' });
   }
}

// exports.getAssignedEvents = async (req, res) => {
//   try{
//     const {userId} = req.body
//     const annotation = await Annotation.create({
//      name:"abhi",
//      userId: userId, 
//    });
//    res.status(201).json(annotation);

//   }
//   catch(err) {
//     console.error(error);
//     res.status(500).json({ error: 'An error occurred while saving the annotation.' });
//   }
// }

exports.getAssignedEvents = async (req,res) => {
  try{
    const {userId} = req.query.userId
    const eventTypes = await Events.findAll({
      include: [
        {
        model: User,
        where: { id: userId },
        },
    ],
    });
    res.status(200).json(eventTypes)
  }
  catch(err) {
    res.status(500).json(err)
  }
}

exports.assignEventsPermission = async (req, res) => {
  try{
    
    const {name,eventTypeId,userId } = req.body
    const user = await User.findByPk(userId)
    const eventPermissions = await EventPermissions.create({name:name,eventTypeId:eventTypeId})
    await user.addUserEventPermission(eventPermissions);
    res.status(200).json(eventPermissions);
  }
  catch(err) {
    res.status(500).json({ error: err });
  }
}

exports.createEvent = async (req, res) => {
  try{
    const {userId,eventTypeId,linked_to,linkedId,eventDate,status} = req.body
    
    const event = await Event.create({
      name:'hello',
      userId:userId,
      eventTypeId:eventTypeId,
      linkedId:linkedId,
      linked_to:linked_to,
      eventdate: eventDate,
      status:1
     });

     const eventTypes = await Event.findAll({
      where: { id: event.id },
      include: [
        {
        model: User,
        attributes: { exclude: ['password'] }
        },
    ],
    });
     res.status(201).json(eventTypes);

  }
  catch(err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while saving the annotation.' });
  }
}

exports.updateEventTime = async (req, res) => {
  try{
    const {eventDate,eventId} = req.body
    
    const event = await Event.findByPk(eventId)
    event.eventdate = eventDate
    // event.status = 3
    await event.save();
    res.status(201).json(event);

  }
  catch(err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while saving the annotation.' });
  }
}

exports.updateEvent = async (req, res) => {
  try{
    const {eventId,status} = req.body
    const event = await Event.findByPk(eventId);
    event.status = status;
    await event.save();
    res.status(200).json(event);
  }
  catch(err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while saving the annotation.' });
  }
}


exports.getVoyagesNew = async (req,res) => {
  try{
    const portCall = await PortCall.findAll({
      include: [
        {
        model: VesselsMasterData,
        },
        {
        model: vesselAlertsInfo,
        },
    ],
    });
    res.status(200).json(portCall)
  }
  catch(err) {
    res.status(500).json(err)
  }
}

exports.vesselSpeedAlert = async (req, res) => {
  try{
    const {imo,speed,userId} = req.body
    const alert = await vesselAlertsInfo.findOne({
      where : {
        imo:imo
      }
    });
    alert.speedAlert = speed;
    alert.userId = userId
    await alert.save();
    res.status(200).json(alert);
  }
  catch(err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while saving the annotation.' });
  }
}

exports.geofenceSpeedAlert = async (req, res) => {
  try{
    const {speed,geofenceId} = req.body
    const alert = await Geofencing.findOne({
      where : {
        uuid:geofenceId
      }
    });
    alert.speedAlert = speed;
    await alert.save();
    res.status(200).json(alert);
  }
  catch(err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while saving the annotation.' });
  }
}

exports.vesselGeofenceSpeedAlert = async (req, res) => {
  try{
    
    const {imo,vesselName,geofenceId,geofenceName,speedAlert,userId} = req.body
    const alert = await vesselGeofenceModel.create({
      imo:imo,
      vesselName:vesselName,
      geofenceId:geofenceId,
      geofenceName:geofenceName,
      speedAlert:speedAlert,
      userId:userId
    });
    res.status(200).json(alert);
  }
  catch(err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while saving the annotation.' });
  }
}

// exports.realTimeController = async(req,res) => {
//   // app.get('/events', (req, res) => {
//     const headers = {
//        'Content-Type': 'text/event-stream',
//        'Access-Control-Allow-Origin': '*',
//        'Connection': 'keep-alive',
//        'Cache-Control': 'no-cache'
//     };
//     res.writeHead(200, headers);
 
//     const sendData = `data:hamzahere`;
//     res.write(sendData);
//     // res.flush();
 
//     // const clientId = genUniqId();
 
//     // const newClient = {
//     //    id: clientId,
//     //    res,
//     // };
 
//     // clients.push(newClient);
 
 
//     // req.on('close', () => {
//     //    clients = clients.filter(client => client.id !== clientId);
//     // });
// //  });
// } 

// let clients = [
//   {
//     id: "bd35b0b5-2884-4f9c-9969-337822a0ce19",
//     text: "Task 1",
//     checked: true
//  }
// ]
// const sendToAllUsers =() => {
//   for(let i=0; i<clients.length; i++){
//      clients[i].res.write(`data: ${JSON.stringify(todoState)}\n\n`);
//      clients[i].res.flush();
//   }
// }

