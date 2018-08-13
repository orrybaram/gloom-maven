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

export default class Signup extends React.Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    isSigningUp: PropTypes.bool.isRequired,
    onInputChange: PropTypes.func.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
  }

  isButtonDisabled = () => !(this.props.name && this.props.email && this.props.password)

  render() {
    if (this.props.isLoading) {
      return <Loading />;
    }

    return (
      <S.SignupPage>
        <Box width={[1, 1 / 2]} mx={4} css="max-width: 400px;">
          <S.Title>Create an account</S.Title>
          <Card>
            <form onSubmit={this.props.onFormSubmit}>
              <Box mb={3}>
                <Label>
                  <LabelText>Name</LabelText>
                  <Input
                    value={this.props.name}
                    placeholder="Name"
                    onChange={this.props.onInputChange('name')}
                  />
                </Label>
              </Box>
              <Box mb={3}>
                <Label>
                  <LabelText>Email</LabelText>
                  <Input
                    value={this.props.email}
                    type="email"
                    placeholder="Email"
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
                <Button
                  type="submit"
                  disabled={this.isButtonDisabled()}
                  css="width: 100%"
                >
                  {this.props.isSigningUp ? 'Signing Up...' : 'Sign up'}
                </Button>
              </Box>
              <Box mt={2}>
                <SmallText>
                  <Link to="/login">Already have an account?</Link>
                </SmallText>
              </Box>
            </form>
          </Card>
        </Box>
      </S.SignupPage>
    );
  }
}
