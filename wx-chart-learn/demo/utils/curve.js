var config = {
  yAxisWidth: 15,
  yAxisSplit: 5,
  xAxisHeight: 15,
  xAxisLineHeight: 15,
  legendHeight: 15,
  yAxisTitleWidth: 15,
  padding: 12,
  columePadding: 3,
  fontSize: 10,
  // 数据图类型
  dataPointShape: ['diamond', 'circle', 'triangle', 'rect'],
  colors: ['#7cb5ec', '#f7a35c', '#434348', '#90ed7d', '#f15c80', '#8085e9'],
  pieChartLinePadding: 25,
  pieChartTextPadding: 15,
  xAxisTextPadding: 3,
  titleColor: '#333333',
  titleFontSize: 20,
  subtitleColor: '#999999',
  subtitleFontSize: 15,
  toolTipPadding: 3,
  toolTipBackground: '#000000',
  toolTipOpacity: 0.7,
  toolTipLineHeight: 14,
  radarGridCount: 3,
  radarLabelTextMargin: 15
};
var util = {
  toFixed: function toFixed(num, limit) {
      limit = limit || 2;
      if (this.isFloat(num)) {
          num = num.toFixed(limit);
      }
      return num;
  },
  isFloat: function isFloat(num) {
      return num % 1 !== 0;
  },
  approximatelyEqual: function approximatelyEqual(num1, num2) {
      return Math.abs(num1 - num2) < 1e-10;
  },
  isSameSign: function isSameSign(num1, num2) {
      return Math.abs(num1) === num1 && Math.abs(num2) === num2 || Math.abs(num1) !== num1 && Math.abs(num2) !== num2;
  },
  isSameXCoordinateArea: function isSameXCoordinateArea(p1, p2) {
      return this.isSameSign(p1.x, p2.x);
  },
  isCollision: function isCollision(obj1, obj2) {
      obj1.end = {};
      obj1.end.x = obj1.start.x + obj1.width;
      obj1.end.y = obj1.start.y - obj1.height;
      obj2.end = {};
      obj2.end.x = obj2.start.x + obj2.width;
      obj2.end.y = obj2.start.y - obj2.height;
      var flag = obj2.start.x > obj1.end.x || obj2.end.x < obj1.start.x || obj2.end.y > obj1.start.y || obj2.start.y < obj1.end.y;

      return !flag;
  }
};
// 缓动函数
var Timing = {
  easeIn: function easeIn(pos) {
      return Math.pow(pos, 3);
  },

  easeOut: function easeOut(pos) {
      return Math.pow(pos - 1, 3) + 1;
  },

  easeInOut: function easeInOut(pos) {
      if ((pos /= 0.5) < 1) {
          return 0.5 * Math.pow(pos, 3);
      } else {
          return 0.5 * (Math.pow(pos - 2, 3) + 2);
      }
  },

  linear: function linear(pos) {
      return pos;
  }
};
// Object.assign polyfill
// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
function assign(target, varArgs) {
  if (target == null) {
      // TypeError if undefined or null
      throw new TypeError('Cannot convert undefined or null to object');
  }

  var to = Object(target);

  for (var index = 1; index < arguments.length; index++) {
      var nextSource = arguments[index];

      if (nextSource != null) {
          // Skip over if undefined or null
          for (var nextKey in nextSource) {
              // Avoid bugs when hasOwnProperty is shadowed
              if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                  to[nextKey] = nextSource[nextKey];
              }
          }
      }
  }
  return to;
}
function drawCanvas(opts, context) {
  context.draw();
}
function fillSeriesColor(series, config) {
  var index = 0;
  return series.map(function (item) {
      if (!item.color) {
          item.color = config.colors[index];
          index = (index + 1) % config.colors.length;
      }
      return item;
  });
}
/**  
 *   测量canvas 绘制的指定的文字的信息（如宽度）
 *  https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/measureText
 * example：
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    let text = ctx.measureText('Hello world');
    console.log(text.width);  // 56;
 * @param {*} text 
 */
function measureText(text) {
  var fontSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;

  // wx canvas 未实现measureText方法, 此处自行实现
  text = String(text);
  var text = text.split('');
  var width = 0;
  text.forEach(function (item) {
      if (/[a-zA-Z]/.test(item)) {
          width += 7;
      } else if (/[0-9]/.test(item)) {
          width += 5.5;
      } else if (/\./.test(item)) {
          width += 2.7;
      } else if (/-/.test(item)) {
          width += 3.25;
      } else if (/[\u4e00-\u9fa5]/.test(item)) {
          width += 10;
      } else if (/\(|\)/.test(item)) {
          width += 3.73;
      } else if (/\s/.test(item)) {
          width += 2.5;
      } else if (/%/.test(item)) {
          width += 8;
      } else {
          width += 10;
      }
  });
  return width * fontSize / 10;
}

