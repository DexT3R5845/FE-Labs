import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import routes from './routes';
import axios from 'axios';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    menuLink: {
        textDecoration: 'none',
        color: 'black'
    }
}));

const Master = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const [openDrawer, setOpenDrawer] = useState(true);
    const [openDialog, setopenDialog] = useState(false);
    const [error, setError] = useState({ title: '', message: '' });
    const [selectedIndex, setSelectedIndex] = useState(() => {
        const foundRoute = routes.find((route) => { return `#${route.path}` === window.location.hash });
        return foundRoute ? foundRoute.key : 1;
    });

    const handleDrawerOpen = () => {
        setOpenDrawer(true);
    }

    const handleDrawerClose = () => {
        setOpenDrawer(false);
    }

    const handleDialogOpen = () => {
        setopenDialog(true);
    }

    const handleDialogClose = () => {
        setopenDialog(false);
    }

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    }

    axios.interceptors.response.use(
        (response) => { return response; },
        (error) => {
            if (error.response.status != 400) { // 400 is used for business error. should be handled manually.
                setError({
                    title: 'Network Error',
                    message: error.message
                }); // message could be more friendly.
                handleDialogOpen();
            }
            return Promise.reject(error);
        });

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: openDrawer,
                })}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, openDrawer && classes.hide)}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Book Library
                        </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={openDrawer}
                classes={{
                    paper: classes.drawerPaper,
                }}>
                <div className={classes.drawerHeader}>
                    <IconButton
                        aria-label="Close drawer"
                        onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {
                        routes.map((route) => {
                            return (
                                <Link to={route.path} className={classes.menuLink} key={route.key}>
                                    <ListItem button key={route.key}
                                        selected={selectedIndex === route.key}
                                        onClick={event => handleListItemClick(event, route.key)}>
                                        <ListItemIcon>
                                            {route.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={route.name} />
                                    </ListItem>
                                </Link>
                            )
                        })
                    }
                </List>
            </Drawer>
            <main className={clsx(classes.content, { [classes.contentShift]: openDrawer })}>
                <div className={classes.drawerHeader} />
                {props.children}
            </main>
            <Dialog
                open={openDialog}
                onClose={handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{error.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {error.message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">OK</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Master;