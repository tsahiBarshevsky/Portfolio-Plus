import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    //justify-content: center;
    //align-content: center;
    //align-items: flex-start;
    box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.5);
    margin-bottom: 20px;
    border-radius: 25px;
    width: 300px;
    height: 150px;
    background-color: white;
    //padding: 15px;
`;

export const Title = styled.div`
    align-self: center;
    height: 60px;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-top-right-radius: 25px;
    border-top-left-radius: 25px;
    background: rgb(59,56,105);
    background: linear-gradient(90deg, rgba(59,56,105,1) 0%, 
                rgba(9,9,121,1) 38%, rgba(0,212,255,1) 100%);
`;

export const Content = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translateY(50%);
`;