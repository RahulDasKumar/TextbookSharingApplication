import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import defaultAvatar from "/images/default-avatar.png"

export default function ProfilePage() {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)

    useEffect(() => {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser)
            console.log("Parsed user from localStorage:", parsedUser) // Add this
            setUser(parsedUser)
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
        <div className="min-h-screen bg-white px-6 pt-16 pb-10">

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* LEFT SIDE: User Overview */}
                <div className="border border-black rounded-xl p-6 shadow-md bg-white text-black flex flex-col justify-center items-center">
                    <img
                        src={defaultAvatar}
                        alt="Profile"
                        className="w-40 h-40 rounded-full border mb-4"
                    />
                    <h2 className="text-2xl font-bold mb-1 text-center">{user.username}</h2>
                    <p className="text-gray-600 text-center">{user.email}</p>
                </div>

                {/* RIGHT SIDE: Settings */}
                <div className="border border-black rounded-xl p-6 shadow-md bg-white text-black">
                    <h3 className="text-xl font-semibold mb-4">Settings</h3>

                    <div className="space-y-6">
                        {/* Change Profile Picture */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Profile Picture</label>
                            <input type="file" className="w-full border rounded px-3 py-2 text-sm" disabled />
                            <p className="text-xs text-gray-400 mt-1">
                                {/* TODO: Send uploaded image to backend and update avatar */}
                            </p>
                        </div>

                        {/* Change Email */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Update Email</label>
                            <input
                                type="email"
                                placeholder={user.email}
                                className="w-full border rounded px-3 py-2 text-sm"
                                disabled
                            />
                            <p className="text-xs text-gray-400 mt-1">
                                {/* TODO: Create email update endpoint (PATCH /api/user/email) */}
                            </p>
                        </div>

                        {/* Change Password */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Change Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full border rounded px-3 py-2 text-sm"
                                disabled
                            />
                            <p className="text-xs text-gray-400 mt-1">
                                {/* TODO: Add backend route for password update with validation */}
                            </p>
                        </div>

                        {/* Delete Account */}
                        <div>
                            <button
                                className="w-full mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                                onClick={async () => {
                                    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
                                        try {
                                            const userId = user.id || user._id;

                                            console.log("Deleting user with ID:", userId);

                                            const response = await fetch(`https://four155-project-pyflask.onrender.com/api/users/${userId}`, {
                                                method: "DELETE",
                                            });

                                            const result = await response.json();
                                            if (response.ok) {
                                                alert("Account deleted successfully.");
                                                localStorage.removeItem("isLoggedIn");
                                                localStorage.removeItem("user");
                                                navigate("/");
                                            } else {
                                                alert(result.message || "Failed to delete account.");
                                            }
                                        } catch (err) {
                                            console.error("Error deleting account:", err);
                                            alert("Something went wrong.");
                                        }
                                    }
                                }}
                            >
                                Delete Account
                            </button>
                            <p className="text-xs text-gray-400 mt-1 text-center">
                                This will permanently remove your account and data.
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
