import App from './createCanvas'
import * as PX from 'pixi.js'

const rocket = (app) => {
  const container = new PX.Container()
  container.x = 1300
  container.y = 540
  container.scale.x = 1.2
  container.scale.y = 1.2
  app.stage.addChild(container)

  const fire = new PX.Sprite(PX.Texture.from(require('./assets/fire.png')))
  const ship = new PX.Sprite(PX.Texture.from(require('./assets/ship.png')))

  const fireScX = 0.06
  const shipScX = 0.003
  const shipScY = 0.005

  fire.x = 217
  fire.y = 3
  fire.anchor.y = 0.5
  fire.anchor.x = 0.08
  fire.scale.y = 0.6
  fire.scale.x = 0.6

  let isZoomP = false

  ship.x = 0
  ship.y = 0
  ship.anchor.x = 0.5
  ship.anchor.y = 0.5

  container.addChild(fire)
  container.addChild(ship)

  const tickerFc = () => {
    if (fire.scale.x > 1.1) {
      isZoomP = false
    }
    if (fire.scale.x < 1) {
      isZoomP = true
    }

    if (isZoomP) {
      ship.scale.y += shipScY
      ship.scale.x -= shipScX
      fire.scale.x += fireScX
    } else {
      ship.scale.y -= shipScY
      ship.scale.x += shipScX
      fire.scale.x -= fireScX
    }
  }

  app.ticker.add(tickerFc)

  return {
    destroy: () => {
      app.ticker.remove(tickerFc)
      container.destroy()
    }
  }
}
const createRocket = () => {
  return rocket(App.instance)
} 
export default createRocket
