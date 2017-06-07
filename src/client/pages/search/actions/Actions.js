import { history, push } from 'react-router-redux'
import fetch from 'isomorphic-fetch'
import {sortBy} from 'lodash'
import {API_ENDPOINT, PROXY_URL } from '../../../../client/config'

// Async actions

import {
  REQUEST_MOVIE_DATA,
  RECEIVE_MOVIE_DATA,
  RECEIVE_ERROR } from './ActionTypes'

const mapMovieData = (movieData,inputText) => {

  var movieList = [];

for(var i=0;i<movieData.length;i++)
    {
      if(movieData[i].title.toLowerCase().indexOf(inputText.toLowerCase()) !== -1) 
           movieList.push({'ID':movieData[i].id,'Title':movieData[i].title,'Year':movieData[i].year,'Type':movieData[i].type}) 
    }
    return movieList;
}

const requestMovieData = (inputText) => {
  return {
    type: REQUEST_MOVIE_DATA,
    inputText
  }
}

const receiveMovieData = (json,inputText) => {
  var movieData = []
  json.length? movieData = sortBy(json, (movie) =>{return movie.title; }) : []
  return {
    type: RECEIVE_MOVIE_DATA,
    movieData:mapMovieData(movieData,inputText)
  }
}

const receiveError = (json) => {
return {
  type:RECEIVE_ERROR,
  movieData: json
}
}

export const fetchMovieData = (inputText) => {
  return (dispatch) => {
    dispatch(requestMovieData(inputText))
	  const targetUrl = `${API_ENDPOINT}?t=${inputText}&y=&type=movie`
    return fetch(PROXY_URL + targetUrl)
     .then((response) => response.json())
      .then((json) => {
        try { if(json.length == 0 || json.status == 404 ) 
        throw new Error('No Data Found')
        else
        dispatch(receiveMovieData(json,inputText))
      }
      catch(error){
         dispatch(receiveError(error))
      }
      })
      .catch((error) =>{
        dispatch(receiveError(error))
      })
  }
}
