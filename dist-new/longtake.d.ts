import { Base } from './base';
import { Sprite } from './sprite';
import { Loader } from './loader';
import { Animate } from './animate';
/** 核心 */
export declare class LongTake extends Base {
    /** 繪製圖的寬 */
    width: number;
    /** 繪製圖的高 */
    height: number;
    /** 整體視圖倍率 */
    viewScale: number;
    /** 目前運行的canvas實際大小 */
    targetRect: DOMRect;
    event: Record<string, (event: any) => void>;
    eventAction: Record<string, any>;
    private ticker;
    private remove;
    /** 目前運行的canvas */
    private target;
    private context;
    /** 目前實際運行的fps */
    private baseFps;
    /** 目前運行的偵數 */
    private framePerSecond;
    /** 主要運行的container，由本核心驅動內部精靈的update和event */
    private container;
    private camera;
    private bindUpdate;
    private bindWindowResize;
    private supportRequestAnimationFrame;
    private requestAnimationFrame;
    constructor(target: string | HTMLCanvasElement, width: number, height: number);
    static get Sprite(): typeof Sprite;
    static get Animate(): typeof Animate;
    static get Loader(): typeof Loader;
    /** 設置動畫的FPS */
    setFPS(fps: number): void;
    /** 關閉這個Longtake */
    close(): void;
    /** 移動鏡頭至 x,y */
    setCamera(x: number, y: number): void;
    /** 監聽一個事件 */
    addEvent(eventName: string, callback?: (event: any) => void): void;
    /** 重新設定矯正過後的觸及位置 */
    private resetPointerCoordinate;
    /** 調整視圖 canvas 的大小 */
    targetResize(width: number, height: number): void;
    private windowResize;
    /** 當畫面旋轉或縮放時觸發該function(自定義) */
    onWindowResize(): void;
    /** 縮放視圖倍率至指定element大小(cover縮放模式) */
    forElementResize(element: HTMLElement, scale?: number): void;
    /** 加入一個精靈至 container 底下 */
    addChildren(sprite: Sprite): void;
    private update;
    private stageUpdate;
    private bitmapUpdate;
}
