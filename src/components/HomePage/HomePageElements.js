import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
    cursor: default;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 30px 30px;
    background-color: wheat;
`;

export const SubtitleContianer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 45%;
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
`;

export const Picture = styled.img`
    width: 100%;
    height: auto;
`;