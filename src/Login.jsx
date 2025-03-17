import { NavLink } from "react-router-dom"
import {LoginPage} from "./Authorization/Authorization-Forms/login-form"
import Navbar from "./Navbar"
export default function Login() {
    return <>
        <Navbar />
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full">
                <LoginPage/>
            </div>
        </div>
    </>
}
