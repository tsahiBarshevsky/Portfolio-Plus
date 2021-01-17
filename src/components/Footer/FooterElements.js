import styled from 'styled-components';
import { Link as LinkR } from 'react-router-dom';
import background from '../../images/Backgrounds/fixed-bg.png';
import { Link } from 'react-router-dom';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    //margin-top: 70px;
    padding: 45px 0px 30px 0px; //top right bottom left
    color: white;
    background: linear-gradient(rgba(0, 0, 0, 0.4) 2%,
                rgba(0, 0, 0, 0.4) 50%, 
                rgba(0, 0, 0, 0.4) 98%), url(${background}) center center;
    border-top: 2px solid black;
    width: 100%;
    overflow: hidden;
`;

export const LinksContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 50%;
    padding-bottom: 30px;

    @media screen and (max-width: 600px)
    {
        flex-direction: column;
        justify-content: center;
        width: 100%;
    }
`;

export const FooterLink = styled(LinkR)`
    font-size: 18px;
    text-align: center;
    text-decoration: none !important;
    color: white !important;
`;

export const Logo = styled(Link)`
    color: white !important;
    cursor: pointer;
    text-decoration: none !important;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
`;