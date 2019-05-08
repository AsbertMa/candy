import App from './createCanvas'
import createPics from './createPics'
import things from './things'

function StaticThings (app) {
  const items = createPics(things)
  items.forEach(item => {
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

const createStatic = () => {
  return StaticThings(App.instance)
}

export default createStatic
