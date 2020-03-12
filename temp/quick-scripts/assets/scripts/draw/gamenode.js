(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/draw/gamenode.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'd3ab2HZ2/tE4ocMC7oDkrEM', 'gamenode', __filename);
// scripts/draw/gamenode.ts

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
var GameNode = /** @class */ (function (_super) {
    __extends(GameNode, _super);
    function GameNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.map = null;
        _this.player = null;
        _this.monster = null;
        _this._tiledMap = null;
        _this._player = null;
        return _this;
        // update (dt) {}
    }
    GameNode.prototype.onLoad = function () {
        this._tiledMap = this.map.getComponent(cc.TiledMap);
        this._player = this.player.getComponent('player');
        var self = this;
        cc.loader.loadRes("map1", function (err, map) {
            self._tiledMap.tmxAsset = map;
            self.setPlayerPos();
        });
    };
    GameNode.prototype.start = function () {
    };
    GameNode.prototype.setPlayerPos = function () {
        var startPoint = this._tiledMap.getObjectGroup('player').getObject('startPoint');
        cc.log("x=" + startPoint.x + " y=" + startPoint.y);
        this._player.setPalyerPos(cc.v2(startPoint.x, startPoint.y));
    };
    __decorate([
        property(cc.Node)
    ], GameNode.prototype, "map", void 0);
    __decorate([
        property(cc.Node)
    ], GameNode.prototype, "player", void 0);
    __decorate([
        property(cc.Node)
    ], GameNode.prototype, "monster", void 0);
    GameNode = __decorate([
        ccclass
    ], GameNode);
    return GameNode;
}(cc.Component));
exports.default = GameNode;

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
        //# sourceMappingURL=gamenode.js.map
        