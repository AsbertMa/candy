export default function fetchRequest(path, method, headers, content) {
  return new Promise(async (resolve, reject) => {
    let ctrl = new AbortController()
    let signal = ctrl.signal

    let tag = setTimeout(() => {
      ctrl.abort()
    }, 100)

    let fetchInit = {
      method,
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      signal: signal
    }

    if (content) {
      fetchInit.body = JSON.stringify(content)
    }

    try {
      const resp = await fetch(`http://159.65.102.165:3000/${path}`,
        fetchInit
      )
      clearTimeout(tag)

      let body = await resp.json()
      if (resp.status === 200 && resp.headers.get('content-type').includes('application/json')) {
        resolve(body)
      } else {
        reject(body)
      }
    } catch (error) {
      reject({
        code: 408,
        msg: 'Request timeout'
      })
    }
  })
}