// 连接数据
function dataCombine(series) {
  return series.reduce(function (a, b) {
      return (a.data ? a.data : a).concat(b.data);
  }, []);
}
function findRange(num, type, limit) {
  if (isNaN(num)) {
      throw new Error('[wxCharts] unvalid series data!');
  }
  limit = limit || 10;
  type = type ? type : 'upper';
  var multiple = 1;
  while (limit < 1) {
      limit *= 10;
      multiple *= 10;
  }
  if (type === 'upper') {
      num = Math.ceil(num * multiple);
  } else {
      num = Math.floor(num * multiple);
  }
  while (num % limit !== 0) {
      if (type === 'upper') {
          num++;
      } else {
          num--;
      }
  }

  return num / multiple;
}

// 获得数据范围
function getDataRange(minData, maxData) {
  var limit = 0;
  var range = maxData - minData;
  if (range >= 10000) {
      limit = 1000;
  } else if (range >= 1000) {
      limit = 100;
  } else if (range >= 100) {
      limit = 10;
  } else if (range >= 10) {
      limit = 5;
  } else if (range >= 1) {
      limit = 1;
  } else if (range >= 0.1) {
      limit = 0.1;
  } else {
      limit = 0.01;
  }
  return {
      minRange: findRange(minData, 'lower', limit),
      maxRange: findRange(maxData, 'upper', limit)
  };
}

function getYAxisTextList(series, opts, config) {
  var data = dataCombine(series);
  // remove null from data
  data = data.filter(function (item) {
      return item !== null;
  });
  var minData = Math.min.apply(this, data);
  var maxData = Math.max.apply(this, data);
  if (typeof opts.yAxis.min === 'number') {
      minData = Math.min(opts.yAxis.min, minData);
  }
  if (typeof opts.yAxis.max === 'number') {
      maxData = Math.max(opts.yAxis.max, maxData);
  }

  // fix issue https://github.com/xiaolin3303/wx-charts/issues/9
  if (minData === maxData) {
      var rangeSpan = maxData || 1;
      minData -= rangeSpan;
      maxData += rangeSpan;
  }

  var dataRange = getDataRange(minData, maxData);
  var minRange = dataRange.minRange;
  var maxRange = dataRange.maxRange;

  var range = [];
  var eachRange = (maxRange - minRange) / config.yAxisSplit;

  for (var i = 0; i <= config.yAxisSplit; i++) {
      range.push(minRange + eachRange * i);
  }
  return range.reverse();
}

function calYAxisData(series, opts, config) {

  var ranges = getYAxisTextList(series, opts, config);
  var yAxisWidth = config.yAxisWidth;
  var rangesFormat = ranges.map(function (item) {
      item = util.toFixed(item, 2);
      item = opts.yAxis.format ? opts.yAxis.format(Number(item)) : item;
      yAxisWidth = Math.max(yAxisWidth, measureText(item) + 5);
      return item;
  });
  if (opts.yAxis.disabled === true) {
      yAxisWidth = 0;
  }

  return { rangesFormat: rangesFormat, ranges: ranges, yAxisWidth: yAxisWidth };
}
function calCategoriesData(categories, opts, config) {
  var result = {
      angle: 0,
      xAxisHeight: config.xAxisHeight
  };

  var _getXAxisPoints = getXAxisPoints(categories, opts, config),
      eachSpacing = _getXAxisPoints.eachSpacing;

  // get max length of categories text


  var categoriesTextLenth = categories.map(function (item) {
      return measureText(item);
  });

  var maxTextLength = Math.max.apply(this, categoriesTextLenth);

  if (maxTextLength + 2 * config.xAxisTextPadding > eachSpacing) {
      result.angle = 45 * Math.PI / 180;
      result.xAxisHeight = 2 * config.xAxisTextPadding + maxTextLength * Math.sin(result.angle);
  }

  return result;
}
function getXAxisPoints(categories, opts, config) {
  var yAxisTotalWidth = config.yAxisWidth + config.yAxisTitleWidth;
  var spacingValid = opts.width - 2 * config.padding - yAxisTotalWidth;
  var dataCount = opts.enableScroll ? Math.min(5, categories.length) : categories.length;
  var eachSpacing = spacingValid / dataCount;

  var xAxisPoints = [];
  var startX = config.padding + yAxisTotalWidth;
  var endX = opts.width - config.padding;
  categories.forEach(function (item, index) {
      xAxisPoints.push(startX + index * eachSpacing);
  });
  if (opts.enableScroll === true) {
      xAxisPoints.push(startX + categories.length * eachSpacing);
  } else {
      xAxisPoints.push(endX);
  }

  return { xAxisPoints: xAxisPoints, startX: startX, endX: endX, eachSpacing: eachSpacing };
}

