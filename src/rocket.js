import * as PX from 'pixi.js'

const rocket = (app) => {
  const fire = new PX.Sprite(PX.Texture.from(require('./assets/fire.png')))
  const ship = new PX.Sprite(PX.Texture.from(require('./assets/ship.png')))

  fire.x = 1130
  fire.y = 173
  fire.anchor.y = 0.5
  fire.anchor.x = 0.05
  fire.scale.y = 0.6
  fire.scale.x = 0.6

  let isZoomP = false

  ship.x = 700
  ship.y = 50

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
      fire.scale.x += 0.06
    } else {
      fire.scale.x -= 0.06
    }
  })
}

export default rocket
