/**
 * Created by pengfei.li on 2017/7/5.
 */
;
define(['app'], function(app){

    function dynamicController(){

    }
    dynamicController.prototype = {
        constructor: dynamicController,
        register: function(elmId, name, func){
            $("#" + elmId).attr("ng-controller", name);
            app.register.controller(name, func);
            $("#" + elmId).injector().invoke(function($compile, $rootScope) {
                $compile($("#"+elmId))($rootScope);
            });
        }
    }

    return new dynamicController();
});