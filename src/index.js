import './style/index.css'

import './createCanvas'
import {
  setFontSize,
  bindEvent,
  showModal,
  showCounter,
  showText,
  hideText,
  showInfo
} from './eventBind'
import createStar from './createStar'
import createRocket from './createRocket'
import createSpaceMan from './createSpaceMan'
import createStatic from './createStatic'
import createApps, { getCheckInfo, requestApp } from './createApps'
import claimRequest from './claimRequest'

function start() {
  const star = createStar()
  let rocket = null
  let sm = null
  let apps = null
  let sts = null

  const onAppClick = (appInfo, checked) => {
    showModal(appInfo, checked)
  }

  const firstViewInit = () => {
    rocket = createRocket()
    rocket.show()
    showText()
  }

  const onClaim = async num => {
    let info = getCheckInfo()
    const resp = await claimRequest(info.key, num ? info.rands : null)
  }

  const secViewInit = async () => {
    sm = createSpaceMan()
    sm.show()
    sts = createStatic()
    apps = createApps(onAppClick)
    sts.show()
    apps.show()
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
      showInfo()
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

  bindEvent(onNext, onBack, onNextEnd, onClaim)
}

requestApp().then(() => {
  start()
})
