/**
 * Created by pengfei.li on 2017/6/19.
 */
define(["app"], function(app){
    app.filter("myFilter", ["$http", "$q", function($http, $q){
        var _func = function(input, param1, param2){
            if(angular.isNumber(param1)){
                input *= param1;
            }
            if(angular.isNumber(param2)){
                input *= param2
            }
            return input
        }
        return _func
    }]);
});