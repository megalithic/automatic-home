import * as types from '../action-types'
import config from '../config'

function requestDevices () {
  return { type: types.REQUEST_DEVICES }
}

function receiveDevices (res) {
  return {
    type: types.RECEIVE_DEVICES,
    receivedAt: Date.now(),
    data: res
  }
}

export let fetchDevices = () => {
  return dispatch => {
    dispatch(requestDevices())

    let path = `${config.smartThingsApiUrl}/${config.smartThingsApiToken}/switch`
    return fetch(path, {
      headers: {
        Authorization: config.smartThingsAuthToken
      }
    })
      .then(res => res.json())
      .then((res) => {
        console.log('devices are?', res)
        dispatch(receiveDevices(res))
      })
      .catch((error) => { console.log(error) })
  }
}
