import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grid-styled/emotion';
import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  Input,
  Loading,
  Label,
  LabelText,
} from '../../components';

import { SmallText } from '../../components/utils';
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
          <S.Title>Welcome back!</S.Title>
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
              <Box mt={4}>
                <Button variant="contained" type="submit" css="width: 100%">
                  {this.props.isLoggingIn ? 'Logging in...' : 'Log in'}
                </Button>
              </Box>
              <Box mt={2}>
                <SmallText>
                  Need an account? <Link to="/signup">Register</Link>
                </SmallText>
              </Box>
            </form>
          </Card>
        </Box>
      </S.LoginPage>
    );
  }
}
