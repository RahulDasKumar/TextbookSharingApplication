import { NavLink } from "react-router-dom"
import {LoginPage} from "./Authorization/Authorization-Forms/login-form"
import Navbar from "./Navbar"
export default function Login() {
    return <>
        <Navbar />
        <div className="flex w-full justify-center pt-20 px-4">
            <div className="w-full">
                <LoginPage/>
            </div>
        </div>
    </>
}
