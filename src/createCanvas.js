import * as PX from 'pixi.js'

const App = (function init () {
  const canvasContainer = document.querySelector('#canvas')
  const step1 = document.querySelector('#step1')
  // 
  const app = new PX.Application({
    backgroundColor: '0x343B63',
    width: window.screen.width,
    height: window.screen.height
  })
  app.stage.interactive = true

  canvasContainer.insertBefore(app.view, step1)

  return {
    instance: app,
    showText() {
      step1.classList.add('show')
    },
    hideText() {
      step1.classList.remove('show')
    }
  }
})()

export default App
