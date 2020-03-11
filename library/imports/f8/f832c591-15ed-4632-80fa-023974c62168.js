"use strict";
cc._RF.push(module, 'f832cWRFe1GMoD6Ajl0xiFo', 'touchEvent');
// scripts/draw/touchEvent.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TouchEvent = /** @class */ (function (_super) {
    __extends(TouchEvent, _super);
    function TouchEvent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.point_start = null;
        _this.point_end = null;
        _this.graphics_node = null;
        _this.player = null;
        _this._player = null;
        _this._graphics = null;
        return _this;
        // start () {
        // }
        // update (dt) {}
    }
    TouchEvent.prototype.onLoad = function () {
        cc.log('register touch');
        //this.node.on(cc.Node.EventType.MOUSE_DOWN, this.on_touch_start, this);
        this.node.on(cc.Node.EventType.TOUCH_START, this.on_touch_start, this);
        //this.node.on(cc.Node.EventType.MOUSE_MOVE, this.on_touch_move, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.on_touch_move, this);
        //this.node.on(cc.Node.EventType.MOUSE_UP, this.on_touch_end, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.on_touch_end, this);
        this.point_start.active = false;
        this.point_end.active = false;
        this._graphics = this.graphics_node.getComponent(cc.Graphics);
        this._player = this.player.getComponent("player");
    };
    TouchEvent.prototype.on_touch_start = function (event) {
        cc.log('on_touch_start');
        this._graphics.node.active = true;
        this.point_start.active = true;
        this.point_start.position = event.getLocation(); //this.node.convertTouchToNodeSpace(event.touch);
    };
    TouchEvent.prototype.on_touch_move = function (event) {
        this.point_end.active = true;
        this.point_end.position = event.getLocation(); //this.node.convertTouchToNodeSpace(event.touch);
        this.drawLine(event);
        var v2 = this.point_start.position.sub(event.getLocation());
        this._player.drawStrack(v2.normalize(), v2.mag());
    };
    TouchEvent.prototype.on_touch_end = function (event) {
        this.point_start.active = false;
        this.point_end.active = false;
        this._graphics.clear();
        this._player.shot();
    };
    TouchEvent.prototype.drawLine = function (event) {
        this._graphics.clear();
        this._graphics.moveTo(event.getStartLocation().x, event.getStartLocation().y);
        this._graphics.lineTo(event.getLocation().x, event.getLocation().y);
        this._graphics.stroke();
    };
    __decorate([
        property(cc.Node)
    ], TouchEvent.prototype, "point_start", void 0);
    __decorate([
        property(cc.Node)
    ], TouchEvent.prototype, "point_end", void 0);
    __decorate([
        property(cc.Node)
    ], TouchEvent.prototype, "graphics_node", void 0);
    __decorate([
        property(cc.Node)
    ], TouchEvent.prototype, "player", void 0);
    TouchEvent = __decorate([
        ccclass
    ], TouchEvent);
    return TouchEvent;
}(cc.Component));
exports.TouchEvent = TouchEvent;

cc._RF.pop();