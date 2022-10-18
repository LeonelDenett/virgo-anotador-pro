// Next
import { useRouter } from "next/router";
import {useState, useEffect} from "react";
// Styles
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "../styles/globals.css";
// Mui Components
import Box from "@mui/material/Box";
// Mui Theme
import theme from "../styles/MuiTheme";
// Components
import HeadMeta from "../components/Head"
import PreLoader from "../components/PreLoader/PreLoader";
import Layout from "../components/Layout";
// Framer Motion
import { motion, AnimatePresence } from "framer-motion";
// Firebase
import { UserAuthContextProvider } from '../components/AuthContext'

function MyApp({ Component, pageProps }) {
    const [loading, setLoading] = useState(false);
    // Loader
    useEffect(() =>{
        setTimeout(() => setLoading(true), 2000);
    })

    return (
        <UserAuthContextProvider>
        <ThemeProvider theme={theme}>
            <HeadMeta/>
            <CssBaseline/>
            <AnimatePresence exitBeforeEnter>
                {
                    loading ? (
                        <Box key="Pages">
                            <motion.div component={motion.div} key="Expanded">
                                <Layout>
                                    <Component {...pageProps}/>
                                </Layout>
                            </motion.div>
                        </Box>
                    )
                    :
                    (
                        <Box key="PreLoader">
                            <PreLoader loading={loading}/>
                        </Box>
                    )
                }
                </AnimatePresence>
        </ThemeProvider>
        </UserAuthContextProvider>
    )
}

export default MyApp
