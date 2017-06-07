import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
// import { routerReducer, UPDATE_LOCATION } from 'react-router-redux'

// Asynchronous/services state

import {
  REQUEST_MOVIE_DATA,
  RECEIVE_MOVIE_DATA,
  RECEIVE_ERROR } from '../pages/search/actions/ActionTypes'

// Asynchronous/services state

const movieDataState = (state = {
  isLoading: false,
  movieData: [],
  error:false
}, action) => {
  switch (action.type) {
    case REQUEST_MOVIE_DATA:
      return Object.assign({}, state, {
        isLoading: true,
        movieData: [],
        error: false
      })
    case RECEIVE_MOVIE_DATA:
      return Object.assign({}, state, {
        isLoading: false,
        movieData: action.movieData || [],
        error: false
      })
      case RECEIVE_ERROR:
      return Object.assign({}, state, {
        isLoading: false,
        movieData: [],
        error: true
      })

    default:
      return state
  }
}

// Page state


const rootReducer = combineReducers({
  // Asynchronous/services state
  movieDataState,
  routing: routerReducer
})

export default rootReducer
