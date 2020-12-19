import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Fab, Paper } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
    main: 
	{
		width: 'auto',
		display: 'block',
		borderRadius: '20px',
		marginLeft: theme.spacing(3),
		marginRight: theme.spacing(3),
		backgroundColor: 'white',
		backgroundPosition: 'center', 
		backgroundRepeat: 'no-repeat',
		[theme.breakpoints.up(400 + theme.spacing(6))]: {
			width: 400,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	paper: 
	{
		borderRadius: '20px',
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		boxShadow: '2px 2px 5px 0px rgba(0, 0, 0, 0.5)',
		backgroundColor: 'rgba(40, 57, 101, 0.7)',
		padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
    },
    fab: 
	{
		position: 'fixed',
		bottom: theme.spacing(2),
		right: theme.spacing(2),
	}
}));

function ProjectCard(props) 
{
    const classes = useStyles();
    return (
        <main className={classes.main}>
            <Paper className={classes.paper}>
                <h1>{props.title}</h1>
                <Fab color="primary" size="small">
                    <EditIcon />
                </Fab>
                <Fab color="primary" size="small">
                    <DeleteIcon />
                </Fab>
            </Paper>
        </main>
    )
}

export default ProjectCard;
