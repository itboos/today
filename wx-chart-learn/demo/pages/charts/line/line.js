// var wxCharts = require('../../../utils/wxcharts.js');
var wxCharts = require('../../../utils/curve.js');
var app = getApp();
var lineChart = null;
Page({
    data: {
    },
    touchHandler: function (e) {
    },    
    createSimulationData: function () {
        var categories = [];
        var data = [];
        // for (var i = 0; i < 10; i++) {
        //     categories.push('2016-' + (i + 1));
        //     data.push(Math.random()*(200-10)+ 60);
        // }
        data =  [76, 84,86,89,170, 190,99,105,130, 100];
        // data =  [76,  190,99,105,130];
        // categories = ['00:00', '15:00', '30:00', '45:00', '60:00']
        categories = ['00:00', '15:00', '30:00', '45:00', '60:00']
        return {
            categories: categories,
            data: data
        }
    },
    updateData: function () {
        var simulationData = this.createSimulationData();
        var series = [{
            name: '成交量1',
            data: simulationData.data,
            format: function (val, name) {
                return val.toFixed(2) + '万';
            }
        }];
        lineChart.updateData({
            categories: simulationData.categories,
            series: series
        });
    },
    onLoad: function (e) {
        var windowWidth = 320;
        try {
            var res = wx.getSystemInfoSync();
            windowWidth = res.windowWidth;
        } catch (e) {
            console.error('getSystemInfoSync failed!');
        }
        
        var simulationData = this.createSimulationData();
        lineChart = new wxCharts({
            canvasId: 'lineCanvas',
            type: 'line',
            categories: simulationData.categories,
            animation: true,
            // background: '#f5f5f5',
            series: [{
                name: '成交量1',
                data: simulationData.data,
                format: function (val, name) {
                    return val.toFixed(2) + '万';
                }
            }],
            xAxis: {
                disableGrid: false,
                type: 'calibration' // 显示刻度
            },
            yAxis: {
                format: function (val) {
                    return val.toFixed(2);
                },
                min: 50,
                max: 250
            },
            width: windowWidth,
            height: 200,
            dataLabel: false,
            dataPointShape: true,
            extra: {
                lineStyle: 'curve'
            }
        });
    }
});