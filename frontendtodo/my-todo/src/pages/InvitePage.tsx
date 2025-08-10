import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

interface invitePageProps {
    onCancel: () => void;
}

const InvitePage: React.FC<invitePageProps> = ({ onCancel }) => {
    const token = useSelector((state: RootState) => state.auth.token);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'user',//ye bydefault rkh rae h
    });

    const handeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('handleSubmit called');



        try {
            const response = await fetch('http://localhost:3000/api/invite', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("failed to create user")
            }
            console.log("user created yeahhhh!!");

        } catch (error) {
            console.error("error in creating user", error);

        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handeChange} required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handeChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
            </div>

            <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handeChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
            </div>

            <div className="flex justify-end space-x-2">
                <button type="button" onClick={onCancel} className="bg-gray-300 hover:bg-gray-400 text-gray-800">
                    Cancel
                </button>

                <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                    Create User
                </button>

            </div>

        </form>
    )

}

export default InvitePage;





