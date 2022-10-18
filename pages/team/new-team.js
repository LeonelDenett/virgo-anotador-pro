// Next
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
// Styles
import styles from "../../styles/Team/Team.module.css";
// Mui Components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
// Formik and Yup Validation
import { Formik, Form, Field  } from "formik";
import { InputTextField } from "../../components/Formik/InputTextField";
// Firebase
import { auth, db } from "../../firebase-config";
import { doc, setDoc, updateDoc, getDoc, collection, addDoc } from "firebase/firestore";
import { useUserAuth } from "../../components/AuthContext";


function NewTeam() {
    const router = useRouter()
    // Global User
    const { globalUser } = useUserAuth();
    const {logout} = useUserAuth()
    // Set Date
    const now = new Date();
    const current = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();

    useEffect(() => {
        if (!globalUser) {
            router.push('/login')
        } else {
            const verified = globalUser.emailVerified
            console.log(`User loged in as ${globalUser.email}, verified: ${verified}`)
            if (verified === false ){
                router.push('/verify-email')
                console.log("Email is not verified")
            }
        }
    }, [])

    const [namePlayer1, setNamePlayer1] = useState("")
    const [namePlayer2, setNamePlayer2] = useState("")
    const [namePlayer3, setNamePlayer3] = useState("")
    const [namePlayer4, setNamePlayer4] = useState("")

    const addNamesPlayers = async () => {
        const docuRef = doc(db, `users/${globalUser.email}`);
        console.log(docuRef)
        await updateDoc(docuRef, {
            namePlayer1: namePlayer1,
            namePlayer2: namePlayer2,
            namePlayer3: namePlayer3,
            namePlayer4: namePlayer4
        })
        .then(() => {
            console.log("Names players added");
            router.push("/codi/dashboard")
        })
    }

    return (
        <Box className={styles.container} sx={{px: {xs: "1.25rem", md: "10rem", lg: "20rem"}, py: {xs: "1.25rem", lg: "1.5rem"}}}>
            <Box className={styles.card} key="Card">
                <Box className={styles.newTeamContainer} sx={{px: {xs: "1.25rem", md: "10rem", xl: "20rem"}}}>
                    <Typography mb={3} variant="h2">Crear team</Typography>
                    <TextField sx={{my: 2}} name="player1" placeholder="Jugador 1" value={namePlayer1} onChange={(e) => setNamePlayer1(e.target.value)} />
                    <TextField sx={{my: 2}} name="player2" placeholder="Jugador 2" value={namePlayer2} onChange={(e) => setNamePlayer2(e.target.value)} />
                    <TextField sx={{my: 2}} name="player3" placeholder="Jugador 3" value={namePlayer3} onChange={(e) => setNamePlayer3(e.target.value)} />
                    <TextField sx={{my: 2}} name="player4" placeholder="Jugador 4" value={namePlayer4} onChange={(e) => setNamePlayer4(e.target.value)} />
                    <Button sx={{my: 3}} variant="contained" color="secondary" onClick={addNamesPlayers} type="submit">Guardar</Button>
                </Box>
            </Box>
        </Box>
    );
}

export default NewTeam;