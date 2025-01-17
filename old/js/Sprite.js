
/**
 * @class Sprite(name)
 * @desc 建立一個動畫精靈，為LongTake的驅動核心
 */

class Sprite extends ModuleBase {

    constructor(name){
        super( name || "Sprite" );
        this.name = name || "No name";
        this.main = null;
        this.helper = Helper;
        this.bindUpdateForChild = this.updateForChild.bind(this);
        this.initEvent();
        this.initRender();
        this.initStatus();
        this.initBitmap();
        this.initFamily();
        this.initPosition();
        this.initTransform();
    }

    /**
     * @function isSprite(target)
     * @static
     * @desc 檢測一個物件是否為精靈
     */

    static isSprite(object){
        return object instanceof this;
    }

    /**
     * @function eachChildren(callback)
     * @desc 迭代所有子精靈
     */

    eachChildren(callback){
        let len = this.children.length;
        for( let i = 0 ; i < len ; i++ ){ callback(this.children[i]); }
    }

    /**
     * @function eachChildrenDeep(callback)
     * @desc 迭代所有子精靈(包含子精靈的子精靈)
     */

    eachChildrenDeep(callback){
        let each = function(sprite){
            sprite.eachChildren((children)=>{
                callback(children);
                each(children);
            });
        }
        each(this);
    }

    /**
     * @function super(name)
     * @desc 當實體化該精靈後，可以使用super呼叫實體化前的函式
     * @param {string} name 呼叫函式名稱
     */

    super(name){
        if( this.__proto__[name] ){
            this.__proto__[name].call(this, ...[...arguments].slice(1));
        }else{
            this.systemError("super", "Prototype not found.", name);
        }
    }

    //=============================
    //
    // install
    //

    /**
     * @function install(main)
     * @private
     * @desc 被加入LongTake時執行，並載入LongTake
     */

    install(main){
        this.main = main;
        this.main.register(this);
        this.create();
    }

    /**
     * @function create()
     * @desc 當被加入stage時呼叫該函式
     */

    create(){ /* user set */ }

    //=============================
    //
    // bitmap
    //

    initBitmap(){
        let parent = this.parent || {};
        this.bitmap = new Bitmap( parent.width || 100, parent.height || 100 );
        this.context = this.bitmap.context;
    }

    /**
     * @member {number} width 精靈寬(和Bitmap同步)
     * @member {number} height 精靈高(和Bitmap同步)
     */

    get width(){ return this.bitmap.width }
    set width(val){ this.bitmap.width = val }

    get height(){ return this.bitmap.height }
    set height(val){ this.bitmap.height = val }

    /**
     * @function resize(width,height)
     * @desc 調整精靈的bitmap大小
     * @param {object|number} width 當傳入為具有width和height的物件，會調整成該大小
     */

    resize( width, height ){
        if( typeof width === "object" ){
            if( width.width && width.height ){
                this.bitmap.resize( width.width, width.height )
            }else{
                this.systemError( "resize", "Object must have width and height.", width );
            }
        }else{
            this.bitmap.resize(width, height)
        }
    }

    //=============================
    //
    // family
    //

    /**
     * @member {Sprite} parent 父精靈
     * @member {array} children 子精靈組
     */

    initFamily(){
        this.parent = null;
        this.children = [];
    }

    /**
     * @function addChildren(sprite)
     * @desc 加入一個子精靈
     */

    addChildren(sprite){
        if( Sprite.isSprite(sprite) ){
            if( sprite.parent == null ){
                sprite.parent = this;
                this.children.push(sprite);
                this.sortChildren();
            }else{
                this.systemError('addChildren', 'Sprite have parent.', sprite);
            }
        }else{
            this.systemError('addChildren', 'Object not a sprite', sprite);
        }
    }

    /**
     * @function sortChildren()
     * @desc 重新排列子精靈，當子精靈有Z值改變時會自動觸發
     */

    sortChildren(){
        let newData = [];
        let childList = [];
        this.eachChildren((child)=>{
            if( childList[child.z] == null ){ childList[child.z] = []; }
            childList[child.z].push(child)
        })
        this.each( childList, (list)=>{
            if( Array.isArray(list) ){ newData = newData.concat(list); }
        });
        this.children = newData;
    }

