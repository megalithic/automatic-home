import * as types from '../action-types'
import config from '../config'

function requestPlayer () {
  return { type: types.REQUEST_PLAYER }
}

function receivePlayer (res) {
  return {
    type: types.RECEIVE_PLAYER,
    receivedAt: Date.now(),
    data: res
  }
}

function updatePlayerState (res) {
  return {
    type: types.UPDATE_PLAYER_STATE,
    updatedAt: Date.now(),
    data: res
  }
}

export let fetchPlayer = (room) => {
  return dispatch => {
    dispatch(requestPlayer())

    let path = `${config.sonosApiUrl}/${room}/state`
    return fetch(path)
      .then(res => res.json())
      .then((res) => {
        dispatch(receivePlayer(res))
      })
      .catch((error) => { console.log(error) })
  }
}

export let setPlayerState = (room, playerState) => {
  return dispatch => {
    let path = `${config.sonosApiUrl}/${room}/${playerState}`
    return fetch(path)
      .then((res) => {
        dispatch(updatePlayerState(res))
      })
      .catch((error) => { console.log(error) })
  }
}
