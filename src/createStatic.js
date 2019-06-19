import App, { linear } from './createCanvas'
import createPics from './createPics'
import things from './things'

function StaticThings (app) {
  const items = createPics(things)
  items.forEach(item => {
    item.alpha = 0
    app.stage.addChild(item)
  })

  function showVis(time) {
    const endAlpha = 1
    const end = Date.now() + time
    function showIn() {
      let nowAlpha =
        endAlpha * linear(Math.max(0, 1 - (end - Date.now()) / time))
      items.forEach(item => {
        item.alpha = nowAlpha
      })

      if (end < Date.now()) {
        removeM()
      }
    }

    function removeM() {
      app.ticker.remove(showIn)
    }
    app.ticker.add(showIn)
  }

  return {
    show() {
      showVis(2000)
    },
    destroy() {
      items.forEach(item => {
        item.destroy()
      })
    }
  }
}


const createStatic = () => {
  return StaticThings(App.instance)
}

export default createStatic
