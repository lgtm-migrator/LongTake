import { Event } from './base'
import { Loader } from './loader'
import { helper } from './helper'
import { Animate } from './animate'
import { Container } from './container'
import { Sprite, ImageSprite, TextSprite } from './sprite'
import { ListenerGroup, pointer } from './event'

/** 核心 */

type Channels = {
    click: {
        x: number
        y: number
    }
    pointerdown: {
        x: number
        y: number
    }
    pointermove: {
        x: number
        y: number
    }
    pointerup: {}
}

export class LongTake extends Event<Channels> {
    /** 繪製圖的寬 */
    readonly width: number
    /** 繪製圖的高 */
    readonly height: number
    private ticker: any = null
    private remove = false
    /** 目前運行的canvas */
    private target: HTMLCanvasElement
    private context: CanvasRenderingContext2D
    private pointerEvent: ListenerGroup
    private listenerGroup: ListenerGroup
    /** 主要運行的container，由本核心驅動內部精靈的update和event */
    private container: Container
    private bindUpdate = this.update.bind(this)
    private interactive = false
    private supportRequestAnimationFrame = !!window.requestAnimationFrame
    private requestAnimationFrame = (callback: any) => {
        if (this.supportRequestAnimationFrame) {
            return window.requestAnimationFrame(callback)
        } else {
            return setTimeout(callback, 1000 / 60)
        }
    }
    constructor(target: string | HTMLCanvasElement, width?: number, height?: number) {
        super('Main')
        this.target = typeof target === 'string' ? document.getElementById(target) as any : target
        this.context = this.target.getContext('2d')!
        this.context.imageSmoothingEnabled = false
        this.width = width != null ? width : this.target.width
        this.height = height != null ? height : this.target.height
        this.container = new Container(this.width, this.height, this)
        this.pointerEvent = new ListenerGroup(this.target)
        this.listenerGroup = new ListenerGroup(this.target)
        this.listenerGroup.add('click', event => this.emit('click', {
            x: event.offsetX,
            y: event.offsetY
        }))
        this.on('click', (data) => {
            this.container.stage.eachChildren(child => child._onClick(data.x, data.y))
        })
        this.update()
    }

    static get version() {
        return '1.0'
    }

    static get helper() {
        return helper
    }

    static get Sprite() {
        return Sprite
    }

    static get ImageSprite() {
        return ImageSprite
    }

    static get TextSprite() {
        return TextSprite
    }

    static get Animate() {
        return Animate
    }

    static get Loader() {
        return Loader
    }

    /** 清空所有精靈 */

    clear() {
        this.container.stage.clearChildren()
    }

    /** 關閉這個Longtake */

    close() {
        this.clear()
        this.remove = true
        this.pointerEvent.close()
        this.listenerGroup.close()
        this.container.stage.eachChildrenDeep((child) => {
            child._close()
        })
        if (this.interactive) {
            this.interactive = false
            this.target.style.touchAction = 'auto'
        }
    }

    /** 加入一個精靈至 container 底下 */

    addChildren(sprite: Sprite) {
        this.container.addChildren(sprite)
    }

    /** 啟動互動模式 */

    enableInteractive() {
        if (this.interactive) {
            console.warn(`interactive already enabled.`)
            return null
        }
        this.interactive = true
        this.pointerEvent = pointer(this.target, {
            end: () => this.emit('pointerup', {}),
            move: ({ x, y }) => this.emit('pointermove', { x, y }),
            start: ({ x, y }) => this.emit('pointerdown', { x, y })
        })
        this.target.style.touchAction = 'none'
    }

    private update() {
        if (this.remove === true) {
            if (this.supportRequestAnimationFrame) {
                window.cancelAnimationFrame(this.ticker)
            } else {
                window.clearTimeout(this.ticker)
            }
            return null
        }
        this.stageUpdate()
        this.bitmapUpdate()
        this.ticker = this.requestAnimationFrame(this.bindUpdate)
    }

    private stageUpdate() {
        this.container.stageUpdate()
    }

    private async bitmapUpdate() {
        this.container.stageRender()
        this.context.clearRect(0, 0, this.width, this.height)
        this.context.drawImage(this.container.bitmap.canvas, 0, 0, this.width, this.height)
    }
}
