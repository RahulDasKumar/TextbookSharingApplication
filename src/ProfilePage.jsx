import React, { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import defaultAvatar from "/images/default-avatar.png"
import settingsIcon from "/images/settings.png"

export default function ProfilePage() {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)

    useEffect(() => {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser)
            setUser(parsedUser)
        }
    }, [])

    if (!user) {
        return <div className="text-center pt-20 text-xl text-gray-500">Loading profile...</div>
    }

    return (
        <div className="min-h-screen bg-white px-6 pt-6 pb-10 text-black">
            {/* Centered Avatar + Name */}
            <div className="flex flex-col items-center mb-10 relative">
                <img src={defaultAvatar} alt="Avatar" className="w-24 h-24 rounded-full border mb-4" />
                <h1 className="font-semibold text-2xl">{user.username}</h1>
                <p className="text-gray-500">Textbook Sharer at UNCC</p>

                {/* Settings icon */}
                <Link to="/settings" className="absolute right-4 top-0">
                    <img src={settingsIcon} alt="Settings" className="w-6 h-6 hover:opacity-70" />
                </Link>
            </div>

            {/* Split Form + Activity Side by Side */}
            <div className="flex flex-col lg:flex-row gap-10 max-w-5xl mx-auto">
                {/* Profile Overview */}
                <div className="flex-1 border rounded-lg p-6">
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Name</label>
                            <input
                                type="text"
                                defaultValue={user.username}
                                className="w-full border rounded px-3 py-2 text-sm"
                                disabled
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Bio</label>
                            <textarea
                                defaultValue="Sharing books with the campus community."
                                className="w-full border rounded px-3 py-2 text-sm"
                                rows={4}
                                disabled
                            />
                        </div>
                        <button type="submit" className="w-full bg-black text-white py-2 rounded hover:bg-gray-900" disabled>
                            Save
                        </button>
                    </form>
                </div>

                {/* Recent Activity */}
                <div className="flex-1 border rounded-lg p-6 space-y-4">
                    <h2 className="text-lg font-semibold mb-2">Recent Activity</h2>
                    <div className="border p-3 rounded">You added <strong>*Intro to Algorithms*</strong> 3 days ago</div>
                    <div className="border p-3 rounded">You received a message from <strong>Sarah (Buyer)</strong></div>
                    <div className="border p-3 rounded">You updated <strong>*Discrete Math Book*</strong> listing</div>
                </div>
            </div>
        </div>
    )
}
