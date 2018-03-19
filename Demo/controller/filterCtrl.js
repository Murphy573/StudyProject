/**
 * Created by pengfei.li on 2017/6/20.
 */
define(["app"], function(app){
    app.register.controller("filterCtrl",['$scope', "$filter",
        function($scope, $filter){
            $scope.nav.select = "filter";
            $scope.filterData = [
                {name: "zhangsan", age: 12},
                {name: "lisi", age: 13},
                {name: "wangwu", age: 9},
                {name: "wangwu1", age: 9}
            ];
            $scope.func = function(v){
                return v.name.indexOf("w") > -1;
            }

            $scope.alertFilter = function(){
                alert($filter("json")($filter("orderBy")($scope.filterData, ["age", "name"])))
            };

    }]);
});

