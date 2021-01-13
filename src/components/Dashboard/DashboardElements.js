import styled, { keyframes } from 'styled-components';
import { Container as MUContainer } from '@material-ui/core';

export const GridContainer = styled.div`
    z-index: 1;
    width: 100%;
    padding: 15px 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const Container = styled(MUContainer)`
    padding-top: 20px;
`;

export const ButtonsWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 0px 10px;
    background-color: #f5f5f5;
`;

export const TableWrapper = styled.div`
    display: 'flex';
    justify-content: center;
    width: 85%;
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