/**
 * Created by Sandeep on 6/11/2016.
 */
module.exports = function(){

    var mongoose = require("mongoose");
    var PageSchema = require("./page.schema.server")();
    var Page = mongoose.model("Page",PageSchema);

    var api = {
        createPage: createPage,
        findAllPages:findAllPages,
        findPageById: findPageById,
        deletePage: deletePage,
        updatePage: updatePage
    };
    return api;

    function createPage(id,page){
        delete page._id;
        page._website = id;
        return Page.create(page);
    }

    function findAllPages(id){
        return Page.find({_website:id});
    }

    function findPageById(id){
      return Page.findById(id);
    }

    function updatePage(id,page){
        return Page.update(
            {_id:id},
            {$set:
            {
                name: page.name,
                title: page.title
            }}
        );
    }

    function deletePage(id){
        return Page.remove({_id:id});
    }

};