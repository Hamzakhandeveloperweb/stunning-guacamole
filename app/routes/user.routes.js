const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });


  app.get(
    "/api/user",
    [authJwt.verifyToken],
    controller.userBoard
  );

    app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );


  //Annotation
  app.post("/api/user/Annotation/Add",controller.createAnnotation)

  //Geofencing
  app.post("/api/user/Geofencing/Add",controller.createGeofence)

  //Company
  app.post("/api/admin/Company/Add",[authJwt.isSuperAdmin],controller.createCompany)

  //Events
  app.post("/api/user/Events/All",controller.createCompany)

  // Events --> Create
  app.post("/api/Event/Add",controller.createEvent)

  //Events  --> update
  app.put("/api/Event/Update",controller.updateEvent)

  //Event Time  --> update
  app.put("/api/Event/UpdateTime",controller.updateEventTime)


  //SHIPS && VAOYAGES
  app.post("/api/Ship/Add",controller.createCompany)

  app.post("/api/Voyage/Add",controller.createCompany)

  //EVENT PERMISSIONS FOR USERS
  app.post("/api/event/permission",controller.assignEventsPermission)

  //test
  app.post("/api/sa/test",[authJwt.isSuperAdmin],controller.moderatorBoard)


  //testRun
  app.get("/api/user/voyagesNew",controller.getVoyagesNew)

  //voyage,geofence alerts

  app.put('/api/vesselSpeedAlert/add',controller.vesselSpeedAlert)

  app.put('/api/geofenceSpeedAlert/add',controller.geofenceSpeedAlert)
 
  app.post('/api/vesselGeofenceSpeedAlert/add',controller.vesselGeofenceSpeedAlert)
};
