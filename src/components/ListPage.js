import React from 'react'
import Party from '../components/Party'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class ListPage extends React.Component {

  render () {
    if (this.props.allParties.loading) {
      return (<div>Loading</div>)
    }

    return (
      <div className='w-100 flex justify-center'>
        Your Parties:
        <div className='w-100' style={{ maxWidth: 400 }}>
          {this.props.allParties.allParties.map((party) =>
            <Party key={party.id} party={party} />
          )}
        </div>
      </div>
    )
  }
}

const ALL_PARTIES_QUERY = gql`
  query AllPartiesQuery($user_id: ID!) {
    allParties(orderBy: createdAt_DESC, filter: {
      OR: [{
        members_some: {
          id: $user_id
        }
      }, {
        admin: {
          id: $user_id
        }
      }]
    }) {
      id
      name
    }
  }
`

const ListPageWithGraphQL = (
  graphql(ALL_PARTIES_QUERY, {
    name: 'allParties',
    // see documentation on computing query variables from props in wrapper
    // http://dev.apollodata.com/react/queries.html#options-from-props
    options: ({ match, userId }) => ({
      variables: {
        user_id: userId,
      },
    }),
  })
)(ListPage)

export default ListPageWithGraphQL;
