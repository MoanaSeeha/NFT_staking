import React, {useEffect, useState} from "react";
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { ethers } from "ethers";

import { device } from "../constant/device";
import { remainingNFT, totalNFT } from "../store/nftReducer";
import { connect, isConnected, disConnect, connectedAccount, setChain, connectedChain } from "../store/accountReducer"
import { setLoading } from "../store/loadingReducer";
import { CHAINID_SHOULDBE_CONNECTED, SMART_CONTRACT_ADDRESSES, NETWORKS } from "../constant/constants";
import NFT_ABI from "../abi/NFT.json";
import Staking_ABI from "../abi/STAKING_SYSTEM.json"

const Mint = () => {

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const connected_account = useSelector(connectedAccount);
  let signer = connected_account === ''?null:provider.getSigner(connected_account);
  const is_Connected = useSelector(isConnected);
  const account = useSelector(connectedAccount);
  const connected_chain = useSelector(connectedChain);

  const[mintAmount,setMintAmount] = useState(0);
  const[mintCost,setmintCost] = useState(0);
  const[inputfocused,focusInput] = useState(false);

  const dispatch = useDispatch()
  
  const calcMintPrice = (v) => {
    if(!(v>9 || v<0)) {
      setMintAmount(v);
    }
  }

  const inputClicked = (focus) => {
    focusInput(focus);
  }

  const dispToast = (message) => {
    // toast.error(message, {
    //   position: "top-right",
    //   autoClose: 2000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: false,
    //   draggable: true,
    //   progress: 0,
    // }); return;
    window.alert(message);
  }

  const mintNFT = async () => {
    if(connected_chain === CHAINID_SHOULDBE_CONNECTED && is_Connected) {
      dispatch(setLoading(true));
      let nft_contract = new ethers.Contract(SMART_CONTRACT_ADDRESSES.NFT, NFT_ABI, signer);
      const options = {value: ethers.utils.parseEther((Number(mintCost)*mintAmount).toString())}
      let tx = await nft_contract.mint(mintAmount, options)
      console.log(tx);
      dispatch(setLoading(false));
    } else {
      if(!is_Connected) {
        dispToast(`Connect Wallet First`);
      }
      else {
        Object.keys(NETWORKS).forEach((oneKey,i) => {
          if(NETWORKS[oneKey]?.chainId === CHAINID_SHOULDBE_CONNECTED) {
            dispToast(`Connect Wallet to ${NETWORKS[oneKey]?.name} Chain`);
          }
        })
      }
    }
  }

  useEffect(()=>{
    dispatch(setLoading(false));
    fetchCost();
  },[]);

  const fetchCost = async () => {
    let nft_contract = new ethers.Contract(SMART_CONTRACT_ADDRESSES.NFT, NFT_ABI, provider);
    let cost = await nft_contract.cost();
    // console.log('cost', ethers.utils.formatEther(cost.toString()))
    setmintCost(ethers.utils.formatEther(cost.toString()))
  }

  const TitleofPage = styled.p`
    font-family: fantasy;
    font-weight: 600px;
    font-size: 60px;
    margin: 20px 0;
  `
  const Description = styled.p`
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 400px;
    font-size: 30px;
    color: gray;
    word-break: break-all;
    margin: 0;
  `
  const MintPanel = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    transition: all 0.5s;
    @media ${device.laptop} {
      flex-direction: row;
    }
    > img {
      border-radius: 20px;
      width: 100%;
      margin: 20px 0;
      filter: ${() => mintAmount > 0?'grayscale(0%);':'grayscale(100%);'};
      @media ${device.laptop} {
        width: 35%;
      }
    }
    >div {
      display: flex;
      width: 100px;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      @media ${device.laptop} {
        width: 65%;
      }
    }
  `

  const Panel = styled.div`
    padding: 20px 60px;
    border: 1px gray solid;
    border-radius: 10px;
    backdrop-filter: ${() => inputfocused?'blur(10px);':'blur(0px);'};
    transition: all 1s;
  `

  const Input = styled.div.attrs({
    type: "number",
    placeholder: "Mint TV PUNKS"
  })`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    padding: 10px 20px;
    border: 1px solid gray;
    width: 350px;
    border-radius: 5px;
    filter: ${() => inputfocused?'saturate(100%);':'saturate(0%);'};
    transition: all 0.5s;
    >p {
      display: inline-block;
      font-family: monospace;
      margin: 0;
    }
  `

  const AddButton = styled.div`
    cursor: pointer;
    padding: 20px;
    background: gray;
    color: white;
    margin: 0 10px;
    font-size: 20px;
    border-radius: 5px;
    &:hover{
      background: linear-gradient(#e66465, #9198e5);
    }
  `
  const MintButton = styled.div`
    margin: 20px 0 0 0;
    padding: 8px 16px;
    border: 4px #b9e928 solid;
    font-size: 20px;
    border-radius: 10px;
    cursor: pointer;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    &:hover{
      border: 4px skyblue solid;
    }
    transition: all 0.5s;
  `

  return(
    <>
      <TitleofPage>Mint</TitleofPage>
      <Panel>
        <Description>
          all degens become TEST NFTS..<br/> AAAAAAAAAAAUUUUUUGGGGGGHHHH..<br/> join us now already..
        </Description>
        <MintPanel>
          <img src={`${process.env.PUBLIC_URL}/images/tvpunks-second-gif.png`} alt='gif'/>
          <div>
            <div style={{display: 'flex', flexDirection: 'row'}}>
              <AddButton
                onClick={() => calcMintPrice(Number(mintAmount)-1)}
                onMouseEnter={() => inputClicked(true)} onMouseLeave={() => inputClicked(false)}>-</AddButton>
              <Input onInput={(e)=> {calcMintPrice(e.target.value)}} onFocus={() => inputClicked(true)} onBlur={() => inputClicked(false)}>
                <p>{mintAmount}</p> TEST NFTS <p>X {mintCost}</p> ETH = <p>{(mintAmount*mintCost).toFixed(3)}</p> ETH
              </Input>
              <AddButton 
                onClick={() => calcMintPrice(Number(mintAmount)+1)}
                onMouseEnter={() => inputClicked(true)} 
                onMouseLeave={() => inputClicked(false)}>+</AddButton>
            </div>
            <MintButton
              onClick={mintNFT}
            >MINT</MintButton>
          </div>
        </MintPanel>
      </Panel>
    </>
  )
}

export default Mint