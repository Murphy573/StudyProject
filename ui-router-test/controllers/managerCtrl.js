/**
 * Created by pengfei.li on 2017/4/24.
 */


app.controller("managerCtrl", function($scope, $state, $stateParams) {
    $scope.tabParams = {
        currentTab: "list",
        detailUserInfo: null,
        listLength: 6,
        switchTab: function(curTab, routerUrl, routerParamName, routerParamValue){
            if($state.current.name === routerUrl){
                // return;
            }
            this.currentTab = curTab;
            if(routerUrl && typeof routerUrl === "string"){
                this[routerParamName] = routerParamValue;
                if(routerParamName && typeof routerParamName === "string" && routerParamName !== ""){
                    var paramObj = {};
                    paramObj[routerParamName] = typeof routerParamValue === "object" ? JSON.stringify(routerParamValue) : routerParamValue;
                    $state.go(routerUrl);
                }
                else{
                    $state.go(routerUrl);
                }
            }
        }
    }
});


/*
$.ajax({
    type:"POST",//或者GET
    async: false,//true:异步请求,默认是true；；；false：同步请求
    url: "这里写后台请求链接",
    data: "",//Object或String
    dataType: "",//设定服务器返回的数据类型:xml/html/json/text/script
    success: function(data, status){

    },
    error: function(XMLHttpRequest, textStatus, errorThrown){

    }
})*/
