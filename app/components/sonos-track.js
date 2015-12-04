import React, {
  Component,
  View,
  Text,
  StyleSheet,
  PropTypes
} from 'react-native'
import {isEmpty} from 'lodash'

export class SonosTrack extends Component {
  static propTypes = {
    player: PropTypes.object
  }

  renderTrackInfo = () => {
    if (this.props.player && !isEmpty(this.props.player)) {
      return (
        <View>
          <View style={styles.currentTrack}>
            <Text style={styles.trackTitle}>
              Now Playing ({this.props.player.playerState})
            </Text>
            <Text style={styles.trackInfo}>
              {`${this.props.player.currentTrack.artist} - ${this.props.player.currentTrack.title}`}
            </Text>
          </View>

          <View style={styles.nextTrack}>
            <Text style={styles.trackTitle}>
              Up Next
            </Text>
            <Text style={styles.trackInfo}>
              {`${this.props.player.nextTrack.artist} - ${this.props.player.nextTrack.title}`}
            </Text>
          </View>
        </View>
      )
    } else {
      return (<View />)
    }
  }

  render () {
    return (this.props.player !== undefined && this.renderTrackInfo())
  }
}

let styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20
  },
  currentTrack: {
    flex: 1,
    width: 350,
    padding: 10
  },
  nextTrack: {
    flex: 1,
    width: 350,
    padding: 10
  },
  trackTitle: {
    color: '#555'
  },
  trackInfo: {
    color: '#fff'
  },
  scrollView: {
    backgroundColor: '#6A85B1',
    height: 300,
    width: 400
  },
  horizontalScrollView: {
    height: 120
  }
})
