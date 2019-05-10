import * as PX from 'pixi.js'
import BezierEasing from 'bezier-easing'
export const ease = BezierEasing(0.25, 0.1, 0.25, 1.0)
export const easein = BezierEasing(0.42, 0, 1.0, 1.0)

const App = (function init () {
  const canvasContainer = document.querySelector('#canvas')
  const step1 = document.querySelector('#step1')
  const app = new PX.Application({
    backgroundColor: '0x343B63',
    width: window.screen.width,
    height: window.screen.height
  })
  app.stage.interactive = true

  canvasContainer.insertBefore(app.view, step1)

  return {
    instance: app
  }
})()

export default App
