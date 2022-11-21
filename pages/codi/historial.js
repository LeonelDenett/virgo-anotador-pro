// Next
import Link from "next/link";
import { useState, useEffect } from "react";
// Styles
import styles from "../../styles/Codi/Historial.module.css";
// Mui Components
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// Firebase
import { db } from "../../firebase-config";
import { getCollection, getDocs, collection, orderBy, limit, query, doc, onSnapshot } from "firebase/firestore";
import { useUserAuth } from "../../components/AuthContext";
import { height } from "@mui/system";

function Historial() {
    // Global User
    const {globalUser} = useUserAuth()
    // Get Games Info
    const [codiGames, setCodiGames] = useState([])
    // Names
    const [player1Name, setPlayer1Name] = useState([])
    const [player2Name, setPlayer2Name] = useState([])
    const [player3Name, setPlayer3Name] = useState([])
    const [player4Name, setPlayer4Name] = useState([])

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
        // Get Last 10 Codi Game
        const getLast3Game = async() => {
            const killerCollectionRef = query(collection(db, "users", `${globalUser.email}`, "gamesCodi"),orderBy("date", "desc"), limit(10));
            onSnapshot(killerCollectionRef, (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const codiGame = doc.data()
                    setCodiGames((prev) => {
                        return[...prev, codiGame]
                    })
                    console.log(codiGames)
                });
            });
        }
        getLast3Game()
    }, [])

    return (
        <Box className={styles.container} sx={{px: {xs: "1.25rem", md: "10rem", lg: "20rem"}, py: {xs: "1.25rem", lg: "1.5rem"}}}>
            <Typography component="h1" variant="title" color="primary">Historial</Typography>
            {/* Historial */}
            <Grid container spacing={2} justifyContent="center" alignItems="center">
                <Grid item xs={12}>
                    <Box className={styles.historial} sx={{boxShadow: 1, mt: 2}}>
                    {
                        codiGames.map((codiGame, index) => {
                            return(
                            <TableContainer sx={{minHeight: {xl: "13rem"}, top: {xl: "4rem"}}} key={index} className={styles.tableContainer} component={Paper}>
                            <Table sx={{ minWidth: 280, minHeight: {xl: "13rem"} }} aria-label="simple table">
                                <TableHead>
                                    <TableRow className={styles.tableSubtitle}>
                                        <TableCell><Typography variant="h6">Jugadores</Typography></TableCell>
                                        <TableCell align="center"><Typography variant="h6">Bajas</Typography></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody key={codiGame.date}>
                                    <TableRow
                                        className={styles.table}
                                    >
                                        <TableCell component="th" scope="row">
                                            <Typography sx={{fontSize: "1.15rem"}}>{codiGame.player1.name}</Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography sx={{fontSize: "1.15rem"}}>{codiGame.player1.currentKills}</Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow
                                        className={styles.table}
                                    >
                                        <TableCell component="th" scope="row">
                                            <Typography sx={{fontSize: "1.15rem"}}>{codiGame.player2.name}</Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography sx={{fontSize: "1.15rem"}}>{codiGame.player2.currentKills}</Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow
                                        className={styles.table}
                                    >
                                        <TableCell component="th" scope="row">
                                            <Typography sx={{fontSize: "1.15rem"}}>{codiGame.player3.name}</Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography sx={{fontSize: "1.15rem"}}>{codiGame.player3.currentKills}</Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow
                                        className={styles.table}
                                    >
                                        <TableCell component="th" scope="row">
                                            <Typography sx={{fontSize: "1.15rem"}}>{codiGame.player4.name}</Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography sx={{fontSize: "1.15rem"}}>{codiGame.player4.currentKills}</Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            </TableContainer>
                            )
                        })
                    }
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Historial;