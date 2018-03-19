/**
 * Created by pengfei.li on 2017/6/20.
 */
define(function(){
    var app = require("app");
    app.register.controller("mainController",['$scope',function($scope){
        $scope.nav = {
            select: "introduce",
            clickNav: function(type){
                this.select = type;
            }
        };

    }]);
});
