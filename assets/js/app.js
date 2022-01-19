import Scrollbar from "smooth-scrollbar";

let options = {
  damping: 0.05,
  thumbMinSize: 60,
};
var __extends =
  (this && this.__extends) ||
  (function () {
    var extendStatics = function (d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (d, b) {
            d.__proto__ = b;
          }) ||
        function (d, b) {
          for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
      return extendStatics(d, b);
    };
    return function (d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
    };
  })();
var EdgeEasingPlugin = /** @class */ (function (_super) {
  __extends(EdgeEasingPlugin, _super);
  function EdgeEasingPlugin() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this;
    _this._remainMomentum = {
      x: 0,
      y: 0,
    };
    return _this;
  }
  EdgeEasingPlugin.prototype.transformDelta = function (delta) {
    var _a = this.scrollbar,
      limit = _a.limit,
      offset = _a.offset;
    var x = this._remainMomentum.x + delta.x;
    var y = this._remainMomentum.y + delta.y;
    // clamps momentum within [-offset, limit - offset]
    this.scrollbar.setMomentum(
      Math.max(-offset.x, Math.min(x, limit.x - offset.x)),
      Math.max(-offset.y, Math.min(y, limit.y - offset.y))
    );
    return { x: 0, y: 0 };
  };
  EdgeEasingPlugin.prototype.onRender = function (remainMomentum) {
    Object.assign(this._remainMomentum, remainMomentum);
  };
  EdgeEasingPlugin.pluginName = "edgeEasing";
  return EdgeEasingPlugin;
})(Scrollbar.ScrollbarPlugin);
Scrollbar.use(EdgeEasingPlugin);
Scrollbar.init(document.querySelector("#scroll-container"), options);
Scrollbar.detachStyle();
