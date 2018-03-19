/**
 * Created by pengfei.li on 2017/4/18.
 */
;

var myApp = angular.module('myApp', []);

myApp.directive("replaceEle", function(){
    return {
        restrict: "E",
        template: "<div> replaceEle</div>",
        replace: true,
        link : function(scope, element, attrs) {
        }
    };
})

myApp.directive("hello", function(){
    return {
        restrict: 'E',
        template: '<div>Hi there <span ng-transclude></span></div>',
        transclude: true,
        replace: true
    };
})

/***
 * 指令template为函数---curElm:使用此指令的元素， curAttrs:此元素的属性
 */
myApp.directive("funcTemp", function(){
    return {
        restrict: 'ECA',
        template: function(curElm, curAttrs){//可以是字符串或者函数
            return "<div>111111</div>"
        },
        transclude: true//把指定标签换成模板，但是标签内部的内容结构不变
    };
})

//templageUrl:（1）一个代表HTML文件路径的字符串（2）一个函数，可接受两个参数Element和Attrs
/*myApp.directive("tempUrl", function(){
    return {
        restrict: 'ECA',
        templateUrl: "tempUrl.html",
    };
})*/

/**
 * scope
 （1）默认值false。表示继承父作用域;
 （2）true。表示继承父作用域，并创建自己的作用域（子作用域）;
 （3）{}。表示创建一个全新的隔离作用域；
 * */
myApp.directive("childScope", function(){
    return {
        restrict: 'ECA',
        template: function(curElm, curAttrs){//可以是字符串或者函数
            return "<div><div>child:<input type='text' ng-model='name'/></div></div>"
        },
        scope: true
    };
})

//scope: @
myApp.directive("scopeAite", function(){
    return {
        restrict: 'ECA',
        template: function(curElm, curAttrs){//可以是字符串或者函数
            return "@child:<input type='text' ng-model='aite1'/>"//ng-model=当前属性名称
        },
        scope: {
            aite1: "@"//绑定一个局部 scope 属性到当前 dom 节点的属性值
        }
    };
})

//scope: =
myApp.directive("scopeEqual", function(){
    return {
        restrict: 'ECA',
        template: function(curElm, curAttrs){//可以是字符串或者函数
            return "@child:<input type='text' ng-model='equal'/>"//ng-model此时可以直接属性equal(值为equal)
        },
        scope: {
            equal: "="//equal属性值等于父的ng-model绑定的值
        }
    };
})

/**
 *封装MiniColors
 */
myApp.directive("miniColors", function(){
    return {
        restrict: 'ECA',
        scope: {
            color: "="
        },
        terminal: true,//在此优先级之后的所有指令都不执行
        link: function($scope, curElm, curAttr){
            curElm.val(curAttr.value);
            curElm.minicolors({
                change: function(color, opacity) {
                    if(!color){
                        return;
                    }
                    $scope.color = color;
                    $scope.$apply();
                    console.log("child color: " + color);
                },
                theme: 'bootstrap'
            });
        }
    };
})


myApp.directive("myDirective", function(){
    return {
        restrict: 'ECA',
        template: function(curElm, curAttrs){//可以是字符串或者函数
            debugger
            return "<div ng-transclude>child:<input type='text' ng-model='name'/></div>"
        },
        replace: true
    };
})

/**
 *封装分页
 */
myApp.directive("ngPagination", function(){
    return {
        restrict: 'ECA',
        scope: {
            pageparams: "="
        },
        link: function($scope, curElm, curAttr){
            $(curElm[0]).page({
                total: $scope.pageparams.total,//总数据数
                pageSize: $scope.pageparams.pageSize,//每页显示数据条数
                pageBtnCount: 9,//显示分页按钮数量（推荐设置奇数）：包括上一页下一页首页尾页按钮
                showFirstLastBtn: true,//是否显示首页和尾页
                firstBtnText: "首页", //自定义首页按钮显示内容
                lastBtnText: "尾页", //自定义尾页按钮显示内容
                prevBtnText: "上一页",//自定义上一页按钮显示内容
                nextBtnText: "下一页",//自定义下一页按钮显示内容
                loadFirstPage: true, //是否加载第一页数据（如果设置为false，需传入total）
                showInfo: true,//是否显示分页信息
                infoFormat: "共{total}条  页码：{currentPageIndex}/{pageCount}",//{start} ~ {end} of {total} entires  自定义分页信息（{start}，{end}，{total}会替换成对应数值）
                showJump: true,//是否显示跳转按钮
                jumpBtnText: "GO",//跳转按钮显示内容
                showPageSizes: true,//是否显示每页数据数按钮
                pageSizeItems: [15, 20, 30, 40],//自定义每页数据数
            }).on("pageClicked", function (event, pageIndex, a, b) {
                $scope.pageparams.currentPage = pageIndex + 1;
                $scope.$apply();
                $scope.pageparams.callBack();
            }).on('jumpClicked', function (event, pageIndex) {
                $scope.pageparams.currentPage = pageIndex + 1;
                $scope.$apply();
                $scope.pageparams.callBack();
            }).on('pageSizeChanged', function (event, pageSize) {
                $scope.pageparams.currentPage = 1;
                $scope.pageparams.pageSize = pageSize;
                $scope.$apply();
                $scope.pageparams.callBack();
            });
            //监听总数：发生变化更新总页码并重新渲染
            $scope.$watch("pageparams.total", function(){
                $(curElm[0]).page("_updateTotal", $scope.pageparams.total);
                $(curElm[0]).page("_remoteOrRender", $scope.pageparams.currentPage - 1);
            });

            //监听当前页：发生变化重新渲染
            $scope.$watch("pageparams.currentPage", function(){
                $(curElm[0]).page("_remoteOrRender", $scope.pageparams.currentPage - 1);
            })
        }
    };
})

