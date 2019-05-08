import './style/index.css'

import things from './things'
import * as PX from 'pixi.js'
import star from './createStar'
import spaceMan from './spaceMan'
import rocket from './rocket'
import DApps from './apps'
// import CreateText from './text'

const canvasContainer = document.querySelector('#canvas')
setFontSize()
const step1 = document.querySelector('#step1')
step1.classList.add('show')
const app = new PX.Application({
  backgroundColor: '0x343B63',
  width: window.screen.width,
  height: window.screen.height
})
app.stage.interactive = true

canvasContainer.insertBefore(app.view, step1)

bindEvent()

const t = star(app)
// spaceMan(app)
rocket(app)
t.speedHigh().then(() => {})
// CreateText(app)
// addStatic()
// addApps()

function addStatic() {
  const items = createPics(things)
  items.forEach(item => {
    app.stage.addChild(item)
  })
}

async function addApps() {
  const items = createPics(await DApps(app.view.width, app.view.height))
  items.forEach(item => {
    item.interactive = true
    item.buttonMode = true
    item.alpha = 0.3
    item.checked = false
    item.anchor.x = 0.5
    item.anchor.y = 0.5
    item
      .on('pointerover', function() {
        if (!this.checked) {
          this.alpha = 10
        }
      })
      .on('pointerout', function() {
        if (!this.checked) {
          this.alpha = 0.3
        }
      })
      .on('pointerdown', function() {
        if (!this.checked) {
          this.alpha = 1
          this.scale.x *= 1.2
          this.scale.y *= 1.2
        }
        this.checked = true
      })
    app.stage.addChild(item)
  })
}

function createPics(resources) {
  let result = []
  resources.forEach(item => {
    const temp = new PX.Sprite(PX.Texture.fromImage(item.img, true))
    temp.scale.x = 0.07
    temp.scale.y = 0.07
    temp.x = item.x
    temp.y = item.y

    result.push(temp)
  })

  return result
}
