import * as types from '../action-types'

const initialState = {
  forecast: {}
}

export function weather (state = initialState, action) {
  switch (action.type) {
    case types.REQUEST_WEATHER:
      return Object.assign({}, state, {
        isFetching: true
      })
    case types.RECEIVE_WEATHER:
      return Object.assign({}, state, {
        isFetching: false,
        forecast: action.data,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}
