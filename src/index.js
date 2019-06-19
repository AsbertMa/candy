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
import createApps, { getCheckInfo } from './createApps'
import createStatic from './createStatic'
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
    let info = {}
    if (num) {
      info = getCheckInfo()
    }
    const resp = await claimRequest(
      num ? info.key : null,
      num ? info.rands : null
    )
    console.log(resp)
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

  bindEvent(onNext, onBack, onNextEnd, onClaim)
}
start()
