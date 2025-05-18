import { useEffect, useState } from "react";
import { getAllUsers, updateUser } from "../../services/userService";
import { useNavigate } from "react-router-dom";

export const EditProfile = ({ currentUser }) => {
    const [name, setName] = useState("");
    const [cohort, setCohort] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        getAllUsers().then(usersArray => {
            const foundUser = usersArray.find(u => u.id === parseInt(currentUser.id));
            setName(foundUser.name);
            setCohort(foundUser.cohort);
        })
    },[currentUser])
    
    const handleUpdate = (event) => {
        event.preventDefault();

        const userUpdate = {
            id: currentUser.id,
            name: name,
            email: currentUser.email,
            cohort: cohort,
        }

        updateUser(userUpdate).then(() => {
            navigate(`/profile/${currentUser.id}`)
        })
    }
    
    return (
        <form 
            className="bg-white p-6 rounded-xl shadow-md border border-gray-200 max-w-3xl mx-auto mt-10 space-y-6"
            onSubmit={handleUpdate}
        >
            <h2 className="text-3xl font-bold text-gray-800">Edit Profile</h2>

            {/* Name input */}
            <fieldset>
                <label htmlFor="name" className="block text-lg font-semibold text-gray-700">
                    Name
                </label>
                <input
                    onChange={(event) => setName(event.target.value)}
                    type="text"
                    value={name}
                    className="w-full h-10 px-4 border-2 border-[#CC5500] rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                />
            </fieldset>

            {/* Cohort input */}
            <fieldset>
                <label htmlFor="name" className="block text-lg font-semibold text-gray-700">
                    Cohort
                </label>
                <input
                    onChange={(event) => setCohort(event.target.value)}
                    type="text"
                    value={cohort}
                    className="w-full h-10 px-4 border-2 border-[#CC5500] rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                />
            </fieldset>

            {/* Save Button */}
            <fieldset>
                <button
                    type="submit"
                    className="bg-[#CC5500] text-white font-semibold py-2 px-6 rounded hover:bg-orange-600 transition duration-200"
                >
                Save Post
                </button>
            </fieldset>
        </form>
    )
}