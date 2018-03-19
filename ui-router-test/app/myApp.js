/**
 * Created by pengfei.li on 2017/4/24.
 */

var app = angular.module("myApp", ["ui.router"]);

app.config(function($stateProvider, $urlRouterProvider){

    //$urlRouterProvider.when("/manager", "/manager/list");
    $stateProvider
        .state('manager', {
            abstract: true,//不能被显示地激活，只能通过子类去隐式去激活
            url: "/manager",
            views: {
                'indexView': {
                    templateUrl: "views/manager.html",
                    /*controller: function($state){
                        $state.go('manager.list');//默认显示第一个tab
                    }*/
                }
            }

        })
        .state('manager.list', {
            url: "/list",
            views: {
                'manager': {
                    templateUrl: "views/list.html"
                }
            }
        })
        .state('manager.detail', {
            url: "/detail",
            views: {
                'manager': {
                    templateUrl: "views/detail.html"
                }
            },

            // resolve: {
            //     //myservice: "service",//必须是已经声明的service
            //     user: function(){
            //         return {
            //             name: "侏儒",
            //             age: 80
            //         }
            //     }
            // },
            controller: "detailCtrl"
        })
        .state('manager.footer', {
            url: "/footer",
            views: {
                'manager': {
                    templateUrl: "views/footer.html"
                }
            }
        })
});
