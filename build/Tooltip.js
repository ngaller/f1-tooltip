'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tooltip = function (_React$PureComponent) {
  _inherits(Tooltip, _React$PureComponent);

  function Tooltip(props) {
    _classCallCheck(this, Tooltip);

    var _this = _possibleConstructorReturn(this, (Tooltip.__proto__ || Object.getPrototypeOf(Tooltip)).call(this, props));

    _this.initRef = _this.initRef.bind(_this);
    _this.state = {};
    return _this;
  }

  _createClass(Tooltip, [{
    key: 'initRef',
    value: function initRef(node) {
      if (node) {

        this.node = node;
      }
    }
  }, {
    key: 'getStyle',
    value: function getStyle() {
      var _props = this.props,
          x = _props.x,
          y = _props.y;

      if (!(this.state.x && this.state.y)) {
        // we need to be able to compute the size, in order to place the tooltip
        return { position: 'fixed', visibility: 'hidden', paddingTop: '8px' };
      }
      var style = {
        top: this.state.y + 'px',
        left: this.state.x + 'px',
        position: 'fixed'
      };
      if (this.state.y < this.props.y) {
        // tooltip on top
        style.paddingBottom = '8px';
      } else {
        style.paddingTop = '8px';
      }
      return style;
    }
  }, {
    key: 'getArrowStyle',
    value: function getArrowStyle() {
      if (!this.state.x) return {};
      var style = {
        display: 'block',
        width: 0,
        height: 0,
        position: 'absolute',
        borderLeft: '8px solid transparent',
        borderRight: '8px solid transparent'
      };
      if (this.state.y < this.props.y) {
        // tooltip is on top, we need a bottom arrow
        style.borderTop = '8px solid black';
        style.bottom = 0;
      } else {
        // tooltip is on bottom, we need an up arrow
        style.borderBottom = '8px solid black';
        style.top = 0;
      }
      var left = this.props.x - this.state.x - 8;
      if (left > this.node.clientWidth - 16) left = this.node.clientWidth - 16;
      if (left < 0) left = 0;
      style.left = left + 'px';
      return style;
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.recalcDims();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.recalcDims();
    }
  }, {
    key: 'recalcDims',
    value: function recalcDims() {
      var pos = this.node.getBoundingClientRect();
      var _props2 = this.props,
          x = _props2.x,
          y = _props2.y;

      x -= pos.width / 2; // center on click
      // console.log(`width = ${pos.width}, x = ${x}, propx = ${this.props.x}, innerWidth = ${window.innerWidth}`);
      if (x + pos.width > window.innerWidth - 16) {
        // shift left
        x -= x + pos.width - window.innerWidth + 16;
      }
      if (x < 0) {
        x = 1;
      }
      if (y + pos.height > window.innerHeight && y > pos.height) {
        // make it on top
        y -= pos.height;
      }
      if (this.state.x !== x || this.state.y !== y) {
        this.setState({
          x: x, y: y
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'f1-tooltip', ref: this.initRef, style: this.getStyle() },
        _react2.default.createElement('div', { className: 'f1-tooltip--arrow', style: this.getArrowStyle() }),
        _react2.default.createElement(
          'div',
          { className: 'f1-tooltip--content' },
          this.props.children
        )
      );
    }
  }]);

  return Tooltip;
}(_react2.default.PureComponent);

Tooltip.propTypes = {};

exports.default = Tooltip;