/**
 * Created by pengfei.li on 2017/6/20.
 */
define(["app"], function(app){
    app.register.controller("uploadCtrl",['$scope', '$http', '$q',
        function($scope, $http, $q){
            $scope.nav.select = "upload";

            /*$(function(){
                $(".upload .upload-input-file").change(function () {
                    if ($(this).parent().html().indexOf("class=\"upload-url\"") != -1) {
                        var fileUrl = $(this).val();
                        $(this).parent().children(".upload-url").val(fileUrl);
                    }
                    else {
                        var fileUrl = $(this).val();
                        var urlArr = fileUrl.split("\\");
                        var getName = urlArr[urlArr.length - 1];//截取路径并获取文件的名字
                        $(this).parent().children(".upload-tip").text(getName).fadeIn("slow");
                        //$(this).parent().children(".upload-btn").val(getName);//按钮上变成文件名称
                        timeout = setTimeout(function () {
                            $(".upload-tip").fadeOut("slow");
                        }, 5000);
                    }
                });
            });*/
            $scope.fileModel = "";
            $scope.onFileChange = function(){
                alert(1);
            };

            $scope.flag = false;
    }]);
});

