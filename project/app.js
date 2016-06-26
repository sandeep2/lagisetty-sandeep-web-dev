/**
 * Created by slagisetty on 6/18/2016.
 */
module.exports = function(app){
    var models = require("./models/models.js")();
    require("./services/user.service.server.js")(app,models);
    require("./services/admin.service.server")(app,models);
};