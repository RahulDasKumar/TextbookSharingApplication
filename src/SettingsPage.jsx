import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import returnIcon from "/images/return.png";

export default function SettingsPage() {
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [profilePicture, setProfilePicture] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
            setUsername(storedUser.username || "");
            setEmail(storedUser.email || "");
        }
    }, []);

    const handleUpdate = async (field, value) => {
        const url = `https://four155-project-pyflask.onrender.com/users/${field}/${user._id}`;
        const key = {
            username: "new_username",
            email: "new_email",
            password: "new_password",
            "profile-picture": "profile_picture",
        }[field];

        try {
            const res = await fetch(url, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ [key]: value }),
            });

            const result = await res.json();
            alert(result.message || "Update complete");

            if (res.ok && field === "username") {
                const updatedUser = { ...user, username: value };
                localStorage.setItem("user", JSON.stringify(updatedUser));
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            try {
                const response = await fetch(`https://four155-project-pyflask.onrender.com/api/users/${user._id}`, {
                    method: "DELETE",
                });
                if (response.ok) {
                    alert("Account deleted.");
                    localStorage.removeItem("user");
                    localStorage.removeItem("isLoggedIn");
                    navigate("/");
                } else {
                    const result = await response.json();
                    alert(result.message || "Delete failed.");
                }
            } catch (err) {
                alert("Error deleting account.");
            }
        }
    };

    if (!user) return <div className="p-10 text-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-white text-black px-6 py-12">
            {/* Return Button */}
            <div className="max-w-3xl mx-auto mb-4">
                <button
                    onClick={() => navigate("/profile")}
                    className="flex items-center gap-2 text-black hover:underline"
                >
                    <img src={returnIcon} alt="Return" className="w-5 h-5" />
                    <span>Back to Profile</span>
                </button>
            </div>

            {/* Title */}
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-center">Account Settings</h1>

                <div className="grid gap-6 bg-gray-50 border border-gray-200 p-6 rounded-xl shadow">
                    {/* Username */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full border rounded px-3 py-2"
                        />
                        <button
                            onClick={() => handleUpdate("username", username)}
                            className="mt-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                        >
                            Save Username
                        </button>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border rounded px-3 py-2"
                        />
                        <button
                            onClick={() => handleUpdate("email", email)}
                            className="mt-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                        >
                            Save Email
                        </button>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium mb-1">New Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border rounded px-3 py-2"
                        />
                        <button
                            onClick={() => handleUpdate("password", password)}
                            className="mt-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                        >
                            Update Password
                        </button>
                    </div>

                    {/* Profile Picture */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Profile Picture URL</label>
                        <input
                            type="text"
                            value={profilePicture}
                            onChange={(e) => setProfilePicture(e.target.value)}
                            className="w-full border rounded px-3 py-2"
                        />
                        <button
                            onClick={() => handleUpdate("profile-picture", profilePicture)}
                            className="mt-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                        >
                            Update Picture
                        </button>
                    </div>

                    {/* Delete */}
                    <div className="pt-6">
                        <button
                            onClick={handleDelete}
                            className="w-full text-red-600 border border-red-600 py-2 rounded hover:bg-red-50 transition"
                        >
                            Delete Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
