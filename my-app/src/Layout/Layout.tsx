import { AppBar, Box, Button, Container, Toolbar, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Routing } from "../Routing/Routing";
import { AuthContext } from "../Context/AuthContext";
import HomeIcon from '@mui/icons-material/Home';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import { useState, useContext } from 'react';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '../Context/ThemeContext';

interface MenuItem {
    text: string;
    icon: JSX.Element;
    path: string;
    onClick?: () => void;
}

export function Layout() {
    const navigate = useNavigate();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const auth = useContext(AuthContext);
    const { toggleTheme, mode } = useTheme();

    const getMenuItems = (): MenuItem[] => {
        const baseItems: MenuItem[] = [
            { text: 'Home', icon: <HomeIcon />, path: '/' },
            { text: 'Vacations', icon: <BeachAccessIcon />, path: '/vacations' },
        ];

        if (auth?.user?.role === 1) {
            baseItems.push({ 
                text: 'Create Vacation', 
                icon: <AddIcon />, 
                path: '/create-vacation' 
            });
        }

        const authItems: MenuItem[] = auth?.user ? [
            { text: 'Logout', icon: <LogoutIcon />, path: '/', onClick: () => auth.logout?.() }
        ] : [
            { text: 'Register', icon: <PersonAddIcon />, path: '/register' },
            { text: 'Log In', icon: <LoginIcon />, path: '/login' },
        ];

        return [...baseItems, ...authItems];
    };

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
             (event as React.KeyboardEvent).key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    return (
        <Box sx={{ 
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            width: '100vw',
            alignItems: 'stretch',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            overflow: 'hidden',
            boxSizing: 'border-box'
        }}>
            <AppBar position="fixed" sx={{ width: '100%' }}>
                <Toolbar sx={{ 
                    justifyContent: 'center',
                    maxWidth: 'lg',
                    width: '100%',
                    margin: '0 auto'
                }}>
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={toggleDrawer(true)}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <IconButton
                        color="inherit"
                        onClick={() => navigate('/')}
                        edge="start"
                        sx={{ mr: 2 }}
                    >
                        <HomeIcon />
                    </IconButton>
                    
                    <Button
                        color="inherit"
                        onClick={() => navigate('/vacations')}
                        startIcon={<BeachAccessIcon />}
                    >
                        Vacations
                    </Button>

                    {auth?.user?.role === 1 && (
                        <Button
                            color="inherit"
                            onClick={() => navigate('/create-vacation')}
                            startIcon={<AddIcon />}
                            sx={{ ml: 2 }}
                        >
                            Create Vacation
                        </Button>
                    )}

                    <Box sx={{ flexGrow: 1 }} />

                    {!auth?.user ? (
                        <>
                            <Button
                                color="inherit"
                                onClick={() => navigate('/register')}
                                startIcon={<PersonAddIcon />}
                                sx={{ mr: 2 }}
                            >
                                Register
                            </Button>
                            <Button
                                color="inherit"
                                onClick={() => navigate('/login')}
                                startIcon={<LoginIcon />}
                                sx={{ mr: 2 }}
                            >
                                Log In
                            </Button>
                        </>
                    ) : (
                        <>
                            <Typography variant="h6" sx={{ mr: 2 }}>
                                Hello {auth.user.firstname} {auth.user.lastname}
                            </Typography>
                            <Button
                                color="inherit"
                                onClick={() => auth.logout?.()}
                                startIcon={<LogoutIcon />}
                                sx={{ mr: 2 }}
                            >
                                Logout
                            </Button>
                        </>
                    )}

                    <IconButton 
                        color="inherit" 
                        onClick={toggleTheme}
                        sx={{ ml: 1 }}
                    >
                        {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
            >
                <Box
                    sx={{ width: 250 }}
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                >
                    <List>
                        {getMenuItems().map((item) => (
                            <ListItem 
                                key={item.text}
                                onClick={() => {
                                    if (item.onClick) {
                                        item.onClick();
                                    } else {
                                        navigate(item.path);
                                    }
                                    setDrawerOpen(false);
                                }}
                            >
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>

            <Container 
                component="main" 
                maxWidth={false}
                disableGutters
                sx={{ 
                    mt: 8,
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'stretch',
                    flex: 1,
                    overflow: 'auto',
                    overflowX: 'hidden',
                    p: 0,
                    height: 'calc(100vh - 64px)'
                }}
            >
                <Routing />
            </Container>
        </Box>
    );
}
