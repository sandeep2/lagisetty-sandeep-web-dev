/**
 * Created by Sandeep on 6/11/2016.
 */
(function(){
    angular
        .module("wamDirectives",[])
        .directive("wamSortable",wamSortable);

    function wamSortable(){
        function link(scope,element,attributes){
            var widgets = scope.widgets;
            var start = -1;
            var end = -1;

            $(element).sortable({
                axis: 'y',
                start: function(event,ui){
                    start = ui.item.index();
                },
                stop: function(event,ui){
                    end = ui.item.index();
                    var elementPicked = scope.widgets.splice(start,1)[0];
                    scope.widgets.splice(end,0,elementPicked);
                    scope.$apply();
                    scope.sort({start:start,end: end});
                }
            });
        }

        return{
            scope: {
                widgets: "=",
                sort: "&sorted"
            },
            link:link
        }
    }
})();