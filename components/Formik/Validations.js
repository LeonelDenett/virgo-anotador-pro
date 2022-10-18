import * as yup from "yup";

// Validations Yup
export const validationSchemaAuth = yup.object({
    email: yup
        .string()
        .email("Email invalido")
        .required("Email requerido"),
    password: yup
        .string()
        .min(8, "Min 8 caracteres")
        .required("Contraseña requerida"),
});
export const validationSchemaResetPassword = yup.object({
    email: yup
        .string()
        .email("Email invalido")
        .required("Email requerido"),
});
export const validationSchemaKills = yup.object({
    kills: yup
        .number()
        .required("Bajas requerido"),
});



