// Next
import Link from "next/link";
import { useState,useEffect } from "react";
// Styles
import styles from "../styles/Auth.module.css";
// Mui Components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
// Mui Icons
import WestRoundedIcon from "@mui/icons-material/WestRounded";
// Firebase
import { auth } from "../firebase-config";
import { sendEmailVerification } from "firebase/auth";
import { useUserAuth } from "../components/AuthContext";
// Toastify
import { toast } from "react-toastify";

function VerifyEmail() {
    // Resend Email
    const resendEmailVerification = () => {
        setButtonDisabled(true)
        sendEmailVerification(auth.currentUser, {url: "https://virgo-anotador-pro-blue.vercel.app"})
        .then(() => {
            setButtonDisabled(false);
            setTimeActive(true)
            toast.success("Si el Email existe en nuestra base de datos se le enviará un link de verificación.")
        }).catch((error) => {
            toast.error(error.message)
            setButtonDisabled(false)
        })
    };
    // Timer for resend Email
    const [ buttonDisabled, setButtonDisabled] = useState(false);
    const [timeActive, setTimeActive] = useState(false);
    const [time, setTime] = useState(60);

    useEffect(() => {
        let interval = null
        if(timeActive && time !== 0 ){
          interval = setInterval(() => {
            setTime((time) => time - 1)
          }, 1000)
        }else if(time === 0){
          setTimeActive(false)
          setTime(60)
          clearInterval(interval)
        }
        return () => clearInterval(interval);
    }, [timeActive, time])

    return (
        <Box className={styles.container} sx={{px: {xs: "1.25rem", md: "10rem", lg: "20rem"}, py: {xs: "1.25rem", lg: "1.5rem"}}}>
            <Box className={styles.card}>
                <Typography my={2} color="primary" variant="h2" component="h1">Verifica tu dirección de correo electrónico.</Typography>
                <Typography mb={3} color="primary" id="transition-modal-title" variant="h6" component="h2">
                    Confirma tu email para tener acceso a la aplicación.
                </Typography>
                <Button
                    variant="contained"
                    onClick={resendEmailVerification}
                    disabled={timeActive}
                >
                    Reenviar Email { timeActive && time }
                </Button>
                {/* Back to Login Page */}
                <Box mt={24} className={styles.backToLogin}>
                    <Button variant="contained" startIcon={<WestRoundedIcon/>} className={styles.submitButton}>
                        <Link href="/login">
                            <Typography variant="caption">Volver</Typography>
                        </Link>
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default VerifyEmail;