import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import reducers from './reducers'
import { createStore, applyMiddleware, compose } from 'redux'

const shouldLog = process.env.NODE_ENV === 'development'
const loggerMiddleware = createLogger({
  predicate: (getState, action) => shouldLog
})

export default compose(
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
)(createStore)(reducers)
