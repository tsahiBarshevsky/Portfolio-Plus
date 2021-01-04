import styled from 'styled-components';
import { Paper } from '@material-ui/core';

export const Container = styled(Paper)`
    display: flex;
    justify-content: center;
    border-radius: 25px;
    align-items: center;
    box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.3);
    padding: 15px;
    width: 185px;
    height: 275px;
    cursor: pointer;
`;