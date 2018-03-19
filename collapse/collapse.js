/**
 * Created by pengfei.li on 2017/6/28.
 */


$(function(){
    var _dataList = [
        {
            id: "ID1",
            name: "名称1",
            comment: "描述1"
        },
        {
            id: "ID2",
            name: "名称2",
            comment: "描述2"
        },
        {
            id: "ID3",
            name: "名称3",
            comment: "描述3"
        },
        {
            id: "ID4",
            name: "名称4",
            comment: "描述4"
        },
    ];



    var _renderTable = function(){
        var _html = _dataList.map(function(item, index){
            return "<tr tr-id='"+ item.id +"'><td>"+ item.id + "</td><td>" + item.name + "</td><td>" + item.comment + "</td></tr>"
        }).join("");

        return _html
    };

    var _createTRTable = function(id){
        var _trTbody = _getData(id).map(function(item){
            return "<tr><td>"+ item.id + "</td><td>" + item.name + "</td></tr>"
        }).join("");

        var _html = '<tr class="' + id + '">'+
            '<td colspan="3">'+
            '<table class="table table-striped">'+
            '<thead>'+
            '<th width="19px">子ID</th>'+
            '<th width="178px">子名称</th>'+
            '</thead>'+
            '<tbody>'+ _trTbody +
            '</tbody>'+
            '</table>'+
            '</td>'+
            '</tr>';
        return _html;
    };

    var _getData = function(id){
        if(id == "ID1"){
            return [
                {
                    id: "子ID1",
                    name: "子名称1"
                },
                {
                    id: "子ID2",
                    name: "子名称2"
                }

            ]
        }
        else{
            return [
                {
                    id: "子ID33333",
                    name: "子名称33333"
                },
                {
                    id: "子ID44444",
                    name: "子名称44444"
                }

            ]
        }
    };


    var _init = function(){
        $("table#parent>tbody").append(_renderTable())

        $("table#parent>tbody>tr").bind("click", function(){
            var _id = $(this).attr("tr-id");
            if($("." + _id).length > 0){
                $("." + _id).remove();
            }
            else{
                $(this).after(_createTRTable(_id));
            }

        })
    };
    _init();

});