    //=============================
    //
    // event
    //

    initEvent(){
        this.event = {};
    }

    /**
     * @function on(name,event,callback)
     * @desc 監聽一個事件
     */

    on( name, event, callback ){
        if( this.event[name] == null ){
            if( this.main.core ){ this.main.core.addEvent(event); }
            this.event[name] = {
                event,
                callback,
            }
        }else{
            this.systemError( 'on', `Event name(${name}) conflict.` )
        }
    }

    /**
     * @function unon(name)
     * @desc 移除監聽的事件
     */

    unon( name ){
        this.event[name] = null;
    }

    mainEvent(eventAction){
        if( this.main == null ){ this.install(this.parent.main); }
        this.each( eventAction, ( event, key )=>{
            this.each( this.event, (data)=>{
                if( data.event === key ){ data.callback(event); }
            });
        });
        this.eachChildren((children)=>{
            children.mainEvent(eventAction);
        });
    }

    //=============================
    //
    // transform
    //

    /**
     * @member {number} skewX 傾斜X
     * @member {number} skewY 傾斜Y
     * @member {number} scaleWidth 放大寬
     * @member {number} scaleHeight 放大高
     * @member {number} rotation 旋轉
     * @member {number} opacity 透明度
     * @member {string} blendMode 合成模式
     * @member {number} screenScaleWidth 該精靈在最後顯示的總倍率寬
     * @member {number} screenScaleHeight 該精靈在最後顯示的總倍率高
     */

    initTransform(){
        this.transform = {
            skewX : 0,
            skewY : 0,
            scaleWidth : 1,
            scaleHeight : 1,
            rotation : 0,
            opacity : 255,
            blendMode : 'source-over',
        }
    }

    /**
     * @function isTransform()
     * @desc 是否有變形
     */

    isTransform(){
        let t = this.transform;
        return !(t.skewX === 0 && t.skewY === 0 && t.scaleWidth === 1 && t.scaleHeight === 1 && t.rotation === 0);
    }

    /**
     * @function scale(width,height)
     * @desc 設定放大倍率
     */

    scale( width, height ){
        this.scaleWidth = width;
        this.scaleHeight = height == null ? width : height;
    }

    get scaleWidth(){ return this.transform.scaleWidth }
    set scaleWidth(val){
        this.transform.scaleWidth = val;
    }

    get scaleHeight(){ return this.transform.scaleHeight }
    set scaleHeight(val){
        this.transform.scaleHeight = val;
    }

    get screenScaleWidth(){ return this.parent == null ? this.scaleWidth : this.scaleWidth * this.parent.screenScaleWidth }
    get screenScaleHeight(){ return this.parent == null ? this.scaleHeight : this.scaleHeight * this.parent.screenScaleHeight }

    get rotation(){ return this.transform.rotation }
    set rotation(val){
        this.transform.rotation = val % 360;
    }

    get blendMode(){ return this.transform.blendMode };
    set blendMode(val){
        this.transform.blendMode = val;
    }

    get opacity(){ return this.transform.opacity };
    set opacity(val){
        if( val <= 0 ){ val = 0; }
        if( val >= 255 ){ val = 255; }
        this.transform.opacity = val;
    }

    get skewX(){ return this.transform.skewX }
    set skewX(val){
        this.transform.skewX = val;
    }

    get skewY(){ return this.transform.skewY }
    set skewY(val){
        this.transform.skewY = val;
    }

    //=============================
    //
    // position
    //

    /**
     * @member {number} x 定位點X
     * @member {number} y 定位點Y
     * @member {number} z 高度，每次設定會重新排序
     * @member {number} anchorX 錨點X
     * @member {number} anchorY 錨點Y
     */

    initPosition(){
        this.position = {
            x : 0,
            y : 0,
            z : 0,
            screenX : 0,
            screenY : 0,
            anchorX : 0,
            anchorY : 0,
        }
    }

    /**
     * @function setAnchor(x,y)
     * @desc 設定錨點
     */

    setAnchor(x, y){
        this.anchorX = x;
        this.anchorY = y == null ? x : y
    }

    get x(){ return this.position.x }
    set x(val){ 
        if( typeof val === "number" ) {
            this.position.x = val || 0;
        }
    }

