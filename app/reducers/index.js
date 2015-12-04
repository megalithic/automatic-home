import { combineReducers } from 'redux'
import { smartthings } from './smartthings'
import { sonos } from './sonos'
import { weather } from './weather'

export default combineReducers({
  smartthings,
  sonos,
  weather
})
