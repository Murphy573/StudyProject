/**
 * Created by pengfei.li on 2017/6/19.
 */
define(["app"], function(app){
    app.factory("dataFactory", ["$http", "$q", function($http, $q){
        var _data = 1;
        return {
            setData: function(data){
                _data = data;
            },
            getData: function(){
                return _data;
            },
            name: 2
        }
    }]);

    app.service("dataService", ["$http", "$q", function($http, $q){
        var _data = 1;

        this.setData = function(data){
            _data = data;
        }

        this.getData = function(){
            return _data;
        }
    }]);

    /**
     * 可以在app.config注入
     */
    app.provider("data", [function(){
        var _data = 1;
        this.data = 222;
        var setData = function(data){
            _data = data;
        }
        var getData = function(http){
            return _data;
        }
        this.$get = ["$http", "$q", function($http, $q){
            return {
                setData: setData,
                getData: function(){
                    getData($http)
                }
            }
        }]
    }]);

    app.factory("tabs", ["$compile","$rootScope", function($compile, $rootScope){

        var tabs = {
            add: function(id, name){
                $("#nav-container > .nav").append('<li id="' + id + '" role="presentation" class="active"><a>' + name + '</a></li>');
                $("#content-container").append($compile('<div test-controller id="' + id + '" class="col-sm-12"></div>')($rootScope));
                this.setActive(id);
                var _self = this;
                $("#nav-container > .nav > #" + id, "#").bind("click", function(){
                    _self.setActive($(this).attr("id"));
                });
            },
            close: function(id){
                $("li#" + id).remove();
            },
            setActive: function(id){
                $("#nav-container > .nav > #" + id).addClass("active").siblings().removeClass("active");
                $("#content-container > #" + id).show().siblings().hide();
            }
        };

        return tabs;
    }])
});