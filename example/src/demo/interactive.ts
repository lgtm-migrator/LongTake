import { DemoAttr } from './index'

export const interactive: DemoAttr[] = [
    {
        name: 'click',
        title: 'Click',
        desc: '',
        code: /* javascript */ `
            (longtake, LongTake) => {
                class Button extends LongTake.Sprite {
                    constructor(x, y) {
                        super()
                        this.count = 0
                        this.x = x
                        this.y = y
                        this.setAnchor(0.5)
                        this.on('click', () => {
                            this.count += 1
                            this.unCache()
                        })
                    }
                    render() {
                        this.context.fillStyle = '#000'
                        this.context.fillRect(0, 0, this.width, this.height)
                        this.context.fillStyle = '#fff'
                        this.context.textBaseline = 'top'
                        this.context.fillText(this.count, 0, 0)
                        this.cache()
                    }
                }
                let centerX = longtake.width / 2
                let centerY = longtake.height / 2
                let mainBtn = new Button(centerX, centerY)
                mainBtn.addChildren(new Button(30, 30))
                // 啟用互動模式
                longtake.enableInteractive()
                longtake.addChildren(mainBtn)
            }
        `
    },
    {
        name: 'drag',
        title: 'Drag',
        desc: '',
        code: /* javascript */ `
            (longtake, LongTake) => {
                class Block extends LongTake.Sprite {
                    constructor() {
                        super()
                        this.x = longtake.width / 2
                        this.y = longtake.height / 2
                        this.setAnchor(0.5)
                    }
                    render() {
                        this.context.fillStyle = '#000'
                        this.context.fillRect(0, 0, this.width, this.height)
                        this.cache()
                    }
                }
                let block = new Block()
                let dragging = false
                // 啟用互動模式
                longtake.enableInteractive()
                longtake.on('pointerdown', ({ x, y }) => {
                    if (block.inRect(x, y)) {
                        dragging = true
                    }
                })
                longtake.on('pointermove', ({ x, y }) => {
                    if (dragging) {
                        block.x = x
                        block.y = y
                    }
                })
                longtake.on('pointerup', () => {
                    if (dragging) {
                        dragging = false
                    }
                })
                longtake.addChildren(block)
            }
        `
    }
]