import styled from 'styled-components';

export const Container = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    cursor: default;
    overflow-y: scroll;
    background-color: blue;
    padding: 25px;
    background-color: #f5f5f5;
`;

export const Links = styled.ul`
    counter-reset: index; 
    margin-left: -10px;
    padding: 0;
    align-self: center;
`;

export const LinksLi = styled.li`
    counter-increment: index; 
    display: flex;
    align-items: center;
    padding: 5px 0;
    box-sizing: border-box;
    
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
    cursor: pointer;
    color: black;
    text-decoration: none;
    transition: 0.5s ease-out;
    &:hover
    {
        color: #ff4040;
        transition: 0.5s ease-in;
    }
`;