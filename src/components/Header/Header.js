import React from 'react';
import styled from 'styled-components';
import { renderLogin } from '../../rStore/actions/tabChangeActions';
import { useDispatch } from 'react-redux';

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
  const dispatch = useDispatch();
  return (
    <Header>
        Commerce Bank <button className="logout-btn" onClick={() => {localStorage.clear(), dispatch(renderLogin())}}>Logout</button>
    </Header>
  );
}
