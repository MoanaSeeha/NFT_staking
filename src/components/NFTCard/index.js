import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  padding: 5px 10px;
  height: 300px;
  width: 150px;
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

const NFTCard = ({id, img}) => {
  return (
    <Container>
      <img alt="nft card" src={img}/>
      <Info>
        <div>
          <p>id:</p>
          {id}
        </div>
        <StakeButton>Staking</StakeButton>
      </Info>

    </Container>
  )
}

export default NFTCard