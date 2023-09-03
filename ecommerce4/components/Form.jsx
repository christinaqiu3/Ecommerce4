import React from 'react';
import { styled } from '@mui/material/styles';

const StyledForm = styled('form')(() => ({
  width: '100%',
  maxWidth: 800,
  margin: '0 auto',
}));

function Form(props) {
  return <StyledForm {...props} />;
}

export default Form;
