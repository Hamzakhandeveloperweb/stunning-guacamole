const db = require("../models");
const config = require("../config/auth.config");
const Annotation = db.annotation;
const Geofence = db.geofencing;
const User = db.user;
const EventTypes = db.eventType;
const Voyage = db.voyage;
const Events = db.event;
const Alerts = db.alert


exports.getAllUsers = async (req,res) => {
  try{
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
    });
    res.status(200).json(users)
  }
  catch(err) {
    res.status(500).json(err)
  }
}

exports.getEventTypes = async (req,res) => {
  try{
    const eventTypes = await EventTypes.findAll();
    res.status(200).json(eventTypes)
  }
  catch(err) {
    res.status(500).json(err)
  }
}

exports.getUserAssignedEvents = async (req,res) => {
  try{ 
    const {userId} = req.query
    
    const eventTypes = await Events.findAll(
      {
        include: [
            {
              model: EventTypes
            },
            {
              model: User
            }
            
        ],
        }
    );
    const eventTypeName = await EventTypes.findByPk(eventTypes[0]?.dataValues.eventTypeId)
    // eventTypes.dataValues.eventTypeName = eventTypeName
    // const eventTypeName = eventTypeId

    res.status(201).json(eventTypes)
  }
  catch(err) {
    console.error(err);
    res.status(500).json(err)
  }
}

exports.getallVoyages = async (req,res) => {
  try{
    const voyage = await Voyage.findAll();
    res.status(200).json(voyage)
  }
  catch(err) {
    res.status(500).json(err)
  }
}

exports.getAnnotations = async (req, res) => {
  try{
   const userId = req.query.userId
   
   const annotation = await Annotation.findAll({
   include: [
       {
       model: User,
       where: { id: userId },
       },
   ],
   });
   res.status(201).json(annotation);

  }
  catch(err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while saving the annotation.' });
  }
}

exports.getGeofences = async (req, res) => {
  try{
   const userId = req.query.userId
   const geofences = await Geofence.findAll({
   include: [
       {
       model: User,
       where: { id: userId },
       attributes: {
        exclude: ['password'] // Exclude the 'password' field
      },
      },
   ],
   });
   res.status(201).json(geofences);
  }
  catch(err) {
  
    res.status(500).json({ error: 'An error occurred while saving the annotation.' });
  }
}

exports.getVoyageLinkedEvents = async (req, res) => {
  try{
   const userId = req.query.userId
   const linkedId = req.query.linkedId
   const events = await Events.findAll({
    where: {
      userId: userId,
      linkedId: linkedId,
    },
    include: [
      {
        model: User
      },
      {
        model: EventTypes,
      },
    ]

   });
   res.status(201).json(events);
  }
  catch(err) {
    res.status(500).json({ error: 'An error occurred' });
  }
}

exports.getUserAlerts = async (req, res) => {
  try{
   const userId = req.query.userId
   const alerts = await Alerts.findAll({
    where: {
      userId: userId
    },
    include: [
      {
        model: Geofence,
      }
    ]
   });
   res.status(201).json(alerts);
  }
  catch(err) {
    console.error(err)
    res.status(500).json({ error: 'An error occurred' });
  }
}

exports.getHere = async(req,res) => {
  try{
    res.status(200).json("hamza khan")
  }
  catch(err) {
    console.error(err)
  }
}