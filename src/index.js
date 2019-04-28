import './style/index.css'

import * as PX from 'pixi.js'
import star from './createStar'

const app = new PX.Application({
  backgroundColor: '0x343B63',
  width: window.screen.width,
  height: window.screen.height
})
app.stage.interactive = true

document.body.appendChild(app.view)


star(app)

const graphics = new PX.Graphics()
// // set a fill and line style
graphics.beginFill(0xFF3300)
graphics.lineStyle(10, 0xffd900, 1)

graphics.moveTo(50, 50);
graphics.lineTo(250, 50);
graphics.lineTo(100, 100);
graphics.lineTo(250, 220);
graphics.lineTo(50, 220);
graphics.lineTo(50, 50);
graphics.endFill();

app.stage.addChild(graphics);

