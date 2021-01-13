import styled from 'styled-components';

export const TableContainer = styled.div`
    overflow-x: auto;
    width: 100%;
    display: flex;
    justify-content: center;
`;

export const Table = styled.table`
    border-collapse: collapse;
    width: 85%;
`;

export const TableRow = styled.tr`
    &:nth-child(odd)
    {
        background-color: #e0e0e0;
    }
    &:hover 
    {
        background-color: #bdbdbd;
    }
`;

export const TableHead = styled.th`
    color: whitesmoke;
    font-size: 17px;
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #455a64;
    padding: 15px;
    &:first-child
    {
        border-top-left-radius: 15px;
    }
    &:last-child
    {
        border-top-right-radius: 15px;
    }
`;

export const TableData = styled.td`
    padding: 15px;
    font-size: 15px;
`;