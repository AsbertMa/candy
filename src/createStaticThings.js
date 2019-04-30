import * as PX from 'pixi.js'

const Things = (app) => {
  const resources = [
    {
      img: require('./assets/ship1.png'),
      x: 1900,
      y: 300,
    }
  ]
  const sprites = []

  resources.forEach((item) => {
    console.log(item)
    const temp = new PX.Sprite(PX.Texture.fromImage(item.img, 'use-credentials'))
    temp.x = item.x
    temp.y = item.y
    app.stage.addChild(temp)
    sprites.push(temp)
  })

  return {
    show: () => {
      // TODO
    }
  }
}

export default Things
