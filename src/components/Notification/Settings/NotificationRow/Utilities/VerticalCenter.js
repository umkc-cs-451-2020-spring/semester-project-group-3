import React from 'react';
import styled from 'styled-components';

// Styling for Edit Notif
const Container = styled.div`

  position: relative;
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 15% auto 10%;
  padding-left: 5px;
  height: 100%;
  width: 100%;

`

const Top = styled.div`

`
const Middle = styled.div`

`
const Bottom = styled.div`

`
export default function VerticalCenter(props){
  const { itemToCenter } = props;
  return(
    <Container>
      <Top/>
      <Middle>
        {itemToCenter}
      </Middle>
      <Bottom/>
    </Container>
  );
}
