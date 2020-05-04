import React from 'react';
import styled from 'styled-components';

const TextFieldContainer = styled.div`
  display: flex;
  vertical-align: middle;
`

const TextFieldStyled = styled.input.attrs({ type: 'input' })`
  width: 100px;
  height: 20px;
  margin-left: 5px;
`
const LabelText = styled.label`
  position: absolute;
  display: flex;
  overflow: hidden;
`

export default function TextField({ title, ...props }){

  return (
    <TextFieldContainer>
      {title}
      <TextFieldStyled {...props} />

  </TextFieldContainer>
  );
}
