import { isStrongPassword } from 'validator'
import * as yup from 'yup'


export const LoginSchema = yup.object().shape({
    email: yup.string().email("Enter a valid email address"),
    password: yup.string().min(6,"Password has to be longer than 6 characters")
})

export const RegisterSchema = yup.object().shape({
    email: yup.string().email("Enter a valid email address"),
    username: yup.string().required(),
    password: yup.string().min(6, "Password has to be longer than 6 characters")
})

