/**
 * Created by pengfei.li on 2017/6/20.
 */
/**
 * Created by pengfei.li on 2017/6/20.
 */
define(["app"], function(app){
    app.register.controller("dataBindCtrl",['$scope', function($scope){
        $scope.nav.select = "dataBind";
        this.tmp = {
            name: "tmpName",
            id: "12345"
        }
    }]);
});

