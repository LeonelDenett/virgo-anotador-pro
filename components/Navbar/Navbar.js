import Link from "next/link";
import { useRouter } from "next/router";
// Styles
import styles from "./Navbar.module.css"
// Mui Components
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
// Components
import MyDrawer from "../Drawer/Drawer";
// Firebase
import { useUserAuth } from "../AuthContext";

function Navbar() {
    // Router
    const router = useRouter();
    // Logout Function
    const { logout } = useUserAuth();
    // Current User
    const { globalUser } = useUserAuth();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="sticky" className={styles.navbar}>
            <Toolbar className={styles.toolbar}>
                <Box display="flex" alignItems="center">
                    {!globalUser ?
                        null
                        :
                        // <IconButton
                        //     size="large"
                        //     edge="start"
                        //     color="inherit"
                        //     aria-label="menu"
                        //     sx={{ mr: 2 }}
                        // >
                        //     <MenuIcon />
                        // </IconButton>
                        <MyDrawer/>
                    }
                    {!globalUser ?
                        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>Virgo Anotador</Typography>
                        :
                        <Typography>Menu</Typography>
                    }
                </Box>
            </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Navbar;