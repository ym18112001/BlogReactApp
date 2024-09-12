
import { useForm } from "react-hook-form";
import { object, string, ref } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import User from '../types/User'
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



function Regestration() {

  const UserSchema = object().shape({
    email: string().required("email is required").matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, `Invalid email format`),
    password: string()
      .required("password is required")
      .min(8, "password must be at least 8 characters")
      .max(20, "password must be less than 20 characters"),
    confirmPassword: string().required().min(8, "password must be at least 8 characters")
      .max(20, "password must be less than 20 characters").oneOf([ref("password")], "Passwords do not match"),
    firstName: string().required("first name is required"),
    lastName: string().required("last name is required"),
  });

  const {


    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<User>({ mode: "onTouched", resolver: yupResolver(UserSchema) });

  const [err, setErr] = useState<AxiosError | null>(null);
  const navigate = useNavigate();
  const LoginNav = () => { navigate('/login'); }
  const RegisterSuccess = () => { toast.success(" Registered Succesfully", { onClose: LoginNav }) };
  const RegisterFail = (err: AxiosError) => { toast.error(" Register Error : " + err.response?.data) };


  const registerUser = async (user: Omit<User, "confirmPassword">) => {
    await axios.post<Omit<User, "confirmPassword">>(`http://localhost:3000/users`, user)
      .then(() => { RegisterSuccess(); }).catch((err: AxiosError) => { setErr(err); RegisterFail(err) });
  }

  const Submit = ({ email, password, firstName, lastName }: User) => {
    reset();
    registerUser({ email, firstName, lastName, password });
  };

  return (
    <>


      <form className=" container" onSubmit={handleSubmit(Submit)}>
        <br />


        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            {...register("firstName")}
            name="firstName"
            type="text"
            className="form-control"
            id="firstName"
            placeholder="firstName"
          />
          {errors.firstName && (
            <p className=" text-danger">{errors.firstName.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            {...register("lastName")}
            name="lastName"
            type="text"
            className="form-control"
            id="lastName"
            placeholder="lastName"
          />
          {errors.lastName && (
            <p className=" text-danger">{errors.lastName.message}</p>
          )}
        </div>


        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            {...register("email")}
            name="email"
            type="email"
            className="form-control"
            id="email"
            placeholder="email"
          />
          {(errors.email) && (<p className="text-danger">{errors.email.message}</p>)}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            {...register("password")}
            name="password"
            type="password"
            className="form-control"
            id="password"
            placeholder="password"
          />
          {(errors.password) && (
            <p className=" text-danger">{errors.password.message}</p>
          )}
        </div>


        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            {...register("confirmPassword")}
            name="confirmPassword"
            type="password"
            className="form-control"
            id="confirmPassword"
            placeholder="confirm password"
          />
          {errors.confirmPassword && (
            <p className=" text-danger">{errors.confirmPassword.message}</p>
          )}
        </div>

        <button disabled={!isValid} type="submit" className=" mt-4 btn btn-primary">
          Register
        </button>
        <ToastContainer />
        <br />
        <p> have an account <Link to='/login'>Login</Link></p>
      </form>

    </>
  )





}

export default Regestration;
