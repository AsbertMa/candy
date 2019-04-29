import './style/index.css'

import * as PX from 'pixi.js'
import star from './createStar'
import ship from './createStaticThings'
import spaceMan from './spaceMan'
import rocket from './rocket'

const app = new PX.Application({
  backgroundColor: '0x343B63',
  width: window.screen.width,
  height: window.screen.height
})
app.stage.interactive = true

document.body.appendChild(app.view)

const t = star(app)
const s = ship(app)
spaceMan(app)
rocket(app)
t.speedHigh().then(() => {
  s.show()
})


