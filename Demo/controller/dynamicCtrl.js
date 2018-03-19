/**
 * Created by pengfei.li on 2017/6/20.
 */
define(["app"], function(app){
    app.register.controller("dynamicCtrl",['$scope', "$filter", "tabs",
        function($scope, $filter, tabs){

        $scope.nav.select = "dynamic";
        var _index = 0;
        $scope.clickBtn = function(){
            tabs.add("nav" +(++_index), "name" + (_index));
        }



    }]);

    app.register.controller("defaultCtrl",['$scope', "$filter", "tabs",
        function($scope, $filter, tabs){
            $scope.refreshData = 1;

            $scope.ref = function(){
                $scope.refreshData = 2;
            }
        }]);
});

