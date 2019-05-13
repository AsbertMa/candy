import './style/index.css'

import './createCanvas'
import {
  setFontSize,
  bindEvent,
  showModal,
  showCounter,
  showText,
  hideText
} from './eventBind'
import createStar from './createStar'
import createRocket from './createRocket'
import createSpaceMan from './createSpaceMan'
import createApps from './createApps'
import createStatic from './createStatic'

function start() {
  const star = createStar()
  let rocket = null
  let sm = null
  let apps = null
  let sts = null

  const onAppClick = appInfo => {
    showModal(appInfo)
  }
  const firstViewInit = () => {
    rocket = createRocket()
    rocket.show()
    showText()
  }
  const secViewInit = async () => {
    sm = createSpaceMan()
    sm.show()
    apps = createApps(onAppClick)
    apps.show()
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
    hideText()
  }
  const onNextEnd = () => {
    rocket.hide().then(() => {
      secViewInit()
      showCounter()
    })
  }

  const onBack = () => {
    // secViewDestroy()
    // firstViewInit()
  }

  star.speedHigh().then(() => {
    firstViewInit()
  })

  setFontSize()

  bindEvent(onNext, onBack, onNextEnd)
}
start()
