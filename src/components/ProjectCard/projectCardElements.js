import styled from 'styled-components';
import { Paper } from '@material-ui/core';
import WarningIcon from '@material-ui/icons/Warning';

export const Container = styled(Paper)`
    display: flex;
    justify-content: space-between;
    border-radius: 20px;
    align-items: center;
    box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.5);
    padding: 15px;
    width: 270px;
    height: 75px;
`;

export const Warning = styled(WarningIcon)`
    color: #263238;
    margin-right: 10px;
    transform: translateY(10%);
`;

export const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 0px 10px;
    background-color: #f5f5f5;
`;