// Next
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
// Styles
import styles from "../../styles/Codi/Codi.module.css";
// Mui Components
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import Checkbox from '@mui/material/Checkbox';
// Formik
import { Formik, Form, Field, useFormik  } from "formik";
import { validationSchemaKills } from "../../components/Formik/Validations";
import { ErrorMessage } from 'formik';
import { InputTextField } from "../../components/Formik/InputTextField";

// Firebase
import { db } from "../../firebase-config";
import { collection, onSnapshot, addDoc, query, orderBy, limit, getDocs, deleteDoc,  getDoc, doc, updateDoc, where, setDoc, arrayUnion, increment  } from "firebase/firestore"
import { useUserAuth } from "../../components/AuthContext";

function Dashboard() {
    // Router
    const router = useRouter();
    // Global User
    const {globalUser} = useUserAuth()
    // Logout Function
    const {logout} = useUserAuth()
    // Set Date
    const now = new Date();
    const current = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
    const date = now.toLocaleDateString() + " at " + current;

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
    // Modal New Game
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    // Modal Confirmation Reset Counter
    const [openReset, setOpenReset] = useState(false);
    const handleOpenReset = () => setOpenReset(true);
    const handleCloseReset = () => setOpenReset(false);
    // Kills
    const [killsPlayer1, setKillsPlayer1] = useState([])
    const [killsPlayer2, setKillsPlayer2] = useState([])
    const [killsPlayer3, setKillsPlayer3] = useState([])
    const [killsPlayer4, setKillsPlayer4] = useState([])
    // Names
    const [player1Name, setPlayer1Name] = useState([])
    const [player2Name, setPlayer2Name] = useState([])
    const [player3Name, setPlayer3Name] = useState([])
    const [player4Name, setPlayer4Name] = useState([])
    // Current Kills
    const [player1KillCounter, setPlayer1KillCounter] = useState(0)
    const [player2KillCounter, setPlayer2KillCounter] = useState(0)
    const [player3KillCounter, setPlayer3KillCounter] = useState(0)
    const [player4KillCounter, setPlayer4KillCounter] = useState(0)
    // Info Killer
    const [killerKills, setKillerKills] = useState(0)
    const [killerName, setKillerName] = useState("")
    // Info Nab
    const [nabKills, setNabKills] = useState(0)
    const [nabName, setNabName] = useState("")
    // Last 3 Games
    const [codiGames, setCodiGames] = useState([])
    // Last Game
    const [lastCodiGame, setLastCodiGame] = useState([])
    // Set DocId
    const [lastId, setLastId] = useState("")

    const [currentKills1, setCurrentKills1] = useState(0)
    const [currentKills2, setCurrentKills2] = useState(0)
    const [currentKills3, setCurrentKills3] = useState(0)
    const [currentKills4, setCurrentKills4] = useState(0)

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
        // Get Last 3 Codi Game
        const getLast3Game = async() => {
            const killerCollectionRef = query(collection(db, "users", `${globalUser.email}`, "gamesCodi"),orderBy("date", "desc"), limit(3));
            onSnapshot(killerCollectionRef, (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const last3CodiGame = doc.data()
                    setCodiGames((prev) => {
                        return[...prev, last3CodiGame]
                    })
                });
            });
        }
        getLast3Game()
        // Get Last Codi Game
        const getLastGame = async() => {
            const killerCollectionRef = query(collection(db, "users", `${globalUser.email}`, "gamesCodi"),orderBy("date", "desc"), limit(1));
            onSnapshot(killerCollectionRef, (querySnapshot) => {
                setLastCodiGame([])
                querySnapshot.forEach((doc) => {
                    const lastCodiGame = doc.data()
                    const lastId = doc.id
                    const killer = lastCodiGame.killerKills
                    const nab = lastCodiGame.nabKills
                    setLastId(lastId)
                    setLastCodiGame((prev) => {
                        return[...prev, lastCodiGame]
                    })
                    console.log("id last document:", doc.id)
                });
            });
        }
        getLastGame()
    }, [])
    // Create Game
    async function createCodi(idDocument) {
        // Ref
        const codiCollectionRef = collection(db, `users/${globalUser.email}/gamesCodi`);
        const codiDocRef = doc(db, `users/${globalUser.email}/gamesCodi/${idDocument}`);
        // States
        setPlayer1KillCounter(Number(player1KillCounter) + Number(killsPlayer1))
        setPlayer2KillCounter(Number(player2KillCounter) + Number(killsPlayer2))
        setPlayer3KillCounter(Number(player3KillCounter) + Number(killsPlayer3))
        setPlayer4KillCounter(Number(player4KillCounter) + Number(killsPlayer4))
        // States
        setCurrentKills1(Number(player1KillCounter) + Number(killsPlayer1))
        setCurrentKills2(Number(player2KillCounter) + Number(killsPlayer2))
        setCurrentKills3(Number(player3KillCounter) + Number(killsPlayer3))
        setCurrentKills4(Number(player4KillCounter) + Number(killsPlayer4))
        // Get Killer and Nab Kills
        let counterPlayer1 = Number(player1KillCounter) + Number(killsPlayer1)
        let counterPlayer2 = Number(player2KillCounter) + Number(killsPlayer2)
        let counterPlayer3 = Number(player3KillCounter) + Number(killsPlayer3)
        let counterPlayer4 = Number(player4KillCounter) + Number(killsPlayer4)

        let arrayKills = [counterPlayer1, counterPlayer2, counterPlayer3, counterPlayer4]
        const max = Math.max(...arrayKills)
        const min = Math.min(...arrayKills)
        console.log("max killer:", max)
        console.log("min killer:", min)
        // Set Killer and Nab Names
        // Killer
        if (max == counterPlayer1) {
            console.log(`${player1Name} esta on fire`)
            setKillerName(player1Name)
        } else if (max == counterPlayer2) {
            console.log(`${player2Name} esta on fire`)
            setKillerName(player2Name)
        } else if (max == counterPlayer3) {
            console.log(`${player3Name} esta on fire`)
            setKillerName(player3Name)
        } else if (max == counterPlayer4) {
            console.log(`${player4Name} esta on fire`)
            setKillerName(player4Name)
        } else {
            console.log("Son todos unos muertos")
        }
        // Nab
        if (min == counterPlayer1) {
            console.log(`${player1Name} rompete un pibe`)
            setNabName(player1Name)
        } else if (min == counterPlayer2) {
            console.log(`${player2Name} rompete un pibe`)
            setNabName(player2Name)
        } else if (min == counterPlayer3) {
            console.log(`${player3Name} rompete un pibe`)
            setNabName(player3Name)
        } else if (min == counterPlayer4) {
            console.log(`${player4Name} rompete un pibe`)
            setNabName(player4Name)
        } else {
            console.log("Son todos unos muertos")
        }
        setKillerKills(max)
        setNabKills(min)
        // Killer and Nab Name
        // Create Game
        await addDoc(codiCollectionRef, {
            date: now.toLocaleDateString() + " at " + current,
            killerKills: max,
            nabKills: min,
            player1: {
                name: player1Name,
                kills: killsPlayer1,
                currentKills: Number(currentKills1) + Number(killsPlayer1)
            },
            player2: {
                name: player2Name,
                kills: killsPlayer2,
                currentKills: Number(currentKills2) + Number(killsPlayer2)
            },
            player3: {
                name: player3Name,
                kills: killsPlayer3,
                currentKills: Number(currentKills3) + Number(killsPlayer3)
            },
            player4: {
                name: player4Name,
                kills: killsPlayer4,
                currentKills: Number(currentKills4) + Number(killsPlayer4)
            },
        })
        .then(function(){
            setKillsPlayer1("")
            setKillsPlayer2("")
            setKillsPlayer3("")
            setKillsPlayer4("")
            handleClose()
        })
    }
    // Reset Counter
    async function resetCounterCodi(idDocument) {
        setPlayer1KillCounter(0)
        setPlayer2KillCounter(0)
        setPlayer3KillCounter(0)
        setPlayer4KillCounter(0)
        setCurrentKills1(0)
        setCurrentKills2(0)
        setCurrentKills3(0)
        setCurrentKills4(0)
        setKillsPlayer1("")
        setKillsPlayer2("")
        setKillsPlayer3("")
        setKillsPlayer4("")
        setKillerKills(0)
        setNabKills(0)
        setKillerName("")
        setNabName("")
        const codiDocRef = doc(db, `users/${globalUser.email}/gamesCodi/${lastId}`);
        await updateDoc(codiDocRef, {
            date: now.toLocaleDateString() + " at " + current,
            killerKills: "",
            killerName: "",
            nabKills: "",
            nabName: "",
            player1: {
                name: player1Name,
                kills: 0,
                currentKills: 0
            },
            player2: {
                name: player2Name,
                kills: 0,
                currentKills: 0
            },
            player3: {
                name: player3Name,
                kills: 0,
                currentKills: 0
            },
            player4: {
                name: player4Name,
                kills: 0,
                currentKills: 0
            },
        })
        .then(() => {
            handleCloseReset()
        })
    }
    return (
        <Box className={styles.container} sx={{px: {xs: "1.25rem", md: "10rem", lg: "20rem"}, py: {xs: "1.25rem", lg: "1.5rem"}}}>
            <Typography component="h1" variant="title" color="primary">Codi</Typography>
            {/* Historial */}
            <Grid container spacing={2} justifyContent="center" alignItems="center">
                <Grid item xs={12}>
                    <Box className={styles.currentHistorial} sx={{boxShadow: 1, mt: 2}}>
                    {
                        lastCodiGame.map((codiGame, index) => {
                            return(
                            <TableContainer key={index} className={styles.tableContainer} component={Paper}>
                            <Table sx={{ minWidth: 300 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow className={styles.tableSubtitle}>
                                        <TableCell><Typography variant="h5">Jugadores</Typography></TableCell>
                                        <TableCell align="center"><Typography variant="h5">Bajas</Typography></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow
                                        className={styles.table}
                                    >
                                        <TableCell component="th" scope="row">
                                            <Typography variant="h6">{codiGame.player1.name}</Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography variant="h6">{codiGame.player1.currentKills}</Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow
                                        className={styles.table}
                                    >
                                        <TableCell component="th" scope="row">
                                            <Typography variant="h6">{codiGame.player2.name}</Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography variant="h6">{codiGame.player2.currentKills}</Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow
                                        className={styles.table}
                                    >
                                        <TableCell component="th" scope="row">
                                            <Typography variant="h6">{codiGame.player3.name}</Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography variant="h6">{codiGame.player3.currentKills}</Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow
                                        className={styles.table}
                                    >
                                        <TableCell component="th" scope="row">
                                            <Typography variant="h6">{codiGame.player4.name}</Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography variant="h6">{codiGame.player4.currentKills}</Typography>
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
            {/* Killer and Nab with Funny message */}
            <Grid container className={styles.messages}>
                <Grid item xs={6}>
                    <Typography color="primary">Killer: {killerName}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography color="primary">Manco: {nabName}</Typography>
                </Grid>
            </Grid>
            {/* Divider */}
            <Divider sx={{mt: 2}} />
            {/* Buttons */}
            <Grid container spacing={2} justifyContent="center" alignItems="center">
                <Grid item xs={6}>
                    <Button color="secondary" onClick={handleOpenReset} className={styles.newGame} variant="contained" sx={{boxShadow: 1, mt: 2}}>resetear contador</Button>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={openReset}
                        onClose={handleCloseReset}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                        timeout: 500,
                        }}
                    >
                        <Fade in={openReset}>
                        <Box className={styles.modal}>
                            <Typography id="transition-modal-title" variant="h6" component="h2">
                            Seguro de reiniciar el contador?
                            </Typography>
                            <Button sx={{mt: 2}} variant="contained">No</Button>
                            <Button color="secondary" sx={{ml: 4, mt: 2}} variant="contained" onClick={resetCounterCodi}>Si</Button>
                        </Box>
                        </Fade>
                    </Modal>
                </Grid>
                <Grid item xs={6}>
                    <Button onClick={handleOpen} className={styles.newGame} variant="contained" sx={{boxShadow: 1, mt: 2}}>
                        + partida
                    </Button>
                </Grid>
            </Grid>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={open}>
                <Box className={styles.modal}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                    Nueva partida
                    </Typography>

                    <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                        <Typography mb={2}>{player1Name}</Typography>
                        <TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} autoComplete="off" variant="outlined" name="killsPlayer1" label="kills" value={killsPlayer1} onChange={(e) => setKillsPlayer1(e.target.value)} />
                        <Typography my={2}>{player2Name}</Typography>
                        <TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} autoComplete="off" variant="outlined" name="killsPlayer2" label="kills" value={killsPlayer2} onChange={(e) => setKillsPlayer2(e.target.value)} />
                        <Typography my={2}>{player3Name}</Typography>
                        <TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} autoComplete="off" variant="outlined" name="killsPlayer3" label="kills" value={killsPlayer3} onChange={(e) => setKillsPlayer3(e.target.value)} />
                        <Typography my={2}>{player4Name}</Typography>
                        <TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} autoComplete="off" variant="outlined" name="killsPlayer4" label="kills" value={killsPlayer4} onChange={(e) => setKillsPlayer4(e.target.value)} />
                        <Button sx={{mt: 3}} variant="contained" color="secondary" onClick={createCodi}>Anotar</Button>
                    </FormControl>
                </Box>
                </Fade>
            </Modal>
        </Box>
    );
}

export default Dashboard;