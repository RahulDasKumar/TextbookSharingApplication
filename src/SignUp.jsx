import { RegisterForm } from "./Authorization/Authorization-Forms/register-form"
import Navbar from "./Navbar"
export default function SignUp() {
    return <>
    <Navbar/>
    <div className="flex w-full justify-center pt-20 px-4">
        <div className="w-full">
            <RegisterForm />
        </div>
        </div>
    </>
}
