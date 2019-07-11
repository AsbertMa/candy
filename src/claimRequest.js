import { load } from 'recaptcha-v3'
import fetchRequest from './fetch'

function getReToken() {
  let token = ''
  load('6LfUrJEUAAAAAB5JbNLHVyhIjKdDDiUPMkz8Ea0g', {
    useRecaptchaNet: true
  }).then(re => {
    re.execute('claim').then(res => {
      token = res
    })
  })

  return {
    get: () => {
      return token
    }
  }
}

const token = getReToken()

const claimRequest = async (key, codes) => {
  return new Promise(async (resolve, reject) => {
    let msg = ''
    let result
    let signSvc = null
    try {
      signSvc = connex.vendor.sign('cert')
      msg = {
        purpose: 'identification',
        payload: {
          type: 'text',
          content: `Before signing a certificate of identification, the faucet is unable to send you test tokens because faucet does not know your identity. The ONLY way to know your identity is requesting you to sign the certificate of identification. Once the certificate is signed, Faucet is able to send you tokens.

Select a wallet  which you would like to receive the tokens`
        }
      }
    } catch (error) {
      return reject({ code: 1 })
    }

    try {
      result = await signSvc.request(msg)
      // this.step = this.status.confirm.step
    } catch (error) {
      // this.step = this.status.ask.step
      return reject({ code: 2 })
    }

    try {
      const resp = await fetchRequest(
        'requests',
        'post',
        {},
        {
          ...result,
          ...msg,
          key,
          codes,
          token: token.get()
        }
      )
      return resolve(resp)
    } catch (error) {
      return reject(error)
    }
  })
}
export default claimRequest
