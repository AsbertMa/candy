import * as PX from 'pixi.js'

const SpaceMan = (app) => {
  let count = 0
  let ropeLength = 300 / 10
  let points = []
  for (let i = 0; i < 20; i++) {
    points.push(new PX.Point(i * ropeLength, 0))
  }

  let strip = new PX.mesh.Rope(PX.Texture.fromImage(require('./assets/path.png')), points)
  let man = new PX.Sprite(PX.Texture.fromImage(require('./assets/fly.png')))
  strip.x = 0
  strip.y = 0
  let snakeContainer = new PX.Container()
  snakeContainer.x = 0
  snakeContainer.y = 500
  man.x = 1100
  app.stage.addChild(snakeContainer)
  snakeContainer.addChild(strip)
  snakeContainer.addChild(man)

  app.ticker.add(function () {
    count += 0.01
    for (let i = 0; i < points.length; i++) {
      points[i].y = Math.sin((i * 0.3) + count) * 30
      points[i].x = i * ropeLength + Math.cos((i * 0.2) + count) * 30
    }
    man.x = points[19].x - 50
    man.y = points[19].y - 80
    
  })
}

export default SpaceMan
