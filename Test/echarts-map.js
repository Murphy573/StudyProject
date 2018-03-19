$(function(){
    var chart = echarts.init(document.getElementById('map'));
    chart.setOption({
        backgroundColor: '#404a59',
        geo: {
            show: true,
            map: 'china',
            roam: true,//支持缩放和拖动
            zoom: 1.5,
            scaleLimit: {
                min: 1,
                max: 5
            },
            nameMap: {
                'china': '中国',
                '河北': "hebei"
            },//自定义名称
            label: {
                normal: {
                    show: true,
                    textStyle: {

                    }
                },
                emphasis: {//地图区域Hover状态下的样式
                    show: false,
                    textStyle: {

                    }
                }
            },
            itemStyle: {
                normal: {
                    color: "#757A94",
                    borderColor: "#53E39C",
                    borderWidth: 0.5,
                    borderType: "solid"
                },
                emphasis:{
                    color: "#4a9467"
                }
            }
        }
    });
});