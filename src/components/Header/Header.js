import React from 'react';
import styled from 'styled-components';
import { renderLogin } from '../../rStore/actions/tabChangeActions';
import { useDispatch } from 'react-redux';

const Header1 = styled.div `
  grid-area: header;
  min-height: 60px;
  width: calc(100% - 20px) ;
  margin: 0 auto;
  background: white;
  text-align: left;
  color: #006649;
  font-size: 80px;
  font-weight: bold;
  vertical-align: center;
  padding-left: 20px;
`

export default function Header() {
  const dispatch = useDispatch();

  const handleClickLogout = (event) => {
    localStorage.clear();
    dispatch(renderLogin())
  }

  return (
      <Header1>
          Commerce Bank <button className="logout-btn" onClick={handleClickLogout}>Logout</button>
      </Header1>
  );
}
