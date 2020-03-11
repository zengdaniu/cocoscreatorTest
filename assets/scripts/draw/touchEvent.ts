
import Player from "./player";
const {ccclass, property} = cc._decorator;

@ccclass
export class TouchEvent extends cc.Component {

    @property (cc.Node)
    point_start:cc.Node = null;
    @property (cc.Node)
    point_end:cc.Node = null;
    @property(cc.Node)
    graphics_node :cc.Node =null;
    @property(cc.Node)
    player:cc.Node =null;

    private _player :Player =null;
    private _graphics :cc.Graphics =null;
    onLoad () {
        cc.log('register touch');
        //this.node.on(cc.Node.EventType.MOUSE_DOWN, this.on_touch_start, this);
        this.node.on(cc.Node.EventType.TOUCH_START, this.on_touch_start, this);
		//this.node.on(cc.Node.EventType.MOUSE_MOVE, this.on_touch_move, this);
		this.node.on(cc.Node.EventType.TOUCH_MOVE, this.on_touch_move, this);
		//this.node.on(cc.Node.EventType.MOUSE_UP, this.on_touch_end, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.on_touch_end, this);
        this.point_start.active =false;
        this.point_end.active =false;
        this._graphics = this.graphics_node.getComponent(cc.Graphics); 
        this._player = this.player.getComponent("player");
    }
    
    on_touch_start(event:cc.Event.EventTouch){
        cc.log('on_touch_start');
        this._graphics.node.active =true;
        this.point_start.active =true;
        this.point_start.position=event.getLocation();//this.node.convertTouchToNodeSpace(event.touch);
    }

    on_touch_move(event:cc.Event.EventTouch){
        this.point_end.active =true;
        this.point_end.position=event.getLocation();//this.node.convertTouchToNodeSpace(event.touch);
        this.drawLine(event);
        let v2:cc.Vec2 = this.point_start.position.sub(event.getLocation());
        this._player.drawStrack(v2.normalize(),v2.mag());
    }

    on_touch_end(event:cc.Event.EventTouch){
        this.point_start.active =false;
        this.point_end.active =false;
        this._graphics.clear();
        this._player.shot();
    }
    drawLine(event:cc.Event.EventTouch){
        this._graphics.clear();
        this._graphics.moveTo(event.getStartLocation().x,event.getStartLocation().y) ;
        this._graphics.lineTo(event.getLocation().x,event.getLocation().y);
        this._graphics.stroke();
    }
    // start () {

    // }

    // update (dt) {}
}
