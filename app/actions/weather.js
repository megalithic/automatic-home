import * as types from '../action-types'
import config from '../config'

function requestWeather () {
  return { type: types.REQUEST_WEATHER }
}

function receiveWeather (res) {
  return {
    type: types.RECEIVE_WEATHER,
    receivedAt: Date.now(),
    data: res
  }
}

export let fetchWeather = () => {
  return dispatch => {
    dispatch(requestWeather())

    let path = `https://api.forecast.io/forecast/${config.weatherApiKey}/${config.weatherLat},${config.weatherLong}`
    return fetch(path)
      .then(res => res.json())
      .then((res) => {
        dispatch(receiveWeather(res))
      })
      .catch((error) => { console.log(error) })
  }
}