    get y(){ return this.position.y }
    set y(val){ 
        if( typeof val === "number" ) {
            this.position.y = val || 0;
        }
     }

    get z(){ return this.position.z }
    set z(val){
        if( typeof val === "number" ){
            this.position.z = val;
            if( this.parent ){ this.parent.status.sort = true; }
        }
    }

    get screenX(){
        if( this.position.screenX == null ){
            this.position.screenX = (this.parent ? this.parent.screenX + this.parent.width * this.parent.anchorX : 0) + this.x - this.width * this.anchorX;
        }
        return this.position.screenX;
    }

    get screenY(){ 
        if( this.position.screenY == null ){
            this.position.screenY = (this.parent ? this.parent.screenY + this.parent.height * this.parent.anchorY : 0) + this.y - this.height * this.anchorY;
        }
        return this.position.screenY
    }

    get posX(){ return this.screenX + this.width * this.anchorX }
    get posY(){ return this.screenY + this.height * this.anchorY }

    get anchorX(){ return this.position.anchorX }
    set anchorX(val){
        this.position.anchorX = val;
    }

    get anchorY(){ return this.position.anchorY }
    set anchorY(val){
        this.position.anchorY = val;
    }
    
    //=============================
    //
    // status
    //

    initStatus(){
        this.status = {
            sort : false,
            cache : false,
            remove : false,
            hidden : false,
            realSize : null,
            childrenDead : false,
        }
    }

    get canRender(){ return !this.status.cache }
    get canShow(){ return !this.status.hidden }

    /**
     * @function cache()
     * @desc 快取目前渲染的bitmap
     */

    cache(){
        this.status.cache = true;
        this.bitmap.cache = true;
    }

    /**
     * @function unCache()
     * @desc 手動解除快取狀態
     */

    unCache(){
        this.status.cache = false;
        this.bitmap.cache = false;
    }

    /**
     * @function hidden()
     * @desc 隱藏
     */

    hidden(bool){
        this.status.hidden = bool ? !!bool : true;
    }

    /**
     * @function unHidden()
     * @desc 解除隱藏
     */

    unHidden(){
        this.status.hidden = false;
    }

    /**
     * @function getRealSize()
     * @desc 獲取該精靈實際呈現的大小
     */

    getRealSize(){
        if( this.status.realSize == null ){
            let width = this.width + this.skewY * this.height;
            let height = this.height + this.skewX * this.width;
            let s = Math.abs( this.helper.sinByRad(this.rotation) );
            let c = Math.abs( this.helper.cosByRad(this.rotation) );
            this.status.realSize = {
                width : ( width * c + height * s ) * this.screenScaleWidth,
                height : ( height * c + width * s ) * this.screenScaleHeight,
            }
        }
        return this.status.realSize;
    }

    /**
     * @function getRealPosition()
     * @desc 獲取精靈在畫布的準確位置
     */

    getRealPosition(){
        return {
            x : this.screenX * ( this.parent == null ? 1 : this.parent.screenScaleWidth ),
            y : this.screenY * ( this.parent == null ? 1 : this.parent.screenScaleHeight ),
        }
    }

    //=============================
    //
    // update
    //

    /**
     * @function update()
     * @desc 每次渲染圖形時執行此函式，目的為精靈的動作
     */

    update(){ /* module set */ }

    /**
     * @function mainUpdate()
     * @private
     * @desc 每次執行update時呼叫此函式，處理Z值更動的排序與移除子精靈
     */

    mainUpdate(){
        if( this.main == null ){ this.install(this.parent.main); }
        this.position.screenX = null;
        this.position.screenY = null;
        this.status.realSize = null;
        if( this.status.sort ){
            this.status.sort = false;
            this.sortChildren();
        }
        this.update();
        this.eachChildren(this.bindUpdateForChild);
        if( this.status.childrenDead ){
            this.status.childrenDead = false;
            this.children = this.children.filter((child)=>{
                if( child.status.remove ){ 
                    child.close();
                }
                return !child.status.remove;
            });
        }
    }

    /**
     * @function updateForChild(child)
     * @private
     * @desc 呼叫子精靈更新
     */

