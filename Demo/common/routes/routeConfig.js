/**
 * Created by pengfei.li on 2017/6/19.
 */
;
define(function(){
   var _config = [
       {
           stateName: "index",
           stateConfig: {
               url: "/index",
               views: {
                   'index': {
                       templateUrl: "views/main.html"
                   }
               },
               resolveList: ["./controller/mainController"]
           }
       },
       {
           stateName: "index.introduce",
           stateConfig: {
               url: "/introduce",
               views: {
                   'detail': {
                       templateUrl: "views/introduce.html"
                   }
               },
               resolveList: ["./controller/mainController"]
           }
       }
   ];

   return _config;
});

