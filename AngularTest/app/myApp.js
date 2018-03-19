;

var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function($routeProvider){
    // $routeProvider.when('/forum', {
    //     templateUrl: "views/Forum.html",
    //     controller: "forumCtrl",
    // }).when('/publish', {
    //     templateUrl: "views/Publish.html",
    //     controller: "publishCtrl",
    // }).otherwise({
    //     redirectTo : "/publish"
    // })
});

myApp.controller('myController', function($scope){
    $scope.hello = "zhizhi";

    $scope.selectList = [
        {
            name: 'a',
            value: 11
        },
        {
            name: 'b',
            value: 22
        },
        {
            name: 'c',
            value: 33
        },
        {
            name: 'd',
            value: 44
        }];
    //$('#maxOption2').val(['a'])
    //$('#maxOption2').selectpicker('refresh');
    //$('#maxOption2').selectpicker('render');

    $scope.isInSelects = ['a','c', 'b'];

    /*$scope.showValues = function(){
        alert($('#').selectpicker('val', 'Mustard'));
    }

    $scope.xxxx = "";



    $('#maxOption2').on('changed.bs.select', function (e, v , c,d,f,g) {
        // do something...
        var s = $('#maxOption2').selectpicker('val');
        var s = e;
    });*/
    /////////////////////
    $scope.list = [
        {'id': 101},
        {'id': 102},
        {'id': 103},
        {'id': 104},
        {'id': 105},
        {'id': 106},
        {'id': 107}
    ];
    $scope.m = [];
    $scope.checked = [];
    $scope.selectAll = function () {
        if($scope.select_all) {
            $scope.checked = [];
            angular.forEach($scope.list, function (i) {
                i.checked = true;
                $scope.checked.push(i.id);
            })
        }else {
            angular.forEach($scope.list, function (i) {
                i.checked = false;
                $scope.checked = [];
            })
        }
        console.log($scope.checked);
    };
    $scope.selectOne = function () {
        angular.forEach($scope.list , function (i) {
            var index = $scope.checked.indexOf(i.id);
            if(i.checked && index === -1) {
                $scope.checked.push(i.id);
            } else if (!i.checked && index !== -1){
                $scope.checked.splice(index, 1);
            };
        })

        if ($scope.list.length === $scope.checked.length) {
            $scope.select_all = true;
        } else {
            $scope.select_all = false;
        }
        console.log($scope.checked);
    }
})
