;
!function (angular) {
    angular.module("ng-pagination", [])
        .constant('ngPaginationConfig', {
            visiblePageCount: 7,//显示多少个页码
            firstText: '首页',//首页的描述
            lastText: '尾页',//尾页的描述
            prevText: '上一页',//上一页的描述
            nextText: '下一页',//下一页的描述
            showIfOnePage: true,//只有一页的时候是否显示
            showFirstLastText: true,//是否显示首页和尾页
            gotoText: '跳转到',//跳转按钮描述
            showGoto: false,//是否显示跳转
            pageSizeItems: [10, 15, 20, 25]//每页显示多少条数据配置
        }).directive("pager", ['ngPaginationConfig', function (ngPaginationConfig) {
        return {
            replace: true,
            restrict: "E",
            scope: {
                pageParams: '=',
                onPageChange: '&'
            },
            link: function (scope, element, attrs) {
                var visiblePageCount = angular.isDefined(attrs.visiblePageCount) ? attrs.visiblePageCount : ngPaginationConfig.visiblePageCount;
                scope.firstText = angular.isDefined(attrs.firstText) ? attrs.firstText : ngPaginationConfig.firstText;
                scope.lastText = angular.isDefined(attrs.lastText) ? attrs.lastText : ngPaginationConfig.lastText;
                scope.prevText = angular.isDefined(attrs.prevText) ? attrs.prevText : ngPaginationConfig.prevText;
                scope.nextText = angular.isDefined(attrs.nextText) ? attrs.nextText : ngPaginationConfig.nextText;
                scope.showFirstLastText = angular.isDefined(attrs.showFirstLastText) ? attrs.showFirstLastText : ngPaginationConfig.showFirstLastText;
                scope.showIfOnePage = angular.isDefined(attrs.showIfOnePage) ? attrs.showIfOnePage : ngPaginationConfig.showIfOnePage;
                scope.gotoText = angular.isDefined(attrs.gotoText) ? attrs.gotoText : ngPaginationConfig.gotoText;
                scope.showGoto = angular.isDefined(attrs.showGoto) ? attrs.showGoto : ngPaginationConfig.showGoto;
                scope.pageSizeItems = angular.isDefined(attrs.pageSizeItems) ? JSON.parse(attrs.pageSizeItems) : ngPaginationConfig.pageSizeItems;
                scope.pageParams.pageSize = parseInt(scope.pageSizeItems[0]);//每页显示多少条数据:初始化默认取数组第一个

                //页码改变
                scope.pageChange = function (page) {
                    if (page >= 1 && page <= scope.pageCount) {
                        scope.pageParams.currentPage = page;
                    } else {
                        scope.pageParams.currentPage = 1;
                    }
                };

                scope.keyupHanlder = function (e) {
                    var value = e.target.value;
                    var parsedValue = parseInt(value, 10);
                    if (!Number.isNaN(parsedValue)) {
                        if (parsedValue >= 1 && parsedValue <= scope.pageCount) {

                        }
                        else if (parsedValue < 1) {
                            e.target.value = 1;
                        }
                        else {
                            e.target.value = scope.pageCount;//大于总页码就赋值为总页码
                        }
                        //enter提交
                        if (e.keyCode === 13) {
                            scope.pageParams.currentPage = parsedValue;
                        }
                    }
                    else {
                        if (e.preventDefault) {
                            e.preventDefault();
                        }
                        else {
                            return false;
                        }
                    }
                };

                //计算总页码
                scope.getPageCount = function () {
                    scope.pageCount = Boolean(parseInt(scope.pageParams.total) % parseInt(scope.pageParams.pageSize)) ? parseInt(((parseInt(scope.pageParams.total) / parseInt(scope.pageParams.pageSize)) + 1)) :
                        parseInt(parseInt(scope.pageParams.total) / parseInt(scope.pageParams.pageSize));

                };
                scope.getPageCount();

                //pagenums改变页码渲染
                function build() {
                    var low, high, v;

                    scope.pagenums = [];

                    if (scope.pageCount === 0) {
                        return;
                    }
                    if (scope.pageParams.currentPage > scope.pageCount) {
                        scope.pageParams.currentPage = 1;
                    }

                    if (scope.pageCount <= visiblePageCount) {
                        low = 1;
                        high = scope.pageCount;
                    } else {
                        //根据可显示的页码数量一分为二，current - v|1为最低起始页码,low+可显示数量-1|pageCount为结束页码
                        v = Math.ceil(visiblePageCount / 2);
                        low = Math.max(scope.pageParams.currentPage - v, 1);
                        high = Math.min(low + visiblePageCount - 1, scope.pageCount);
                        //如果总页码-结束页码小于v
                        if (scope.pageCount - high < v) {
                            low = high - visiblePageCount + 1;
                        }
                    }

                    //重装页码数
                    for (; low <= high; low++) {
                        scope.pagenums.push(low);
                    }
                }

                //监听代码段
                scope.$watch('pageParams.currentPage', function (a, b) {
                    if (a !== b) {
                        build();
                        scope.onPageChange();//调用controller中绑定的方法
                    }
                });

                scope.$watch('pageCount', function (a, b) {
                    if (!!a) {
                        build();
                        scope.pageParams.currentPage = 1;
                    }
                });

                //总数发生变化
                scope.$watch('pageParams.total', function (a, b) {
                    if (!!a && a !== b) {
                        scope.getPageCount();
                    }
                });
            },
            template: '<div class="ng-pagination"><ul ng-if="pageCount>1 || showIfOnePage"><li ng-click="pageChange(1)" ng-if="showFirstLastText">{{firstText}}</li>' +
            '<li ng-click="pageChange(pageParams.currentPage-1>0?currentPage-1:1)">{{prevText}}</li>' +
            '<li ng-repeat="pagenum in pagenums track by pagenum" ng-click="pageChange(pagenum)" ng-class="{active:pageParams.currentPage===pagenum}">{{pagenum}}</li>' +
            '<li ng-click="pageChange(pageParams.currentPage+1<=pageCount?pageParams.currentPage+1:pageCount)">{{nextText}}</li>' +
            '<li ng-click="pageChange(pageCount)" ng-if="showFirstLastText">{{lastText}}</li></ul>' +
            '<label ng-if="showGoto">{{gotoText}}<input type="text" ng-keyup="keyupHanlder($event)"></label>' +
            '<label><select ng-model="pageParams.pageSize" ng-change="getPageCount()"><option ng-repeat="item in pageSizeItems track by $index">{{item}}</option></select></label></div>'
        }
    }]);
}(angular);
