import styled from 'styled-components';
import WarningIcon from '@material-ui/icons/Warning';

export const TableContainer = styled.div`
    overflow-x: auto;
    width: 100%;
    padding-top: 10px;
`;

export const Table = styled.table`
    border-collapse: collapse;
    width: 100%;
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

export const Head = styled.thead``;
export const Body = styled.tbody``;

/*---other components */

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