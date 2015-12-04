import * as types from '../action-types'
import axios from 'axios'

function requestDevices () {
  return { type: types.REQUEST_DEVICES }
}

function receiveDevices (res) {
  return {
    type: types.RECEIVE_DEVICES,
    receivedAt: Date.now(),
    devices: res.data
  }
}

export let fetchDevices = function () {
  return dispatch => {
    dispatch(requestDevices())

    return axios('')
      .then((res) => {
        dispatch(receiveDevices(res.data))
      })
      .catch((error) => { console.log(error) })
  }
}
