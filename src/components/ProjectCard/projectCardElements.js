import styled from 'styled-components';
import { Fab, Paper } from '@material-ui/core';

export const Container = styled(Paper)`
    display: flex;
    justify-content: space-between;
    border-radius: 20px;
    align-items: center;
    box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.5);
    padding: 15px;
    width: 250px;
`;

export const Icon = styled(Fab)`
    margin: 5px;
`;