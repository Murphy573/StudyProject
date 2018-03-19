/**
 * Created by pengfei.li on 2017/6/19.
 */
;
/**
 * ./ 当前目录
    ../ 父级目录
    / 根目录
 */
require.config({
    baseUrl: "./",//require会默认的将data-main指定的js为根路径
    paths: {//定义各个JS框架路径名,不用加后缀 .js
        app: "common/app",
        jquery: "common/lib/jquery/jquery-1.10.2",
        bootstrap: "common/lib/bootstrap/bootstrap-3.3.7",
        router: "common/lib/angular/angular-ui-router-v0.2.18",
        angular: "common/lib/angular/angular",
        directive: "common/directive",
        service: "common/service",
        filter: "common/filter",
    },
    map: {//map提供了统一脚本，不同版本的支持
        "*": {
            "css": "common/lib/require/require-css"
        }
    },
    /**
     *
     */
    shim: {//配置依赖关系，别名等
        jquery: {
            exports: "jquery"
        },
        bootstrap : {
            deps : [ 'jquery' ],
        },
        app: {
            deps: ['angular', 'router']
        },
        router : {
            deps : [ 'angular' ]
        },
        service: {
            deps: ["app"]
        },
        directive: {
            deps: ["app"]
        },
        filter: {
            deps: ["app"]
        }
    },
    /*callback: function(){
        console.log("loaded !!!");
    },*/
    //urlArgs: "time=" +  new Date().getTime()
});

require(["css!common/lib/bootstrap/bootstrap.min-3.3.7.css"], function(){
    require(["bootstrap"], function(){
        require(["app"], function(){
            require(["service", "directive", "filter"], function(){
                angular.element(document).ready(function(){
                    angular.bootstrap(document, [ 'app' ]);
                });
            });
        });
    });
});

