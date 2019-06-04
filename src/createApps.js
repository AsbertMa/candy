import App, { linear } from './createCanvas'
import createPics from './createPics'
async function getApp() {
  try {
    const resp = await fetch('https://vechain.github.io/app-hub/sync.json', {
      method: 'GET'
    })
    if (resp.status !== 200) {
      return
    }
    return await resp.json()
  } catch (error) {
    console.error(error)
  }
}
let appList = []
getApp().then(apps => {
  appList = apps
})
function randomApp(xBase, yBase) {
  const list = appList
  list.sort((a, b) => {
    return 0.5 - Math.random()
  })

  return list.slice(0, 4).map(item => {
    return {
      ...item,
      img: `https://vechain.github.io/app-hub/imgs/${item.id}.png`,
      x: Math.random() * xBase,
      y: Math.random() * yBase
    }
  })
}

function addApps(app, onAppClick) {
  const items = createPics(randomApp(app.view.width, app.view.height))
  items.forEach(item => {
    item.anchor.x = 0.5
    item.anchor.y = 0.5
    item.alpha = 0
    app.stage.addChild(item)
  })
  function bindEvent() {
    items.forEach(item => {
      item.interactive = true
      item.buttonMode = true
      item.checked = false
      item
        .on('pointerover', function() {
          if (!this.checked) {
            this.alpha = 1
          }
        })
        .on('pointerout', function() {
          if (!this.checked) {
            this.alpha = 0.3
          }
        })
        .on('pointerdown', function() {
          if (!this.checked) {
            this.alpha = 1
            this.scale.x *= 1.2
            this.scale.y *= 1.2
          }
          this.checked = true
          onAppClick && onAppClick(item.info)
        })
    })
  }

  function showVis(time) {
    const endAlpha = 0.3
    const end = Date.now() + time
    function showIn() {
      let nowAlpha =
        endAlpha * linear(Math.max(0, 1 - (end - Date.now()) / time))
      items.forEach(item => {
        item.alpha = nowAlpha
      })

      if (end < Date.now()) {
        removeM()
        bindEvent()
      }
    }

    function removeM() {
      app.ticker.remove(showIn)
    }
    app.ticker.add(showIn)
  }

  return {
    show() {
      showVis(5000)
    },
    destroy() {
      items.forEach(item => {
        item.destroy()
      })
    }
  }
}
const createApps = onAppClick => {
  return addApps(App.instance, onAppClick)
}
export default createApps
