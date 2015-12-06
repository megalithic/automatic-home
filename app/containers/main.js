import React, {
  Component,
  StyleSheet,
  View,
  Image,
  PropTypes
} from 'react-native'

import { connect } from 'react-redux/native'
import { Sonos } from '../components/sonos'
import { Clock } from '../components/clock'
import { Weather } from '../components/weather'
import { SmartThingsDevices } from '../components/smartthings-devices'

import { setPlayerState, fetchPlayer } from '../actions/sonos'
import { fetchWeather } from '../actions/weather'
import { fetchDevices } from '../actions/smartthings'

import { isEmpty } from 'lodash'
import config from '../config'

class Main extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    sonos: PropTypes.object,
    smartthings: PropTypes.object,
    weather: PropTypes.object
  }

  constructor (props) {
    super(props)
    this.state = {
      isNightTime: false,
      timeBasedStyles: {
        containerColor: {
          backgroundColor: 'transparent'
        }
      }
    }
  }

  componentDidMount () {
    this.getSonos()
    this.getWeather()
    this.getSmartThings()
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      isNightTime: this.isNightTime(),
      // TODO: offload nightTime calculations to suncalc module
      timeBasedStyles: {
        containerStyles: this.getTimeBasedStyles(
          nextProps,
          { backgroundColor: 'rgba(255, 255, 255, .5)' }
        )
      }
    })
  }

  componentWillUnmount () {
    clearInterval(this.sonosPolling)
    clearInterval(this.weatherPolling)
  }

  getSonos = () => {
    this.props.dispatch(fetchPlayer('bedroom'))
    this.sonosPolling = setInterval(() => {
      this.props.dispatch(fetchPlayer('bedroom')) // TODO: make zone selectable
    }, config.sonosPoll)
  }

  getWeather = () => {
    this.props.dispatch(fetchWeather())
    this.weatherPolling = setInterval(() => {
      this.props.dispatch(fetchWeather())
    }, config.weatherPoll)
  }

  getSmartThings = () => {
    this.props.dispatch(fetchDevices())
    this.smartThingsPolling = setInterval(() => {
      this.props.dispatch(fetchDevices())
    }, config.smartThingsPoll)
  }

  setPlayerState = () => {
    this.props.dispatch(setPlayerState('bedroom', 'playpause'))
  }

  nextTrack = () => {
    this.props.dispatch(setPlayerState('bedroom', 'next'))
  }

  prevTrack = () => {
    this.props.dispatch(setPlayerState('bedroom', 'previous'))
  }

  toggleSwitch = () => {
    // this.props.dispatch(toggleSwitch('bedroom lamp'))
  }

  isNightTime = (time, sunsetTime) => {
    return time >= sunsetTime
  }

  forecastIsLoaded = () => {
    return this.props.weather && !isEmpty(this.props.weather) && !isEmpty(this.props.weather.forecast)
  }

  getTimeBasedStyles = (props, styles) => {
    if (this.forecastIsLoaded()) {
      if (this.isNightTime(props.weather.forecast.daily.data[0].time, props.weather.forecast.daily.data[0].sunsetTime)) {
        styles = {
          backgroundColor: 'rgba(0, 10, 20, .65)'
        }
      } else {
        styles = {
          backgroundColor: 'rgba(255, 255, 255, .5)'
        }
      }
    }

    return styles
  }

  getTimeBasedImage = (source) => {
    if (this.forecastIsLoaded()) {
      if (this.isNightTime()) {
        source = {uri: config.nightImage}
      } else {
        source = {uri: config.dayImage}
      }
    }

    console.log('source is', source)
    return source
  }

  render () {
    let uri = this.getTimeBasedImage({uri: ''})
    return (
      <Image
        source={uri}
        style={styles.containerImage}
      >
        <View style={styles.container}>
          <Clock isNightTime={this.state.isNightTime}>
            <Weather isNightTime={this.state.isNightTime} weather={this.props.weather.forecast} />
          </Clock>
          <Sonos
            isNightTime={this.state.isNightTime}
            player={this.props.sonos.player}
            setPlayerState={this.setPlayerState}
            nextTrack={this.nextTrack}
            prevTrack={this.prevTrack}
          />
          <SmartThingsDevices isNightTime={this.state.isNightTime} smartthings={this.props.smartthings} />
        </View>
      </Image>
    )
  }
}

function mapStateToProps (state) {
  return {
    sonos: state.sonos,
    smartthings: state.smartthings,
    weather: state.weather
  }
}

let styles = StyleSheet.create({
  containerImage: {
    flex: 1,
    width: null,
    height: null
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 10, 20, .65)'
  }
})

export default connect(mapStateToProps)(Main)
