import React from 'react';
import styled from 'styled-components';
import icon from './icon.png';

const Header = styled.div `
  grid-area: header;
  min-height: 60px;
  width: 100%;
  margin: 0 auto;
  background: #006649;
  text-align: left;
  color: white;
  font-size: 80px;
  font-weight: bold;
  vertical-align: center;
  padding-left: 10px;
`

// Todo Add Logo here
// https://www.commercebank.com/about-us/media-relations/commerce-logos
// Hex codes: dark green (006649), light green (74BD43)
export default () => (
  <Header>
      Commerce Bank
  </Header>
)
