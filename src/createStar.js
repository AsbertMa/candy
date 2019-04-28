import * as PX from 'pixi.js'
const Star = (app) => {
  const starPng = require('./assets/star.png')
  const starTexture = PX.Texture.from(starPng)
  const starAmount = 500
  const stars = []
  let speed = 0
  const baseSpeed = 0.03
  let warpSpeed = 0
  let cameraZ = 0
  const fov = 20
  const starStretch = 100
  const starBaseSize = 0.06

  function randomizeStar (star, initial) {
    star.z = initial ? Math.random() * 2000 : cameraZ + Math.random() * 1000 + 2000

    // Calculate star positions with radial random coordinate so no star hits the camera.
    const deg = Math.random() * Math.PI * 2
    const distance = Math.random() * 50 + 1
    star.x = Math.cos(deg) * distance
    star.y = Math.sin(deg) * distance
  }

  for (let i = 0; i < starAmount; i++) {
    const star = {
      sprite: new PX.Sprite(starTexture),
      z: 0,
      x: 0,
      y: 0
    }

    star.sprite.anchor.x = 1
    star.sprite.anchor.y = 1.2

    randomizeStar(star, true)
    app.stage.addChild(star.sprite)
    stars.push(star)
  }

  app.ticker.add((delta) => {
    speed += (warpSpeed - speed) / 20
    cameraZ += delta * 10 * (speed + baseSpeed)
    for (let i = 0; i < starAmount; i++) {
      const star = stars[i]
      if (star.z < cameraZ) randomizeStar(star)
      const z = star.z - cameraZ
      star.sprite.x = star.x * (fov / z) * app.view.width + app.view.width / 2
      star.sprite.y = star.y * (fov / z) * app.view.width + app.view.height / 2
      const dxCenter = star.sprite.x - app.view.width / 2
      const dyCenter = star.sprite.y - app.view.height / 2
      const distanceCenter = Math.sqrt(dxCenter * dxCenter + dyCenter + dyCenter)
      const distanceScale = Math.max(0, (2000 - z) / 2000)
      star.sprite.scale.x = distanceScale * starBaseSize
      star.sprite.scale.y = distanceScale * starBaseSize + distanceScale * speed * starStretch * distanceCenter / app.view.width
      star.sprite.rotation = Math.atan2(dyCenter, dxCenter) + Math.PI / 2
    }
  })
}

export default Star
