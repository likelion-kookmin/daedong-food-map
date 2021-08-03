import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signinRequestAction } from 'reducers/authentication';
import useInput from '../hooks/useInput';
import { Button, Form } from 'semantic-ui-react';

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
    <Form onSubmit={onSubmitForm}>
      <Form.Group>
        <Form.Input placeholder="email" name="email" type="email" value={email} onChange={onChangeEmail} required />
        <Form.Input placeholder="password" name="password" type="password" value={password} onChange={onChangePassword} required />
        <Button type="submit" disabled={signinLoading}>
          로그인
        </Button>
      </Form.Group>
    </Form>
  );
};

export default LoginForm;
