import React, {
  Component,
  View,
  StyleSheet,
  PropTypes
} from 'react-native'

import { SonosTrack } from '../components/sonos-track'
import { SonosControl } from '../components/sonos-control'

export class Sonos extends Component {
  static propTypes = {
    player: PropTypes.object,
    isNightTime: PropTypes.bool,
    setPlayerState: PropTypes.func,
    nextTrack: PropTypes.func,
    prevTrack: PropTypes.func
  }

  renderSonosComponents () {
    return (
      <View style={styles.container}>
        <SonosTrack isNightTime={this.props.isNightTime} player={this.props.player} />
        <SonosControl
          isNightTime={this.props.isNightTime}
          player={this.props.player}
          setPlayerState={this.setPlayerState}
          nextTrack={this.nextTrack}
          prevTrack={this.prevTrack}
        />
      </View>
    )
  }

  render () {
    return (this.props.player !== undefined && this.renderSonosComponents())
  }
}

let styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    flexWrap: 'wrap',
    padding: 20
  }
})
