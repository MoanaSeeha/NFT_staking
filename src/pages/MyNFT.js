import React from "react";
import styled from 'styled-components';

import NFTCard from '../components/NFTCard';
import StakedNFT from "../components/StakedNFT";

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
  justify-content: center;
  flex-wrap: wrap;
  width: 50%;
`
const NFTPanel = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`

const MyNFT = () => {
  return(<>
    <TitleofPage>My NFTs</TitleofPage>
    <Container>
      <LeftPanel>
        <p style={{fontSize: '30px', margin: 0}}>My TV Punks</p>
        <NFTPanel>
          <NFTCard img={`${process.env.PUBLIC_URL}/images/roadmap_right.png`} id='#34234234'/>
          <NFTCard img={`${process.env.PUBLIC_URL}/images/roadmap_right.png`} id='#34234234'/>
          <NFTCard img={`${process.env.PUBLIC_URL}/images/roadmap_right.png`} id='#34234234'/>
          <NFTCard img={`${process.env.PUBLIC_URL}/images/roadmap_right.png`} id='#34234234'/>
          <NFTCard img={`${process.env.PUBLIC_URL}/images/roadmap_right.png`} id='#34234234'/>
          <NFTCard img={`${process.env.PUBLIC_URL}/images/roadmap_right.png`} id='#34234234'/>
        </NFTPanel>
        
      </LeftPanel>
      <RightPanel>
        <p style={{fontSize: '30px', margin: 0}}>Staked TV Punks</p>
        <NFTPanel>
          <StakedNFT img={`${process.env.PUBLIC_URL}/images/roadmap_right.png`} id='#34234234'/>
          <StakedNFT img={`${process.env.PUBLIC_URL}/images/roadmap_right.png`} id='#34234234'/>
          <StakedNFT img={`${process.env.PUBLIC_URL}/images/roadmap_right.png`} id='#34234234'/>
        </NFTPanel>
      </RightPanel>
    </Container>
  </>)
}

export default MyNFT