function drawYAxisGrid(opts, config, context) {
  var spacingValid = opts.height - 2 * config.padding - config.xAxisHeight - config.legendHeight;
  var eachSpacing = Math.floor(spacingValid / config.yAxisSplit);
  var yAxisTotalWidth = config.yAxisWidth + config.yAxisTitleWidth;
  var startX = config.padding + yAxisTotalWidth;
  var endX = opts.width - config.padding;

  var points = [];
  for (var i = 0; i < config.yAxisSplit; i++) {
      points.push(config.padding + eachSpacing * i);
  }
  points.push(config.padding + eachSpacing * config.yAxisSplit + 2);

  context.beginPath();
  context.setStrokeStyle(opts.yAxis.gridColor || "#cccccc");
  context.setLineWidth(1);
  points.forEach(function (item, index) {
      context.moveTo(startX, item);
      context.lineTo(endX, item);
  });
  context.closePath();
  context.stroke();
}
function splitPoints(points) {
  var newPoints = [];
  var items = [];
  points.forEach(function (item, index) {
      if (item !== null) {
          items.push(item);
      } else {
          if (items.length) {
              newPoints.push(items);
          }
          items = [];
      }
  });
  if (items.length) {
      newPoints.push(items);
  }

  return newPoints;
}
function calLegendData(series, opts, config) {
  if (opts.legend === false) {
      return {
          legendList: [],
          legendHeight: 0
      };
  }
  var padding = 5;
  var marginTop = 8;
  var shapeWidth = 15;
  var legendList = [];
  var widthCount = 0;
  var currentRow = [];
  series.forEach(function (item) {
      var itemWidth = 3 * padding + shapeWidth + measureText(item.name || 'undefinded');
      if (widthCount + itemWidth > opts.width) {
          legendList.push(currentRow);
          widthCount = itemWidth;
          currentRow = [item];
      } else {
          widthCount += itemWidth;
          currentRow.push(item);
      }
  });
  if (currentRow.length) {
      legendList.push(currentRow);
  }

  return {
      legendList: legendList,
      legendHeight: legendList.length * (config.fontSize + marginTop) + padding
  };
}
// 绘制元素点
function drawPointShape(points, color, shape, context) {
  context.beginPath();
  context.setStrokeStyle("#ffffff");
  context.setLineWidth(1);
  context.setFillStyle(color);

  if (shape === 'diamond') {
      points.forEach(function (item, index) {
          if (item !== null) {
              context.moveTo(item.x, item.y - 4.5);
              context.lineTo(item.x - 4.5, item.y);
              context.lineTo(item.x, item.y + 4.5);
              context.lineTo(item.x + 4.5, item.y);
              context.lineTo(item.x, item.y - 4.5);
          }
      });
  } else if (shape === 'circle') {
      points.forEach(function (item, index) {
          if (item !== null) {
              context.moveTo(item.x + 3.5, item.y);
              context.arc(item.x, item.y, 4, 0, 2 * Math.PI, false);
          }
      });
  } else if (shape === 'rect') {
      points.forEach(function (item, index) {
          if (item !== null) {
              context.moveTo(item.x - 3.5, item.y - 3.5);
              context.rect(item.x - 3.5, item.y - 3.5, 7, 7);
          }
      });
  } else if (shape === 'triangle') {
      points.forEach(function (item, index) {
          if (item !== null) {
              context.moveTo(item.x, item.y - 4.5);
              context.lineTo(item.x - 4.5, item.y + 4.5);
              context.lineTo(item.x + 4.5, item.y + 4.5);
              context.lineTo(item.x, item.y - 4.5);
          }
      });
  }
  context.closePath();
  context.fill();
  context.stroke();
}
function getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config) {

  var points = [];
  var validHeight = opts.height - 2 * config.padding - config.xAxisHeight - config.legendHeight;
  console.log('validHeight:', validHeight);
  data.forEach(function (item, index) {
      if (item === null) {
          points.push(null);
      } else {
          var point = {};
          point.x = xAxisPoints[index] + Math.round(eachSpacing / 2);
          var height = validHeight * (item - minRange) / (maxRange - minRange);
          // height *= process;
          point.y = opts.height - config.xAxisHeight - config.legendHeight - Math.round(height) - config.padding;
          points.push(point);
      }
  });
  // console.log('points:', points)
  return points;
}
// 获取曲线中的点
function drawLineDataPoints(series, opts, config, context) {

  var _calYAxisData3 = calYAxisData(series, opts, config),
      ranges = _calYAxisData3.ranges;

  var _getXAxisPoints3 = getXAxisPoints(opts.categories, opts, config),
      xAxisPoints = _getXAxisPoints3.xAxisPoints,
      eachSpacing = _getXAxisPoints3.eachSpacing;

  var minRange = ranges.pop();
  var maxRange = ranges.shift();
  var calPoints = [];

  context.save();
  // 真正的绘制部分
  series.forEach(function (eachSeries, seriesIndex) {
      var data = eachSeries.data;
      var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config);
      calPoints.push(points);
      var splitPointList = splitPoints(points);

      splitPointList.forEach(function (points, index) {
          context.beginPath();
          context.setStrokeStyle(eachSeries.color);
          context.setLineWidth(2);
          if (points.length === 1) {
              context.moveTo(points[0].x, points[0].y);
              context.arc(points[0].x, points[0].y, 1, 0, 2 * Math.PI);
          } else {
              context.moveTo(points[0].x, points[0].y);
              if (opts.extra.lineStyle === 'curve') {
                  // 画三次贝塞尔曲线
                  points.forEach(function (item, index) {
                      if (index > 0) {
                          var ctrlPoint = createCurveControlPoints(points, index - 1);
                          // 绘制
                          context.bezierCurveTo(ctrlPoint.ctrA.x, ctrlPoint.ctrA.y, ctrlPoint.ctrB.x, ctrlPoint.ctrB.y, item.x, item.y);
                      }
                  });
              } else {
                  points.forEach(function (item, index) {
                      if (index > 0) {
                          context.lineTo(item.x, item.y);
                      }
                  });
              }
              context.moveTo(points[0].x, points[0].y);
          }
          context.closePath();
          context.stroke();
      });

      if (opts.dataPointShape !== false) {
          // var shape = config.dataPointShape[seriesIndex % config.dataPointShape.length];
          // 绘制曲线点
          // drawPointShape(points, eachSeries.color, 'circle', context);
      }
  });
  // Restore the default state 各种颜色恢复默认
  context.restore();

  return {
      xAxisPoints: xAxisPoints,
      calPoints: calPoints,
      eachSpacing: eachSpacing
  };
}
// 绘制图表
function drawCharts(type, opts, config, context) {
  var _this = this;

  var series = opts.series;
  var categories = opts.categories;
  series = fillSeriesColor(series, config);

  var _calLegendData = calLegendData(series, opts, config),
      legendHeight = _calLegendData.legendHeight;

  config.legendHeight = legendHeight;

  var _calYAxisData = calYAxisData(series, opts, config),
      yAxisWidth = _calYAxisData.yAxisWidth;

  config.yAxisWidth = yAxisWidth;
  if (categories && categories.length) {
      var _calCategoriesData = calCategoriesData(categories, opts, config),
          xAxisHeight = _calCategoriesData.xAxisHeight,
          angle = _calCategoriesData.angle;

      config.xAxisHeight = xAxisHeight;
      config._xAxisTextAngle_ = angle;
  }
  switch (type) {
      case 'line':
          // 绘制 x 轴 线条
          drawYAxisGrid(opts, config, context);

          var _drawLineDataPoints = drawLineDataPoints(series, opts, config, context),
              xAxisPoints = _drawLineDataPoints.xAxisPoints,
              calPoints = _drawLineDataPoints.calPoints,
              eachSpacing = _drawLineDataPoints.eachSpacing;

          _this.chartData.xAxisPoints = xAxisPoints;
          _this.chartData.calPoints = calPoints;
          _this.chartData.eachSpacing = eachSpacing;
          // Todo: 绘制 X 轴
          // 绘制 Y 轴
          drawCanvas(opts, context);
      break;
      default:
  }
}
// 计算贝塞尔 曲线控制点
function createCurveControlPoints(points, i) {

  function isNotMiddlePoint(points, i) {
      if (points[i - 1] && points[i + 1]) {
          return points[i].y >= Math.max(points[i - 1].y, points[i + 1].y) || points[i].y <= Math.min(points[i - 1].y, points[i + 1].y);
      } else {
          return false;
      }
  }

  var a = 0.2;
  var b = 0.2;
  var pAx = null;
  var pAy = null;
  var pBx = null;
  var pBy = null;
  if (i < 1) {
      pAx = points[0].x + (points[1].x - points[0].x) * a;
      pAy = points[0].y + (points[1].y - points[0].y) * a;
  } else {
      pAx = points[i].x + (points[i + 1].x - points[i - 1].x) * a;
      pAy = points[i].y + (points[i + 1].y - points[i - 1].y) * a;
  }

  if (i > points.length - 3) {
      var last = points.length - 1;
      pBx = points[last].x - (points[last].x - points[last - 1].x) * b;
      pBy = points[last].y - (points[last].y - points[last - 1].y) * b;
  } else {
      pBx = points[i + 1].x - (points[i + 2].x - points[i].x) * b;
      pBy = points[i + 1].y - (points[i + 2].y - points[i].y) * b;
  }

  // fix issue https://github.com/xiaolin3303/wx-charts/issues/79
  if (isNotMiddlePoint(points, i + 1)) {
      pBy = points[i + 1].y;
  }
  if (isNotMiddlePoint(points, i)) {
      pAy = points[i].y;
  }

  return {
      ctrA: { x: pAx, y: pAy },
      ctrB: { x: pBx, y: pBy }
  };
}

