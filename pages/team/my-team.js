// Next
import { useState, useEffect } from "react";
import Link from "next/link";
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
import { doc, onSnapshot } from "firebase/firestore";
import { useUserAuth } from "../../components/AuthContext";

function MyTeam() {
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

    const MyInput = ({ field, form, ...props }) => {
        return <TextField {...field} {...props} value={teamName} onChange={(e) => {setTeamName(e.target.value)}}  />;
    };

    const [player1Name, setPlayer1Name] = useState("")
    const [player2Name, setPlayer2Name] = useState("")
    const [player3Name, setPlayer3Name] = useState("")
    const [player4Name, setPlayer4Name] = useState("")

    useEffect(() => {
        // Players Names
        const getPlayersNames = async () => {
            const userRef = doc(db, `users/${globalUser.email}`);
            onSnapshot(userRef, (querySnapshot) => {
                const playersNames = querySnapshot.data()
                setPlayer1Name(playersNames.namePlayer1)
                setPlayer2Name(playersNames.namePlayer2)
                setPlayer3Name(playersNames.namePlayer3)
                setPlayer4Name(playersNames.namePlayer4)
            })
        }
        getPlayersNames()
    }, [])
    

    return (
        <Box className={styles.container} sx={{px: {xs: "1.25rem", md: "10rem", lg: "20rem"}, py: {xs: "1.25rem", lg: "1.5rem"}}}>
            <Box className={styles.card} key="Card">
                <Box className={styles.newTeamContainer} sx={{px: {xs: "1.25rem", md: "10rem", xl: "20rem"}}}>
                    <Typography mb={3} variant="h2" sx={{wordSpacing: "1rem"}}>mi team</Typography>
                    <Box className={styles.MyTeam}>
                        <Typography color="primary" mb={2}>{player1Name}</Typography>
                        <Typography color="primary" mb={2}>{player2Name}</Typography>
                        <Typography color="primary" mb={2}>{player3Name}</Typography>
                        <Typography color="primary">{player4Name}</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default MyTeam;