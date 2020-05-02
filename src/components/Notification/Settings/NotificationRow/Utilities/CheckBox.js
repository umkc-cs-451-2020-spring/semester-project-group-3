import React from 'react';
import styled from 'styled-components';

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`
const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  width: 1px;
  height: 1px;
  clip: rect(0 0 0 0);
  overflow: hidden;
  position: absolute;
  margin: -1 ;
  white-space: nowrap;
  clippath: inset(50%);
`
const StyledCheckbox = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  background: ${props => props.checked ? 'green' : 'red'};
  border-radius: 3px;
  transition: all 150ms;
  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px blue;
  }

  ${Icon} {
    visibility: ${props => (props.checked ? 'visible' : 'hidden')}
  }
`
const CheckboxContainer = styled.div`
  display: inline-block;
`


export default function CheckBox ({checked, update, ...props }){
  return (
    <CheckboxContainer>
      <HiddenCheckbox {...props} disabled={!update}/>
      <StyledCheckbox checked={checked} disabled={!update}>
        <Icon viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12" />
        </Icon>
      </StyledCheckbox>
    </CheckboxContainer>
  );
}
