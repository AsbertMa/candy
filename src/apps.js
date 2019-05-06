async function getApp() {
  try {
    const resp = await fetch('https://vechain.github.io/app-hub/sync.json', {
      method: 'GET'
    })
    if (resp.status !== 200) {
      return
    }
    return await resp.json()
  } catch (error) {
    console.error(error)
  }
}

const createApps = async (xBase, yBase) => {
  const list = await getApp()
  list.sort((a, b) => {
    return 0.5 - Math.random()
  })

  return list.slice(0, 4).map(item => {
    return {
      ...item,
      img: `https://vechain.github.io/app-hub/imgs/${item.id}.png`,
      x: Math.random() * xBase,
      y: Math.random() * yBase
    }
  })
  
}
export default createApps