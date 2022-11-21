// Next
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
// Styles
import styles from "../styles/Home.module.css";
// Mui Components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
// import Swiper JS
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
// import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// Framer Motion
import { motion } from "framer-motion";
import { dashboard } from "../components/FramerMotionVariants/Variants";
// Global User
import { useUserAuth } from "../components/AuthContext";
// Firebase
import { auth, db } from "../firebase-config";
// Toastify
import { toast } from "react-toastify";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";


export default function Home() {
    // Router
    const router = useRouter();
    // Global User
    const {globalUser} = useUserAuth()
    // Logout Function
    const {logout} = useUserAuth()
    // Mui Styles
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));
    // Get Name of Current User
    const [displayEmail, setDisplayEmail] = useState([])
    // Date
    const now = new Date();
    const current = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
    const date = now.toLocaleDateString() + " at " + current;

    useEffect(() => {
        if (!globalUser) {
            logout()
            router.push('/login')
        } else {
            // Email verification
            const verified = globalUser.emailVerified
            console.log(`User loged in as ${globalUser.email}, verified: ${verified}`)
            if (verified === false ){
                router.push('/verify-email')
                console.log("Email is not verified")
            }
        }
    }, [])

    if (globalUser) {
        useEffect(() => {
            async function createUserFetch() {
                const createUserDocFetch = createData(globalUser.email)
            }
            createUserFetch()
        }, [])
    
        async function createData(idDocument) {
            const docUserRef = doc(db, `users/${idDocument}`)
            getDoc(docUserRef);
            const consult = await getDoc(docUserRef);
            if (consult.exists()){
                console.log("Users collection updated with the new user")
            } else {
                await setDoc(docUserRef, {
                    date: now.toLocaleDateString() + " at " + current,
                })
            }
        }
    }

    return (
    <Box
        className={styles.container}
        sx={{px: {xs: "1.25rem", md: "10rem", lg: "20rem"}, py: {xs: "1.25rem", lg: "1.5rem"}}}
        component={motion.div}
        variants={dashboard}
        initial="start"
        animate="animate"
        exit="exit"
    >
        {/* Title */}
        <Typography component="h1" variant="h1" color="primary">Virgo <Box component="span" sx={{display: matches ? 'block' : 'flex'}}></Box> Anotador</Typography>
        {/* Content */}
        <Box className={styles.box}>
            <Typography color="primary" component="h2" variant="h6" sx={{mb: {xs: 1, sm: 2}}} className={styles.subtitle}>Que sale hoy rey ?</Typography>
            <Box className={styles.cardContainer}>
                {/* Swiper needs Global Styles */}
                <style global jsx>{`
                    .swiper-pagination {
                    margin-bottom: -0.7rem
                    }
                    .swiper-pagination-bullet{
                        background: #fe8c00;
                        background: -webkit-linear-gradient(to left, #f83600, #fe8c00);
                        background: linear-gradient(to right, #f83600, #fe8c00);
                        height: 0.8rem;
                        width: 0.8rem;
                        opacity: 0.5;
                    }
                    .swiper-pagination-bullet-active{
                        opacity: 1;
                    }
                `}</style>
                <Swiper
                    pagination={true}
                    modules={[Pagination]}
                    className={styles.swiperContainer}
                    spaceBetween={16}
                >
                    {/* Codi */}
                    <SwiperSlide>
                        <Card className={styles.card}>
                            <CardActionArea>
                                <Link href="/codi/dashboard">
                                <Box sx={{height: {xs: "25.75rem", sm: "20rem", md: "19.5rem", lg: "23rem", xl: "26.5rem"}}} className={styles.imageContainer}>
                                <Image
                                    src="https://images.unsplash.com/photo-1602901248692-06c8935adac0"
                                    alt="Picture of the author"
                                    objectFit="cover"
                                    priority
                                    className={styles.image}
                                    layout="fill"
                                />
                                </Box>
                                </Link>
                                <CardContent>
                                    <Typography variant="h5" component="h5">
                                    Codi
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </SwiperSlide>
                    {/* Fifita */}
                    <SwiperSlide>
                        <Card className={styles.card}>
                            <CardActionArea onClick={() => {DisabledAlert()}}>
                                <Box sx={{height: {xs: "25rem", sm: "20rem", md: "19.5rem", lg: "23rem", xl: "26.5rem"}}} className={styles.imageContainer}>
                                <Image
                                    src="https://images.unsplash.com/photo-1518091043644-c1d4457512c6"
                                    alt="Picture of the author"
                                    objectFit="cover"
                                    priority
                                    className={styles.image}
                                    layout="fill"
                                />
                                </Box>
                                <CardContent>
                                    <Typography variant="h5" component="h5">
                                    Fifita
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </SwiperSlide>
                </Swiper>
            </Box>
        </Box>
    </Box>
  )
}