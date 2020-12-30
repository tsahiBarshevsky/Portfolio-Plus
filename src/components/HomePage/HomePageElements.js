import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
    cursor: default;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 100px 30px;
    background-color: #f5f5f5;
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
    padding-bottom: 50px;
`;

export const LoginLink = styled(Link)`
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

export const Picture = styled.img`
    width: 100%;
    height: auto;
`;