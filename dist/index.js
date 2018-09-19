'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _hyjFunc = require('hyj-func');

var _echarts = require('echarts');

var _echarts2 = _interopRequireDefault(_echarts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * name: echarts 的 react 实现
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * designer: heyunjiang
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * time: 2018.6.12
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var chart = function (_React$Component) {
  _inherits(chart, _React$Component);

  function chart(props) {
    _classCallCheck(this, chart);

    var _this = _possibleConstructorReturn(this, (chart.__proto__ || Object.getPrototypeOf(chart)).call(this, props));

    _this.echartsElement = null;
    return _this;
  }

  _createClass(chart, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.rerender();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.dispose();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var _this2 = this;

      var echartObj = this.getEchartsInstance();
      //对象判等
      if ((0, _hyjFunc.objectEquals)(prevProps.option, this.props.option)) {
        setTimeout(function () {
          if (_this2.echartsElement === null) {
            return;
          }
          echartObj.resize({
            width: _this2.echartsElement.parentNode.clientWidth
          });
        }, 400); //这里设置一个延迟，是保证其他动画执行完成后，获取到真实的宽度
      } else {
        //这里rerender 调用了echarts.setOption来重新绘制pie
        this.rerender();
      }
    }
  }, {
    key: 'getEchartsInstance',
    value: function getEchartsInstance() {
      return _echarts2.default.getInstanceByDom(this.echartsElement) || _echarts2.default.init(this.echartsElement);
    }
  }, {
    key: 'renderEchartDom',
    value: function renderEchartDom() {
      var echartObj = this.getEchartsInstance();
      echartObj.setOption(this.props.option);
      /* bind events */
      if (this.props.events && Array.isArray(this.props.events)) {
        this.props.events.forEach(function (item) {
          echartObj.off(item.name); // 需要先解绑，再绑定，免得重复绑定
          echartObj.on(item.name, function (params) {
            item.func(params);
          });
        });
      }
      return echartObj;
    }
  }, {
    key: 'rerender',
    value: function rerender() {
      var _this3 = this;

      try {
        setTimeout(function () {
          if (_this3.echartsElement === null) {
            return;
          }
          var echartObj = _this3.renderEchartDom();
        }, 100); //这里设置一个延迟，是保证其他动画执行完成后，获取到真实的宽度
      } catch (_) {}
    }
  }, {
    key: 'dispose',
    value: function dispose() {
      if (this.echartsElement) {
        _echarts2.default.dispose(this.echartsElement);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      return _react2.default.createElement('div', {
        ref: function ref(echartsElement) {
          _this4.echartsElement = echartsElement;
        },
        style: { width: '100%', height: '300px' },
        className: this.props.className || '' });
    }
  }]);

  return chart;
}(_react2.default.Component);

chart.propTypes = {
  option: _propTypes2.default.object
};
chart.defaultProps = {
  option: {
    title: {
      text: '下发文档统计',
      subtext: '纯属虚构',
      x: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['中央军委', '国务院', '全国人民代表大会', '最高人民法院', '最高检察院']
    },
    series: [{
      name: '下发文档统计',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: [{ value: 335, name: '中央军委' }, { value: 310, name: '国务院' }, { value: 234, name: '全国人民代表大会' }, { value: 135, name: '最高人民法院' }, { value: 1548, name: '最高检察院' }],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  }
};

exports.default = chart;