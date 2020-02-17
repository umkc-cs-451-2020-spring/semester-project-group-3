import React from 'react';
import styled from 'styled-components';
import Header from '../Header';
import NavCol from '../NavCol';

// Todo change Container to be a component and not just a box.
const Container = styled.div `
  position: absolute;
  margin: 0 auto;
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 8% 92%;
  grid-template-areas:
    "header"
    "main";
`
const Wrapper = styled.div`
  grid-area: main;
  /* height: 100%; */
  border: 1px solid blue;
`


// move code below into own component
const GridBox = styled.div `
 display: grid;
 height 100%;
 grid-template-columns: 20% 80%;
 grid-template-rows: 100%;
 grid-template-areas: "NavCol Space";

`
//Todo turn this into its own component
const Space = styled.div`
  grid-area: Space;
  width: 100%;
  border: 1px solid red;
  poition: relative;
`

export default ({ children }) => (
    <Container>
        <Header/>
        <Wrapper>
          <GridBox>
            <NavCol>

            </NavCol>
            <Space>
              {children}
            </Space>
          </GridBox>
        </Wrapper>
        {/* foot goes here */}
    </Container>
)
