import React, {
  Component,
  PropTypes,
  View,
  Text,
  StyleSheet
} from 'react-native'

import moment from 'moment'

export class Clock extends Component {
  static propTypes = {
    children: PropTypes.node
  }

  constructor (props) {
    super(props)
    this.state = {
      currentDateTime: moment()
    }
    this.currentTime()
  }

  currentTime () {
    setInterval(() => {
      this.setState({
        currentDateTime: moment()
      })
    }, 1000)
  }

  render () {
    return (
      <View style={styles.clock}>
        <Text style={styles.time}>
          {this.state.currentDateTime.format('hh:mm')}
          <Text style={styles.seconds}>
            {this.state.currentDateTime.format('ss')}
          </Text>
        </Text>
        <Text style={styles.date}>
          {this.state.currentDateTime.format('ddd D').toUpperCase()}
        </Text>
        {this.props.children}
      </View>
    )
  }
}

let styles = StyleSheet.create({
  clock: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 60,
    backgroundColor: 'rgba(255, 255, 255, .05)'
  },
  time: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 70,
    fontWeight: 'bold'
  },
  seconds: {
    color: 'rgba(255, 255, 255, .35)',
    fontSize: 30,
    fontWeight: 'normal'
  },
  date: {
    color: 'rgba(255, 255, 255, .2)',
    fontSize: 20
  }
})
