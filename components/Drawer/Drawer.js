// Next
import Link from 'next/link';
import { useState } from 'react';
// Styles
import styles from "./Drawer.module.css"
// Mui Components
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// Mui Icons
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import GroupsIcon from '@mui/icons-material/Groups';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import HomeIcon from '@mui/icons-material/Home';
// Firebase
import { useUserAuth } from "../AuthContext"

function MyDrawer() {
    // Drawer
    const [state, setState] = useState(false);
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
        setState({ ...state, [anchor]: open });
    };
    // Logout Function
    const { logout } = useUserAuth();
    // List Items
    const items = [
        {
            id: 1,
            header: "Team",
            icon: <AddBoxRoundedIcon/>,
            subtitle: "Crear equipo",
            icon2:  <GroupsIcon/>,
            subtitle2: "Mi equipo",
            href: "/team/new-team",
            href2: "/team/my-team"
        },
        {
            id: 2,
            header: "Codi",
            icon: <CreateRoundedIcon/>,
            subtitle: "Anotar partida",
            icon2:  <MilitaryTechIcon/>,
            subtitle2: "Historial",
            href: "/codi/dashboard",
            href2: "/codi/historial"

        },
        // {
        //     id: 3,
        //     header: "Fifita",
        //     icon: <CreateRoundedIcon/>,
        //     subtitle: "Anotar partido",
        //     icon2:  <SportsSoccerIcon/>,
        //     subtitle2: "Historial",
        //     href: "/fifita/new-game",
        //     href2: "/fifita/historial"
        // },
    ];

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : {sm: 250, lg: 300} }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {/* Home Menu */}
                <ListSubheader sx={{backgroundColor: 'transparent'}}>
                    <Typography color="secondary">Menu</Typography>
                </ListSubheader>
                <ListItem key={1} disablePadding>
                    <Link href="/">
                        <ListItemButton>
                                <ListItemIcon sx={{color: '#ffffff'}}>
                                    <HomeIcon/>
                                </ListItemIcon>
                                <ListItemText sx={{color: '#ffffff'}} primary="Menu Principal"/>
                        </ListItemButton>
                    </Link>
                </ListItem>
                {/* Team and Codi */}
                {items.map((item, index) => (
                <Box my={3}>
                    <ListSubheader sx={{backgroundColor: 'transparent'}}>
                        <Typography color="secondary">{item.header}</Typography>
                    </ListSubheader>
                    <ListItem key={index} disablePadding>
                        <Link href={item.href}>
                            <ListItemButton>
                                    <ListItemIcon sx={{color: '#ffffff'}}>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText sx={{color: '#ffffff'}} primary={item.subtitle}/>
                            </ListItemButton>
                        </Link>
                    </ListItem>
                    <ListItem key={index} disablePadding>
                        <Link href={item.href2}>
                            <ListItemButton>
                                    <ListItemIcon sx={{color: '#ffffff'}}>
                                        {item.icon2}
                                    </ListItemIcon>
                                    <ListItemText sx={{color: '#ffffff'}} primary={item.subtitle2}/>
                            </ListItemButton>
                        </Link>
                    </ListItem>
                </Box>
                ))}
                <ListSubheader sx={{backgroundColor: 'transparent'}}>
                    <Typography color="secondary">Fifita</Typography>
                </ListSubheader>
                <ListItem key={2} disablePadding>
                    <ListItemButton disabled>
                            <ListItemIcon sx={{color: '#ffffff'}}>
                                <CreateRoundedIcon/>
                            </ListItemIcon>
                            <ListItemText sx={{color: '#ffffff'}} primary="Anotar partido"/>
                    </ListItemButton>
                </ListItem>
                <ListItem key={3} disablePadding disabled>
                    <ListItemButton disabled>
                            <ListItemIcon sx={{color: '#ffffff'}}>
                                <SportsSoccerIcon/>
                            </ListItemIcon>
                            <ListItemText sx={{color: '#ffffff'}} primary="Historial"/>
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <Box>
            {['left'].map((anchor) => (
                <Box key={anchor}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={toggleDrawer(anchor, true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                        classes={{ paper: styles.drawerContent }}
                    >
                        {list(anchor)}
                        <Button sx={{mx: 3}} variant="contained" color="secondary" onClick={logout}>Salir</Button>
                    </Drawer>
                </Box>
            ))}
        </Box>
    );
}

export default MyDrawer;