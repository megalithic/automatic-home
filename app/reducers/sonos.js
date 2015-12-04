import * as types from '../action-types'

const initialState = {
  player: {},
  playerState: ''
}

export function sonos (state = initialState, action) {
  switch (action.type) {
    case types.REQUEST_PLAYER:
      return Object.assign({}, state, {
        isFetching: true
      })
    case types.RECEIVE_PLAYER:
      return Object.assign({}, state, {
        isFetching: false,
        player: action.data,
        lastUpdated: action.receivedAt
      })
    case types.UPDATE_PLAYER_STATE:
      return Object.assign({}, state, {
        isFetching: false,
        playerState: action.data,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}
