// Next
import Link from "next/link";
import { useRouter } from "next/router";
// Styles
import styles from "../styles/Auth.module.css";
// Mui Components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// Components
import Logo from "../components/Logo";
import { InputTextField } from "../components/Formik/InputTextField";
// Formik and Yup Validation
import { Formik, Form, Field  } from "formik";
import {validationSchemaAuth} from "../components/Formik/Validations";
// Firebase
import { auth, db } from "../firebase-config";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { collection, doc, set } from "firebase/firestore";
// Toastify
import { toast } from "react-toastify";
// Framer Motion
import { motion, AnimatePresence } from "framer-motion";

function Register() {
    // Router
    const router = useRouter();

    return (
        <Box className={styles.container} sx={{px: {xs: "1.25rem", md: "10rem", lg: "20rem"}, py: {xs: "1.25rem", lg: "1.5rem"}}}>
            <Box className={styles.card}>
                {/* Logo */}
                <Logo logoImage={styles.logoImage} logoContainer={styles.logoContainer} width={250} height={250} />
                {/* Register Form */}
                <Formik
                    initialValues={{email: '', password: ''}}
                    validationSchema={validationSchemaAuth}
                    onSubmit={values => {
                        createUserWithEmailAndPassword(auth, values.email, values.password)
                        .then(() => {
                            sendEmailVerification(auth.currentUser, {url: "http://localhost:3000/login"});
                            toast.success("Cuenta creada con éxito.");

                        

                            console.log(auth.currentUser.uid)
                            router.push("/login");
                        })
                        .catch(error => {
                            if (error.code === "auth/email-already-in-use") {
                                toast.error("Error: Email en uso, prueba con otro.");
                            }
                            else {
                                toast.error(error.message);
                            }
                        })
                    }}
                >
                    <Form>
                        {/* Email */}
                        <Field name="email" component={InputTextField}/>
                        {/* Password */}
                        <Field name="password" component={InputTextField} styles={styles}/>
                        {/* Submit */}
                        <Button
                            className={styles.submitButton}
                            color="primary"
                            variant="contained"
                            fullWidth
                            type="submit"
                            >
                                Crear cuenta
                            </Button>
                        {/* Link to Login */}
                        <Box mt={5} className={styles.linkContainer}>
                            <Typography color="primary" variant="caption">Ya tienes una cuenta?</Typography>
                            <Link href="/login">
                                <Typography className={styles.link} color="secondary" variant="subtitle2">
                                    Entrar
                                </Typography>
                            </Link>
                        </Box>
                    </Form>
                </Formik>
            </Box>
        </Box>
    );
}

export default Register;