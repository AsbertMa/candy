import * as PX from 'pixi.js'

const Pics = (resources) => {
  let result = []
  resources.forEach(item => {
    const temp = new PX.Sprite(PX.Texture.fromImage(item.img, true))
    temp.scale.x = 0.07
    temp.scale.y = 0.07
    temp.x = item.x
    temp.y = item.y
    temp.info = item
    result.push(temp)
  })

  return result
}

const createPics = (list) => {
  return Pics(list)
}
export default createPics
