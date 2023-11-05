const { authJwt } = require("../middleware");
const controller = require("../controllers/common.controller");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/",
    controller.getHere
  );

  app.get(
    "/api/Annotations/All",
    controller.getAnnotations
  );

  app.get(
    "/api/geofences/All",
    controller.getGeofences
  );

  app.get(
    "/api/users/All",
    controller.getAllUsers
  );

  app.get(
    "/api/eventTypes/All",
    controller.getEventTypes
  );

  app.get(
    "/api/events/Assigned",
    controller.getUserAssignedEvents
  );

  app.get(
    "/api/voyage/All",
    controller.getallVoyages
  );

  app.get(
    "/api/voyageEvents",controller.getVoyageLinkedEvents
  )

  app.get(
    "/api/alerts/All",controller.getUserAlerts
  )
};