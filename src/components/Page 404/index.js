import React, { useEffect } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import image from '../../images/49337.png';
import { Helmet } from 'react-helmet';

const styles = ({
    root:
    {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        width: '100vw',
        height: '100vh'
    },
    pic:
    {
        width: '100%',
        height: 'auto',
        maxWidth: '100%',
        maxHeight: '100%'
    }
});

function Page404(props) {
    const { classes } = props;

    useEffect(() => {
        setTimeout(() => 
        {
            props.history.push('/');
        }, 5000)
    }, [props.history])
    
    return (
        <div className={classes.root}>
            <Helmet><title>Portfolio Plus | Page not found</title></Helmet>
            <img src={image} alt="404 page not found" className={classes.pic} />
        </div>
    )
}

export default withStyles(styles)(Page404);
