// Mui Components
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

function Input({name, label, error, styles, formik, type, value}) {
    return (
        <>
            <TextField
                variant="outlined"
                sx={{"& .MuiOutlinedInput-root": {
                    "& fieldset": {
                        borderColor: "#ffffff",
                        borderRadius: "1rem"
                    },
                }}}
                fullWidth
                id={name}
                name={name}
                label={label}
                type={type}
                value={value}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="off"
                error={error}
                InputLabelProps={formik.errors ? {className: styles.label} : {className: styles.labelError}}
                inputProps={formik.errors ? {className: styles.labelText} : {className: styles.labelTextError}}
            />
            <Typography variant="subtitle2" mb={3} color="error">{error}</Typography>
        </>
    );
}

export default Input;