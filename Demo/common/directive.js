/**
 * Created by pengfei.li on 2017/6/19.
 */
define(["app"], function(app){
    app.directive("scopeTrue", function(){
        return {
            restrict: 'ECA',
            template: function(curElm, curAttrs){//可以是字符串或者函数
                return "<div><div>child:<input type='text' class='form-control' ng-model='data1'/></div></div>"
            },
            scope: true
        };
    })

    app.directive("scopeFalse", function(){
        return {
            restrict: 'ECA',
            template: function(curElm, curAttrs){//可以是字符串或者函数
                return "<div><div>child:<input type='text' class='form-control' ng-model='data1'/></div></div>"
            },
            scope: false
        };
    })

    app.directive("scopeAite", function(){
        return {
            restrict: 'ECA',
            template: function(curElm, curAttrs){//可以是字符串或者函数
                return "<div><div>child:<input type='text' class='form-control' ng-model='aiteAttr'/></div></div>"
            },
            scope: {
                aiteAttr: "@"
            }
        };
    })

    app.directive("scopeEqual", function(){
        return {
            restrict: 'ECA',
            template: function(curElm, curAttrs){//可以是字符串或者函数
                return "<div><div>child:<input type='text' class='form-control' ng-model='equalAttr'/></div></div>"
            },
            scope: {
                equalAttr: "="
            }
        };
    })

    app.directive("scopeAnd", function(){
        return {
            restrict: 'ECA',
            template: function(curElm, curAttrs){//可以是字符串或者函数
                return "<div><div>child:<input type='button' class='btn btn-primary' value='调用controller中方法'/></div></div>"
            },
            scope: {
                andAttr: "&"
            }
        };
    });

    app.directive("testController", ["$compile", function($compile){
        return {
            restrict: 'A',
            template: function(curElm, curAttrs){//可以是字符串或者函数
                return "<div class='col-sm-12'><input ng-model='model'/></div>"
            },
            scope: {},
            link: function(scope, curE, curA){
                scope.model = 1;

            }
        };
    }]);

    /**
     * 自定义上传按钮
     * 使用方法：html内部<my-file-upload></my-file-upload>
     * 属性：
     * 		on-file-change: 选择文件之后的回调
     * 		has-input: 默认不写
     * 			如果为true--将出现路径input框
     * 		file-type: 支持的文件类型，以"-"分割--用于是否显示文件名称和title
     * 		accept: 支持上传的文件格式(与原始input[type=file]相同)
     */
    app.directive("myFileUpload", [function(){
        var _config = {
            restrict: "E",
            scope: {
                onFileChange: "&"
            },
            replace: true,
            template: function(curE, curA){
                if(!curA.hasInput){//如果文件名不放在输入框
                    return '<span class="my-file-upload">'+
                        '<input type="button" ng-click="btnClick();" class="btn btn-default" value="浏览文件" />'+
                        '<span class="file">{{file.fileName}}</span>'+
                        '<input type="file" ng-model="file.file" ng-change="fileChange();" onpropertychange="fileChange()" ng-class="upload-input-file" accept="' + (curA.accept?curA.accept:"") + '"/>' +
                        '<span class="file-hidden">{{file.fileName}}</span></span>';
                }
                else{

                    return '<span class="my-file-upload">'+
                        '<input type="text" class="upload-url" ng-model="file.fileUrl"/>'+
                        '<input type="button" ng-click="btnClick();" class="btn btn-default" value="浏览文件" />'+
                        '<input type="file" ng-model="file.file" ng-change="fileChange();" ng-class="upload-input-file" accept="' + (curA.accept?curA.accept:"") + '"/></span>';
                }
            },
            link: function(scope, curE, curA){
                var $file = $(curE[0]).find("input[type=file]");
                scope.file = {
                    fileName: "未选择任何文件",
                    fileNameTitle: "",
                    fileUrl: "",
                    file: ""
                };
                scope.btnClick = function(){
                    $file.click();
                };

                scope.fileChange = function(){
                    var urlArr = $file.val().split("\\");
                    var _fileName = urlArr[urlArr.length - 1];
                    $(curE[0]).find("span.file-hidden").text(_fileName);
                    if(isAccept(_fileName)){
                        var _final = justifyFileName(_fileName);
                        scope.file.fileUrl = $file.val();
                        scope.file.fileName = _final.fileName;//截取路径并获取文件的名字
                        if(_final.isRequireTitle){
                            $(curE[0]).find("span.file").attr("title", _fileName);
                        }
                        else{
                            $(curE[0]).find("span.file").removeAttr("title");
                        }
                    }
                    else{
                        scope.file.fileName = "";
                        $(curE[0]).find("span.file").removeAttr("title");
                    }

                    scope.onFileChange();//调用controller中绑定的方法
                };

                function isAccept(fileName){
                    if(!curA.fileType || curA.fileType == ""){
                        return true;
                    }
                    var _typeList = curA.fileType.split("-");
                    var _fileType = fileName.substr(fileName.lastIndexOf(".") + 1);
                    return _typeList.indexOf(_fileType) > -1;
                }

                function justifyFileName(fileName){
                    var $spanHidden = $(curE[0]).find("span.file-hidden");
                    var _width = $spanHidden[0].offsetWidth;
                    if(_width >= fileName.length){
                        return {
                            isRequireTitle: false,
                            fileName: fileName
                        };
                    }
                    else{
                        var _suffix = fileName.substr(fileName.lastIndexOf("."));
                        _width -= _suffix.length;//后缀是要显示的
                        _width -= 3; //3个...的长度
                        var pre_suf = parseInt(_width / 2);
                        var _pre = fileName.substr(0, pre_suf);
                        var _suf = fileName.slice(-(_suffix.length), -(_suffix.length) - pre_suf);

                        return {
                            fileName: _pre + "..." + _suf + _suffix,
                            isRequireTitle: true
                        };
                    }
                }
            }
        };

        return _config;
    }]);
});