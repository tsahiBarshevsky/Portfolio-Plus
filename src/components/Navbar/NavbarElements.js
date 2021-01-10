import styled from 'styled-components';
import { Link as LinkS } from 'react-scroll';

export const Nav = styled.nav`
    background: transparent;
    height: 80px;
    margin-top: -80px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    position: sticky;
    top: 0;
    z-index: 20;
    transition: all 0.5s ease-out;

    &.active
    {
        background: #212121;
        border-bottom: 1px solid gray;
        transition: all 0.5s ease-in;   
    }
`;

export const NavbarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    z-index: 1;
    width: 100%;
    padding: 0 24px;
    max-width: 1100px;
    /*margin-right: auto;
    margin-left: auto;
    padding-right: 50px;
    padding-left: 50px;*/
    
`;

export const NavLogo = styled.div`
    color: #fff;
    justify-self: flex-start;
    cursor: pointer;
    text-decoration: none;
    font-size: 2rem;
    display: flex;
    align-items: center;
`;

export const MobileIcon = styled.div`
    display: none;

    /*@media screen and (max-width: 768px)
    {
        display: flex;
        justify-content: flex-start;
        top: 0;
        right: 0;
        transform: translateY(35%);
        font-size: 1.8rem;
        cursor: pointer;
        color: #fff;
    }*/
`;

export const NavMenu = styled.ul`
    display: flex;
    align-items: center;
    list-style: none;
    text-align: center;
    margin-right: -22px;
`;

export const NavItem = styled.li`
    height: 75px;
`;

export const NavLinks = styled(LinkS)`
    //color: pink;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    margin: 5px;
    height: 100%;
    cursor: pointer;
    /*transition: all 0.2s ease-out;
    &:hover
    {
        transform: scale(1.2) rotate(-10deg);
        transition: all 0.2s ease-in;
    }*/
`;