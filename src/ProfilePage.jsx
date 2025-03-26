import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import defaultAvatar from "/images/default-avatar.png"

export default function ProfilePage() {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)

    useEffect(() => {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
    }, [])

    if (!user) {
        return (
            <div className="text-center pt-20 text-xl text-gray-500">
                Loading profile...
            </div>
        )
    }

    return (
        <div className="flex justify-center items-start min-h-screen bg-white px-4 pt-20">
            <div className="w-full max-w-lg p-10 border border-black rounded-2xl shadow-lg bg-white text-black">
                <div className="flex flex-col items-center">
                    <img
                        src={defaultAvatar}
                        alt="User Avatar"
                        className="w-32 h-32 rounded-full border mb-6"
                    />
                    <h1 className="text-3xl font-bold mb-2">{user.username}</h1>
                    <p className="text-lg text-gray-700 mb-6">{user.email}</p>

                    <button
                        onClick={() => navigate("/")}
                        className="mt-2 px-5 py-2 text-sm border border-black rounded hover:bg-black hover:text-white transition"
                    >
                        Go to Homepage
                    </button>
                </div>
            </div>
        </div>
    )
}
