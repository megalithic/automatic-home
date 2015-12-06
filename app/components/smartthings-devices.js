import React, {
  Component,
  PropTypes,
  View,
  TouchableNativeFeedback,
  Text,
  StyleSheet
} from 'react-native'

import {isEmpty} from 'lodash'

export class SmartThingsDevices extends Component {
  static propTypes = {
    smartthings: PropTypes.object,
    toggleSwitch: PropTypes.func
  }

  renderDevices () {
    let devices = 'Unable to retrieve devices ..'
    if (
      this.props.smartthings &&
      !isEmpty(this.props.smartthings) &&
      !isEmpty(this.props.smartthings.devices)
    ) {
      let getSwitchStatus = (device) => {
        if (device && device.value) {
          return device.value.switch ? 'On' : 'Off'
        }
      }
      devices = this.props.smartthings.devices.map((device, i) => {
        if (device && device.label) {
          return device.label.toLowerCase().match(/bedroom lamp/) !== null
            ? `${device.label}: ${getSwitchStatus(device)}`
            : ''
        }

        return ''
      })

      return (
        <View style={styles.devices}>
          {devices.map(
            (device, i) =>
            <TouchableNativeFeedback
              onPress={this.props.toggleSwitch}
              background={TouchableNativeFeedback.SelectableBackground()}>
              <View style={[styles.button, styles.device]}>
                <Text style={styles.buttonText}>{device}</Text>
              </View>
            </TouchableNativeFeedback>
          )}
        </View>
      )
    } else {
      return (<View />)
    }
  }

  render () {
    return (
      this.renderDevices()
    )
  }
}

let styles = StyleSheet.create({
  devices: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: 20
  },
  device: {
    color: '#333',
    flex: 1
  },
  buttonText: {
    color: '#fff'
  }
})
