const canvasContainer = document.querySelector('#canvas')
const claim = document.getElementById('claim')
const explore = document.getElementById('explore')
const back = document.getElementById('back')
const mask = document.getElementById('mask')
const close = mask.querySelector('#toInfo')
const counter = document.querySelector('#counter')
const numEle = counter.querySelector('span')
const step1 = document.querySelector('#step1')

let count = 0

export const showText = () => {
  step1.classList.add('show')
}
export const hideText = () => {
  step1.classList.add('hide')
}

export const setFontSize = () => {
  const html = document.getElementsByTagName('html')[0]
  html.style.fontSize =
    ((0.53 - 420 / canvasContainer.clientWidth) / 2 + 1) * 16 + 'px'
}
export const bindEvent = (nextCB, backCB) => {
  step1.addEventListener('animationend', function(e) {
    if (e.animationName === 'hide') {
      this.classList.remove('show')
      this.classList.remove('hide')
    }
  })
  back.addEventListener('click', () => {
    backCB && backCB()
    mask.style.display = 'none'
  })
  claim.addEventListener('click', function () {})
  close.addEventListener('click', function() {
    mask.style.display = 'none'
  })
  explore.addEventListener('click', function () {
    nextCB && nextCB()
  })
}

export const showModal = (appInfo) => {
  const nameEle = mask.querySelector('div.name')
  const imgEle = mask.querySelector('div.icon img')
  const descEle = mask.querySelector('div.desc')
  const explore = mask.querySelector('#toInfo')
  explore.href = appInfo.href
  nameEle.innerHTML = appInfo.name
  descEle.innerHTML = appInfo.desc
  imgEle.src = appInfo.img
  mask.style.display = 'block'
  numEle.innerText = ++count
}
export const showCounter = () => {
  counter.style.opacity = 1
}
(function winResize () {
  let timer = 0
  window.onresize = function () {
    clearTimeout(timer)

    timer = setTimeout(function () {
      setFontSize()
    }, 500)
  }
})()
