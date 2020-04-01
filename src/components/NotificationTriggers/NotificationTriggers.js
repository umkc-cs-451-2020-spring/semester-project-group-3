import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  border: 1px solid blue;

`
function NotificationTriggers(){
  const [triggerList, setTriggerList] = React.useState([ ]);
  const [loading, setLoading] = React.useState(true);

  return (
    <Wrapper>
      Compoent Lives here
    </Wrapper>
  )
}
export default NotificationTriggers;
