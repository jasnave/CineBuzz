import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import MovieList from '../../components/MovieList'
import {fetchMovieData } from './actions/Actions'

class SearchPage extends Component {

  constructor(props) {
	  debugger;
    super(props);
	this.handleChange = this.handleChange.bind(this);
  this.handleClick = this.handleClick.bind(this);
  this.handleEnter = this.handleEnter.bind(this);

	 this.state = {
      input: '',
    };
  }

  handleChange(e) {
    this.setState({ input: e.target.value });
  }

  handleClick() {
	this.props.fetchMovieData(this.state.input)
  }

 handleEnter(event){
      if(event.keyCode === 13){
          this.handleClick()
      }
  } 
  render() {
    const { movieData, isLoading, error, isEmpty } = this.props
    const { handleChange, onClick } = this

    return (
      <div className="movie-search">
        <input className="style-text-black searchInput" type="search"  onKeyDown={(event) => this.handleEnter(event)} placeholder="Enter a movie name..." onChange={ this.handleChange} />
		<input type ="button" className='movie-search-button' id="btnSearch" value="Go" onClick={this.handleClick}></input>
		{isLoading ? <div className="loader"></div> :
        movieData != undefined && movieData.length > 0 &&
          <MovieList data={movieData} />
        }
        {error && <div className= "alert alert-warning noData">No Results Found for this movie! Please search for another movie..</div>}
      </div>
    )
  }
}

SearchPage.propTypes = {
  movieData: PropTypes.array.isRequired
}

const mapStateToProps = (state) => {

  const { movieDataState  } = state

  const {
    isLoading,
    movieData,
    error
  } = movieDataState || {
    isLoading: true,
    movieData: [],
    error: false
  }

  return {
    isLoading,
    movieData,
    error
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    fetchMovieData: (inputText) => {
      dispatch(fetchMovieData(inputText))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)
