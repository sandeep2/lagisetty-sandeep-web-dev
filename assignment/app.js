/**
 * Created by slagisetty on 5/31/2016.
 */
module.exports = function(app){
    var models = require("./models/models.js")();
    require("./services/user.service.server.js")(app,models);
    require("./services/website.service.server.js")(app,models);
    require("./services/page.service.server.js")(app,models);
    require("./services/widget.service.server.js")(app,models);
};