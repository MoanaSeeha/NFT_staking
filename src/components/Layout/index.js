import React, {useState} from "react";
import styled from "styled-components";
import { useSelector } from 'react-redux';
import { connectedChain, isConnected } from "../../store/accountReducer"
import { Link, useLocation } from "react-router-dom";

import ConnectButton from "../Web3Modal";
import { device } from "../../constant/device";
import { NETWORKS } from "../../constant/constants";
import { routes } from "../../config";

const Header = styled.div`
  padding: 20px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px gray dashed;
  z-index: 100;
  backdrop-filter: blur(10px);
`
const HeaderRight = styled.div`
  display: flex;
  align-items: center;
`
const NavgationButton = styled(Link)`
  padding: 10px 20px;
  text-decoration: none;
  color: gray;
  font-size: 20px;
  border-top: ${({active}) => (active ? '1px solid gray' : '1px solid rgba(0,0,0,0)')};
  border-bottom: ${({active}) => (active ? '1px solid gray' : '1px solid rgba(0,0,0,0)')};
  border-left:none;
  border-right:none;
  &:hover{
    color: black;
  }
  width: 70%;
  @media ${device.laptop} {
    width: fit-content;
    border-top:none;
    border-bottom:none;
    border-right: ${({active}) => (active ? '1px solid gray' : '1px solid rgba(0,0,0,0)')};
    border-left: ${({active}) => (active ? '1px solid gray' : '1px solid rgba(0,0,0,0)')};
  }
  transition: all 0.2s;
`

const HeaderCenter = styled.div`
  display: flex;
  align-items: center;
`
const Bread = styled.div`
  background-image: url(${process.env.PUBLIC_URL}/images/burger.d20b2b14.svg);
  background-repeat: no-repeat;
  background-position-x:center;
  background-position-y:center;
  display: block;
  border-radius: 10px;
  border: 1px solid gray;
  padding: 8px;
  width: 20px;
  height: 20px;
  &.active{
    border: olive;
  }
  @media ${device.laptop} {
    display: none;
  }
`

const HeaderLeft = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 80%;
  height: 150px;
  padding: 10px 20px;
  overflow-y: auto;
  top: ${({open})=> (open?'110px':'-300px')};
  z-index: ${({open})=> (open?'10':'-10')};
  backdrop-filter: blur(10px);
  transition: top 0.5s;
  left: 50%;
  transform: translate(-50%, 0px);
  border-radius: 20px;
  @media ${device.laptop} {
    position: relative;
    z-index: 100;
    height: fit-content;
    flex-direction: row;
    top: 0;
    border-radius: 0;
    backdrop-filter: blur(10px);
  }
`

const ConnectedChain = styled.div`
    display: flex;
    align-items: center;
    z-index: 20;
    padding: 10px 20px;
    background: ${props=>props.background};
    border-radius: 8px;
    font-size: 17px;
    color: white;
    text-align: center;
    margin-right: 10px;
    z-index: 100;
`

const Layout = ({ children }) => {
  const connected_chain = useSelector(connectedChain);
  const is_Connected = useSelector(isConnected);
  const location = useLocation();
  
  const [navbar,openNavbar] = useState(false);

  return (
    <>
      <Header>
        <HeaderLeft open={navbar}>
        {
          routes.map((route, i) => {
            return (
            <NavgationButton key={route.key} to={route.path} active={location.pathname === route.path}>
              {route.title}
            </NavgationButton>)
          }) 
        }
        </HeaderLeft>
        <HeaderCenter>
          <Bread onClick={()=>openNavbar(!navbar)}/>
        </HeaderCenter>
        <HeaderRight>
          {Object.keys(NETWORKS).map((oneKey,i) => {
            if(NETWORKS[oneKey]?.chainId === connected_chain && is_Connected)
              return (<ConnectedChain key={i} background={NETWORKS[oneKey].color}>{NETWORKS[oneKey].name}</ConnectedChain>)
            return ''
          })}
          <ConnectButton/>
        </HeaderRight>
      </Header>
      {children}
    </>
  )
}

export default Layout