import React, {useState} from "react";
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { device } from "../constant/device";
import { remainingNFT, totalNFT } from "../store/nftReducer";

const Mint = () => {

  const[mintAmount,setMintAmount] = useState(0);
  const[inputfocused,focusInput] = useState(false);
  
  const calcMintPrice = (v) => {
    if(!(v>20 || v<0)) {
      setMintAmount(v);
    }
  }

  const inputClicked = (focus) => {
    focusInput(focus);
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
          all degens become TV Punks..<br/> AAAAAAAAAAAUUUUUUGGGGGGHHHH..<br/> join us now already..
        </Description>
        <MintPanel>
          <img src={`${process.env.PUBLIC_URL}/images/tvpunks-second-gif.gif`} alt='gif'/>
          <div>
            <div style={{display: 'flex', flexDirection: 'row'}}>
              <AddButton
                onClick={() => calcMintPrice(Number(mintAmount)-1)}
                onMouseEnter={() => inputClicked(true)} onMouseLeave={() => inputClicked(false)}>-</AddButton>
              <Input onInput={(e)=> {calcMintPrice(e.target.value)}} onFocus={() => inputClicked(true)} onBlur={() => inputClicked(false)}>
                <p>{mintAmount}</p> TVPunks <p>X 0.03</p> ETH = <p>{(mintAmount*0.03).toFixed(2)}</p> ETH
              </Input>
              <AddButton 
                onClick={() => calcMintPrice(Number(mintAmount)+1)}
                onMouseEnter={() => inputClicked(true)} 
                onMouseLeave={() => inputClicked(false)}>+</AddButton>
            </div>
            <MintButton>MINT</MintButton>
          </div>
        </MintPanel>
      </Panel>
      <Description style={{textAlign: 'center', margin: '20px 0 0 0'}}>
        {useSelector(totalNFT)-useSelector(remainingNFT)} TVPunks Minted of 
        {' '+useSelector(totalNFT)} TVPunks
      </Description>
    </>
  )
}

export default Mint