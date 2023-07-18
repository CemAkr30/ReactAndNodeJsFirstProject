
import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().min(4).max(10).required(),
  });


export const RegisterSchema =  Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().min(4).max(10).required(),
    firstName: Yup.string().min(3).max(15).required(),
    lastName: Yup.string().min(3).max(15).required()
  });


export const UserProfileSchema =  Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().min(4).max(10).required(),
    firstName: Yup.string().min(3).max(15).required(),
    lastName: Yup.string().min(3).max(15).required(),
    country: Yup.string().min(3).max(50).required(),
    city: Yup.string().min(3).max(50).required()
  });