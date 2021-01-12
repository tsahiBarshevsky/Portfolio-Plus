import React from 'react';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import { green, red, blueGrey } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import { Tooltip, Fade, Fab } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
	fab:
	{
		color: blueGrey[50],
		backgroundColor: blueGrey[900],
		marginRight: theme.spacing(2),
		"&:hover":
		{
			backgroundColor: blueGrey[800],
		}
    },
    options:
    {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    tooltip: {fontSize: '15px', textAlign: 'center'}
});

function ProjectsTable(props) {
    const { classes } = props;
    return (
        <Table striped hover responsive>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Project name</th>
                    <th>Project type</th>
                    <th>Number of links</th>
                    <th>Youtube video?</th>
                    <th>Options</th>
                </tr>
            </thead>
            <tbody>
                {props.projects.map((project, index) =>
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{project.title}</td>
                        <td>{project.type}</td>
                        <td>{project.links !== null ? project.links.length : "0"}</td>
                        <td>
                            {project.video !== null ? 
                            <CheckCircleOutlineRoundedIcon style={{color: green[600]}} />
                            : 
                            <HighlightOffRoundedIcon style={{color: red[900]}} />}
                        </td>
                        <td className={classes.options}>
                            <Tooltip title={<p className={classes.tooltip}>Edit</p>} 
                                TransitionComponent={Fade} 
                                TransitionProps={{ timeout: 400 }}
                                enterDelay={500} arrow>
                                <Fab className={classes.fab} size="small">
                                    <EditIcon />
                                </Fab>
                            </Tooltip>
                            <Tooltip title={<p className={classes.tooltip}>Delete</p>}
                                TransitionComponent={Fade} 
                                TransitionProps={{ timeout: 400 }}
                                enterDelay={500} arrow>
                                <Fab className={classes.fab} size="small">
                                    <DeleteIcon />
                                </Fab>
				            </Tooltip>
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>    
    )
}

export default (withStyles(styles)(ProjectsTable));
