const canvasContainer = document.querySelector('#canvas')
const claim = document.getElementById('claim')
const explore = document.getElementById('explore')
const back = document.getElementById('back')
const mask = document.getElementById('mask')


export const setFontSize = () => {
  const html = document.getElementsByTagName('html')[0]
  html.style.fontSize =
    ((0.53 - 420 / canvasContainer.clientWidth) / 2 + 1) * 16 + 'px'
}
export const bindEvent = (nextCB, backCB) => {
  back.addEventListener('click', () => {
    // backCB && backCB()
    mask.style.display = 'none'
  })
  claim.addEventListener('click', function () {})

  explore.addEventListener('click', function () {
    nextCB && nextCB()
  })
}

export const showModal = (appInfo) => {
  mask.style.display = 'block'
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
