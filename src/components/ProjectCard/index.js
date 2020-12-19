import React from 'react';
import { createMuiTheme, makeStyles, MuiThemeProvider } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Fab, Paper } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';

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
		display: 'flex',
		justifyContent: 'space-between',
		borderRadius: '20px',
		marginTop: theme.spacing(8),
		alignItems: 'center',
		boxShadow: '2px 2px 5px 0px rgba(0, 0, 0, 0.5)',
		padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
    },
    fab: 
	{
		margin: '5px'
	}
}));

const theme = createMuiTheme({
	typography:
	{
		allVariants:
		{
			fontFamily: `"Andika New Basic", sans-serif`,
			padding: '10px'
		},
		subtitle1:
		{
			fontSize: '20px'
		}
	}
});

function ProjectCard(props) 
{
    const classes = useStyles();
    return (
		<Paper className={classes.paper}>
			<MuiThemeProvider theme={theme}>
				<Typography variant="subtitle1">
					{props.title}
				</Typography>
			</MuiThemeProvider>
			<div>
				<Fab className={classes.fab} color="primary" size="small">
					<VisibilityIcon />
				</Fab>
				<Fab className={classes.fab} color="primary" size="small">
					<EditIcon />
				</Fab>
				<Fab className={classes.fab} color="primary" size="small">
					<DeleteIcon />
				</Fab>
			</div>
		</Paper>
    )
}

export default ProjectCard;
