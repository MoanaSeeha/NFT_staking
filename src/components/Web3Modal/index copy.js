import { ethers, providers } from "ethers";
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import styled from "styled-components";
import { useSelector, useDispatch } from 'react-redux';

import { INFURA_ID } from "../../constant/constants";
import { connect, isConnected, disConnect, connectedAccount } from "../../store/accountReducer"

import { useState, useEffect } from 'react';


const ConnectButton = styled.button`
    z-index: 20;
    position: absolute;
    right: 10px;
    padding: 18px 36px;
    outline: none;
    border: none;
    background: cornflowerblue;
    border-radius: 40px;
    font-size: 20px;
    cursor: pointer;
    color: white;
    &:hover {
      background: #5571a4;
    }
`

export default function Connection(props) {

  const dispatch = useDispatch();
  const [web3Modal, setWeb3Modal] = useState(null)
  const [address, setAddress] = useState("")
  const is_Connected = useSelector(isConnected);
  const account = useSelector(connectedAccount);
  useEffect(() => {

    // initiate web3modal
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: INFURA_ID,
        }
      },
    };

    const newWeb3Modal = new Web3Modal({
      cacheProvider: true, // very important
      network: "rinkeby",
      providerOptions,
    });
    setWeb3Modal(newWeb3Modal)
  }, [])

  // useEffect(() => {
  //   // connect automatically and without a popup if user is already connected
  //   if(web3Modal && web3Modal.cachedProvider){
  //     connectWallet()
  //   }
  // }, [web3Modal])

  async function addListeners(web3ModalProvider) {

    web3ModalProvider.on("accountsChanged", (accounts) => {
      window.location.reload()
    });
    
    // Subscribe to chainId change
    web3ModalProvider.on("chainChanged", (chainId) => {
      window.location.reload()
    });

    web3ModalProvider.on("disconnect",function() {
      console.log('disconnect');
      web3ModalProvider.close();
      web3Modal.clearCachedProvider();
      web3ModalProvider=null;
     });

    web3ModalProvider.on("connect", (info) => {
      console.log(info, 'sdfsdfsddf')
      // dispatch(connect(userAddress))
    });
  }
  
  async function connectWallet() {;
    const provider = await web3Modal.connect();
    addListeners(provider);
    // const ethersProvider = new providers.Web3Provider(provider)
    // const userAddress = await ethersProvider.getSigner().getAddress()
    // console.log(userAddress);
    
    // dispatch(connect(userAddress))
  }

  return (
    <div>
      <ConnectButton onClick={connectWallet}>
        {is_Connected?'Connect Wallet':account.substring(0, 5) + '...'+account.substring(account.length-4, account.length)}
        </ConnectButton>
      {/* <ConnectButton onClick={connectWallet}>Connect wallet</ConnectButton> */}
      <p>{address}</p>
    </div>
  )
}