!function(t,e){"undefined"!=typeof module&&"object"==typeof exports?module.exports=e():"function"==typeof define&&(define.amd||define.cmd)?define(function(){return e}):t.LongTake=e()}(this||("undefined"!=typeof window?window:global),function(){class t{constructor(t){this.moduleBase={name:t||"No module base name."}}each(t,e){if("object"==typeof t)if(Array.isArray(t)){var i=t.length;for(let s=0;s<i;s++){if("_break"===e(t[s],s))break}}else for(let i in t){if("_break"===e(t[i],i))break}else this.systemError("each","Not a object or array.",t)}systemError(t,e,i){throw i&&(console.log("%c error object is : ","color:#FFF; background:red"),console.log(i)),new Error(`(☉д⊙)!! ${this.moduleBase.name} => ${t} -> ${e}`)}}let e=new class{constructor(){this.arc=Math.PI/180,this.rarc=180/Math.PI,this.trigonometric={};for(let t=-360;t<360;t++)this.trigonometric[t]={},this.trigonometric[t].sin=Math.sin(t*this.arc),this.trigonometric[t].cos=Math.cos(t*this.arc)}sinByRad(t){return this.trigonometric[Math.round(t)]?this.trigonometric[Math.round(t)].sin:Math.sin(t*this.arc)}cosByRad(t){return this.trigonometric[Math.round(t)]?this.trigonometric[Math.round(t)].cos:Math.cos(t*this.arc)}getVector(t,e){return{x:e*this.cosByRad(t),y:e*this.sinByRad(t)}}randInt(t,e){return Math.floor(Math.random()*(e-t+1)+t)}getAngle(t,e,i,s){if(t==i&&e==s)return 0;var a=Math.atan2(s-e,i-t)*this.rarc;return a>0?a:360+a}getVisibility(t){let e=document.body.clientWidth;return e<600?"xs"===t:e>=600&&e<960?-1!==["sm","xs"].indexOf(t):e>=960&&e<1264?-1!==["sm","xs","md"].indexOf(t):e>=1264&&e<1904?-1!==["sm","xs","md","lg"].indexOf(t):e>=1904&&-1!==["sm","xs","md","lg","xl"].indexOf(t)}};class i{static get(t){return i[t]&&"constructor"!==t&&"get"!==t?i[t]:i.linear}static linear(t,e){return t/e}static easeInQuad(t,e){return 1*(t/=e)*t}static easeOutQuad(t,e){return-1*(t/=e)*(t-2)}static easeInOutQuad(t,e){return(t/=e/2)<1?.5*t*t:-.5*(--t*(t-2)-1)}static easeInCubic(t,e){return 1*(t/=e)*t*t}static easeOutCubic(t,e){return 1*((t=t/e-1)*t*t+1)}static easeInOutCubic(t,e){return(t/=e/2)<1?.5*t*t*t:.5*((t-=2)*t*t+2)}static easeInQuart(t,e){return 1*(t/=e)*t*t*t}static easeOutQuart(t,e){return-1*((t=t/e-1)*t*t*t-1)}static easeInOutQuart(t,e){return(t/=e/2)<1?.5*t*t*t*t:-.5*((t-=2)*t*t*t-2)}static easeInQuint(t,e){return 1*(t/=e)*t*t*t*t}static easeOutQuint(t,e){return 1*((t=t/e-1)*t*t*t*t+1)}static easeInOutQuint(t,e){return(t/=e/2)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2)}static easeInSine(t,e){return-1*Math.cos(t/e*(Math.PI/2))+1}static easeOutSine(t,e){return 1*Math.sin(t/e*(Math.PI/2))}static easeInOutSine(t,e){return-.5*(Math.cos(Math.PI*t/e)-1)}static easeInExpo(t,e){return 0==t?0:1*Math.pow(2,10*(t/e-1))}static easeOutExpo(t,e){return t==e?1:1*(1-Math.pow(2,-10*t/e))}static easeInOutExpo(t,e){return 0==t?0:t==e?1:(t/=e/2)<1?.5*Math.pow(2,10*(t-1)):.5*(2-Math.pow(2,-10*--t))}static easeInCirc(t,e){return-1*(Math.sqrt(1-(t/=e)*t)-1)}static easeOutCirc(t,e){return 1*Math.sqrt(1-(t=t/e-1)*t)}static easeInOutCirc(t,e){return(t/=e/2)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)}static easeInElastic(t,e){var i=1.70158,s=0,a=1;if(0==t)return 0;if(1==(t/=e))return 1;if(s||(s=.3*e),a<1){a=1;i=s/4}else i=s/(2*Math.PI)*Math.asin(1/a);return-a*Math.pow(2,10*(t-=1))*Math.sin((t*e-i)*(2*Math.PI)/s)}static easeOutElastic(t,e){var i=1.70158,s=0,a=1;if(0==t)return 0;if(1==(t/=e))return 1;if(s||(s=.3*e),a<1){a=1;i=s/4}else i=s/(2*Math.PI)*Math.asin(1/a);return a*Math.pow(2,-10*t)*Math.sin((t*e-i)*(2*Math.PI)/s)+1}static easeInOutElastic(t,e){var i=1.70158,s=0,a=1;if(0==t)return 0;if(2==(t/=e/2))return 1;if(s||(s=e*(.3*1.5)),a<1){a=1;i=s/4}return t<1?a*Math.pow(2,10*(t-=1))*Math.sin((t*e-i)*(2*Math.PI)/s)*-.5:a*Math.pow(2,-10*(t-=1))*Math.sin((t*e-i)*(2*Math.PI)/s)*.5+1}static easeInBack(t,e){var i=1.70158;return 1*(t/=e)*t*((i+1)*t-i)}static easeOutBack(t,e){var i=1.70158;return 1*((t=t/e-1)*t*((i+1)*t+i)+1)}static easeInOutBack(t,e){var i=1.70158;return(t/=e/2)<1?t*t*((1+(i*=1.525))*t-i)*.5:.5*((t-=2)*t*((1+(i*=1.525))*t+i)+2)}static easeInBounce(t,e){return 1-this.easeOutBounce(e-t,e)}static easeOutBounce(t,e){return(t/=e)<1/2.75?7.5625*t*t*1:t<2/2.75?1*(7.5625*(t-=1.5/2.75)*t+.75):t<2.5/2.75?1*(7.5625*(t-=2.25/2.75)*t+.9375):1*(7.5625*(t-=2.625/2.75)*t+.984375)}static easeInOutBounce(t,e){return t<e/2?.5*this.easeInBounce(2*t,e):.5*this.easeOutBounce(2*t-e,e)+.5}}class s extends t{constructor(t=100,e=100,i,s="2d"){super("Bitmap"),this.offscreenCanvasSupport="undefined"==typeof self?!!window.OffscreenCanvas:!!self.OffscreenCanvas,this.canvas=i||this.offscreenCanvasSupport?new OffscreenCanvas(t,e):document.createElement("canvas"),this.context=this.canvas.getContext(s),this.cache=!1,this.imgData=null,this.imgBitmap=null,this._width=this.canvas.width,this._height=this.canvas.height,null==i&&this.resize(t,e)}static isBitmap(t){return t instanceof this}get width(){return this._width}set width(t){this._width=t,this.canvas.width=t}get height(){return this._height}set height(t){this._height=t,this.canvas.height=t}getRenderTarget(){return this.imgBitmap&&!0===this.cache?this.imgBitmap:!1===this.cache?this.canvas:(this.cacheImageBitmap(),this.offscreenCanvasSupport?this.imgBitmap:this.canvas)}resize(t,e){this.width=t||this.width,this.height=e||this.height}clear(){this.context.clearRect(0,0,this.width,this.height)}cacheImageBitmap(){if(this.offscreenCanvasSupport)this.imgBitmap=this.canvas.transferToImageBitmap();else{let t=new Image;t.onload=(()=>{this.imgBitmap=t}),t.src=this.canvas.toDataURL()}}clearCache(){this.imgData=null,this.imgBitmap=null}getPixel(t,e){let i=this.getImageData(),s=t*(4*i.width)+4*e;return[i.data[s],i.data[s+1],i.data[s+2],i.data[s+3]]}getImageData(){return null==this.imgData&&(this.imgData=this.context.getImageData(0,0,this.width,this.height)),this.imgData}putImageData(t){this.clear(),this.context.putImageData(t,0,0)}}class a extends t{constructor(t,e,i){super("Container"),this.data=null,this.core=i||null,this.bitmap=new s(t,e),this.context=this.bitmap.context,this.stackOpacity=[],this.pointerX=0,this.pointerY=0,this.initStage()}get width(){return this.bitmap.canvas.width}get height(){return this.bitmap.canvas.height}initStage(){this.stage=new h("Stage"),this.stage.install(this),this.stage.resize(0,0),this.stage.render=function(){this.cache()}}register(t){this.core&&this.each(t.event,t=>{null==this.core.event[t.event]&&this.core.addEvent(t.event)})}post(t){this.data=t,this.stageUpdate(),this.stageRender()}stageUpdate(){this.stage.mainUpdate()}stageRender(){this.stage.mainRender(),this.draw()}getImageBitmap(t){if(this.bitmap.offscreenCanvasSupport){let e=this.bitmap.canvas.transferToImageBitmap();t(e),e.close()}else t(this.bitmap.canvas)}addChildren(t){this.stage.addChildren(t)}draw(){this.bitmap.clear(),this.render(this.stage)}render(t){if(t.canShow){let e=Math.round(t.screenX),i=Math.round(t.screenY),s=t.getRealPosition();this.transform(t),s.x<this.width&&s.y<this.height&&this.context.drawImage(t.bitmap.getRenderTarget(),e,i);let a=t.children.length;for(let e=0;e<a;e++)this.render(t.children[e]);this.restore(t)}}transform(t){var e=this.context;if(1===t.scaleHeight&&1===t.scaleWidth||e.save(),255!==t.opacity&&(this.stackOpacity.push(t.opacity),e.globalAlpha=this.stackOpacity.reduce((t,e)=>t+e)/(255*this.stackOpacity.length)),"source-over"!==t.blendMode&&(e.globalCompositeOperation=t.blendMode),!1===t.isTransform())return;let i=t.posX,s=t.posY;e.translate(i,s),1===t.scaleHeight&&1===t.scaleWidth||e.scale(t.scaleWidth,t.scaleHeight),0!==t.rotation&&e.rotate(t.rotation*t.helper.arc),0===t.skewX&&0===t.skewY||e.transform(1,t.skewX,t.skewY,1,0,0),e.translate(-i,-s)}restore(t){var e=this.context;if(1!==t.scaleHeight||1!==t.scaleWidth)return void e.restore();if(255!==t.opacity&&(this.stackOpacity.pop(),0===this.stackOpacity.length?e.globalAlpha=1:e.globalAlpha=this.stackOpacity.reduce((t,e)=>t+e)/(255*this.stackOpacity.length)),"source-over"!==t.blendMode&&(e.globalCompositeOperation="source-over"),!1===t.isTransform())return;let i=t.posX,s=t.posY;e.translate(i,s),0!==t.rotation&&e.rotate(-t.rotation*t.helper.arc),0===t.skewX&&0===t.skewY||e.transform(1,-t.skewX,-t.skewY,1,0,0),e.translate(-i,-s)}}class h extends t{constructor(t){super(t||"Sprite"),this.name=t||"No name",this.main=null,this.helper=e,this.bindUpdateForChild=this.updateForChild.bind(this),this.initEvent(),this.initRender(),this.initStatus(),this.initBitmap(),this.initFamily(),this.initPosition(),this.initTransform()}static isSprite(t){return t instanceof this}eachChildren(t){let e=this.children.length;for(let i=0;i<e;i++)t(this.children[i])}eachChildrenDeep(t){let e=function(i){i.eachChildren(i=>{t(i),e(i)})};e(this)}super(t){this.__proto__[t]?this.__proto__[t].call(this,...[...arguments].slice(1)):this.systemError("super","Prototype not found.",t)}install(t){this.main=t,this.main.register(this),this.create()}create(){}initBitmap(){let t=this.parent||{};this.bitmap=new s(t.width||100,t.height||100),this.context=this.bitmap.context}get width(){return this.bitmap.width}set width(t){this.bitmap.width=t}get height(){return this.bitmap.height}set height(t){this.bitmap.height=t}resize(t,e){"object"==typeof t?t.width&&t.height?this.bitmap.resize(t.width,t.height):this.systemError("resize","Object must have width and height.",t):this.bitmap.resize(t,e)}initFamily(){this.parent=null,this.children=[]}addChildren(t){h.isSprite(t)?null==t.parent?(t.parent=this,this.children.push(t),this.sortChildren()):this.systemError("addChildren","Sprite have parent.",t):this.systemError("addChildren","Object not a sprite",t)}sortChildren(){let t=[],e=[];this.eachChildren(t=>{null==e[t.z]&&(e[t.z]=[]),e[t.z].push(t)}),this.each(e,e=>{Array.isArray(e)&&(t=t.concat(e))}),this.children=t}initEvent(){this.event={}}on(t,e,i){null==this.event[t]?(this.main.core&&this.main.core.addEvent(e),this.event[t]={event:e,callback:i}):this.systemError("on",`Event name(${t}) conflict.`)}unon(t){this.event[t]=null}mainEvent(t){null==this.main&&this.install(this.parent.main),this.each(t,(t,e)=>{this.each(this.event,i=>{i.event===e&&i.callback(t)})}),this.eachChildren(e=>{e.mainEvent(t)})}initTransform(){this.transform={skewX:0,skewY:0,scaleWidth:1,scaleHeight:1,rotation:0,opacity:255,blendMode:"source-over"}}isTransform(){let t=this.transform;return!(0===t.skewX&&0===t.skewY&&1===t.scaleWidth&&1===t.scaleHeight&&0===t.rotation)}scale(t,e){this.scaleWidth=t,this.scaleHeight=e||t}get scaleWidth(){return this.transform.scaleWidth}set scaleWidth(t){this.transform.scaleWidth=t}get scaleHeight(){return this.transform.scaleHeight}set scaleHeight(t){this.transform.scaleHeight=t}get screenScaleWidth(){return null==this.parent?this.scaleWidth:this.scaleWidth*this.parent.screenScaleWidth}get screenScaleHeight(){return null==this.parent?this.scaleHeight:this.scaleHeight*this.parent.screenScaleHeight}get rotation(){return this.transform.rotation}set rotation(t){this.transform.rotation=t%360}get blendMode(){return this.transform.blendMode}set blendMode(t){this.transform.blendMode=t}get opacity(){return this.transform.opacity}set opacity(t){t<=0&&(t=0),t>=255&&(t=255),this.transform.opacity=t}get skewX(){return this.transform.skewX}set skewX(t){this.transform.skewX=t}get skewY(){return this.transform.skewY}set skewY(t){this.transform.skewY=t}initPosition(){this.position={x:0,y:0,z:0,screenX:0,screenY:0,anchorX:0,anchorY:0}}setAnchor(t,e){this.anchorX=t,this.anchorY=e||t}get x(){return this.position.x}set x(t){"number"==typeof t&&(this.position.x=t||0)}get y(){return this.position.y}set y(t){"number"==typeof t&&(this.position.y=t||0)}get z(){return this.position.z}set z(t){"number"==typeof t&&(this.position.z=t,this.parent&&(this.parent.status.sort=!0))}get screenX(){return null==this.position.screenX&&(this.position.screenX=(this.parent?this.parent.screenX+this.parent.width*this.parent.anchorX:0)+this.x-this.width*this.anchorX),this.position.screenX}get screenY(){return null==this.position.screenY&&(this.position.screenY=(this.parent?this.parent.screenY+this.parent.height*this.parent.anchorY:0)+this.y-this.height*this.anchorY),this.position.screenY}get posX(){return this.screenX+this.width*this.anchorX}get posY(){return this.screenY+this.height*this.anchorY}get anchorX(){return this.position.anchorX}set anchorX(t){this.position.anchorX=t}get anchorY(){return this.position.anchorY}set anchorY(t){this.position.anchorY=t}initStatus(){this.status={sort:!1,cache:!1,remove:!1,hidden:!1,realSize:null,childrenDead:!1}}get canRender(){return!this.status.cache}get canShow(){return!this.status.hidden}cache(){this.status.cache=!0,this.bitmap.cache=!0}unCache(){this.status.cache=!1,this.bitmap.cache=!1}hidden(t){this.status.hidden=!t||!!t}unHidden(){this.status.hidden=!1}getRealSize(){if(null==this.status.realSize){let t=this.width+this.skewY*this.height,e=this.height+this.skewX*this.width,i=Math.abs(this.helper.sinByRad(this.rotation)),s=Math.abs(this.helper.cosByRad(this.rotation));this.status.realSize={width:(t*s+e*i)*this.screenScaleWidth,height:(e*s+t*i)*this.screenScaleHeight}}return this.status.realSize}getRealPosition(){return{x:this.screenX*(null==this.parent?1:this.parent.screenScaleWidth),y:this.screenY*(null==this.parent?1:this.parent.screenScaleHeight)}}update(){}mainUpdate(){null==this.main&&this.install(this.parent.main),this.position.screenX=null,this.position.screenY=null,this.status.realSize=null,this.status.sort&&(this.status.sort=!1,this.sortChildren()),this.update(),this.eachChildren(this.bindUpdateForChild),this.status.childrenDead&&(this.status.childrenDead=!1,this.children=this.children.filter(t=>(t.status.remove&&t.close(),!t.status.remove)))}updateForChild(t){0==t.status.remove?t.mainUpdate():this.status.childrenDead=!0}close(){this.id=-1,this.parent=null}remove(){this.status.remove=!0}removeChild(t){h.isSprite(t)?t.parent===this?t.remove():this.systemError("removeChild","Have'n this sprite",t):this.systemError("removeChild","Not a sprite",t)}clearChildren(){this.eachChildren(t=>{this.removeChild(t)})}removeChildrenByName(t){this.eachChildren(e=>{e.name===t&&this.removeChild(e)})}removeChildrenByIndex(t){"number"==typeof t&&this.children[t]&&this.children[t].remove()}initRender(){this.filter}render(){}mainRender(){this.eachChildren(this.renderForChild),this.canRender&&(this.context.save(),this.render(),this.context.restore(),this.renderFilter(this.filter),this.context.restore(),this.bitmap.clearCache())}renderForChild(t){t.mainRender()}fromImage(t){return this.resize(t),this.render=function(){this.context.drawImage(t,0,0),this.cache()},this}renderFilter(t){if(t){let e=this.bitmap.getImageData();t.call(this,e),this.bitmap.putImageData(e),this.eachChildren(e=>{e.renderFilter(t)})}}eachImgData(t,e){let i=t.data,s=0,a=function(t=0,e=0,a=0,h=255){i[s]=t.red||t,i[s+1]=t.green||e,i[s+2]=t.blue||a,i[s+3]=t.alpha||h};for(let t=0;t<i.length;t+=4){s=t,e({red:i[t],green:i[t+1],blue:i[t+2],alpha:i[t+3]},a)}}inRect(t,e){let i=this.getRealSize(),s=this.getRealPosition();return t>=s.x&&t<=s.x+i.width&&e>=s.y&&e<=s.y+i.height}}let r=class extends t{constructor(t,e,i){super("Main"),this.width=e,this.height=i,this.ticker=0,this.remove=!1,this.target="string"==typeof t?document.getElementById(t):t,this.context=this.target.getContext("2d"),this.baseFps=0,this.viewScale=1,this.framePerSecond=60,this.bindUpdate=this.update.bind(this),this.targetRect=this.target.getBoundingClientRect(),this.container=new a(this.width,this.height,this),window.requestAnimationFrame=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)},this.initEvent(),this.initCamera(),this.update()}setFPS(t){"number"==typeof t&&t>0&&t<=60?this.framePerSecond=t:this.systemError("setFPS","FPS must between 1 to 60.",t)}close(){this.remove=!0,this.target=null,this.container.stage.eachChildrenDeep(t=>{t.close()}),window.removeEventListener("resize",this.windowResize.bind(this))}initCamera(){this.camera=new class{constructor(t){this.x=0,this.y=0,this.core=t}get offsetX(){return this.checkBorder(this.x,this.core.width*this.core.viewScale,this.core.targetRect.width)}get offsetY(){return this.checkBorder(this.y,this.core.height*this.core.viewScale,this.core.targetRect.height)}checkBorder(t,e,i){var s=i/2;return(t*=this.core.viewScale)>s?t>e-s?e-i:(t-s)/this.core.viewScale:0}}(this)}setCamera(t,e){this.camera.x=t,this.camera.y=e}initEvent(){this.event={},this.eventAction={},this.addEvent("click",this.resetPointerCoordinate),this.addEvent("pointermove",this.resetPointerCoordinate),this.windowResize(),window.addEventListener("resize",this.windowResize.bind(this))}addEvent(t,e){null==this.event[t]&&(this.event[t]=(i=>{null==this.eventAction[t]&&(this.eventAction[t]=i,e&&e.bind(this)(i))}),this.target.addEventListener(t,this.event[t]))}resetPointerCoordinate(t){this.container.pointerX=(t.offsetX/this.viewScale+this.camera.offsetX)*(this.target.width/this.targetRect.width),this.container.pointerY=(t.offsetY/this.viewScale+this.camera.offsetY)*(this.target.height/this.targetRect.height)}targetResize(t,e){this.target.width=t,this.target.height=e,this.targetRect=this.target.getBoundingClientRect()}windowResize(){this.targetRect=this.target.getBoundingClientRect(),this.onWindowResize()}onWindowResize(){}forElementResize(t,e=1){this.targetResize(t.clientWidth,t.clientHeight),t.clientWidth/this.width<t.clientHeight/this.height?this.viewScale=t.clientHeight/this.height*e:this.viewScale=t.clientWidth/this.width*e,this.context.restore(),this.context.save(),this.context.scale(this.viewScale,this.viewScale)}addChildren(t){this.container.addChildren(t)}update(){if(1==this.remove)return window.cancelAnimationFrame(this.ticker),null;this.baseFps+=this.framePerSecond,this.stageUpdate(),this.baseFps>=60&&(this.bitmapUpdate(),this.baseFps=this.baseFps%60),this.eventAction={},this.ticker=window.requestAnimationFrame(this.bindUpdate)}stageUpdate(){this.container.stage.mainEvent(this.eventAction),this.container.stageUpdate()}bitmapUpdate(){this.container.stageRender(),this.context.clearRect(0,0,this.width,this.height),this.context.drawImage(this.container.bitmap.canvas,-this.camera.offsetX,-this.camera.offsetY)}};return r.Sprite=h,r.Bitmap=s,r.Loader=class extends t{constructor(){super("Loader"),this.data={},this.files={},this.fileLength=0,this.completed=0}onload(t){this.completed>=this.fileLength?t():setTimeout(()=>{this.onload(t)},100)}start(t){for(let e in this.files){let i=new Image;i.onload=(()=>{window.createImageBitmap?window.createImageBitmap(i).then(t=>{this.data[e]=t}):this.data[e]=i,this.completed+=1,"function"==typeof t&&t(this.completed,this.fileLength),this.completed===this.fileLength&&(delete this.files,delete this.types)}),i.src=this.files[e]}}add(t,e){null==this.files[t]?(this.fileLength+=1,this.files[t]=this.validateFile(e)):this.systemError("add","Name conflict.",t)}validateFile(t){let e=t.split(".").pop();return-1!==["png","jpg"].indexOf(e)||"data:"===t.slice(0,5)?t:t instanceof Element&&t.tagName("CANVAS")?canvas.toDataURL("image/png"):void this.systemError("validateFile","File type not allowed( png, jpg, canvas element, base64url ).",t)}get(t){if(this.data[t])return this.data[t];this.systemError("get","Data not found.",t)}close(t){t&&this.data[t]?(this.data[t].src="",this.data[t]=null):this.each(this.data,t=>{t.src="",t=null})}},r.Helper=e,r.Animate=class extends t{constructor(t){super("Animate"),this.validate({push:[t.push,60],time:[t.begin,0],duration:[t.duration,0],easing:[t.easing,"linear"],alternate:[t.alternate,!1],reverse:[t.reverse,!1],action:[t.action,function(){}]}),this.over=!1,this.actionEasing=i.get(this.easing),this.pace=1e3/this.push}validate(t){for(let e in t){let i=t[e][0],s=t[e][1];i?typeof i==typeof s?this[e]=i:this.systemError("validated","Type error",i):this[e]=s}}move(){if(!1===this.over){let t=this.actionEasing(this.time+=this.reverse?-this.pace:this.pace,this.duration);return this.action(t),this.alternate?this.time>=this.duration?this.reverse=!0:this.reverse&&this.time<=0&&(this.reverse=!1):this.time>=this.duration&&(this.over=!0),t}return 1}restart(){this.time=0,this.over=!1}},r.Container=a,r});