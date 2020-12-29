import styled from 'styled-components';
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";

export const Root = styled.div`
    /*margin: 0;
    padding: 0;
    background: black;
    
    height: 100vh;
    --secondary: rgb(161, 161, 161);
    display: flex;
    justify-content: center;*/
    padding-bottom: 30px;
    height: 100vh;
    background: royalblue;
    display: flex;
    flex-direction: column;
    cursor: default;
    overflow-y: scroll;
`;

export const TopLine = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding: 30px 30px 10px 30px;
`;

export const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
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
    list-style: none;
    margin: 5px;
    padding: 20px;
    background-color: rgba(214, 214, 214, 0.5);
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

export const Links = styled.ol`
    margin-left: 15px;
`;

export const Link = styled.a`
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