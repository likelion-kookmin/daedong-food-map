import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SIGN_UP_REQUEST } from 'reducers/authentication';
import useInput from '../hooks/useInput';
import { Button, Form, Grid, Header, Image, Input, Modal } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PolicyPage from 'pages/Policy/policy.page';
const RegistrationForm = () => {
  const dispatch = useDispatch();
  const { signupLoading, signupError, signupDone } = useSelector((state) => state.authentication);
  const [policyModalOpen, setPolicyModalOpen] = useState(false);
  const [nonFieldError, setNonFieldError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password1Error, setPassword1Error] = useState('');
  const [email, onChangeEmail] = useInput('');
  const [password1, onChangePassword1] = useInput('');
  const [password2, onChangePassword2] = useInput('');

  useEffect(() => {
    if (signupError) {
      const { nonFieldErrors, password1 } = signupError;
      signupError.email && setEmailError(signupError.email);
      signupError.password1 && setPassword1Error(password1);
      signupError.nonFieldErrors && setNonFieldError(nonFieldErrors[0]);
    }
    if (signupDone) {
      window.location.replace('/');
    }

    return () => {
      setEmailError('');
      setPassword1Error('');
      setNonFieldError('');
    };
  }, [signupError, signupDone]);

  const onSubmitForm = useCallback(() => {
    setEmailError('');
    setPassword1Error('');
    setNonFieldError('');
    dispatch({ type: SIGN_UP_REQUEST, data: { username: email, email, password1, password2 } });
  }, [dispatch, email, password1, password2]);

  return (
    <Grid textAlign="center" verticalAlign="middle" onSubmit={onSubmitForm}>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" textAlign="center" style={{ color: '#f25c69' }}>
          <Image src="images/Logo.png" />
          <br />
          대동먹지도 회원가입
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
            value={password1}
            onChange={onChangePassword1}
            required
            label="비밀번호"
            control={Input}
            error={
              password1Error.length > 0 && {
                content: password1Error,
              }
            }
          />
          <Form.Field
            fluid
            placeholder="Password"
            type="password"
            name="password"
            value={password2}
            onChange={onChangePassword2}
            required
            label="비밀번호 확인"
            control={Input}
            error={
              nonFieldError.length > 0 && {
                content: nonFieldError,
              }
            }
          />
          <div className="inline required field">
            <div className="ui checkbox">
              <input type="checkbox" required name="agree_policy"></input>
              <label for="agree_policy">
                <Modal
                  open={policyModalOpen}
                  onClose={() => setPolicyModalOpen(false)}
                  onOpen={() => setPolicyModalOpen(true)}
                  trigger={
                    <a style={{ cursor: 'pointer' }} href>
                      개인정보처리방침
                    </a>
                  }
                >
                  <Modal.Header> 개인정보처리방침</Modal.Header>
                  <Modal.Content scrolling>
                    <PolicyPage />
                  </Modal.Content>
                  <Modal.Actions>
                    <Button onClick={() => setPolicyModalOpen(false)} secondary>
                      닫기
                    </Button>
                  </Modal.Actions>
                </Modal>
                에 동의합니다.
              </label>
            </div>
          </div>
          <Button
            fluid
            size="large"
            disabled={signupLoading}
            type="submit"
            style={{ backgroundColor: '#f25c69', color: 'white' }}
          >
            회원가입
          </Button>
          <p style={{ textAlign: 'center' }}>
            이미 계정이 있으신가요?
            <Link to="/login"> 로그인하기 </Link>
          </p>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default RegistrationForm;
