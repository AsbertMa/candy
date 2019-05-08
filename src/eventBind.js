let timer = 0

function setFontSize () {
  const html = document.getElementsByTagName('html')[0]
  html.style.fontSize =
    ((0.53 - 420 / canvasContainer.clientWidth) / 2 + 1) * 16 + 'px'
}

window.onresize = function () {
  clearTimeout(timer)

  timer = setTimeout(function () {
    setFontSize()
  }, 500)
}

function bindEvent () {
  const claim = document.getElementById('claim')
  const explore = document.getElementById('explore')
  claim.addEventListener('click', function () {})

  explore.addEventListener('click', function () {
    console.log('456')
  })
}
