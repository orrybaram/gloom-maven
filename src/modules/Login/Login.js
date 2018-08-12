import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grid-styled/emotion';

import {
  Button,
  Card,
  Input,
  Loading,
  Label,
  LabelText,
} from '../../components';


import * as S from './styles';

export default class Login extends React.Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isLoggingIn: PropTypes.bool.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    onInputChange: PropTypes.func.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
  }

  render() {
    if (this.props.isLoading) {
      return <Loading />;
    }

    return (
      <S.LoginPage>
        <Box width={[1, 1 / 2]} mx={4} css="max-width: 400px;">
          <Card>
            <form onSubmit={this.props.onFormSubmit}>
              <Box mb={3}>
                <Label>
                  <LabelText>Email</LabelText>
                  <Input
                    value={this.props.email}
                    placeholder="Email"
                    type="email"
                    onChange={this.props.onInputChange('email')}
                  />
                </Label>
              </Box>
              <Box mb={3}>
                <Label>
                  <LabelText>Password</LabelText>
                  <Input
                    type="password"
                    value={this.props.password}
                    placeholder="Password"
                    onChange={this.props.onInputChange('password')}
                  />
                </Label>
              </Box>

              <Button type="submit">
                {this.props.isLoggingIn ? 'Logging in...' : 'Log in'}
              </Button>
            </form>
          </Card>
        </Box>
      </S.LoginPage>
    );
  }
}
