// Styles
import styles from "./Footer.module.css"
// Mui Components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function Footer() {
    return (
        <Box className={styles.footer} >
            <Typography variant="footer">Copyrights © Leonel Denett | All rights Reserved</Typography>
        </Box>
    );
}

export default Footer;