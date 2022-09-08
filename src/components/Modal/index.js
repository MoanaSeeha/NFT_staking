import React, {useRef} from "react";
import styled from "styled-components";
import useEscapeKey from "./useEscapeKey";
import useOutsideClick from "./useOutsideClick";

// These are private components

// Modal background layer - visible or invisible, but always floating above client's elements
const Model = styled.div`
    z-index: auto;
    display: ${({show}) => (show ? 'block' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width:100vw;
    background: rgba(0,0,0,0.5);
`;

const Container = styled.div` 
    position:fixed;
    background: antiquewhite;
    width: 24rem;
    height: auto;
    border-radius: 10px;
    padding: 0.75rem;
    color: rgba(0,0,139, 0.9);
`;

const Button = styled.button`
    background-color: ${({primary}) => (primary ? 'green' : 'red')};
    color: ${({primary}) => (primary ? 'white' : 'white')};
    border: solid 2px #9f7500;
    border-radius: 8px;
    width: 5.0rem;
    padding: 0.2rem;
    margin: 0.2rem;
    font-size: 1rem;
`;

const Header = styled.div`
    font-size: 2.4rem;
    color: rgba(0,0,139, 0.7);;
`;

const HBar = styled.div`
    width: 100%;
    height: 1px;
    border: solid 1px rgba(80,80,150, 0.4);
    background-color: rgba(80,80,150, 0.4);
`;

const ButtonBar = styled.div`
    display: flex;
    flex-direction: row;
    flex: 1 0 auto;
    justify-content: flex-end;
`;

export default function ConfirmationModalImpl({props, children}) {
    const {
        handleClose, // renderProp fn returns true or false
        show, // boolean - visible/invisible
        headerText, // text
    } = { ...props };

    const sendYes = () => handleClose(true);

    const sendNo = () => handleClose(false);

    useEscapeKey(sendNo);

    const ref = useRef(null);
    useOutsideClick(sendNo, ref);

    return (
        <Model show={show}>
            <Container>
                <Header>{headerText}</Header>
                <HBar/>
                {children}
                <ButtonBar>
                    <Button onClick={sendYes} primary={true}>Yes</Button>
                    <Button onClick={sendNo} primary={false}>No</Button>
                </ButtonBar>
            </Container>
        </Model>
    );
}
