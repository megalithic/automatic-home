import { combineReducers } from 'redux'
import { smartthings } from './smartthings'
import { sonos } from './sonos'

export default combineReducers({
  smartthings,
  sonos
})
