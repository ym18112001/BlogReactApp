

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { ToastContainer, toast } from "react-toastify";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import User from "../types/User";
import "react-toastify/dist/ReactToastify.css";



const Login = () => {

    const User = object().shape({
        email: string().required("email is required").matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, `Invalid email format`),
        password: string()
            .required("password is required")
            .min(8, "password must be at least 8 characters")
            .max(20, "password must be less than 20 characters"),
    });



    const {


        register,
        handleSubmit,
        reset,
        formState: { errors, isValid },
    } = useForm<user>({ mode: "onSubmit", resolver: yupResolver(User) });

    const [_err, setErr] = useState<AxiosError | null>(null);


    type user = { email: string; password: string; }

    const [accessToken, setAccessToken] = useState<string>(``);
    localStorage.setItem('accessToken', accessToken);
    const [user, setUser] = useState<U>({ email: '', firstName: '', id: 0, lastName: '', password: '' });
    localStorage.setItem('user', JSON.stringify(user));
    const navigate = useNavigate();
    const HomeNav = () => { navigate('/'); }
    const LoginSuccess = () => { toast.success(" Logged In Succesfully", { onClose: HomeNav }) };
    const LoginFail = (err: AxiosError) => { toast.error(" Login Error : " + err.response?.data) };

    type u = { id: number };
    type U = Omit<User, 'confirmPassword'> & u;
    type res = { accessToken: string; user: U; }



    const config = { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } }

    const isValidUser = async (myUser: user) => {


        await axios.post<res>(`http://localhost:3000/login`, myUser, config)
            .then(({ data }) => {
                data.accessToken && setAccessToken(data.accessToken); data.user && setUser(data.user);
                LoginSuccess();
            })
            .catch((err: AxiosError) => { setErr(err); LoginFail(err) })
            .finally(() => {
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('user', JSON.stringify(user));
                axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem('accessToken')}`;
            });

    }


    const Submit = (user: user) => {
        console.log(user);
        isValidUser(user);
        reset();
    }

    // const logout = () => {
    //     localStorage.removeItem("accessToken");
    //   };

    //   const getCurrentUser = () => {
    //     return JSON.parse(localStorage.getItem(""));
    //   };

    return (<>


        <form className=" container" onSubmit={handleSubmit(Submit)}>
            <br />

            <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                    {...register('email', { required: 'email is required' })}
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
                    {...register('password', { required: 'password is required' })}
                    name="password"
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="password"
                />

                {(errors.password) && (<p className=" text-danger">{errors.password.message}</p>)}
            </div>




            <button disabled={!isValid} type="submit" className=" mt-4 btn btn-primary">
                Login
            </button>
            <ToastContainer />
            <br />
            <p>don't have an account <Link to='/register'>Register</Link></p>

        </form>

    </>)

}

export default Login;