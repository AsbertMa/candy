import * as PX from 'pixi.js'

const Pics = (resources) => {
  let result = []
  resources.forEach(item => {
    const temp = new PX.Sprite(PX.Texture.fromImage(item.img, true))
    temp.setTransform(item.x, item.y, item.scaleX || 0.07, item.scaleY || 0.07)
    temp.info = item
    result.push(temp)
  })
  return result
}

const createPics = (list) => {
  return Pics(list)
}
export default createPics
