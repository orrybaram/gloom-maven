import React from 'react'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import gql from 'graphql-tag'

class PartyDetailPage extends React.Component {

  render() {
    if (this.props.partyQuery.loading) {
      return (
        <div className='flex w-100 h-100 items-center justify-center pt7'>
          <div>
            Loading
          </div>
        </div>
      )
    }

    const { Party } = this.props.partyQuery

    console.log(this.props);

    return (
      <div>
        <h1>{Party.name}</h1>
        <div>admin: {Party.admin.name}</div>
        <button>delete</button>
      </div>
    )
  }

  handleDelete = async () => {
    await this.props.deletePartyMutation({variables: {id: this.props.partyQuery.Party.id}})
    this.props.history.replace('/')
  }
}

const DELETE_PARTY_MUTATION = gql`
  mutation DeletePartyMutation($id: ID!) {
    deleteParty(id: $id) {
      id
    }
  }
`

const PARTY_QUERY = gql`
  query partyQuery($id: ID!) {
    Party(id: $id) {
      id
      name
      admin {
        name
      }
    }
  }
`

const DetailPageWithGraphQL = compose(
  graphql(PARTY_QUERY, {
    name: 'partyQuery',
    // see documentation on computing query variables from props in wrapper
    // http://dev.apollodata.com/react/queries.html#options-from-props
    options: ({match}) => ({
      variables: {
        id: match.params.id,
      },
    }),
  }),
  graphql(DELETE_PARTY_MUTATION, {
    name: 'deletePartyMutation'
  })
)(PartyDetailPage)



const DetailPageWithDelete = graphql(DELETE_PARTY_MUTATION)(DetailPageWithGraphQL)

export default withRouter(DetailPageWithDelete)