import * as PX from 'pixi.js'
const Star = (app) => {
  // const starPng = require('./assets/star.png')
  // const starTexture = PX.Texture.from(starPng)
  let starTexture = PX.Texture.fromImage(require('./assets/star.png'))

  let starAmount = 500
  let cameraZ = 0
  let fov = 20
  let baseSpeed = 0.025
  let speed = 1
  let warpSpeed = 0
  let starStretch = 5
  let starBaseSize = 0.05

  // Create the stars
  let stars = []
  for (let i = 0; i < starAmount; i++) {
    let star = {
      sprite: new PX.Sprite(starTexture),
      z: 0,
      x: 0,
      y: 0
    }
    star.sprite.anchor.x = 0.5
    star.sprite.anchor.y = 0.7
    randomizeStar(star, true)
    app.stage.addChild(star.sprite)
    stars.push(star)
  }

  function randomizeStar (star, initial) {
    star.z = initial ? Math.random() * 2000 : cameraZ + Math.random() * 1000 + 2000

    // Calculate star positions with radial random coordinate so no star hits the camera.
    let deg = Math.random() * Math.PI * 2
    let distance = Math.random() * 50 + 1
    star.x = Math.cos(deg) * distance
    star.y = Math.sin(deg) * distance
  }

  // Change flight speed every 5 seconds
  function speedHigh () {
    warpSpeed = 1
    return new Promise((resolve, reject) => {
      setTimeout(function () {
        warpSpeed = 0
        resolve()
      }, 1000)
    })
  }

  // Listen for animate update
  app.ticker.add(function (delta) {
    // Simple easing. This should be changed to proper easing function when used for real.
    speed += (warpSpeed - speed) / 20
    cameraZ += delta * 10 * (speed + baseSpeed)
    for (let i = 0; i < starAmount; i++) {
      let star = stars[i]
      if (star.z < cameraZ) randomizeStar(star)

      // Map star 3d position to 2d with really simple projection
      let z = star.z - cameraZ
      star.sprite.x = star.x * (fov / z) * app.renderer.screen.width + app.renderer.screen.width / 2
      star.sprite.y = star.y * (fov / z) * app.renderer.screen.width + app.renderer.screen.height / 2

      // Calculate star scale & rotation.
      let dxCenter = star.sprite.x - app.renderer.screen.width / 2
      let dyCenter = star.sprite.y - app.renderer.screen.height / 2
      let distanceCenter = Math.sqrt(dxCenter * dxCenter + dyCenter + dyCenter)
      let distanceScale = Math.max(0, (2000 - z) / 2000)
      star.sprite.scale.x = distanceScale * starBaseSize
      // Star is looking towards center so that y axis is towards center.
      // Scale the star depending on how fast we are moving, what the stretchfactor is and depending on how far away it is from the center.
      star.sprite.scale.y = distanceScale * starBaseSize + distanceScale * speed * starStretch * distanceCenter / app.renderer.screen.width
      star.sprite.rotation = Math.atan2(dyCenter, dxCenter) + Math.PI / 2
    }
  })

  return {
  speedHigh}
}

export default Star