    updateForChild(child){
        if( child.status.remove == false ){
            child.mainUpdate();
        }else{
            this.status.childrenDead = true;
        }
    }

    //=============================
    //
    // remove
    //

    /**
     * @function close()
     * @private
     * @desc 移除自身的綁定資訊(容易出錯，請使用remove讓精靈在迭代過程中被移除)
     */

    close(){
        this.id = -1; 
        this.parent = null; 
    }

    /**
     * @function remove()
     * @desc 移除自己於父精靈下
     */

    remove(){
        this.status.remove = true;
    }

    /**
     * @function removeChild(sprite)
     * @desc 移除指定的子精靈
     */

    removeChild(sprite){
        if( Sprite.isSprite(sprite) ){
            if( sprite.parent === this ){
                sprite.remove();
            }else{
                this.systemError("removeChild", "Have'n this sprite", sprite);
            }
        }else{
            this.systemError("removeChild", "Not a sprite", sprite);
        }
    }

    /**
     * @function clearChildren()
     * @desc 移除全部的子精靈
     */

    clearChildren(){
        this.eachChildren((children)=>{
            this.removeChild(children);
        })
    }

    /**
     * @function removeChildrenByName(name)
     * @desc 移除指定name的精靈
     */

    removeChildrenByName(name){
        this.eachChildren((children)=>{
            if( children.name === name ){ this.removeChild(children); }
        })
    }

    /**
     * @function removeChildrenByIndex(index)
     * @desc 移除指定index的精靈
     */

    removeChildrenByIndex(index){
        if( typeof index === "number" && this.children[index] ){
            this.children[index].remove();
        }
    }

    //=============================
    //
    // render
    //

    /**
     * @function filter(imgData)
     * @default null
     * @desc 渲染濾鏡的函式
     */

    initRender(){
        this.filter == null;
    }

    /**
     * @function render()
     * @desc 渲染bitmap的方法
     */
    
    render(){ /* module set */ }

    /**
     * @function mainRender()
     * @private
     * @desc 主要渲染程序，包含渲染與濾鏡
     */

    mainRender(){
        this.eachChildren(this.renderForChild)
        if( this.canRender ){ 
            this.context.save();
            this.render();
            this.context.restore();
            this.renderFilter(this.filter);
            this.context.restore();
            this.bitmap.clearCache();
        }
    }

    /**
     * @function renderForChild(child)
     * @private
     * @desc 呼叫子精靈渲染
     */

    renderForChild(child){
        child.mainRender();
    }

    /**
     * @function fromImage(img)
     * @desc 將精靈設置成img檔案的解析度，並將render宣告成渲染該圖片並快取
     */

    fromImage(img){
        this.resize(img);
        this.render = function(){
            this.context.drawImage( img, 0, 0 );
            this.cache();
        }
        return this;
    }

    /**
     * @function renderFilter(filter)
     * @private
     * @desc 操作堆疊渲染的函式
     */

    renderFilter(filter){
        if( filter ){
            let imgData = this.bitmap.getImageData();
            filter.call(this, imgData);
            this.bitmap.putImageData(imgData);
            this.eachChildren((child) => {child.renderFilter(filter);});
        }
    }

    /**
     * @function eachImgData(imgData,callback)
     * @desc 迭代像素
     * @callback (pixel:object,render:function)
     */

    eachImgData(imgData, callback) {
        let data = imgData.data
        let index = 0
        let render = function(r = 0, g = 0, b = 0, a = 255) {
            data[index] = r.red || r
            data[index + 1] = r.green || g
            data[index + 2] = r.blue  || b
            data[index + 3] = r.alpha || a
        }
        for (let i = 0; i < data.length; i += 4) {
            index = i
            let pixel = {
                red: data[i],
                green: data[i + 1],
                blue : data[i + 2],
                alpha: data[i + 3],
            }
            callback(pixel, render)
        }
    }

    //=============================
    //
    // check
    //

    /**
     * @function inRect(x,y)
     * @desc 座標是否在精靈的矩形範圍內
     */

    inRect(x,y){
        let rect = this.getRealSize();
        let position = this.getRealPosition();
        return ( x >= position.x && x <= position.x + rect.width ) 
            && ( y >= position.y && y <= position.y + rect.height );
    }

}
