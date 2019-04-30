import './style/index.css'

// import things from './things'
import * as PX from 'pixi.js'
import star from './createStar'
// import spaceMan from './spaceMan'
// import rocket from './rocket'
import DApps from './apps'

const app = new PX.Application({
  backgroundColor: '0x343B63',
  width: window.screen.width,
  height: window.screen.height
})
app.stage.interactive = true

document.body.appendChild(app.view)

console.log(app.view.width, app.view.height)

const t = star(app)
// spaceMan(app)
// rocket(app)
t.speedHigh().then(() => {
})

// addStatic()
addApps()


// function addStatic() {
//   const items = addPics(things)
// }

async function addApps() {
  const items = addPics(await DApps(app.view.width, app.view.height))
}

function addPics (resources) {
  let result = []
  console.log(resources)
  resources.forEach(item => {
    const temp = new PX.Sprite(PX.Texture.fromImage(item.img, true))
    temp.scale.x = 0.07
    temp.scale.y = 0.07
    temp.x =  item.x
    temp.y =  item.y
    temp.alpha = 0.3
    app.stage.addChild(temp)
    result.push(item)
  })

  return result
}
