import React, {
  Component,
  PropTypes,
  View,
  Text,
  StyleSheet
} from 'react-native'

import {isEmpty} from 'lodash'

let styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  forecast: {
    color: '#aaa'
  }
})

export class Weather extends Component {
  static propTypes = {
    weather: PropTypes.object
  }

  renderForecast () {
    let forecast = 'Unable to retrieve forecast ..'
    if (this.props.weather && !isEmpty(this.props.weather)) {
      forecast = `Currently ${Math.ceil(this.props.weather.currently.apparentTemperature)}°, ${this.props.weather.currently.summary}`
    }
    return (
      <Text style={styles.forecast}>
        {forecast}
      </Text>
    )
  }

  render () {
    return (
      <View style={styles.container}>
        {this.renderForecast()}
      </View>
    )
  }
}
