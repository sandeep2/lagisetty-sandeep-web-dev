/**
 * Created by Sandeep on 6/10/2016.
 */
module.exports = function(){
    var mongoose = require('mongoose');
    var WebsiteSchema = require("./website.schema.server")()  ;
    var Website = mongoose.model("Website",WebsiteSchema);

    var api = {
        createWebsite: createWebsite,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite,
        findAllWebsites: findAllWebsites,
        findWebsiteById: findWebsiteById
    };
    return api;

    function createWebsite(userId, website){
        website._user = userId;
        return Website.create(website);
    }

    function updateWebsite(id,website){
        return Website.update(
            {_id:id},
            {$set:
            {
                name: website.name,
                description: website.description
            }
            }
        );
    }

    function deleteWebsite(id){
        return Website.remove({_id: id});
    }

    function findAllWebsites(id){
        return Website.find({_user:id});
    }

    function findWebsiteById(id){
        return Website.findById(id);
    }

};