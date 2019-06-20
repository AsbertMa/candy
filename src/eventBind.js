const canvasContainer = document.querySelector('#canvas')
const claim = document.getElementById('claim')
const explore = document.getElementById('explore')
const back = document.getElementById('back')
const mask = document.getElementById('mask')
const maskInfo = document.getElementById('mask-info')
const maskInfoOk = maskInfo.querySelector('#checked')
const close = mask.querySelector('#toInfo')
const counter = document.querySelector('#counter')
const numEle = counter.querySelector('span')
const counterClaim = counter.querySelector('a')
const step1 = document.querySelector('#step1')

let _count = 0

export const showText = () => {
  step1.classList.add('show')
}
export const hideText = () => {
  step1.classList.add('hide')
}

export const showInfo = () => {
  const show = !JSON.parse(localStorage.getItem('dont-show-info'))
  if (show) {
    maskInfo.style.display = 'block'
  }
}

export const setFontSize = () => {
  const html = document.getElementsByTagName('html')[0]
  html.style.fontSize =
    ((0.53 - 420 / canvasContainer.clientWidth) / 2.5 + 1) * 16 + 'px'
}
export const bindEvent = (nextCB, backCB, onStepEnd, onClaim) => {
  step1.addEventListener('animationend', function(e) {
    if (e.animationName === 'hide') {
      this.classList.remove('show')
      this.classList.remove('hide')
      onStepEnd && onStepEnd()
    }
  })

  maskInfoOk.addEventListener('click', () => {
    maskInfo.style.display = 'none'
    const box = maskInfo.querySelector('input[type="checkbox"]')
    if (box.checked) {
      localStorage.setItem('dont-show-info', JSON.stringify(true))
    }
  })
  back.addEventListener('click', () => {
    backCB && backCB()
    mask.style.display = 'none'
  })

  counterClaim.addEventListener('click', function() {
    if (_count === 4) {
      onClaim && onClaim(_count)
    }
  })
  claim.addEventListener('click', function() {
    onClaim && onClaim(0)
  })
  close.addEventListener('click', function() {
    mask.style.display = 'none'
  })
  explore.addEventListener('click', function() {
    nextCB && nextCB()
  })
}

export const showModal = (appInfo, checked) => {
  const nameEle = mask.querySelector('div.name')
  const imgEle = mask.querySelector('div.icon img')
  const descEle = mask.querySelector('div.desc')
  const explore = mask.querySelector('#toInfo')
  explore.href = appInfo.href
  nameEle.innerHTML = appInfo.name
  descEle.innerHTML = appInfo.description
  imgEle.src = appInfo.img
  mask.style.display = 'block'
  if (!checked) {
    numEle.innerText = ++_count
  }
}
export const showCounter = () => {
  counter.style.opacity = 1
}
;(function winResize() {
  let timer = 0
  window.onresize = function() {
    clearTimeout(timer)

    timer = setTimeout(function() {
      setFontSize()
    }, 500)
  }
})()
