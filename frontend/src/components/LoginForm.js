import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signinRequestAction } from 'reducers/authentication';
import useInput from '../hooks/useInput';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';

const LoginForm = () => {
  const dispatch = useDispatch();
  const { signinLoading, signinError } = useSelector((state) => state.authentication);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  useEffect(() => {
    if (signinError) {
      alert(signinError);
    }
  }, [signinError]);

  const onSubmitForm = useCallback(() => {
    dispatch(signinRequestAction({ email, password }));
  }, [email, password]);

  return (
    <Grid textAlign="center" style={{ height: '50vh' }} verticalAlign="middle" onSubmit={onSubmitForm}>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="pink" textAlign="center">
          <Image src="images/Logo.png" /> Log-in to your account
        </Header>
        <Form size="large">
          <Segment stacked>
            <Form.Input fluid icon="user" iconPosition="left" placeholder="E-mail address" name="email" type="email" value={email} onChange={onChangeEmail} required />
            <Form.Input fluid icon="lock" iconPosition="left" placeholder="Password" type="password" name="password" value={password} onChange={onChangePassword} required />

            <Button color="pink" fluid size="large" disabled={signinLoading}>
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us? <a href="#"> Sign Up</a>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default LoginForm;
