// Next
import Link from "next/link";
import { useRouter } from "next/router";
// Styles
import styles from "../styles/Auth.module.css";
// Mui Components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// Mui Icons
import WestRoundedIcon from "@mui/icons-material/WestRounded";
// Components
import {InputTextField} from "../components/Formik/InputTextField";
// Toastify
import { toast } from "react-toastify";
// Formik and Yup Validations
import { Formik, Form, Field  } from "formik";
import {validationSchemaResetPassword} from "../components/Formik/Validations";
// Firebase
import { auth } from "../firebase-config";
import { sendPasswordResetEmail } from "firebase/auth";

function ResetPassword() {
    // Router
    const router = useRouter();

    return (
        <Box className={styles.container} sx={{px: {xs: "1.25rem", md: "10rem", lg: "20rem"}, py: {xs: "1.25rem", lg: "1.5rem"}}}>
            <Box className={styles.card}>
                <Typography color="primary" mb={3} id="transition-modal-title" variant="h2" component="h2">
                    Cambio de contraseña.
                </Typography>
                <Typography color="primary" mb={3} id="transition-modal-title" variant="h6" component="h2">
                    Ingresa tu email y te enviaremos un correo con información para recuperar tu cuenta.
                </Typography>
                <Formik
                    initialValues={{email: ''}}
                    validationSchema={validationSchemaResetPassword}
                    onSubmit={values => {
                        try{
                            sendPasswordResetEmail(auth, values.email, {url: "http://localhost:3000/login"})
                            .then(() => {
                                console.log("Link enviado a:", values.email)
                                toast.success("Link para restablecer contraseña enviado con éxito.")
                                router.push("/login")
                            })
                            .catch(error => {
                                if (error.code === "auth/user-not-found") {
                                    toast.error("Error: Email no coincide con nuestra base de datos.")
                                }
                                if (error.code === "auth/missing-email") {
                                    toast.error("Error: Ingresa un Email valido.")
                                }
                                if (error.code === "auth/invalid-email") {
                                    toast.error("Error: Ingresa un Email valido.")
                                }
                            })
                        } catch {
                            toast.error(error.message);
                        }
                    }}
                >
                    <Form>
                        {/* Email */}
                        <Field name="email" component={InputTextField}/>
                        {/* Submit */}
                        <Button
                            className={styles.submitButton}
                            color="primary"
                            variant="contained"
                            fullWidth
                            type="submit"
                        >
                            Enviar
                        </Button>
                    </Form>
                </Formik>
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

export default ResetPassword;