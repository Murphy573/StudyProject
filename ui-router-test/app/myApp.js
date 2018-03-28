/**
 * Created by pengfei.li on 2017/4/24.
 */

var app = angular.module("myApp", ["ui.router"]);

app.config(function ($stateProvider, $urlRouterProvider) {
    /**
     * 视图名称 - 相对命名与绝对命名
             在定义views属性时，如果视图名称中包含@，那么视图名称就是绝对命名的方式，否则就是相对命名的方式。
             相对命名的意思是相对于父模板中的ui-view，而绝对命名则指定了相对于哪个状态的模板。

            在 ui-router 内部，views属性中的每个视图都被按照viewname@statename的方式分配为绝对名称，
            viewname是目标模板中的ui-view对应的名称，
            statename是状态的名称，状态名称对应于一个目标模板。
            @前面部分为空表示未命名的ui-view，@后面为空则表示相对于根模板，通常是 index.html。
     */
    //$urlRouterProvider.when("/manager", "/manager/list");
    $stateProvider
        .state("index", {
            url: '/index',
            views: {
                'index': {
                    templateUrl: "views/index.tmp.html",
                    resolve: {
                        myData: function ($q) {
                            var def = $q.defer();
                            setTimeout(() => {
                                def.resolve('这是从resolve中传递过来的数据');
                            }, 2000);
                            return def.promise;
                        }
                    },
                    controller: 'indexCtrl',
                    controllerAs: 'ctrl'
                },
                //这里必须要绝对定位
                'header@index': {template: "<div>头部内容header</div>"},
                'nav@index': {template: "<div>菜单内容nav</div>"},
                'body@index': {template: "<div>展示内容contents</div>"}
            },
        })
        //绝对定位
        .state("index.content1", {
            url: '/content1/?sort&param',
            views: {
                //'body@index'表示名为body的view使用index状态下的模板
                'body@index': {
                    template: "<div ui-view='body'></div><div style='background-color: red;height: 20px;width: 100px;'></div>",
                    controller: function ($stateParams) {
                        console.log($stateParams.sort + '=================' + Math.random())
                    }
                },
                'body@index.content1': {//可去掉@查看html节点有什么不同
                    template: "<div>content11111111111111111</div>",

                },
            },

        })
        //相对定位：该状态的里的名为body的ui-view为相对路径下的（即没有说明具体是哪个模板下的）
        .state("index.content2", {
            url: '/content2',
            views: {
                'body': {template: "<div>content2222222222222222222</div>"}//
            }
        })
});
