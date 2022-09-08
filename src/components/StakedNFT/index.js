import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from 'axios';
import { ethers } from "ethers";

import { CHAINID_SHOULDBE_CONNECTED, SMART_CONTRACT_ADDRESSES, NETWORKS } from "../../constant/constants";
import NFT_ABI from "../../abi/NFT.json";

const Container = styled.div`
  display: flex;
  padding: 5px 10px;
  width: 150px;
  height: 300px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 15px 10px;
  box-shadow: rgb(0 0 0 / 30%) 0px 4px 8px;
  border-radius: 5px;
  background: white;
  >img{
    width: 80%;
    margin: 20px auto;
  }
`

const Info = styled.div`
  width: 100%;
  border-top: gray 1px solid;
  display: flex;
  flex-direction: column;
  padding: 3px;
  >div>p{
    font-family: Arial, Helvetica, sans-serif;
    color: gray;
    margin: 0;
  }
`
const StakeButton = styled.div`
margin: 20px 0 0 0;
padding: 3px;
border: 1px gray solid;
font-size: 14px;
text-align: center;
border-radius: 5px;
cursor: pointer;
font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
&:hover{
  border: 1px skyblue solid;
}
transition: all 0.5s;
`

const StakedNFT = ({tokenId, clickEvent}) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const [img,setImg] = useState('');
  const [name, setname] = useState('')

  useEffect(()=>{
    fetchData()
  },[]);

  const fetchData = async () => {
    let nft_contract = new ethers.Contract(SMART_CONTRACT_ADDRESSES.NFT, NFT_ABI, provider);
    let uri = await nft_contract.tokenURI(Number(tokenId));
    let fetched = await axios.get(uri);
    fetched.data['image'] = fetched.data['image'].replace("ipfs://", " https://ipfs.io/ipfs/");
    setImg(fetched.data['image'])
    setname(fetched.data['name'])
  }
  return (
    <Container>
      <img alt="nft card" src={img}/>
      <Info>
        <div>
          <p>Name:</p>
          {name}
        </div>
        <StakeButton onClick={clickEvent}>UnStake</StakeButton>
      </Info>

    </Container>
  )
}

export default StakedNFT