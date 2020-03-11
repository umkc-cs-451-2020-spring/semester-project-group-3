import React from 'react';
import styled from 'styled-components';

const Header = styled.div `
  grid-area: header;
  min-height: 60px;
  width: 100%;
  margin: 0 auto;
  background: #00cc00;
  text-align: left;
`
// Todo Add Logo here
// https://www.commercebank.com/about-us/media-relations/commerce-logos
// Hex codes: dark green (006649), light green (74BD43)
export default () => (
  <Header>
      Commerce bank
  </Header>
)
