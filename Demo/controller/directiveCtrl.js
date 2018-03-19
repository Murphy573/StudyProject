/**
 * Created by pengfei.li on 2017/6/20.
 */
define(["app"], function(app){
    app.register.controller("directiveCtrl",['$scope',
        function($scope){
            $scope.nav.select = "directive";

            $scope.data1 = 1;
            $scope.data2 = 2;
            $scope.directiveData = {
                data1: "a",
                data2: "b",
                func: function(){

                    alert(this.data2)
                }
            };
    }]);

});

