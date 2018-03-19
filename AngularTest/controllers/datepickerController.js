;

var myApp = angular.module('myApp', []);

myApp.directive("ngDatetimePicker", function(){
    return {
        restrict: 'ECA',
        scope: {
            ngDatetimePicker: "="
        },
        link: function($scope, elm, attrs){
            $(elm[0]).datetimepicker({
                format: "YYYY/MM/DD HH:mm:ss",
                locale: moment.locale("zh-cn"),
                showTodayButton: true,
                showClear: true,
                showClose: true,
                ignoreReadonly: true,
                tooltips: {
                    today: '今天',
                    clear: '清除',
                    close: '关闭',
                    selectMonth: '选择月份',
                    prevMonth: '上月',
                    nextMonth: '下月',
                    selectYear: '选择年',
                    prevYear: '上年',
                    nextYear: '下年',
                    selectTime: '选择时间'                }
            }).on("dp.change", function(e){
                if(e.date == false){
                    $scope.ngDatetimePicker = ""
                }
                else{
                    $scope.ngDatetimePicker = e.date.format("YYYY/MM/DD HH:mm:ss");
                }
                $scope.$apply();
            });
        }
    };
});


myApp.controller("datePickerController", function($scope){
    $scope.dateTIME = {
        time: 1
    }
    $scope.$watch("dateTIME.time", function(newV, oldV){
        console.log("++++++++" + newV)
    });
})