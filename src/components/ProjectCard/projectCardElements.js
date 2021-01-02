import styled from 'styled-components';
import { Fab, Paper } from '@material-ui/core';
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

export const Icon = styled(Fab)`
    margin: 5px;
`;

export const Warning = styled(WarningIcon)`
    color: orange;
    margin-right: 10px;
    transform: translateY(10%);
`;