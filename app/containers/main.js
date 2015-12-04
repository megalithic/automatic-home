import React, {
  Component,
  StyleSheet,
  View,
  Image,
  PropTypes
} from 'react-native'

import { connect } from 'react-redux/native'
import { SonosTrack } from '../components/sonos-track'
import { SonosControl } from '../components/sonos-control'
import { Clock } from '../components/clock'
import { Weather } from '../components/weather'

import { setPlayerState, fetchPlayer } from '../actions/sonos'
import { fetchWeather } from '../actions/weather'

import { isEmpty } from 'lodash'
import config from '../config'

class Main extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    sonos: PropTypes.object,
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
    // TODO: figure out a better way of getting frequent sonos player state updates
    this.sonosPolling = setInterval(() => {
      this.props.dispatch(fetchPlayer('bedroom')) // TODO: make zone selectable
    }, config.sonosPoll)

    this.props.dispatch(fetchWeather())
    this.weatherPolling = setInterval(() => {
      this.props.dispatch(fetchWeather())
    }, config.weatherPoll)
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      isNightTime: this.isNightTime(),
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

  setPlayerState = () => {
    this.props.dispatch(setPlayerState('bedroom', 'playpause'))
  }

  nextTrack = () => {
    this.props.dispatch(setPlayerState('bedroom', 'next'))
  }

  prevTrack = () => {
    this.props.dispatch(setPlayerState('bedroom', 'previous'))
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
        source = {uri: 'https://raw.githubusercontent.com/megalithic/automatic-home/master/app/images/night.jpg'}
      } else {
        source = {uri: 'https://raw.githubusercontent.com/megalithic/automatic-home/master/app/images/day.jpg'}
      }
    }

    return source
  }

  render () {
    return (
      <Image
        source={this.getTimeBasedImage({uri: 'https://raw.githubusercontent.com/megalithic/automatic-home/master/app/images/night.jpg'})}
        style={styles.containerImage}
      >
        <View style={[styles.container, this.state.timeBasedStyles.containerStyles]}>
          <Clock isNightTime={this.state.isNightTime}>
            <Weather isNightTime={this.state.isNightTime} weather={this.props.weather.forecast} />
          </Clock>
          <View style={styles.subInfo}>
            <SonosTrack isNightTime={this.state.isNightTime} player={this.props.sonos.player} />
          </View>
          <SonosControl
            isNightTime={this.state.isNightTime}
            player={this.props.sonos.player}
            setPlayerState={this.setPlayerState}
            nextTrack={this.nextTrack}
            prevTrack={this.prevTrack}
          />
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
  },
  subInfo: {
    flexDirection: 'row'
  }
})

export default connect(mapStateToProps)(Main)