myApp.controller("myController", function($scope){
    $scope.name = "a";
    $scope.aite = "@";
    $scope.colorValue = "#f01120";
    $scope.equalV = "======";
    $scope.$watch('colorValue', function(){
        //alert($scope.colorValue);
        console.log("parent color: " +  $scope.colorValue);
    });

    $scope.pageParams = {
        total: 563,
        pageSize: 15,
        currentPage: 1,
        callBack: query
    };

    $scope.pageParams1 = {
        total: 100,
        pageSize: 15,
        currentPage: 1,
        callBack: query1
    };

    var s = false;
    function query(){
        console.log("==========================")
        console.log("当前页: " + $scope.pageParams.currentPage);
        console.log("每页条数: " + $scope.pageParams.pageSize);
        console.log("总条数: " + $scope.pageParams.total);
    }

    $scope.changeCurPage = function(){
        $scope.pageParams.currentPage = 2;
        console.log("改变当前页为: " + $scope.pageParams.currentPage)
    }

    $scope.changeTotal = function(){
        $scope.pageParams.total += 100;
    }



    var ss = false;
    function query1(){
        console.log("***********************")
        console.log("query1当前页: " + $scope.pageParams1.currentPage);
        console.log("query1每页条数: " + $scope.pageParams1.pageSize);
        console.log("query1总条数: " + $scope.pageParams1.total);
        if(!ss){
            $scope.pageParams1.total += 200;
            $scope.$apply();
            ss = true;
        }

    }


    //分页
    /*$("#page").page({
        total: 1000,//总数据数
        pageSize: 15,//每页显示数据条数
        pageBtnCount: 9,//显示分页按钮数量（推荐设置奇数）：包括上一页下一页首页尾页按钮
        showFirstLastBtn: true,//是否显示首页和尾页
        firstBtnText: "首页", //自定义首页按钮显示内容
        lastBtnText: "尾页", //自定义尾页按钮显示内容
        prevBtnText: "上一页",//自定义上一页按钮显示内容
        nextBtnText: "下一页",//自定义下一页按钮显示内容
        loadFirstPage: true, //是否加载第一页数据（如果设置为false，需传入total）
        showInfo: false,//是否显示分页信息
        infoFormat: "",//{start} ~ {end} of {total} entires  自定义分页信息（{start}，{end}，{total}会替换成对应数值）
        showJump: true,//是否显示跳转按钮
        jumpBtnText: "跳到",//跳转按钮显示内容
        showPageSizes: true,//是否显示每页数据数按钮
        pageSizeItems: [15, 20, 30, 40],//自定义每页数据数
        /!*remote: {
            url: "../javascripts/jquery/JqueryPagination/data.json",
            params: {userName: "aaa", userAccount: "bbb"},
            callback: function(a, b, c, d, e){
                debugger;
                var s = a;
            },
            success: function (data, pageIndex) {
                debugger;
                var s = pageIndex;
            },
            beforeSend: function(XMLHttpRequest){
                //...
            },
            complete: function(XMLHttpRequest, textStatu){
                //...
            },
            pageIndexName: 'currentPage',
            pageSizeName: 'pageSize',
            totalName: 'total'
        },*!/
    }).on("pageClicked", function (event, pageIndex, a, b) {
        debugger;
        alert(pageIndex);
        //$("#eventLog").append('EventName = pageClicked , pageIndex = ' + pageIndex + '<br />');
    }).on('jumpClicked', function (event, pageIndex) {
        //$("#eventLog").append('EventName = jumpClicked , pageIndex = ' + pageIndex + '<br />');
    }).on('pageSizeChanged', function (event, pageSize) {
        //$("#eventLog").append('EventName = pageSizeChanged , pageSize = ' + pageSize + '<br />');
    });*/

    function log(){
        var args = Array.prototype.slice.call(arguments);
        args.unshift('(app)');
        console.log.apply(this, args);
    }

    log(1,3,4,5,6)
});