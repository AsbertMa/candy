import App from './createCanvas'
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

async function randomApp(xBase, yBase) {
  const list = await getApp()
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

async function addApps(app, onAppClick) {
  const items = createPics(await randomApp(app.view.width, app.view.height))
  items.forEach(item => {
    item.interactive = true
    item.buttonMode = true
    item.alpha = 0.3
    item.checked = false
    item.anchor.x = 0.5
    item.anchor.y = 0.5
    item
      .on('pointerover', function() {
        if (!this.checked) {
          this.alpha = 10
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
          onAppClick && onAppClick(item.info)
        }
        this.checked = true
      })
    app.stage.addChild(item)
  })

  return {
    destroy() {
      items.forEach(item => {
        item.destroy()
      })
    }
  }
}
const createApps = (onAppClick) => {
  return addApps(App.instance, onAppClick)
}
export default createApps
