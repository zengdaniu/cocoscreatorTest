(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/draw/arrow.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'dd4a0Lfx1tNXbYZSUohDQ49', 'arrow', __filename);
// scripts/draw/arrow.ts

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
var Arrow = /** @class */ (function (_super) {
    __extends(Arrow, _super);
    function Arrow() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._graphics_strack = null;
        _this._intervalTI = 0.1;
        _this._strackLineCount = 20;
        _this._G = -80;
        _this._speed = null;
        _this._is_shot = false;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    Arrow.prototype.onLoad = function () {
        this._graphics_strack = this.node.getChildByName("graphics").getComponent(cc.Graphics);
    };
    Arrow.prototype.drawStrack = function (vecNor, length) {
        //根据朝向计算出夹角弧度
        var vx = cc.v2(0, 1);
        var angle = vx.signAngle(vecNor);
        //将弧度转换为欧拉角
        var degree = angle / Math.PI * 180;
        //赋值给节点
        this.node.angle = degree;
        var speed = length;
        var curSpeed = cc.v2(speed * vecNor.x / vecNor.mag(), speed * vecNor.y / vecNor.mag());
        this._speed = curSpeed;
        var pos = this.node.parent.convertToWorldSpaceAR(this.node.position);
        var moveX = pos.x;
        var moveY = pos.y;
        this._graphics_strack.clear();
        this._graphics_strack.moveTo(moveX, moveY);
        var interval = this._intervalTI;
        for (var i = 1; i < this._strackLineCount; i++) {
            //s =V0*t + 1/2a*T^2;
            moveY = pos.y + curSpeed.y * interval + 0.5 * this._G * (interval * interval);
            moveX = pos.x + curSpeed.x * interval;
            //curSpeed.y +=this._G* interval;
            if (i % 2 == 1) {
                this._graphics_strack.lineTo(moveX, moveY);
                this._graphics_strack.stroke();
            }
            {
                this._graphics_strack.moveTo(moveX, moveY);
            }
            interval += this._intervalTI;
        }
    };
    Arrow.prototype.shot = function () {
        this._is_shot = true;
    };
    Arrow.prototype.update = function (dt) {
        if (!this._is_shot)
            return false;
        //s =V0*t + 1/2a*T^2;
        var time = dt * 3;
        var moveY = this._speed.y * time + 0.5 * this._G * (time * time);
        var moveX = this._speed.x * time;
        this._speed.y += this._G * time;
        var newPos = this.node.position.add(cc.v2(moveX, moveY));
        var workPos = this.node.parent.convertToWorldSpaceAR(newPos); //newpos是相当于父类的坐标系坐标 所以要用父类的坐标转化
        if (workPos.x > 960 || workPos.x < 0 || workPos.y > 640 || workPos.y < 0) {
            this._is_shot = false;
            this.node.active = false;
            return;
        }
        var vx = cc.v2(0, 1);
        var angle = vx.signAngle(this._speed);
        //将弧度转换为欧拉角
        var degree = angle / Math.PI * 180;
        //赋值给节点
        this.node.angle = degree;
        this.node.position = newPos;
    };
    Arrow = __decorate([
        ccclass
    ], Arrow);
    return Arrow;
}(cc.Component));
exports.default = Arrow;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=arrow.js.map
        