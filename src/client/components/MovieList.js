import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class MovieList extends Component {
  constructor(props) {
    super(props)
  }

  generateHeaders(row) {
    var headingData = Object.keys(row).map((key, i) => {
      return <td key={'heading-' + i} className="heading table-text">{key[0].charAt(0).toUpperCase() + key.slice(1)}</td>
    })
    return <thead key={'thead'} className="header style-bg-header"><tr className="subheader"><td className="heading table-text"></td>{headingData}</tr></thead>
  }

  generateRows(data) {
    return data.map((item, i) => {
      var movieData = Object.keys(item).map((key, j) => {
        if (j === 0) {
          return <td data-index={i}  key={'movie-details-' + j}>{item[key]}</td>
        }
        else {
          return <td data-index={i}  key={'movie-details-' + j}> {item[key]} </td>
        }
      });
      switch (i % 2) {
        case 0:
          return <tr key={'row-' + i}><td><i className="material-icons">movie</i></td>{movieData}</tr>
          break
        case 1:
          return <tr key={'row-' + i} className="style-bg-row"><td><i className="material-icons">movie</i></td>{movieData}</tr>
          break
      }
    })
  }

  render() {
    const { movieData } = this.props.data

    let headerComponents = this.generateHeaders(this.props.data[0])
    let rowComponents = this.generateRows(this.props.data)

    return (
      
        <div className="movie-details-table-container">
          <div className="row style-bg-row">
            <table>
              {headerComponents}
              <tbody>
                {rowComponents}
              </tbody>
            </table>
          </div>
        </div>
      
    )
  }
}

MovieList.propTypes = {
  data: PropTypes.array.isRequired
}

export default MovieList
