import React, { useState } from 'react';
import { Nav, NavbarContainer, NavLogo, NavMenu, NavItem, NavLinks, Logo } from './NavbarElements';
import { motion } from "framer-motion";
import { animateScroll as scroll} from 'react-scroll';
import logo from '../../images/portfolio.svg';

const handleClick = () => 
{
    scroll.scrollToTop();
}

const Navbar = () => 
{
    const [navbar, setNavbar] = useState(false);
    const [color, setColor] = useState('');

    const changeBackground = () =>
    {
        if (window.scrollY >= 110)
        {
            setNavbar(true);
            setColor('white');
        }
        else
        {
            setNavbar(false);
            setColor('black');
        }
    }

    window.addEventListener('scroll', changeBackground);

    return (
        <>
            <Nav className={navbar ? 'navbar active' : 'navbar'}>
                <NavbarContainer>
                    <NavLogo onClick={handleClick}>
                        <motion.div 
                            whileHover={{ rotateZ: 25, scale: 1.3 }}
                            transition={{ type: "spring", stiffness: 500 }}
                            style={{display: 'flex', alignItems: 'center'}} >
                            <Logo src={logo} alt="Logo" />
                        </motion.div>
                    </NavLogo>
                    <NavMenu>
                        <motion.div
                            whileHover={{ rotateZ: -10, scale: 1.4 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            style={{display: 'flex', alignItems: 'center'}}>
                            <NavItem>
                                <NavLinks style={{color: color}}
                                    smooth={true} duration={500} spy={true}
                                    exact='true' offset={-80}
                                    to="about">About</NavLinks>
                            </NavItem>
                        </motion.div>
                        <motion.div
                            whileHover={{ rotateZ: -10, scale: 1.5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            style={{display: 'flex', alignItems: 'center'}}>
                            <NavItem>
                                <NavLinks style={{color: color}}
                                    smooth={true} duration={500} spy={true}
                                    exact='true' offset={-80}
                                    to="services">Services</NavLinks>
                            </NavItem>
                        </motion.div>
                    </NavMenu>
                </NavbarContainer>
            </Nav>
        </>
    )
}

export default Navbar;