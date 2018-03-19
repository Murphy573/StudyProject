define(['router', 'common/routes/routePath'],function(router, routePath){
    var myApp = angular.module("app", ['ui.router']);

    //使用promise对象异步加载controllers等
    myApp.resolveFunc = function(loaders){
        return function($q){
            if(!angular.isArray(loaders)){
                return null;
            }
            var deferred = $q.defer();
            //异步加载controller／directive/filter/service
            require(loaders, function() {
                deferred.resolve();
            });
            return deferred.promise;
        }
    };

    myApp.config(function($controllerProvider,$compileProvider,$filterProvider,$provide){
        myApp.register = {
            //得到$controllerProvider的引用,用来做按需加载
            controller : $controllerProvider.register,
            //保存directive／filter／service的引用
            directive: $compileProvider.directive,
            filter: $filterProvider.register,
            service: $provide.service
        };
    });


    myApp.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

        /*require(routePath, function(){
            var configs = [];
            for(var i = 0, len = arguments.length; i < len; i++){
                configs = configs.concat(arguments[i]);
            }
            angular.forEach(configs, function(v, i){
                var _obj = {
                    url: v.stateConfig.url,
                    views: v.stateConfig.views,
                    resolve: {
                        loadCtrl: myApp.resolveFunc(v.stateConfig.resolveList)
                    }
                };
                $stateProvider.state(v.stateName, _obj);
            });
            console.log(2222)
            $urlRouterProvider.when("/index/introduce", "/index/introduce");
        });*/
        $stateProvider
            .state("index", {
                url: "/index",
                views: {
                    'index': {
                        templateUrl: "views/main.html"
                    }
                },
                resolve: {
                    load: myApp.resolveFunc(["./controller/mainController"])
                }
            })
            .state("index.introduce", {
                url: "/introduce",
                views: {
                    'detail': {
                        templateUrl: "views/introduce.html"
                    }
                }
            })
            .state("index.dataBind", {
                url: "/dataBind",
                views: {
                    'detail': {
                        templateUrl: "views/dataBind.html"
                    }
                },
                resolve: {
                    load: myApp.resolveFunc(["./controller/dataBindCtrl"])
                }
            })
            .state("index.inherit", {
                url: "/inherit",
                views: {
                    'detail': {
                        templateUrl: "views/inherit.html"
                    }
                },
                resolve: {
                    load: myApp.resolveFunc(["./controller/inheritCtrl"])
                }
            })
            .state("index.service", {
                url: "/service",
                views: {
                    'detail': {
                        templateUrl: "views/service.html"
                    }
                },
                resolve: {
                    load: myApp.resolveFunc(["./controller/serviceCtrl"])
                }
            })
            .state("index.filter", {
                url: "/filter",
                views: {
                    'detail': {
                        templateUrl: "views/filter.html"
                    }
                },
                resolve: {
                    load: myApp.resolveFunc(["./controller/filterCtrl"])
                }
            })
            .state("index.http", {
                url: "/http",
                views: {
                    'detail': {
                        templateUrl: "views/http.html"
                    }
                },
                resolve: {
                    load: myApp.resolveFunc(["./controller/httpCtrl"])
                }
            })
            .state("index.directive", {
                url: "/directive",
                views: {
                    'detail': {
                        templateUrl: "views/directive.html"
                    }
                },
                resolve: {
                    load: myApp.resolveFunc(["./controller/directiveCtrl"])
                }
            })
            .state("index.upload", {
                url: "/upload",
                views: {
                    'detail': {
                        templateUrl: "views/upload.html"
                    }
                },
                resolve: {
                    load: myApp.resolveFunc(["./controller/uploadCtrl"])
                }
            })
            .state("index.dynamicController", {
                url: "/dynamicController",
                views: {
                    'detail': {
                        templateUrl: "views/dynamic.html"
                    }
                },
                resolve: {
                    load: myApp.resolveFunc(["./controller/dynamicCtrl"])
                }
            })



        $urlRouterProvider.otherwise(function($injector, $location){
            return "/index/introduce"
        });
        //禁用IE缓存
        if (!$httpProvider.defaults.headers.get) {
            $httpProvider.defaults.headers.get = {};
        }
        $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
        $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';

        //$httpProvider.interceptors.push('timestampMarker');
    });

    return myApp;
})
