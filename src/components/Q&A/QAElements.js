import styled from 'styled-components';

export const Container = styled.div`
    cursor: default;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #f5f5f5;
`;

export const InnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 56.5%;
    padding: 20px;
    background-color: #f5f5f5;
    box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.75);
`;

export const Question = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const Answer = styled.div`
    display: flex;
    justify-content: flex-start;
    margin-left: 19px;
    padding-bottom: 25px;
`;