// Charts class
var Charts = function Charts(opts) {
  opts.title = opts.title || {};
  opts.subtitle = opts.subtitle || {};
  opts.yAxis = opts.yAxis || {};
  opts.xAxis = opts.xAxis || {};
  opts.extra = opts.extra || {};
  opts.legend = opts.legend === false ? false : true;
  opts.animation = opts.animation === false ? false : true;
  var config$$1 = assign({}, config);
  config$$1.yAxisTitleWidth = opts.yAxis.disabled !== true && opts.yAxis.title ? config$$1.yAxisTitleWidth : 0;
  config$$1.pieChartLinePadding = opts.dataLabel === false ? 0 : config$$1.pieChartLinePadding;
  config$$1.pieChartTextPadding = opts.dataLabel === false ? 0 : config$$1.pieChartTextPadding;

  this.opts = opts;
  this.config = config$$1;
  this.context = wx.createCanvasContext(opts.canvasId);
  // store calcuated chart data
  // such as chart point coordinate
  this.chartData = {};
  this.scrollOption = {
      currentOffset: 0,
      startTouchX: 0,
      distance: 0
  };
  // 绘制图表
  drawCharts.call(this, opts.type, opts, config$$1, this.context);
};


Charts.prototype.updateData = function () {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  this.opts.series = data.series || this.opts.series;
  this.opts.categories = data.categories || this.opts.categories;

  this.opts.title = assign({}, this.opts.title, data.title || {});
  this.opts.subtitle = assign({}, this.opts.subtitle, data.subtitle || {});

  drawCharts.call(this, this.opts.type, this.opts, this.config, this.context);
};


