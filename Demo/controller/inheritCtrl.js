/**
 * Created by pengfei.li on 2017/6/20.
 */
/**
 * Created by pengfei.li on 2017/6/20.
 */
define(["app"], function(app){
    app.register.controller("inheritCtrl",['$scope', function($scope){
        $scope.nav.select = "inherit";
        $scope.tmp = {
            name: "tmpName",
            id: "12345"
        }
        $scope.class = {
            name1: "{{className}}",
            value1: 1,
            value2: 1,
            click: function(){
                this.value1 = 2;
            }
        };

        $scope.inputValue = 1;
        $scope.isIf = true;
        $scope.ngIfShowHide = {
            inputValue: 1,
            btnClick: function(){
                $scope.isIf = !$scope.isIf;
            }
        }
    }]);
});

