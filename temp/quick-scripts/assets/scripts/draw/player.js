(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/draw/player.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '5d3d8L40EhOLK3WAyx/s6+O', 'player', __filename);
// scripts/draw/player.ts

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
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.arrow = null;
        _this.arrows = [];
        _this._arrow_index = 0;
        return _this;
        // update (dt) {
        // }
    }
    Player.prototype.onLoad = function () {
        var arrow;
        for (var i = 0; i < 10; i++) {
            arrow = cc.instantiate(this.arrow);
            this.node.addChild(arrow);
            this.arrows[i] = arrow.getComponent("arrow");
            this.arrows[i].node.active = false;
        }
        this.arrows[this._arrow_index].node.position = cc.v2(20, 0);
        this.arrows[this._arrow_index].node.active = true;
    };
    Player.prototype.setPalyerPos = function (pos) {
        this.node.position = pos;
    };
    Player.prototype.drawStrack = function (vecNor, length) {
        this.arrows[this._arrow_index].drawStrack(vecNor, length);
    };
    Player.prototype.shot = function () {
        this.arrows[this._arrow_index].shot();
        this._arrow_index++;
        if (this._arrow_index == 10)
            this._arrow_index = 0;
        this.arrows[this._arrow_index].node.position = cc.v2(20, 0);
        this.arrows[this._arrow_index].node.active = true;
    };
    __decorate([
        property(cc.Prefab)
    ], Player.prototype, "arrow", void 0);
    Player = __decorate([
        ccclass
    ], Player);
    return Player;
}(cc.Component));
exports.default = Player;

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
        //# sourceMappingURL=player.js.map
        