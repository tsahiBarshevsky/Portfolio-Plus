import React, {useState} from 'react';
//import { Table } from 'react-bootstrap';
//import 'bootstrap/dist/css/bootstrap.min.css';
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import { green, red, blueGrey } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import { Tooltip, Fade, Fab } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import firebase from '../firebase';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { Button, DialogActions, Typography, Snackbar, Input, FormControl } from '@material-ui/core';
import { Warning } from '../ProjectCard/projectCardElements';
import { Table, TableContainer, TableData, TableHead, TableRow } from './ProjectsTableElements';


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

const theme = createMuiTheme({
	typography:
	{
		allVariants:
		{
			fontFamily: `"Andika New Basic", sans-serif`,
		},
		subtitle1:
		{
			fontSize: '20px',
		},
		subtitle2:
		{
			color: red[800]
		}
	}
});

function ProjectsTable(props) 
{
    const [open, setOpen] = useState(false);
    const [openSuccess, setOpenSuccess] = useState('');
    const [success, setSuccess] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [title, setTitle] = useState('');
    const { classes } = props;
    const dialogBackground = {backgroundColor: '#f5f5f5'};

    const handleOpen = () =>
	{
		setOpen(true);
	}

    const handleClose = () =>
	{
		setOpen(false);
		setOpenDialog(false);
    }
    
    return (
        <>
            <TableContainer>
                <Table>
                    <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>Project name</TableHead>
                        <TableHead>Project type</TableHead>
                        <TableHead>Number of links</TableHead>
                        <TableHead>Youtube video?</TableHead>
                        <TableHead>Options</TableHead>
                    </TableRow>
                    {props.projects.map((project, index) =>
                        <TableRow key={index}>
                            <TableData>{index+1}</TableData>
                            <TableData>{project.title}</TableData>
                            <TableData>{project.type}</TableData>
                            <TableData>{project.links !== null ? project.links.length : "0"}</TableData>
                            <TableData>
                                {project.video !== null ? 
                                    <CheckCircleOutlineRoundedIcon style={{color: green[600]}} />
                                    : 
                                    <HighlightOffRoundedIcon style={{color: red[900]}} />}
                            </TableData>
                            <TableData className={classes.options}>
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
                                    <Fab className={classes.fab} size="small" onClick={() => {props.projects.map((a, b) => b === index ? setTitle(a.title) : null); handleOpen();}}>
                                        <DeleteIcon />
                                    </Fab>
                                </Tooltip>
                            </TableData>
                        </TableRow>
                    )}
                </Table>
            </TableContainer>
        {/*<Table striped hover responsive>
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
                                <Fab className={classes.fab} size="small" onClick={() => {props.projects.map((a, b) => b === index ? setTitle(a.title) : null); handleOpen();}}>
                                    <DeleteIcon />
                                </Fab>
				            </Tooltip>
                        </td>
                    </tr>
                )}
            </tbody>
        </Table> */}   
        <Dialog
            open={open}
            onClose={handleClose}
            style={{cursor: "default", borderRadius: '25px'}}>
                <DialogTitle style={dialogBackground}>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <Warning style={{fontSize: '30px'}} />
                        <MuiThemeProvider theme={theme}>
                            <Typography component="h1" variant="h5">
                                {`Delete project`}
                            </Typography>
                        </MuiThemeProvider>
                    </div>
                </DialogTitle>
                <DialogContent style={dialogBackground}>
                    <MuiThemeProvider theme={theme}>
                        <Typography variant="h6" gutterBottom>
                            {`Hey, wait! Are you sure you want to delete ${title}?`}
                        </Typography>
                    </MuiThemeProvider>
                </DialogContent>
                <DialogActions style={dialogBackground}>
                    <Button onClick={handleClose} className={classes.submit}>Cancel</Button>
                    <Button onClick={deleteProject} className={classes.deleteButton}>Delete</Button>
                </DialogActions>
        </Dialog>
        </>
    )

    async function deleteProject()
	{
		try 
		{
			setOpen(false);
			await firebase.deleteProject(title);
			setSuccess(`${title} has been successfully deleted`);
			setOpenSuccess(true);
			props.setUpdate(true);
		} 
		catch (error)
		{
			alert(error.message);
		}
	}
}

export default (withStyles(styles)(ProjectsTable));
