import styled, { keyframes } from 'styled-components';
import { motion } from "framer-motion";
import { Link as LinkR } from 'react-router-dom';

export const Root = styled.div`
    padding-bottom: 30px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    cursor: default;
    overflow-y: scroll;
`;

export const TopLine = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding: 30px 30px 20px 30px;

    @media screen and (max-width: 599px)
    {
        justify-content: center;
        flex-direction: column-reverse;
    }
`;

export const SocialIcons = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    @media screen and (max-width: 600px)
    {
        justify-content: center;
    }
`;

export const ListWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

export const ProjectsList = styled(motion.ul)`
    list-style: none;
    margin: 5px;
    padding: 20px;
    width: 700px;
    display: flex;
    flex-direction: column;
    background: white;
    padding: 15px;
    margin-bottom: 20px;
    box-shadow: 3px 4px 10px 1px rgba(0, 0, 0, 0.75);
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 25px;

    //sm
    @media screen and (max-width: 960px)
    {
        width: 550px;
    }

    //xs
    @media screen and (max-width: 559px)
    {
        width: 300px;
    }
`;

export const Project = styled(motion.li)`
    z-index: 1;
    list-style: none;
    margin: 5px;
    padding: 20px;
    background-color: rgba(0, 105, 92, 0.3);
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 20px;
    overflow: hidden;
    cursor: pointer;
    &:last-child {margin-bottom: 0px;}
`;

export const VideoContainer = styled.div`
    position: relative;
    width: 100%;
    overflow: hidden;
    padding-top: 56.25%;
    margin-top: 20px;
`;

export const Links = styled.ul`
    counter-reset: index; 
    margin-left: -10px;
    padding: 0;
    max-width: 300px;
`;

export const LinksLi = styled.li`
    counter-increment: index; 
    display: flex;
    align-items: center;
    padding: 1px 0;
    box-sizing: border-box;
    width: 10%;
    
    &:before
    {
        content: counters(index, ".", decimal-leading-zero);
        font-size: 1.5rem;
        text-align: right;
        font-weight: bold;
        min-width: 50px;
        padding-right: 12px;
        font-variant-numeric: tabular-nums;
        align-self: flex-start;
        background-image: linear-gradient(to bottom, black, orangered);
        background-attachment: fixed;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
`;

export const Link = styled.a`
    z-index: 20;
    font-size: 1rem;
    color: black;
    text-decoration: none;
    transition: 0.5s ease-out;
    &:hover
    {
        color: #ff4040;
        transition: 0.5s ease-in;
    }
`;

export const Video = styled.iframe`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    border: none;
`;

export const Logo = styled.img`
    width: 200px;
    height: 32px;
    bottom: 0px;
    align-self: center;
    transform: translateY(30%);
    margin-top: auto;
`;

export const ErrorLogo = styled.img`
    width: 200px;
    height: 32px;
    bottom: 0px;
    align-self: center;
    position: absolute;
    margin-bottom: 15px;
`;

export const ErrorRoot = styled.div`
    height: 100vh;
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;    
    cursor: default;
`;

export const BackToHomeLink = styled(LinkR)`
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

export const BackHome = styled(LinkR)`
    bottom: 0px;
    align-self: center;
    transform: translateY(30%);
    margin-top: auto;
    color: black;
    text-decoration: none;
`;

/*---Loading animation---*/

export const PulseContainer = styled.div`
    width: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0px;

    @media screen and (max-width: 375px)
    {
        width: 60px;
    }
`;

const pulse = keyframes`
    from {
        opacity: 1;
        transform: scale(1);
    }
    to {
        opacity: .25;
        transform: scale(.75);
    }
`;

export const PulseBubble1 = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #ff4040;
    animation: ${pulse} .4s ease .0s infinite alternate;
`;

export const PulseBubble2 = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #ff4040;
    animation: ${pulse} .4s ease .1s infinite alternate;
`;

export const PulseBubble3 = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #ff4040;
    animation: ${pulse} .4s ease .2s infinite alternate;
`;