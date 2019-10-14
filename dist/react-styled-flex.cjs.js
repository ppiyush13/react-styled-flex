/* eslint-disable */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var styled = require('styled-components');
var styled__default = _interopDefault(styled);
var react = require('react');

var CleanElement = (function (propTypes) {
  return function CleanElement(props) {
    var RenderComponent = props.is || 'div';
    var keys = propTypes || [];
    var cleanedProps = Object.keys(props).reduce(function (acc, key) {
      if (key === 'is') ; // skip is prop from leakiing to dom
      else if (keys.indexOf(key) === -1) acc[key] = props[key];
      return acc;
    }, {});
    return react.createElement(RenderComponent, cleanedProps);
  };
});

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

var assignStyle = function assignStyle(elem, obj) {
  if (elem && obj && _typeof(obj) === 'object') {
    Object.keys(obj).forEach(function (styleAttr) {
      var styleValue = obj[styleAttr];
      elem.style[styleAttr] = styleValue; // eslint-disable-line no-param-reassign
    });
  }
};

var createElementsFromJSON = function createElementsFromJSON(json, parent) {
  if (Array.isArray(json)) {
    json.forEach(function (childJson) {
      return createElementsFromJSON(childJson, parent);
    });
  } else if (json && _typeof(json) === 'object') {
    var content = json.content,
        _json$tag = json.tag,
        tag = _json$tag === void 0 ? 'div' : _json$tag;
    var elem = document.createElement(tag);
    Object.keys(json).forEach(function (attr) {
      var value = json[attr];
      if (attr === 'tag') return;
      if (attr === 'style') assignStyle(elem, value);else if (attr === 'content') {
        if (_typeof(content) === 'object') createElementsFromJSON(value, elem);else elem.textContent = value;
      } else {
        try {
          elem.setAttribute(attr, value);
        } catch (ex) {
          /*
              //if(ex.name === 'InvalidCharacterError')
              //throw new Error(`Invalid attribute ${attr}, skipping it`);
              //else throw ex;
              Mostly encountered InvalidCharacterError because of invalid attr
              We decide in future what needs to be done for this cases
              Two options:
              1. Throw exception
              2. log on console
          */
        }
      }
    });
    parent.appendChild(elem);
  }
};
var createHtmlElement = (function (json) {
  var parent = document.createDocumentFragment();
  createElementsFromJSON(json, parent);
  return parent;
});

var memoize = (function (fn) {
  var result = {};
  var resultKey = 'R';
  return function () {
    result[resultKey] = Object.prototype.hasOwnProperty.call(result, resultKey) ? result[resultKey] : fn();
    return result[resultKey];
  };
});

var PARENT_WIDTH = 10;
var GAP = 4;
var htmlJson = {
  tag: 'div',
  style: {
    height: '1px',
    width: "".concat(PARENT_WIDTH, "px"),
    display: 'flex',
    visibility: 'hidden',
    gap: "".concat(GAP, "px")
  },
  content: [{
    tag: 'div',
    style: {
      flex: 1
    }
  }, {
    tag: 'div',
    style: {
      flex: 1
    }
  }]
};
var detectFlexGapFeature = memoize(function () {
  /*
      Detection code
  */
  var tempFragment = createHtmlElement(htmlJson);
  var testNode = tempFragment.children[0];
  /*
      Create temp html node for feature detection
  */

  document.body.appendChild(testNode);

  var _window$getComputedSt = window.getComputedStyle(testNode.firstElementChild),
      width = _window$getComputedSt.width;

  document.body.removeChild(testNode);
  /*
      Remove node and return result
  */

  return width === "".concat((PARENT_WIDTH - GAP) / 2, "px");
});

var boxProps = ['height', 'width', 'margin', 'padding', 'border'];
var flexBoxProps = ['is', 'inline', 'wrapReverse', 'justifyContent', 'alignItems', 'alignContent', 'column', 'reverse', 'wrap', 'gap', 'columnGap', 'rowGap', 'center'];
var flexItemProps = ['is', 'box', 'order', 'flex', 'alignSelf', 'basis', 'shrink', 'grow'];
var boxModelStyles =
/*#__PURE__*/
styled.css(function (props) {
  return boxProps.reduce(function (acc, style) {
    acc[style] = props[style];
    return acc;
  }, {});
});
var flexBoxStyles =
/*#__PURE__*/
styled.css(function (props) {
  var flexDirection;
  var gapObj;
  var gapKey;
  var flexWrap;
  var inline = props.inline,
      wrapReverse = props.wrapReverse,
      alignContent = props.alignContent,
      column = props.column,
      reverse = props.reverse,
      wrap = props.wrap,
      gap = props.gap,
      columnGap = props.columnGap,
      rowGap = props.rowGap,
      center = props.center;
  var justifyContent = props.justifyContent,
      alignItems = props.alignItems;

  if (column || reverse) {
    flexDirection = column ? 'column' : 'row';
    flexDirection += reverse ? '-reverse' : '';
  }

  if (gap || columnGap || rowGap) {
    if (wrap) ; else if (!detectFlexGapFeature()) {
      var marginProp = column ? 'bottom' : 'right';
      var child = reverse ? 'first' : 'last';
      var gapProp = (column ? rowGap : columnGap) || gap;
      gapKey = "& > :not(:".concat(child, "-child)");
      gapObj = {};
      gapObj["margin-".concat(marginProp)] = gapProp;
    }
  }

  if (center) {
    justifyContent = justifyContent || 'center';
    alignItems = alignItems || 'center';
  }

  if (wrap) flexWrap = 'wrap';
  if (wrapReverse) flexWrap = 'wrap-reverse';
  var result = {
    display: inline ? 'inline-flex' : 'flex',
    flexWrap: flexWrap,
    justifyContent: justifyContent,
    alignItems: alignItems,
    alignContent: alignContent,
    flexDirection: flexDirection,
    gap: gap,
    columnGap: columnGap,
    rowGap: rowGap
  };
  result[gapKey] = gapObj;
  return result;
});
var flexItemStyles =
/*#__PURE__*/
styled.css(function (props) {
  var order = props.order,
      flex = props.flex,
      alignSelf = props.alignSelf,
      basis = props.basis,
      shrink = props.shrink,
      grow = props.grow;
  return {
    order: order,
    flex: flex,
    alignSelf: alignSelf,
    flexBasis: basis,
    flexShrink: shrink,
    flexGrow: grow
  };
});
var CleanFlexBox = CleanElement([].concat(boxProps, flexBoxProps));
var CleanFlexItem = CleanElement([].concat(boxProps, flexItemProps, flexBoxProps));
var FlexBox =
/*#__PURE__*/
styled__default(CleanFlexBox).withConfig({
  displayName: "FlexBox"
})(["", "", ""], boxModelStyles, flexBoxStyles);
var FlexItem =
/*#__PURE__*/
styled__default(CleanFlexItem).withConfig({
  displayName: "FlexItem"
})(["", "", "", ""], boxModelStyles, flexItemStyles, function (props) {
  return props.box && flexBoxStyles;
});

exports.FlexBox = FlexBox;
exports.FlexItem = FlexItem;
