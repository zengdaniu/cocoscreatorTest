// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        // 主角跳跃高度
        jumpHeight: 0,
        // 主角跳跃持续时间
        jumpDuration: 0,
        // 最大移动速度
        maxMoveSpeed: 0,
        //起跳速度
        v0:10,
        //像素比
        pixelPro:100,
        // 加速度
        accel: 0
    },
    setJumpAction:function(){
        // var jumpUp = cc.moveBy(this.jumpDuration,cc.v2(0,this.jumpHeight)).easing(cc.easeCubicActionOut());
        // var jumpDowm = cc.moveBy(this.jumpDuration,cc.v2(0,-this.jumpHeight)).easing(cc.easeCubicActionIn());        
        // return cc.repeatForever(cc.sequence(jumpUp,jumpDowm));
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //this.jumpAction=this.setJumpAction();
        //this.node.runAction(this.jumpAction);

         // 加速度方向开关
         this.accLeft = false;
         this.accRight = false;
         // 主角当前水平方向速度
         this.xSpeed = 0;
         this.winSize=cc.winSize;
         //当前速度
         this.tmpV = this.v0;
         //initY;
         this.initY=this.node.y;
         // 初始化键盘输入监听
         cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
         cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);   
    },
    onDestroy () {
        // 取消键盘输入监听
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },
    onKeyDown (event) {
        // set a flag when key pressed
        switch(event.keyCode) {
            case cc.macro.KEY.a:
                this.accLeft = true;
                break;
            case cc.macro.KEY.d:
                this.accRight = true;
                break;
        }
    },

    onKeyUp (event) {
        // unset a flag when key released
        switch(event.keyCode) {
            case cc.macro.KEY.a:
                this.accLeft = false;
                break;
            case cc.macro.KEY.d:
                this.accRight = false;
                break;
        }
    },


    start () {
        
    },

    update (dt) {
         // 根据当前加速度方向每帧更新速度
         if (this.accLeft) {
            
            if(this.xSpeed>0){
                this.xSpeed -= this.accel * dt*2;
            }else{
                this.xSpeed -= this.accel * dt;
            }

        
        } else if (this.accRight) {
            if(this.xSpeed<0){
                this.xSpeed += this.accel * dt*2;
            }else{
                this.xSpeed += this.accel * dt;
            }
        }else{//衰减速度
            if(this.xSpeed<0){
                this.xSpeed += Math.min(Math.abs(this.xSpeed),this.accel * dt/2);
            }else{
                this.xSpeed -= Math.min(Math.abs(this.xSpeed),this.accel * dt/2);
            }
        }

        // 限制主角的速度不能超过最大值
        if ( Math.abs(this.xSpeed) > this.maxMoveSpeed ) {
            // if speed reach limit, use max speed with current direction
            this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
        }

        // 根据当前速度更新主角的位置
        this.node.x += this.xSpeed * dt;
        if(this.node.x > this.winSize.width/2){
            this.node.x = this.winSize.width/2;
            
            this.xSpeed=-this.xSpeed;
        }else if(this.node.x < -this.winSize.width/2)
        {
            this.node.x = -this.winSize.width/2;
            this.xSpeed = -this.xSpeed;          
        }

        //加速度算当前的位置
        var s = (this.tmpV*dt-1/2*(10)*dt*dt)*this.pixelPro; 
        this.tmpV +=-10*dt;
        if(this.node.y +s < this.initY){
            this.node.y = this.initY;
            this.tmpV = this.v0;
        }else{
            this.node.y += s;
        }

        if(this.tmpV > 0){
            this.node.scaleX =1 + this.tmpV/(3*this.v0);
            this.node.scaleY =1 - this.tmpV/(3*this.v0);
        }
    },
});