Charts.prototype.addEventListener = function (type, listener) {
  this.event.addEventListener(type, listener);
};

Charts.prototype.getCurrentDataIndex = function (e) {
  var touches = e.touches && e.touches.length ? e.touches : e.changedTouches;
  if (touches && touches.length) {
      var _touches$ = touches[0],
          x = _touches$.x,
          y = _touches$.y;

      if (this.opts.type === 'pie' || this.opts.type === 'ring') {
          return findPieChartCurrentIndex({ x: x, y: y }, this.chartData.pieData);
      } else if (this.opts.type === 'radar') {
          return findRadarChartCurrentIndex({ x: x, y: y }, this.chartData.radarData, this.opts.categories.length);
      } else {
          return findCurrentIndex({ x: x, y: y }, this.chartData.xAxisPoints, this.opts, this.config, Math.abs(this.scrollOption.currentOffset));
      }
  }
  return -1;
};

Charts.prototype.showToolTip = function (e) {
  var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (this.opts.type === 'line' || this.opts.type === 'area') {
      var index = this.getCurrentDataIndex(e);
      var currentOffset = this.scrollOption.currentOffset;

      var opts = assign({}, this.opts, {
          _scrollDistance_: currentOffset,
          animation: false
      });
      if (index > -1) {
          var seriesData = getSeriesDataItem(this.opts.series, index);
          if (seriesData.length === 0) {
              drawCharts.call(this, opts.type, opts, this.config, this.context);
          } else {
              var _getToolTipData = getToolTipData(seriesData, this.chartData.calPoints, index, this.opts.categories, option),
                  textList = _getToolTipData.textList,
                  offset = _getToolTipData.offset;

              opts.tooltip = {
                  textList: textList,
                  offset: offset,
                  option: option
              };
              drawCharts.call(this, opts.type, opts, this.config, this.context);
          }
      } else {
          drawCharts.call(this, opts.type, opts, this.config, this.context);
      }
  }
};

module.exports = Charts;