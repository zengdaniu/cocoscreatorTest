
const {ccclass, property} = cc._decorator;

@ccclass
export default class Arrow extends cc.Component {
    private _graphics_strack :cc.Graphics = null;
    private _intervalTI = 0.1
    private _strackLineCount = 20;
    private _G:number = -80;
    private _speed:cc.Vec2 =null;
    private _is_shot:boolean =false;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this._graphics_strack = this.node.getChildByName("graphics").getComponent(cc.Graphics);
    }
    drawStrack(vecNor:cc.Vec2,length:number){
        //根据朝向计算出夹角弧度
        let vx=cc.v2(0,1); 
        let angle =vx.signAngle(vecNor);
        //将弧度转换为欧拉角
        let degree = angle / Math.PI * 180;
        //赋值给节点
        this.node.angle = degree ;
        
        let speed= length;
        let curSpeed=cc.v2(speed*vecNor.x/vecNor.mag(),speed*vecNor.y/vecNor.mag());
        this._speed = curSpeed;
        let pos :cc.Vec2=this.node.parent.convertToWorldSpaceAR(this.node.position);
        let moveX =pos.x;
        let moveY =pos.y;
        this._graphics_strack.clear();
        this._graphics_strack.moveTo(moveX,moveY);
        let interval = this._intervalTI;
        for(let i = 1 ; i < this._strackLineCount ; i++){
            //s =V0*t + 1/2a*T^2;
            moveY =pos.y+curSpeed.y*interval +0.5*this._G*(interval*interval)
            moveX =pos.x+curSpeed.x*interval;
            //curSpeed.y +=this._G* interval;
            if(i%2 == 1)
            {
                this._graphics_strack.lineTo(moveX,moveY);    
                this._graphics_strack.stroke();
            }
            {
                this._graphics_strack.moveTo(moveX,moveY);                
            }
            interval+= this._intervalTI;
        }
    }
    shot(){
        this._is_shot =true;
    }

    update (dt) {
            if(!this._is_shot) return false;
            //s =V0*t + 1/2a*T^2;
            let time = dt*3;
            let moveY =this._speed.y*time +0.5*this._G*(time*time);
            let moveX =this._speed.x*time;
            this._speed.y += this._G*time;
            let newPos=this.node.position.add(cc.v2(moveX,moveY)); 
            let workPos=this.node.parent.convertToWorldSpaceAR(newPos);  //newpos是相当于父类的坐标系坐标 所以要用父类的坐标转化

            if(workPos.x >960 || workPos.x <0 || workPos.y>640 || workPos.y <0){
                this._is_shot =false;
                this.node.active =false;
                return;
            }
            let vx=cc.v2(0,1); 
            let angle =vx.signAngle(this._speed);
            //将弧度转换为欧拉角
            let degree = angle / Math.PI * 180;
            //赋值给节点
            this.node.angle = degree ;
            this.node.position=newPos;
    }
}
