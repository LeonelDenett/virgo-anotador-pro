// Next
import { useRouter } from "next/router";
// Styles
import styles from "../styles/Layout.module.css";
// Mui Components
import Box from "@mui/material/Box";
// Components
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
// Framer Motion
import { motion, AnimatePresence } from "framer-motion";
import { layout } from "./FramerMotionVariants/Variants";
// Toastify
import ToastifyContainer from "./ToastifyContainer";
// Firebase
import { useAuthValue } from "./AuthContext";

function Layout({children}) {
    return (
        <>
            <ToastifyContainer/>
            <Box
                component={motion.div}
                variants={layout}
                initial="start"
                animate="animate"
                exit="exit"
            >
                <Navbar/>
                <Box className={styles.container}>
                    {children}
                </Box>
                <Footer/>
            </Box>
        </>
    );
}

export default Layout;