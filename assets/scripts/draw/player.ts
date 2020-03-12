import Arrow from "./arrow"
const {ccclass, property} = cc._decorator;

@ccclass
export default class Player extends cc.Component {

    @property(cc.Prefab)
    arrow:cc.Prefab = null;    

    private arrows:Arrow[] =[];
    private _arrow_index :number =0;
    onLoad () {
        let arrow;
        for(let i =0 ; i <10 ;i ++)
        {
            arrow =cc.instantiate(this.arrow);
            this.node.addChild(arrow);
            this.arrows[i]=arrow.getComponent("arrow");
            this.arrows[i].node.active=false;
        }
        this.arrows[this._arrow_index].node.position=cc.v2(20,0);
        this.arrows[this._arrow_index].node.active=true;
    }
    setPalyerPos(pos:cc.Vec2){
        this.node.position = pos;
    }
    drawStrack(vecNor:cc.Vec2,length:number){
        this.arrows[this._arrow_index].drawStrack(vecNor,length);
    }
    shot(){
        this.arrows[this._arrow_index].shot();
        this._arrow_index++;
        if(this._arrow_index == 10) this._arrow_index = 0;
        this.arrows[this._arrow_index].node.position=cc.v2(20,0);
        this.arrows[this._arrow_index].node.active=true;

    }

    // update (dt) {

    // }
}
