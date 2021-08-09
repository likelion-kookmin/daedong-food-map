import React, { useState } from 'react';
import { Grid, Form, Label } from 'semantic-ui-react';
import styled from 'styled-components';
import useInput from 'hooks/useInput';

const Field = styled(Form.Field)`
  font-family: 'NS-R';
  margin-bottom: 2rem !important;

  input {
    font-family: 'NS-R' !important;
  }
`;

const Tagcontainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.2rem;
  margin-top: -1rem;
  margin-bottom: 2rem;
`;

const FormContent = (props) => {

  return <div></div>;
};

export default FormContent;
