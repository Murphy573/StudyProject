$(function(){
    var options = {
        container: "column",
        title: "测试1",
        xAxis_data: (function (){
            var now = new Date();
            var res = [];
            var len = 6;
            while (len--) {
                res.push(now.toLocaleDateString());
                now = new Date(now.getTime() + 1000 * 60 * 60 * 24);
            }
            return res;
        })(),
        legend_data: ["数量", {name: '价格', icon: "circle"}],
        tooltip_formatter: function (params, ticket, callback) {
            console.log(params);
            return params.name + "的" + params.seriesName + ":" + params.value;
        },
        colors: ["blue","orange", "pink", "red"],
        series_data: [{
            name: "数量",
            type: 'bar',
            data: (function (){
                var res = [];
                var len = 6;
                while (len--) {
                    res.push(Math.round(Math.random() * 1000));
                }
                return res;
            })()
        },
        {
            name: "价格",
            type: 'bar',
            data: (function (){
                var res = [];
                var len = 6;
                while (len--) {
                    res.push(Math.round(Math.random() * 1000));
                }
                return res;
            })()
        }]
    };

    var myChart1 = Usmart.EChartsFactory.createChart(options);
    getDynamicData(myChart1);
    var options1 = $.extend(options,
        {
            container: "line",
            series_data: [{
                name: "数量",
                type: 'line',
                data: (function (){
                    var res = [];
                    var len = 6;
                    while (len--) {
                        res.push(Math.round(Math.random() * 1000));
                    }
                    return res;
                })()
            },
                {
                    name: "价格",
                    type: 'line',
                    data: (function (){
                        var res = [];
                        var len = 6;
                        while (len--) {
                            res.push(Math.round(Math.random() * 1000));
                        }
                        return res;
                    })()
                }]});
    var myChart2 = Usmart.EChartsFactory.createChart(options1);
    getDynamicData(myChart2);
    echarts.connect([myChart1, myChart2]);//设置图表联动

    //雷达图start
    var options2 = {
        title: {
            text: '基础雷达图'
        },
        tooltip: {},
        legend: {
            show: false,
            data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
        },
        radar: {
            // shape: 'circle',
            name:{
                textStyle:{
                    color: "blue"
                }
            },
            radius: 180,//半径
            startAngle: 90,//起始角度
            nameGap: 10,
            splitNumber: 5,//分割圈
            shape: "polygon",
            axisLine: {
                show: true,
                lineStyle: {
                    color: "blue",
                    width: 1,
                    opacity: .6
                }
            },
            axisTick: {//刻度线
                show: false,
                lineStyle: {
                    color: "blue",
                    width: 1,
                    opacity: .6
                }
            },
            splitLine: {//外框线
                show: true,
                lineStyle: {
                    color: "blue",
                    width: 1,
                    opacity: .6
                }
            },
            splitArea: {//分割区域
                areaStyle: {
                    color: "#757A94",
                    opacity: .4
                }
            },
            axisLabel: {//刻度标签
                show: false
            },
            indicator: [
                { name: '销售（sales）', axisLabel: {show: true, textStyle: {fontSize: 12, color: '#c4051a'}},max: 6500},
                { name: '管理（Administration）', max: 16000},
                { name: '信息技术（Information Techology）', max: 30000},
                { name: '客服（Customer Support）', max: 38000},
                { name: '研发（Development）', max: 52000}
            ]
        },
        series: [{
            name: '预算 vs 开销（Budget vs spending）',
            type: 'radar',
            // areaStyle: {normal: {}},
            data : [
                {
                    value : [4300, 10000, 28000, 3500, 50000, 19000],
                    name : '预算分配（Allocated Budget）',
                    areaStyle: {
                        normal: {
                            color: "#757A94",
                            opacity: .8
                        }

                    },
                    lineStyle: {
                        normal: {
                            color: "orange",
                            width: 2,
                            opacity: .6
                        }
                    }

                }
            ]
        }]
    };
    var myChart = echarts.init(document.getElementById("radar"));
    myChart.setOption(options2);

    function getDynamicData(chart){
        setInterval(function (){
            var option = chart.getOption();
            var lastAxisData = (new Date(option.xAxis[0].data[option.xAxis[0].data.length - 1])).getTime() + 1000 * 60 * 60 * 24;

            var data0 = option.series[0].data;
            var data1 = option.series[1].data;
            data0.shift();
            data0.push(Math.round(Math.random() * 1000));
            data1.shift();
            data1.push(Math.round(Math.random() * 1000));

            option.xAxis[0].data.shift();
            option.xAxis[0].data.push(new Date(lastAxisData).toLocaleDateString());
            chart.setOption(option);
        }, 2000);
    }
})