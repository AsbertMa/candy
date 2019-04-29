import * as PX from 'pixi.js'

const Ships = (app) => {
  const resources = []
  const ships = []

  for (let i = 1; i < 5; i++) {
    resources.push(require(`./assets/ship${i}.png`))
  }

  resources.forEach(item => {
    const shipTexture = PX.Texture.from(item)
    const ship = {
      sprite: new PX.Sprite(shipTexture),
      x: 0,
      y: 0
    }
    ship.sprite.x = 700
    ship.sprite.y = 500
    ship.sprite.rotation = ship.rotation
    ship.sprite.scale.x = 0
    ship.sprite.scale.y = 0
    app.stage.addChild(ship.sprite)
    ships.push(ship)
  })

  return {
    show: () => {
      for (let i = 0; i < ships.length; i++) {
        const ship = ships[i]
        ship.sprite.scale.x = 0.6
        ship.sprite.scale.y = 0.6
      }
      app.ticker.add((delta) => {
        if (ships[3].sprite.scale.x < 1) {
          for (let i = 0; i < ships.length; i++) {
            const item = ships[i]
            item.sprite.scale.x += 0.04
            item.sprite.scale.y += 0.04
          }
        }
      })
    }
  }
}

export default Ships
