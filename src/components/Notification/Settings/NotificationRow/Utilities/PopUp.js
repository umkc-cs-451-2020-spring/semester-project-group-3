import React from 'react';
import styled from 'styled-components';
import VerticalCenter from "./VerticalCenter.js"

const Popup = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-color: rgba(0,0,0, 0.5);
  z-index: 100;
`
const Popup_inner =  styled.div`
  position: absolute;
  left: 27%;
  right: 27%;
  top: 37%;
  bottom: 43%;
  margin: auto;
  border-radius: 20px;
  background: white;
  color: #000000;
  text-align: center;
  padding: 20px;
`
const ButtonGroup = styled.div`
  position: relative;
  display: flex;
  color: #000000;
  margin: 0 auto;
  width: 25%;
  text-align: center;
  padding: 25px;
`

const CancelButton = styled.button`
  height: 25px ;
  font-size: 14px;
  border-radius: 5px;

`
const DeleteButton = styled.button`
  margin-left: 5px;
  height: 25px;
  background: #ff0000;
  font-size: 14px;
  border-radius: 5px;

`

const Title = styled.div`
  padding: 10 px;
  font-size: 20px;
`


export default function PopUp(props) {
  const { deleteFunction, cancel , index} = props;
  return (
    <Popup>
      <Popup_inner>
          <Title>
            Are you Sure you want to delete the following Trigger Setting?
          </Title>
          <ButtonGroup>
            <CancelButton onClick={() => cancel()}>Cancel</CancelButton>
            <DeleteButton onClick={() => deleteFunction(index)}>Delete</DeleteButton>
          </ButtonGroup>

      </Popup_inner>
    </Popup>

  );
}
