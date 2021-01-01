import styled from 'styled-components';

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