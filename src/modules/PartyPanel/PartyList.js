import React from 'react';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import styled from 'react-emotion';
import Tooltip from '@material-ui/core/Tooltip';
import { Box } from 'grid-styled/emotion';

import { SmallText } from '../../components/utils';
import { ALL_PARTIES_QUERY } from './queries';
import { secondary, black } from '../../lib/theme';

const S = {};
S.Avatar = styled(Avatar)`
  background-color: ${secondary};
  color: ${black};
  height: 50px;
  width: 50px;
`;

class ListPage extends React.Component {
  static propTypes = {
    allPartiesQuery: PropTypes.shape({
      loading: PropTypes.bool,
      refetch: PropTypes.func,
      allParties: PropTypes.array,
    }).isRequired,
  }

  componentDidMount() {
    this.props.allPartiesQuery.refetch();
  }

  render() {
    if (this.props.allPartiesQuery.loading) {
      return (
        <div>
          Loading
        </div>
      );
    }

    return (
      <React.Fragment>
        <SmallText>Your Parties</SmallText>
        {this.props.allPartiesQuery.allParties.map(party => (
          <Link key={party.id} to={`/party/${party.id}`}>
            <Tooltip placement="right" title={party.name}>
              <Box my={2}>
                <S.Avatar>
                  {party.name.substring(0, 2)}
                </S.Avatar>
              </Box>
            </Tooltip>
          </Link>
        ))}
      </React.Fragment>
    );
  }
}

const ListPageWithGraphQL = (
  graphql(ALL_PARTIES_QUERY, {
    name: 'allPartiesQuery',
    // see documentation on computing query variables from props in wrapper
    // http://dev.apollodata.com/react/queries.html#options-from-props
    options: ({ userId }) => ({
      variables: {
        user_id: userId,
      },
    }),
  })
)(ListPage);

export default ListPageWithGraphQL;
