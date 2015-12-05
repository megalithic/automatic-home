import React, {
  Component,
  PropTypes,
  ScrollView,
  View,
  Text,
  StyleSheet
} from 'react-native'

import {isEmpty} from 'lodash'

export class SmartThingsDevices extends Component {
  static propTypes = {
    devices: PropTypes.object
  }

  renderDevices () {
    let devices = 'Unable to retrieve forecast ..'
    if (this.props.devices && !isEmpty(this.props.devices)) {
      console.log('devices to be rendered', this.props.devices)
      devices = JSON.stringify(this.props.devices)
    }
    return (
      <Text style={styles.devices}>
        {devices}
      </Text>
    )
  }

  render () {
    return (
      <ScrollView
        automaticallyAdjustContentInsets={false}
        horizontal={true}
        style={[styles.container, styles.horizontalScrollView]}>
      >
        <View>
          {this.renderDevices()}
        </View>
      </ScrollView>
    )
  }
}

let styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#6A85B1',
    height: 300
  },
  horizontalScrollView: {
    height: 120
  },
  devices: {
    color: '#aaa'
  }
})
