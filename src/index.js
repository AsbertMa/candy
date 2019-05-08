import './style/index.css'

import App from './createCanvas'
import { setFontSize, bindEvent, showModal } from './eventBind'
import createStar from './createStar'
import createRocket from './createRocket'
import createSpaceMan from './createSpaceMan'
import createApps from './createApps'
import createStatic from './createStatic'

function start () {
  const star = createStar()
  let rocket = null
  let sm = null
  let apps = null
  let sts = null

  const onAppClick = (appInfo) => {
    showModal(appInfo)
  }

  const firstViewInit = () => {
    rocket = createRocket()
    App.showText()
  }
  const firstViewDestroy = () => {
    App.hideText()
    rocket.destroy()
  }
  const secViewInit = async () => {
    sm = createSpaceMan()
    apps = await createApps(onAppClick)
    sts = createStatic()
  }
  const secViewDestroy = () => {
    sm.destroy()
    apps.destroy()
    sts.destroy()
    sm = null
    apps = null
    sts = null
  }
  const onNext = () => {
    firstViewDestroy()
    secViewInit()
  }

  const onBack = () => {
    secViewDestroy()
    firstViewInit()
  }

  star.speedHigh().then(() => {
    firstViewInit()
  })

  setFontSize()

  bindEvent(onNext, onBack)
}
start()
