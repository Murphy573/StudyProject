

    $.ajax({
        type: "post",

        url: "action",
        dataType:'json',
        data: {
            param1: 123,
            param2: 456
        },
        success: function(data){

        },
        error: function(){

        }
    });

    $.ajax({
        type: "get",

        url: "action?param1=123&param2=456",
        dataType:'json',
        success: function(data){

        },
        error: function(){

        }
    });