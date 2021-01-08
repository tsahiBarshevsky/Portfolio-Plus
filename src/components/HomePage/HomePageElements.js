import styled from 'styled-components';
import { Link as LinkR } from 'react-router-dom';
import background from '../../images/Backgrounds/fixed-bg.png';

export const Container = styled.div`
    cursor: default;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 75px 0px 0px 0px; //top right bottom left
    background-color: #f5f5f5;
`;

export const HeroContianer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-bottom: 100px;
`;

export const SubtitleContianer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 45%;

    @media screen and (max-width: 959px)
    {
        width: 85%;
    }
`;

export const Text = styled.p`
    font-size: 20px;
    text-align: center;
`;

export const Subtext = styled.p`
    font-size: 18px;
    text-align: center;
`;

export const ParagraphWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 65%;
    padding: 35px 0px; //top-bottom right-left
`;

export const Paragraph = styled.p`
    font-size: 23px;
    text-align: center;
    padding-bottom: 10px;
    text-shadow: 1px 1px rgba(0, 0, 0, 0.5);
`;

export const LoginLink = styled(LinkR)`
    font-size: 20px;
    text-align: center;
    text-decoration: none;
    color: black;
    transition: all 0.5s ease-out;

    &:hover
    {
        transition: all 0.5s ease-in;
        color: #ff4040;
    }
`;

export const HelpLink = styled(LinkR)`
    font-size: 18px;
    text-align: center;
    text-decoration: none;
    color: black;
    transition: all 0.5s ease-out;

    &:hover
    {
        transition: all 0.5s ease-in;
        color: #ff4040;
    }
`;

export const Picture = styled.img`
    width: 100%;
    height: auto;
`;

export const FixedBackground = styled.div`
    width: 100%;
    height: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url(${background}) fixed center center;
`;

export const Footer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 40px 0px 25px 0px; //top right bottom left
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
    padding-bottom: 20px;

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
    text-decoration: none;
    color: white;
`;