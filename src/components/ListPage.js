import React from 'react'
import Party from '../components/Party'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class ListPage extends React.Component {

  render () {
    if (this.props.allPartiesQuery.loading) {
      return (<div>Loading</div>)
    }
    return (
      <div className='w-100 flex justify-center'>
        <div className='w-100' style={{ maxWidth: 400 }}>
          {this.props.allPartiesQuery.allParties.map((party) =>
            <Party key={party.id} party={party} />
          )}
        </div>
      </div>
    )
  }
}

const ALL_PARTIES_QUERY = gql`
  query AllPartiesQuery {
    allParties(orderBy: createdAt_DESC) {
      id
      imageUrl
      description
    }
  }
`

export default graphql(ALL_PARTIES_QUERY, { name: 'allPartiesQuery'})(ListPage)
