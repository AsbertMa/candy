import App, { linear } from './createCanvas'
import createPics from './createPics'
async function getApp() {
  try {
    const resp = await fetch('http://192.168.117.23:3000/apps', {
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
let KEY = ''
let rands = []
getApp().then(resp => {
  let result = resp.result
  KEY = result.key
  rands = result.rands
  appList = result.apps
})
function getAppList(xBase, yBase) {
  return appList.map(item => {
    return {
      ...item,
      img: `https://vechain.github.io/app-hub/imgs/${item.appID}.png`,
      x: Math.random() * xBase,
      y: Math.random() * yBase
    }
  })
}

function addApps(app, onAppClick) {
  const items = createPics(getAppList(app.view.width, app.view.height))
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
          console.log(item.checked)
          if (!this.checked) {
            this.alpha = 1
            this.scale.x *= 1.2
            this.scale.y *= 1.2
          }
          onAppClick && onAppClick(item.info, item.checked)
          this.checked = true
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

export const getCheckInfo = () => {
  return {
    key: KEY,
    rands
  }
}
export default createApps
