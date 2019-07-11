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
const maskWarning = document.getElementById('mask-warning')
const mwbtn = maskWarning.querySelector('a')

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

function handleClaim(msg) {
  console.log(msg)
  let type = msg && msg.code || 0
  let info = {}
  switch (type) {
    case 1:
      info = {
        img: require('./assets/candy-error.png'),
        title: 'Oops...',
        msg: 'Connex environment if missing...',
        btn: 'Download',
        href: ''
      }
      break;
    case 2:
      info = {
        img: require('./assets/candy-error.png'),
        title: 'Oops...',
        msg: 'Cant claim the reward when you refuse to sign the certificate',
        btn: 'OK',
        href: ''
      }
      break;
    case 0:
        let id = msg.id.slice(0, 8) + '…' + msg.id.slice(txId.length - 9)
        info = {
          img: require('./assets/success.png'),
          title: 'Success',
          msg: `Your reward is on the way, TxID: <a href="" target="_blank">${id} </a>`,
          btn: 'OK'
        }
      break;
    default:
      info = {
        img: require('./assets/candy-error.png'),
        title: 'Oops...',
        msg: msg.code === 20 ? 'Request timeout' : msg.message,
        btn: 'OK'
      }
      break;
  }

  let name = maskWarning.querySelector('.name')
  let desc = maskWarning.querySelector('.desc')
  let img = maskWarning.querySelector('img')
  
  name.innerHTML = info.title
  desc.innerHTML = info.msg
  img.src = info.img
  mwbtn.innerHTML = info.btn
  maskWarning.style.display = 'block'
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

  mwbtn.addEventListener('click', (e) => {
    let text = e.target.innerText
    if (text.toLowerCase() === 'download') {
      window.open('https://env.vechain.org/')
    }
    maskWarning.style.display = 'none'
  })

  back.addEventListener('click', () => {
    backCB && backCB()
    mask.style.display = 'none'
  })

  counterClaim.addEventListener('click', async function() {
    if (_count === 4) {
      if(onClaim) {
        const resp = await onClaim(_count)
        handleClaim(resp)
      }
    }
  })
  claim.addEventListener('click', async function() {
    if(onClaim) {
      const resp = await onClaim(0)
      handleClaim(resp)
    }
  })
  close.addEventListener('click', function(e) {
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
    const temp = ++_count
    numEle.innerText = temp
    if (temp === 4) {
      counterClaim.classList.remove('disabled')
    }
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
