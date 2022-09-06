import React from 'react'
import {Oval} from 'react-loading-icons'
import styled from "styled-components";

const LoadingPanel = styled.div`
  display: ${({show}) => (show ? 'block' : 'none')};
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: gray;
  opacity: 0.7;
  z-index: 10;
`

const LoadingIcon = styled(Oval)`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 200px;
  height: 200px;
  transform: translate(-50%, -50%);
  z-index: 21;
`


const Loading = ({show}) => {
    return (
      <LoadingPanel show={show}>
        <LoadingIcon/>
      </LoadingPanel>
    )
}

export default Loading;