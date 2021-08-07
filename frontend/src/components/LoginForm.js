import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signinRequestAction } from 'reducers/authentication';
import useInput from '../hooks/useInput';
import { Button, Form, Grid, Header, Image, Input } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
const LoginForm = () => {
  const dispatch = useDispatch();
  const { signinLoading, signinError, signinDone } = useSelector((state) => state.authentication);
  const [nonFieldError, setNonFieldError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  useEffect(() => {
    if (signinError) {
      const { email, nonFieldErrors } = signinError;
      if (email) {
        setEmailError(email);
      }
      if (nonFieldErrors) {
        setNonFieldError('등록되어 있지 않는 이메일이거나, 비밀번호가 올바르지 않습니다.');
      }
    }
  }, [signinError]);

  useEffect(() => {
    if (signinDone) {
      window.location.replace('/');
    }
  }, [signinDone]);

  const onSubmitForm = useCallback(() => {
    setEmailError('');
    setNonFieldError('');
    dispatch(signinRequestAction({ email, password }));
  }, [dispatch, email, password]);

  return (
    <Grid textAlign="center" verticalAlign="middle" onSubmit={onSubmitForm}>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" textAlign="center" style={{ color: '#f25c69' }}>
          <Image src="images/Logo.png" />
          <br />
          Log-in to your account
        </Header>
        <Form size="large" style={{ textAlign: 'left' }}>
          <Form.Field
            fluid
            placeholder="E-mail address"
            name="email"
            type="email"
            value={email}
            onChange={onChangeEmail}
            required
            label="이메일"
            control={Input}
            error={
              emailError.length > 0 && {
                content: emailError,
              }
            }
          />
          <Form.Field
            fluid
            placeholder="Password"
            type="password"
            name="password"
            value={password}
            onChange={onChangePassword}
            required
            label="비밀번호"
            control={Input}
            error={
              nonFieldError.length > 0 && {
                content: nonFieldError,
              }
            }
          />
          <Button
            fluid
            size="large"
            disabled={signinLoading}
            style={{ backgroundColor: '#f25c69', color: 'white' }}
          >
            로그인
          </Button>
          <p style={{ textAlign: 'center' }}>
            계정이 없으신가요?
            <Link to="/register"> 회원가입하기 </Link>
          </p>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default LoginForm;
