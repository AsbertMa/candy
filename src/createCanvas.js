import * as PX from 'pixi.js'
import BezierEasing from 'bezier-easing'
export const ease = BezierEasing(0.25, 0.1, 0.25, 1.0)
// export const easein = BezierEasing(0.42, 0, 1.0, 1.0)
export const easein = BezierEasing(1,.05,.47,.73)
export const linear = BezierEasing(0.0, 0.0, 1.0, 1.0)
export const easeout = BezierEasing(0.0, 0.0, 0.58, 1.0)
export const easeCus = BezierEasing(1,.01,1,.98)
// export const easeCus = BezierEasing(.46,-0.14,.98,-0.02)

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
