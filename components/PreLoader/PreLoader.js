// Styles
import styles from "./PreLoader.module.css";
// Mui Components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// Mui Icons
import SettingsIcon from "@mui/icons-material/Settings";
// Logo
import Logo from "../../public/logo.jpeg";
// Framer Motion
import { motion } from "framer-motion";
import { fade, preLoader, preLoaderIcon, zoomingIn, logo } from "../FramerMotionVariants/Variants";

function PreLoader() {
    return (
        <Box
            className={styles.container}
            component={motion.div}
            variants={fade}
            initial="start"
            animate="animate"
            exit="exit"
        >
            <Box
                component={motion.div}
                variants={logo}
                initial="start"
                animate="animate"
                exit="exit"
                className={styles.logoContainer}
                >
                    <img src="/logo.jpeg" alt="me" width="250" height="250" className={styles.logo} />
                </Box>
            <Box
                component={motion.div}
                className={styles.card}
                variants={preLoader}
                initial="start"
                animate="animate"
                exit="exit"
                key="Card"
            >
                <Box className={styles.loading}>
                    <Typography
                        component={motion.h2}
                        color="primary"
                        mr={1}
                        variant="h2"
                        variants={zoomingIn}
                        initial="start"
                        animate="animate"
                        exit="exit"
                    >
                        Cargando
                    </Typography>
                    <SettingsIcon
                        component={motion.svg}
                        variants={preLoaderIcon}
                        initial="start"
                        animate="animate"
                        exit="exit"
                        color="primary"
                    />
                </Box>
            </Box>
        </Box>
    );
}

export default PreLoader;