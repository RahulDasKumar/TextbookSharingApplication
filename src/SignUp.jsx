import { RegisterForm } from "./Authorization/Authorization-Forms/register-form"
import Navbar from "./Navbar"
export default function SignUp() {
    return <>
    <Navbar/>
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full">
                <RegisterForm />
            </div>
        </div>
    </>
}
