import React, {
  Component,
  View,
  Text,
  StyleSheet
} from 'react-native'

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
  constructor (props) {
    super(props)
    console.log(props)
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.forecast}>
          Weather {this.props}
        </Text>
      </View>
    )
  }
}
