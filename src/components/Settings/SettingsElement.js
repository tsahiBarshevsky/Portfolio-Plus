import styled from 'styled-components';
import { Link } from 'react-router-dom';
import WarningIcon from '@material-ui/icons/Warning';
import { red } from '@material-ui/core/colors';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    border-radius: 25px;
    padding: 20px;
    margin-bottom: 20px;
`;

export const WarningWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(213, 0, 0, 0.7);
    border-radius: 25px;
    padding: 20px;
    margin: 20px 0px;
`;

export const ImagePanel = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 430px)
    {
        flex-direction: column;
    }
`;

export const ButtonsPanel = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 610px)
    {
        flex-direction: column;
    }
`;

export const PersonalPage = styled(Link)`
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

export const Warning = styled(WarningIcon)`
    color: #263238;
    margin-right: 10px;
    transform: translateY(10%);
`;