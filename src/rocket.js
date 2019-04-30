import * as PX from 'pixi.js'

const rocket = (app) => {
  const fire = new PX.Sprite(PX.Texture.from(require('./assets/fire.png')))
  const ship = new PX.Sprite(PX.Texture.from(require('./assets/ship.png')))

  const fireScX = 0.06
  const shipScX = 0.003
  const shipScY = 0.005

  fire.x = 1130
  fire.y = 173
  fire.anchor.y = 0.5
  fire.anchor.x = 0.08
  fire.scale.y = 0.6
  fire.scale.x = 0.6

  let isZoomP = false

  ship.x = 915
  ship.y = 170

  ship.scale.x = 1
  ship.scale.y = 1
  ship.anchor.x = 0.5
  ship.anchor.y = 0.5

  app.stage.addChild(fire)
  app.stage.addChild(ship)

  app.ticker.add(() => {
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
  })
}

export default rocket
