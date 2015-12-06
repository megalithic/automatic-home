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
          <View style={styles.currentTrackView}>
            <Text style={styles.trackHeader}>
              {`Now Playing (${this.props.player.playerState})`.toUpperCase()}
            </Text>
            <Text style={styles.trackInfo}>
              <Text style={styles.trackArtist}>
                {this.props.player.currentTrack.artist.toUpperCase()}
              </Text>
              <Text style={styles.trackTitle}>
                {this.props.player.currentTrack.title}
              </Text>
            </Text>
          </View>

          <View style={styles.nextTrackView}>
            <Text style={styles.trackHeader}>
              {'Up Next'.toUpperCase()}
            </Text>
            <Text style={styles.trackInfo}>
              <Text style={styles.trackArtist}>
                {this.props.player.nextTrack.artist}
              </Text>
              <Text style={styles.trackTitle}>
                {this.props.player.nextTrack.title}
              </Text>
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
    // flexWrap: 'wrap',
    flexDirection: 'column',
    padding: 20
  },
  currentTrackView: {
    flex: 1,
    width: 350,
    padding: 10
  },
  nextTrackView: {
    flex: 1,
    width: 350,
    padding: 10
  },
  trackHeader: {
    color: '#555'
  },
  trackInfo: {
    color: '#fff'
  },
  trackArtist: {
    fontSize: 30,
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  trackTitle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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
