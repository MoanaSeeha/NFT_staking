import React, {useEffect} from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from 'react-redux';

import { connect, isConnected, disConnect, connectedAccount, setChain, connectedChain } from "../../store/accountReducer"
import { NETWORKS } from "../../constant/constants";

const ConnectButton = styled.button`
    display: inline-block;
    padding: 18px 36px;
    outline: none;
    border: 3px greenyellow solid;
    background: rgba(255, 255,255,0);
    border-radius: 20px;
    font-size: 20px;
    color: black;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      border: 3px pink solid;
    }
`


export default function Connection(props) {
  const is_Connected = useSelector(isConnected);
  const account = useSelector(connectedAccount);
  const connected_chain = useSelector(connectedChain);
  const dispatch = useDispatch();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect( async ()=>{
    if(Number(connected_chain) !== 4 && is_Connected) {
      await window.ethereum
        .request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: '0x'+NETWORKS.rinkeby.chainId.toString(16) }],
        })
      console.log(connected_chain)
    }
  });

  useEffect(()=>{
    connectWallet();
  },[]);

  const connectWallet = async () => {
    if(!is_Connected) {
      await window.ethereum.send("eth_requestAccounts");
      dispatch(setChain(Number(window.ethereum?.networkVersion)));
      await window.ethereum.request({
        method: "wallet_requestPermissions",
        params: [{ eth_accounts: {}}]
      });
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts[0]) dispatch(connect(accounts[0]))
    }
    else {
      dispatch(disConnect())
    }
  }

  window.ethereum.on('chainChanged', _chainId => {
    dispatch(setChain(Number(_chainId)));
  })

  return (
    <ConnectButton onClick={connectWallet}>
      {!is_Connected?'Connect Wallet':account.substring(0, 5) + '...'+account.substring(account.length-4, account.length)}
    </ConnectButton>
  )
}