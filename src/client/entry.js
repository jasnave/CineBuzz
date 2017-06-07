import React, { Component } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from './reducers'
import { Router, Route, IndexRoute, IndexRedirect, browserHistory } from 'react-router'
import { syncHistory } from 'react-router-redux'
import { routerMiddleware, syncHistoryWithStore, push } from 'react-router-redux'
import { SearchPage } from './pages'

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  createLogger(),
  routerMiddleware(browserHistory)
)(createStore)

const configureStore = (initialState) => {
  const configuredStore = createStoreWithMiddleware(rootReducer, initialState)
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers')
      configuredStore.replaceReducer(nextRootReducer)
    })
  }
  return configuredStore
}

const store = configureStore()

class MainLayout extends Component {
  render() {
    return (
      <div className="main-container">
          <div className="row-fluid">
          <h1 id="heading">CineBuzz</h1>
		  <h4><i>The Ulitmate Movie Finder App....</i></h4>
      	</div>
        <div className="page">
          {this.props.children}
        </div>
      </div>
    )
  }
}
const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={MainLayout}>
        <Route path='search' component={SearchPage}/>
        <IndexRedirect to="/search" />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
