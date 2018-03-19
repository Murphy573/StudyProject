/**
 * Created by pengfei.li on 2017/6/20.
 */
define(["app"], function(app){
    app.register.controller("httpCtrl",['$scope', '$http', '$q',
        function($scope, $http, $q){
            $scope.nav.select = "http";

            //为什么要使用Promise
            $scope.oldFunc = function(){
                $http.get("")
                .success(function(){
                    $http.get()
                        .success(function(){
                            //无休止地回调下去，嵌套混乱，可读性很差
                        })
                        .error(function(){

                        })
                })
                .error(function(){

                })
            }

            $scope.newFunc = function(){
                //代码解构相对清晰 then内部返回一个promise
                $http.get("").then(function(success){},function(error){}).then(function(success){}, function(error){})//继续then下去
            }

            //使用Promise实现的函数
            $scope.promiseFunc = function(data){
                var def = $q.defer();
                p(def, data).then(
                    function(msg){
                        alert(msg);//完成状态调用
                    },
                    function(msg){
                        alert(msg);//拒绝状态调用
                    },
                    function(msg){
                        alert(msg);//等待
                    }
                ).catch(function(msg){
                    alert("catch接收到了reject的数据::::" + msg)
                }).finally(function(){
                    alert("接收到了数据！");
                })

            }

            function p(def, data){
                //状态变更不可逆
                if(angular.isNumber(data)){
                    def.resolve("该函数接收到的是数字")//resolve设置为完成状态
                }
                else if(angular.isString(data)){
                    def.reject("该函数接收到的是字符串")//设置为拒绝状态
                }
                else{
                    setTimeout(function(){
                        def.notify("等待执行");
                        def.resolve("等待完毕");
                    }, 2000)
                }

                return def.promise
            }

            $scope.allFunc = function(){
                $q.all([all1(), all2()]).then(function(res){
                    alert(angular.toJson(res))
                })
            }

            function all1(){
                return "+++all1";
            }
            function all2(){
                return "+++all2";
            }

            $scope.whenFunc = function(){
                $q.when("a").then(function(res){
                    alert(res)
                });

                $q.when((function(){return "执行when"})()).then(function(res){
                    alert(res)
                });
            }
    }]);
});

