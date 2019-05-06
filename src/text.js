import * as PX from 'pixi.js'

function CreateText(app) {
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
  const descStyle = new PX.TextStyle({ ...baseStyle, fontSize: 40 })
  const title = new PX.Text('Claim Free VTHO', style)
  const desc = new PX.Text('Mainnet faucet', descStyle)
  title.x = 0
  title.y = 0

  desc.x = 0
  desc.y = 200

  container.addChild(title)
  container.addChild(desc)

  const button = new PX.Graphics()
  button.lineStyle(2, )
  button.beginFill('', 0)
  button.drawRoundedRect(0, 300, 250, 60, 35)
  button.endFill()
  container.addChild(button)
}

export default CreateText
