import React from 'react'
import { Link } from 'react-router-dom';

export default class Party extends React.Component {

  render () {
    return (
      <div className='pa3 bg-black-05 ma3'>
        <Link to={`/parties/${this.props.party.id}`}>
          <div
            className='w-100'
          />
          <div className='pt3'>
            {this.props.party.name}
          </div>
        </Link>
      </div>
    )
  }
}
