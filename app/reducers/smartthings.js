import * as types from '../action-types'

const initialState = {
  devices: []
}

export function smartthings (state = initialState, action) {
  switch (action.type) {
    case types.REQUEST_DEVICES:
      return Object.assign({}, state, {
        isFetching: true
      })
    case types.RECEIVE_DEVICES:
      return Object.assign({}, state, {
        isFetching: false,
        devices: action.devices,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}
