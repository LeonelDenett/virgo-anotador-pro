// Mui Components
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
// Formik
import { ErrorMessage } from 'formik';
// Styles
import styles from "../../styles/Codi/Codi.module.css";

export const InputTextFieldCodi = ({field, form: {errors, touched}, ...props}) => (
    <Box mb={3}>
        <TextField
            variant="contained"
            sx={{"& .MuiOutlinedInput-root": {
                "& fieldset": {
                    borderColor: "#ffffff",
                    borderRadius: "1rem"
                },
            }}}
            fullWidth
            label={field.name}
            autoComplete="off"
            error={touched[field.name] && errors[field.name]}
            InputLabelProps={ touched && errors ? {className: styles.label} : {className: styles.labelError}}
            inputProps={{className: styles.labelText}}
            {...field}
            {...props}
        />
        <ErrorMessage name={field.name}>
            {msg => <Typography variant="subtitle2">{msg}</Typography>}
        </ErrorMessage>
    </Box>
);