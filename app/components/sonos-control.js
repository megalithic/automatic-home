import React, {
  Component,
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  PropTypes
} from 'react-native'

let styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20
  },
  buttons: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 3
  },
  button: {
    width: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,.2)',
    borderRadius: 10,
    margin: 5
  },
  buttonText: {
    color: 'rgba(255,255,255,1)'
  }
})

export class SonosControl extends Component {
  static propTypes = {
    player: PropTypes.object,
    setPlayerState: PropTypes.func.isRequired,
    nextTrack: PropTypes.func.isRequired,
    prevTrack: PropTypes.func.isRequired
  }

  onPressPlayPause = () => {
    this.props.setPlayerState()
  }

  renderPlayPauseButton = () => {
    let renderButtonText = () => {
      let text = ''
      switch (this.props.player.playerState) {
        case 'STOPPED':
        case 'PAUSED_PLAYBACK':
          text = 'Play ▶'
          break
        case 'PLAYING':
          text = 'Pause ❙❙'
          break
        default:
          text = 'Loading ..'
      }
      return text.toUpperCase()
    }

    return (
      <TouchableNativeFeedback
        onPress={this.props.setPlayerState}
        background={TouchableNativeFeedback.SelectableBackground()}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>{renderButtonText()}</Text>
        </View>
      </TouchableNativeFeedback>
    )
  }

  renderNextTrackButton = () => {
    return (
      <TouchableNativeFeedback
        onPress={this.props.nextTrack}
        background={TouchableNativeFeedback.SelectableBackground()}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>NEXT &raquo;</Text>
        </View>
      </TouchableNativeFeedback>
    )
  }

  renderPrevTrackButton = () => {
    return (
      <TouchableNativeFeedback
        onPress={this.props.prevTrack}
        background={TouchableNativeFeedback.SelectableBackground()}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>&laquo; PREV</Text>
        </View>
      </TouchableNativeFeedback>
    )
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.buttons}>
          {this.props.player !== undefined && this.renderPrevTrackButton()}
          {this.props.player !== undefined && this.renderPlayPauseButton()}
          {this.props.player !== undefined && this.renderNextTrackButton()}
        </View>
      </View>
    )
  }
}
