import React from 'react';
import styled from 'styled-components';

const Header = styled.div `
  grid-area: header;
  min-height: 60px;
  width: 100%;
  margin: 0 auto;
  background: white;
  text-align: left;
  color: #006649;
  font-size: 80px;
  font-weight: bold;
  vertical-align: center;
  padding-left: 20px;
`

// Todo Add Logo here
// https://www.commercebank.com/about-us/media-relations/commerce-logos
// Hex codes: dark green (006649), light green (74BD43)
export default function header() { 
  return (
    <Header>
        Commerce Bank <button className="logout-btn">Logout</button>
    </Header>
  );
}
