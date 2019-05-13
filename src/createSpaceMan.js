import App, { easeCus } from './createCanvas'
import * as PX from 'pixi.js'
import { resolve } from 'url'

const SpaceMan = (app) => {
  let count = 0
  let ropeLength = 300 / 10
  let endX = 0
  let points = []
  for (let i = 0; i < 20; i++) {
    points.push(new PX.Point(i * ropeLength, 0))
  }

  let strip = new PX.mesh.Rope(PX.Texture.fromImage(require('./assets/path.png')), points)
  let man = new PX.Sprite(PX.Texture.fromImage(require('./assets/fly.png')))

  strip.x = 0
  strip.y = 0
  let container = new PX.Container()
  container.x = 600
  container.y = 500
  app.stage.addChild(container)
  container.addChild(strip)
  container.addChild(man)

  const tickerFc = () => {
    count += 0.01
    for (let i = 0; i < points.length; i++) {
      points[i].y = Math.sin((i * 0.3) + count) * 30
      points[i].x = i * ropeLength + Math.cos((i * 0.2) + count) * 30
    }
    man.x = points[19].x - 50
    man.y = points[19].y - 80
  }

  app.ticker.add(tickerFc)

  const moveIn = (time) => {
    return new Promise((resolve, reject) => {
      const end = Date.now() + time
      const dist = endX - container.x
      function move () {
        container.x = dist * easeCus(Math.max(0, (end - Date.now()) / time))
        if (end < Date.now()) {
          removeM()
        }
      }

      function removeM () {
        resolve()
        app.ticker.remove(move)
      }

      app.ticker.add(move)
    })
  }
  const moveOut = () => {
  }

  return {
    show() {
      return moveIn(9000)
    },
    destroy() {
      app.ticker.remove(tickerFc)
      container.destroy()
    }
  }
}
const createSpaceMan = () => {
  return SpaceMan(App.instance)
}
export default createSpaceMan
