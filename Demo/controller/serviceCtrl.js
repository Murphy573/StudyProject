/**
 * Created by pengfei.li on 2017/6/20.
 */
define(["app"], function(app){
    app.register.controller("serviceCtrl",['$scope', 'dataFactory', 'data', 'dataService',
        function($scope, dataFactory, data, dataService){
            $scope.nav.select = "service";
            //data.setData(2222);
            data.getData();
            $scope.setData = function(){
                dataFactory.setData(2222);
                alert("serviceCtrl:" +  dataFactory.getData());
            }

            $scope.$on("emit2Parant", function(event, msg){
                $scope.$broadcast("broadcast2Child", msg)
            });
            dataFactory.name = 3;
    }]);

    app.register.controller("child1",['$scope', 'dataFactory', 'data', 'dataService',
        function($scope, dataFactory, data, dataService){
            dataFactory.setData(33333);

            $scope.emit = function(){
                $scope.$emit("emit2Parant", "来自child1的事件传播！")
            }
            alert(dataFactory.name);
    }]);

    app.register.controller("child2",['$scope', 'dataFactory', 'data', 'dataService',
        function($scope, dataFactory, data, dataService){
            console.log("child2:" + dataFactory.getData());
            $scope.$on("broadcast2Child", function(event, msg){
                alert(msg);
            });
    }]);
});

