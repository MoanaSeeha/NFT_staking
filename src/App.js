import React,{ useEffect } from "react";
import styled from 'styled-components';



// import { ethers } from "ethers";
import {  Route, Routes } from 'react-router-dom';
import { useDispatch } from "react-redux";

// import nft_abi from "./MutantGoblins_abi.json";
import { routes } from './config';
import Layout from './components/Layout';
import { disConnect } from "./store/accountReducer";

// const NFT_address = `0x6b7899c2C88c1D426D8dE97d49c934f4EE8a277a`;

const Container = styled.div`
  padding: 10px 100px;
`;

export default function App() {

  // const [account, setAccount] = useState('');
  // const [connected_chain, setChain] = useState('');
  // const [amount, setAmount] = useState(1);
  // const[remainingCount,setRemainingCount] = useState(9999);

  // const provider = new ethers.providers.Web3Provider(window.ethereum);
  // const signer = provider.getSigner();
  // const contract = new ethers.Contract(NFT_address, nft_abi, signer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(disConnect())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // useEffect(() => {
  //   async function fetchData() {
  //     setAccount('')
  //     if(contract) {
  //       let m = Number(await contract.maxSupply());
  //       let t = Number(await contract.totalSupply());
  //       setRemainingCount(m-t);
  //     }
  //   }
  //   fetchData();
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  

  // const mint = async () => {
  //   try {
  //     if (!window.ethereum)
  //       throw new Error("No crypto wallet found. Please install it.");
  //     if(connected_chain === '0x4' && account !== '') {
  //       let mintedCount = (await contract.mintedCount(account)).toString();
  //       let _amount = amount
  //       console.log(mintedCount, account);
  //       if(mintedCount === '0') {
  //         _amount--;
  //       }

  //       let _cost = await contract.cost();
  //       // _cost = _cost.toString();
  //       console.log(_amount);
  //       let fee = (_cost * _amount).toString();
  //       console.log(_amount);
  //       const transaction = await contract.mint(amount, { value: fee })
  //       alert.show("Minting...", {
  //         type: 'info'
  //       });
  //       await transaction.wait();
  //       alert.show("Welcome successfully Minted!", {
  //         type: 'success'
  //       });
  //       let m = Number(await contract.maxSupply());
  //       let t = Number(await contract.totalSupply());
  //       setRemainingCount(m-t);
  //     }
  //     else if(connected_chain !== '0x4') {
  //       await window.ethereum
  //         .request({
  //           method: "wallet_switchEthereumChain",
  //           params: [{ chainId: `0x4` }],
  //         }).then(() => setChain('0x4'))
  //       console.log(connected_chain)
  //     }
  //     if(account === '') {
  //       // if(window.confirm('You Should Connect Wallet First!')) connect();
  //     }
  //   } catch (err) {
  //     console.log('err', err)
  //     if (err.data !== undefined && err.data.message !== undefined) 
  //       alert.show(err.data.message.err, {
  //         type: 'error'
  //       });
  //     else alert.show(err.message, {
  //       type: 'error'
  //     });
  //   }
  // };

  const addRoute = (route) => (
    <Route key={route.key} path={route.path} element={route.component} />
  );

  return (
    <>
    <Layout/>
      <Container>
      <Routes>
        {/* <Layout> */}
          {routes.map(route =>
            route.subRoutes ? route.subRoutes.map(item => addRoute(item)) : addRoute(route)
          )}
          {/* </Layout> */}
          </Routes>
          </Container>
        {/* <div className="button_group">
          <button className="add_button left_button" onClick={() => {
            if(amount > 1) {
              return setAmount(amount-1);
            }
          }}>-</button>
          <p style={{width: '30px', textAlign: 'center', padding: '0 30px'}}>{amount}</p>
          <button className="add_button right_button" onClick={() => {
            if(amount < 20) {
              return setAmount(amount+1);
            }
          }}>+</button>
        </div>
        <button className="mint_button" onClick={mint}>Mint</button> 
        <p style={{display: 'flex'}}>{remainingCount} out of 9999 of these fuckers left.. 
          <a href="https://rinkeby.etherscan.io/address/0x5040F3cdB3e63B7519ed26fBd720853c70fe02BC" target="_blank" rel="noreferrer">
            <img alt='' src={`${process.env.PUBLIC_URL}/images/etherscan.c49ca24.svg`} width={'30px'} style={{margin: '0 10px', cursor: 'pointer'}}/>
          </a>
          </p> */}
    </>
  );
}
