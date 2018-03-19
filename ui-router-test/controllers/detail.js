/**
 * Created by pengfei.li on 2017/4/24.
 */

app.controller("detailCtrl", function($scope, $state, $stateParams){
    $scope.detail = $scope.tabParams.detailUserInfo;
    $scope.detail.age += 1;
    $scope.length = $scope.tabParams.listLength;
    $scope.length += 2;
});
