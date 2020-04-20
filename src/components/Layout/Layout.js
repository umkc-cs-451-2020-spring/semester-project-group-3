import React from 'react';
import styled from 'styled-components';
import Header from '../Header';
import NavCol from '../NavCol';

// Todo change Container to be a component and not just a box.
const Container = styled.div `
  background-image: url("/background.jpg"); 
  position: absolute;
  margin: 0 auto;
  height: 100%;
  width: 100%;
  min-height: 600px;
  min-width: 1200px;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 15% 85%;
  grid-template-areas:
    "header"
    "main";
`
// todo remove border
const Wrapper = styled.div`
  grid-area: main;
  height: (100% - 5px);
  opacity: 95%;
  width: 100%;
  border-top-style: solid;
  border-top-width: 5px;
  border-top-color: #006649;
`

// move code below into own component
const GridBox = styled.div `
 display: grid;
 height: 100%;
 min-width: 1200px;
 background: #006649;
 grid-template-columns: 15% 85%;
 grid-template-rows: 100%;
 grid-template-areas: "NavCol Space";

`
//Todo turn this into its own component function aka break it into its own file
//Todo remove border after development of UI done
const Space = styled.div`
  grid-area: Space;
  width: 99%;
  overflow: auto;
  background: #006649;
`

function Layout({ children }){
  return (
    <Container>
        <Header/>
        <Wrapper>
          <GridBox>
            <NavCol>
            </NavCol>
            <Space id="spacee">
              {children}
            </Space>
          </GridBox>
        </Wrapper>
        {/* foot goes here */}
    </Container>
  );
}

export default Layout;
