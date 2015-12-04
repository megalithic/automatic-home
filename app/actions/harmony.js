import * as types from '../action-types'

function requestWallet () {
  return { type: types.REQUEST_WALLET }
}

function receiveWallet (res) {
  return {
    type: types.RECEIVE_WALLET,
    receivedAt: Date.now(),
    data: res.data
  }
}

export let fetchWallet = function (token) {
  return dispatch => {
    dispatch(requestWallet())

    let path = `${window.__env.muneroServer}/accounts/${window.__env.identityId}/balances`

    return axios(path)
      .then((res) => {
        dispatch(receiveWallet(res.data))
      })
      .catch((error) => { console.log(error) })
  }
}
