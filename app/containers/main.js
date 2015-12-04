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
// import { Weather } from '../components/weather'

import { setPlayerState, fetchPlayer } from '../actions/sonos'

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
  },
  debug: {
    color: '#fff'
  }
})

class Main extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    sonos: PropTypes.object,
    weather: PropTypes.object
  }

  componentDidMount () {
    // TODO: figure out a better way of getting sonos player state
    setInterval(() => {
      this.getPlayer()
    }, 250)
  }

  getPlayer = () => {
    this.props.dispatch(fetchPlayer('bedroom'))
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

  render () {
    return (
      <Image
        source={{uri: 'http://mixhdwallpapers.com/wp-content/uploads/2014/08/628.jpg'}}
        style={styles.containerImage}
      >
        <View style={styles.container}>
          <Clock />
          <View style={styles.subInfo}>
            <SonosTrack player={this.props.sonos.player} />
          </View>
          <SonosControl player={this.props.sonos.player} setPlayerState={this.setPlayerState} nextTrack={this.nextTrack} prevTrack={this.prevTrack} />
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

export default connect(mapStateToProps)(Main)
