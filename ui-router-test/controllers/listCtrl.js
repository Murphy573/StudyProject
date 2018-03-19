/**
 * Created by pengfei.li on 2017/4/24.
 */

app.controller("listCtrl", function($scope){
    $scope.tabParams.currentTab = "list";
    $scope.list = [
        {name: "zhangsan", age: 18},
        {name: "lisi", age: 18},
        {name: "wangwu", age: 18}
    ]

});
