import App, { ease, easein } from './createCanvas'
import * as PX from 'pixi.js'

const rocket = (app) => {
  const container = new PX.Container()
  const startX = 2180
  const endX = 1720
  const width = app.view.width
  container.setTransform(startX, app.view.height/2, 0.6, 0.6)
  console.log(app.view.height)
  app.stage.addChild(container)

  const fire = new PX.Sprite(PX.Texture.from(require('./assets/fire.png')))
  const ship = new PX.Sprite(PX.Texture.from(require('./assets/ship.png')))

  const fireScX = 0.06
  const shipScX = 0.003
  const shipScY = 0.005

  fire.anchor.y = 0.5
  fire.anchor.x = 0.08
  fire.setTransform(217, 3, 0.6, 0.6)

  let isZoomP = false

  ship.setTransform(0, 0)
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

  const moveIn = (time) => {
    return new Promise((
      resolve, reject
    ) => {
      const now = Date.now()
      const end = now + time
      const dist = startX - endX
      function moving () {
        const dater = ease(1 - Math.max(0, ((end - Date.now()) / time)))
        container.x = width - dist * dater
        container.scale.x = 0.6 + 0.6 * dater
        container.scale.y = 0.6 + 0.6 * dater
        if (end < Date.now()) {
          removeM()
        }
      }

      function removeM () {
        resolve()
        app.ticker.remove(moving)
        app.ticker.add(tickerFc)
      }
      app.ticker.add(moving)
    })
  }

  const moveOut = (time) => {
    return new Promise((resolve, reject) => {
      const end = Date.now() + time
      const dist = container.x + 300
      function moving () {
        const dater = easein(1 - Math.max(0, ((end - Date.now()) / time)))
        container.x -= dist * dater
        if (end < Date.now()) {
          removeM()
        }
      }

      function removeM () {
        app.ticker.remove(tickerFc)
        app.ticker.remove(moving)
        container.destroy({children: true})
        resolve()
      }
      app.ticker.add(moving)
    })
  }

  return {
    show: () => {
      return moveIn(1000)
    },
    hide: () => {
      return moveOut(1000)
    }
  }
}
const createRocket = () => {
  return rocket(App.instance)
}
export default createRocket
