//: Connex.Vendor.SigningService.CertResponse & Connex.Vendor.SigningService.CertMessage
const postRequest = async content => {
  try {
    const resp = await fetch('http://192.168.117.23:3000/requests', {
      method: 'post',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      referrer: 'no-referrer',
      body: JSON.stringify(content)
    })
    if (
      resp.status === 200 &&
      resp.headers.get('content-type').includes('application/json')
    ) {
      const body = await resp.json()
      console.log(body)
      let txid = body.id
      // let step = status.success.step;
    } else {
    }
  } catch (error) {}
}

const claimRequest = async (key, codes) => {
  const signSvc = connex.vendor.sign('cert')
  let result
  const msg = {
    purpose: 'identification',
    payload: {
      type: 'text',
      content: `Before signing a certificate of identification, the faucet is unable to send you test tokens because faucet does not know your identity. The ONLY way to know your identity is requesting you to sign the certificate of identification. Once the certificate is signed, Faucet is able to send you tokens.

Select a wallet  which you would like to receive the tokens`
    }
  }
  try {
    result = await signSvc.request(msg)
    // this.step = this.status.confirm.step
  } catch (error) {
    // this.step = this.status.ask.step
    return
  }

  // const token = await this.$recaptcha('claim');
  postRequest({ ...result, ...msg, key, codes })
}
export default claimRequest
