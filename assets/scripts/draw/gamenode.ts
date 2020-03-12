import Player from "./player";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameNode extends cc.Component {

    @property(cc.Node)
    map :cc.Node = null;
    @property(cc.Node)
    player :cc.Node = null;
    @property(cc.Node)
    monster:cc.Node = null;

    private _tiledMap :cc.TiledMap =null;
    private _player :Player =null;
    onLoad () {
        this._tiledMap=this.map.getComponent(cc.TiledMap);
        this._player = this.player.getComponent('player');

        let self =this;
        cc.loader.loadRes("map1", function(err, map){
            self._tiledMap.tmxAsset = map;
            self.setPlayerPos();
        });
    }

    start () {
        

    }
    setPlayerPos(){
        let startPoint=this._tiledMap.getObjectGroup('player').getObject('startPoint');
        cc.log("x="+startPoint.x+" y="+startPoint.y);
        this._player.setPalyerPos(cc.v2(startPoint.x,startPoint.y));
    }

    // update (dt) {}
}
