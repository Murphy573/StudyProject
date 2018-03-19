;
var Usmart = Usmart || {};

(function(usmart){
    function EChartsFactory(){
        var self = this;
        /**
         * 合并echarts配置项
         * @param options
         */
        var extendOptions = function(options){
            return $.extend({
                    title_show: true,//是否显示标题
                    title: "",//echarts标题
                    title_link: "",//主标题文本超链接
                    title_target: "blank",//指定窗口打开主标题超链接--'self' 当前窗口打开，'blank' 新窗口打开
                    title_padding: 5,//标题内边距，单位px，默认各方向内边距为5，接受数组分别设定上右下左边距
                    title_itemGap: 10,//主副标题之间的间距,默认为10
                    title_textAlign: "",//标题文本水平对齐，支持 'left', 'center', 'right'，默认根据标题位置决定
                    legend_data: [],
                    legend_show: true,//是否显示图例
                    legend_orient: "horizontal",//图例列表的布局朝向----'horizontal'或者'vertical'
                    legend_itemGap: 10,//图例每项之间的间隔。横向布局时为水平间隔，纵向布局时为纵向间隔,默认为10
                    tooltip_show: true,//是否显示悬浮窗
                    tooltip_trigger: "item",/**'item':数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用; 'axis': 坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用;'none':什么都不触发**/
                    tooltip_formatter: "",//string, Function:配置详情请看官方API
                    xAxis_data: [],//x轴刻度
                    xAxis_type: "category",//坐标轴类型:'value'/'category'/'time'/'log'
                    colors: ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83', '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],//颜色组
                    series_data: []//数据
                }, options || {});
        };


        self.getOption = function(options){
            return {
                title: {
                    show: options.title_show,
                    text: options.title,
                    link: options.title_link,
                    target: options.title_target,
                    padding: options.title_padding,
                    itemGap: options.title_itemGap,
                    textAlign: options.title_textAlign
                    //left: "center",//TODO 标题位置样式后面需要再定义
                },
                legend: {
                    data: options.legend_data,
                    show: options.legend_show,
                    orient: options.legend_orient,
                    itemGap: options.legend_itemGap
                },
                color: options.colors,
                tooltip: {
                    show: options.tooltip_show,
                    trigger: options.tooltip_trigger,
                    formatter: options.tooltip_formatter
                },
                xAxis: {
                    type: options.xAxis_type,
                    data: options.xAxis_data
                },
                yAxis: {},
                series: options.series_data
            };
        };

        self.createChart = function(options){
            if(!options.container || options.container === ""){
                return null;
            }
            var myChart = echarts.init(document.getElementById(options.container));
            var option = self.getOption(extendOptions(options));
            myChart.setOption(option);
            return myChart;
        };
    }

    usmart.EChartsFactory = new EChartsFactory();
})(Usmart);
