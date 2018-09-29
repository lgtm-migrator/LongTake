class RenderBuffer extends ModuleBase {

    constructor(main){
        super("RenderBuffer");
        this.main = main;
        this.stage = main.stage;
        this.width = main.width;
        this.height = main.height;
        this.canvas = document.createElement('canvas');
        this.canvas.width = main.width;
        this.canvas.height = main.height;
        this.context = this.canvas.getContext('2d');
        this.speedRender = null;
    }

    useSuperRender(){
        if( this.canvas.toBlob && window.createImageBitmap && window.Worker ){
            let script = `
                function getImg(img){
                    postMessage(img);
                }
                onmessage = function(message){
                    self.createImageBitmap(message.data).then(getImg);
                }
            `;
            let blob = new Blob([script], {type: 'application/javascript'});
            this.speedRender = new Worker(URL.createObjectURL(blob));
            this.speedRender.onmessage = (message)=>{
                this.main.drawTarget(message.data);
            }
            this.workerPost = (blob)=>{
                this.speedRender.postMessage(blob);
            }
        }else{
            this.systemError( "useSuperRender", "UseSuperRender can't use, something function not support." );
        }
    }

    draw(){
        this.context.clearRect( 0, 0, this.width, this.height );
        this.render(this.stage);
        this.finish();
    }

    finish(){
        if( this.speedRender ){
            this.canvas.toBlob(this.workerPost);
        }else{
            this.main.drawTarget(this.canvas);
        }
    }

    render(sprite){
        if( sprite.transform ){
            this.context.save();
            this.drawTransform(sprite);
        }
        this.context.drawImage( sprite.bitmap.getRenderTarget(), Math.floor(sprite.screenX), Math.floor(sprite.screenY) );
        let len = sprite.children.length;
        for( let i = 0 ; i < len ; i++ ){
            this.render(sprite.children[i]);
        }
        if( sprite.transform ){ 
            this.context.restore();
        }
    }

    drawTransform(sprite){
        //中心
        let posX = sprite.posX;
        let posY = sprite.posY;
        let context = this.context;
            context.translate( posX, posY );
        if( sprite.opacity !== 255 ){
            context.globalAlpha = sprite.opacity / 255;
        }
        //合成
        if( sprite.blendMode ){
            context.globalCompositeOperation = sprite.blendMode;
        }
        if( sprite.rotation !== 0 ){
            context.rotate( sprite.rotation * sprite.helper.arc );
        }
        if( sprite.scaleHeight !== 1 || sprite.scaleWidth !== 1 ){
            context.scale( sprite.scaleWidth, sprite.scaleHeight );
        }
        if( sprite.skewX !== 0 || sprite.skewY !== 0 ){
            context.transform( 1, sprite.skewX, sprite.skewY, 1, 0, 0 );
        }
        //回歸原點
        context.translate( -(posX), -(posY) );
    }

}