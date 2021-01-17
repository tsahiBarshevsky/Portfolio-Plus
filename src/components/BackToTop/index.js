import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { motion } from "framer-motion";
import Fab from '@material-ui/core/Fab';

const useStyles = makeStyles(() => ({
    toTop:
    {
        fontSize: '5px',
        color: 'white',
        zIndex: 20,
        position: 'fixed',
        bottom: '10px',
        right: '10px',
        transition: '0.5s ease-out',
        "&:hover, &.Mui-focusVisible":
        {
            transition: '0.5s ease-in',
            color: '#121212',
        }
    },
    arrow:
    {
        fontSize: '30px',
        transform: 'translateY(5%)'
    }
}));

const BackToTop = ({showBelow}) => {
    const clasess = useStyles();
    const [show, setShow] = useState(showBelow ? false : true);
    
    const handleScroll = () =>
    {
        if (window.pageYOffset > showBelow) {
            if (!show) setShow(true);
        } else {
            if (show) setShow(false);
        }
    }

    useEffect(() =>
    {
        if (showBelow)
        {
            window.addEventListener(`scroll`, handleScroll);
            return () => window.removeEventListener(`scroll`, handleScroll);
        }
    })

    const handleClick = () => 
    {
        window['scrollTo']({top: 0, behavior: 'smooth'});
    }

    const fab =
    {
        backgroundColor: 'rgba(87, 101, 116, 0.7)'
    }

    return (
        <>
           {show &&
                <Fab style={fab} size="medium" onClick={handleClick} className={clasess.toTop}>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ rotate: 180, scale: 1.2 }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20
                    }}>
                        <KeyboardArrowDownIcon className={clasess.arrow} />
                    </motion.div>
                    
                </Fab>
           }
        </>
    )
}

export default BackToTop;