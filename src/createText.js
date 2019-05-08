import * as PX from 'pixi.js'

function text(app) {
  const container = new PX.Container()
  app.stage.addChild(container)
  container.x = 200
  container.y = 300
  let baseStyle = {
    fontFamily: 'Courier New',
    wordWrapWidth: 640,
    fontWeight: 'lighter',
    fill: '#ffffff',
    wordWrap: true
  }
  const style = new PX.TextStyle({ ...baseStyle, fontSize: 80, lineHeight: 90 })
  const descStyle = new PX.TextStyle({ ...baseStyle, fontSize: 34 })
  const title = new PX.Text('Claim Free VTHO', style)
  const desc = new PX.Text('Mainnet faucet', descStyle)
  title.x = 0
  title.y = 0

  desc.x = 0
  desc.y = 200

  container.addChild(title)
  container.addChild(desc)

  const btnClaim = new PX.Sprite(
    PX.Texture.from(require('./assets/button.svg'))
  )
  btnClaim.anchor.x = 0.5
  btnClaim.anchor.y = 0.5
  btnClaim.y = 320
  btnClaim.x = 80
  const claim = new PX.Text(
    'Claim',
    new PX.TextStyle({
      ...baseStyle,
      fontWeight: 'bolder'
    })
  )
  claim.anchor.x = 0.5
  claim.anchor.y = 0.5
  btnClaim.addChild(claim)

  const texture = new PX.Texture.fromImage(require('./assets/button.svg'))
  texture
  const expBtn = new PX.Sprite(texture)
  expBtn.anchor.x = 0.5
  expBtn.anchor.y = 0.5

  const explorer = new PX.Text(
    'Explorer',
    new PX.TextStyle({
      ...baseStyle,
      fontWeight: 'bolder',
    })
  )
  explorer.anchor.x = 0.5
  explorer.anchor.y = 0.5

  expBtn.x = 380
  expBtn.y = 320
  expBtn.addChild(explorer)
  btnClaim.interactive = true
  btnClaim.buttonMode = true
  expBtn.interactive = true
  expBtn.buttonMode = true

  btnClaim.on('pointerdown', function() {
    console.log(123)
  })
  expBtn.on('pointerdown', function() {
    console.log(456)
  })

  container.addChild(btnClaim)
  container.addChild(expBtn)
  return {
    destroy() {
      container.destroy()
    }
  }
}

const CreateText = () => {
  return text()
}

export default CreateText
