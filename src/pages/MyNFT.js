import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { ethers } from 'ethers';
import { useSelector, useDispatch } from "react-redux";
// import { toast, ToastContainer } from 'react-toastify';

import { connectedAccount, isConnected, connectedChain } from "../store/accountReducer";
import { setLoading } from "../store/loadingReducer";
import { CHAINID_SHOULDBE_CONNECTED, SMART_CONTRACT_ADDRESSES, NETWORKS } from "../constant/constants";
import NFTCard from '../components/NFTCard';
import StakedNFT from "../components/StakedNFT";
import NFT_ABI from "../abi/NFT.json";
import Staking_ABI from "../abi/STAKING_SYSTEM.json"

const TitleofPage = styled.p`
  font-family: fantasy;
  font-weight: 600px;
  font-size: 60px;
  margin: 20px 0;
`

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 30px 20px;
  align-items: flex-start;
  display: flex;
  border: 1px gray solid;
  border-radius: 10px;
  backdrop-filter: blur(20px);
`
const LeftPanel = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  border-right: 1px gray solid;
  width: 50%;
`
const RightPanel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
  width: 50%;
`
const NFTPanel = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`
const ClaimButton = styled.button`
  margin: 20px 0 0 0;
  padding: 5px;
  border: 1px gray solid;
  font-size: 14px;
  color:white;
  text-align: center;
  border-radius: 5px;
  background-color: gray;
  display: inline-block;
  cursor: pointer;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  &:hover{
    border: 1px skyblue solid;
  }
  transition: all 0.5s;
`

const MyNFT = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const connected_account = useSelector(connectedAccount);
  let signer = connected_account === ''?null:provider.getSigner(connected_account);
  const is_Connected = useSelector(isConnected);
  const account = useSelector(connectedAccount);
  const connected_chain = useSelector(connectedChain);
  const dispatch = useDispatch();


  const [mintedTokenIds,setmintedTokenIds] = useState([]);
  const [stakedTokenIds,setstakedTokenIds] = useState([]);

  useEffect(()=>{
    dispatch(setLoading(false));
    if(connected_chain === CHAINID_SHOULDBE_CONNECTED && is_Connected) {
      fetchMintedNFTData();
      fetchStakedNFTData();
    }
    else {
      if(!is_Connected) {
        dispToast(`Connect Wallet`);
      }
      else {
        Object.keys(NETWORKS).forEach((oneKey,i) => {
          if(NETWORKS[oneKey]?.chainId === CHAINID_SHOULDBE_CONNECTED) {
            dispToast(`Connect Wallet to ${NETWORKS[oneKey]?.name} Chain`);
          }
        })
      }
    }
  },[is_Connected, account, connected_chain, dispatch]);

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

  const fetchMintedNFTData = async () => {
      try {
        dispatch(setLoading(true));
        let nft_contract = new ethers.Contract(SMART_CONTRACT_ADDRESSES.NFT, NFT_ABI, signer);
        let temp = await nft_contract.walletOfOwner(account);
        setmintedTokenIds(temp.toString().split(','));
        // console.log('temp', typeof temp.toString())
        // setTokenURIs(getURIFromIDs(temp));
        dispatch(setLoading(false));
        
      } catch (error) {
        dispToast(error);
        dispatch(setLoading(false));
      }  
  }

  const fetchStakedNFTData = async () => {
    try {
      dispatch(setLoading(true));
      let staking_contract = new ethers.Contract(SMART_CONTRACT_ADDRESSES.Staking, Staking_ABI, signer);
      let temp = await staking_contract.getStakedTokens(account);
      setstakedTokenIds(temp.toString().split(','));
      // setstakedTokenURIs(getURIFromIDs(temp));
      dispatch(setLoading(false));
    } catch (error) {
      dispToast(error);
      dispatch(setLoading(false));
    }  
  }

  const handleStakingClick = async (id) => {
    try {
      dispatch(setLoading(true));
      console.log(id)
      let nft_contract = new ethers.Contract(SMART_CONTRACT_ADDRESSES.NFT, NFT_ABI, signer);
      let staking_contract = new ethers.Contract(SMART_CONTRACT_ADDRESSES.Staking, Staking_ABI, signer);
      await nft_contract.approve(SMART_CONTRACT_ADDRESSES.Staking, id)
      console.log("+++++++++")
      nft_contract.on('Approval',async (owner, spender, value) => {
        let tx = await staking_contract.stake([id]);
        console.log(tx);
      })
      dispatch(setLoading(false));
    } catch (error) {
      dispToast(error);
      dispatch(setLoading(false));
    }  
  }

  const handleUnStakingClick = async (id) => {
    try {
      dispatch(setLoading(true));
      let staking_contract = new ethers.Contract(SMART_CONTRACT_ADDRESSES.Staking, Staking_ABI, signer);
      let tx = await staking_contract.withdraw([id]);
      console.log(tx);
      dispatch(setLoading(false));
    } catch (error) {
      dispToast(error);
      dispatch(setLoading(false));
    }
  }

  const claimRewards = async () => {
    try {
      dispatch(setLoading(true));
      let staking_contract = new ethers.Contract(SMART_CONTRACT_ADDRESSES.Staking, Staking_ABI, signer);
      let tx = await staking_contract.claimRewards();
      dispatch(setLoading(false));
    } catch (error) {
      dispToast(error);
      dispatch(setLoading(false));
    }  
  }

  return(<>
    <TitleofPage>My NFTs</TitleofPage>
    
    {/* <ToastContainer/> */}
    <Container>
      
      <LeftPanel>
        <p style={{fontSize: '30px', margin: 0}}>My TTTT NFTS</p>
        <NFTPanel>{
          mintedTokenIds.map((id, index) => {
            return <NFTCard key={index} clickEvent={() => {handleStakingClick(id)}} tokenId={id}/>
          })}
        </NFTPanel>
      </LeftPanel>
      
      <RightPanel>
        <div style={{'display': 'flex', flexDirection: 'column', margin: 'auto'}}>
          <p style={{fontSize: '30px', margin: 0, display: 'inline-block'}}>Staked TTTT NFTS</p>
          <ClaimButton onClick={claimRewards}>Claim Reward</ClaimButton>
        </div>
        <NFTPanel>
          {
            stakedTokenIds.map((id, index) => {
              return <StakedNFT key={index} tokenId={id} clickEvent={() => {handleUnStakingClick(id)}}/>
            })
          }
        </NFTPanel>
      </RightPanel>
    </Container>
  </>)
}

export default MyNFT