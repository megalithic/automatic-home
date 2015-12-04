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

class Main extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    sonos: PropTypes.object,
    weather: PropTypes.object
  }

  constructor (props) {
    super(props)
    this.state = {
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
    }, 250)

    this.props.dispatch(fetchWeather())
    this.weatherPolling = setInterval(() => {
      this.props.dispatch(fetchWeather())
    }, 1800000) // 30 mins
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      timeBasedStyles: {
        containerColor: this.getTimeBasedContainerColor(
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

  getTimeBasedContainerColor = (props, style) => {
    if (props.weather && !isEmpty(props.weather) && !isEmpty(props.weather.forecast)) {
      style = {
        backgroundColor:
          this.isNightTime(props.weather.forecast.daily.data[0].time, props.weather.forecast.daily.data[0].sunsetTime)
          ? 'rgba(0, 10, 20, .65)'
          : 'rgba(255, 255, 255, .5)'
      }
    }
    return style
  }

  render () {
    return (
      <Image
        source={{uri: 'https://raw.githubusercontent.com/megalithic/automatic-home/master/628.jpg'}}
        style={styles.containerImage}
      >
        <View style={[styles.container, this.state.timeBasedStyles.containerColor]}>
          <Clock />
          <View style={styles.subInfo}>
            <SonosTrack player={this.props.sonos.player} />
          </View>
          <SonosControl player={this.props.sonos.player} setPlayerState={this.setPlayerState} nextTrack={this.nextTrack} prevTrack={this.prevTrack} />
          <Weather weather={this.props.weather.forecast} />
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
