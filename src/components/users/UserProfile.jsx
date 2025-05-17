import { useEffect, useState } from "react"
import { getAllUsers } from "../../services/userService"
import { getAllPosts } from "../../services/postService"
import { useNavigate, useParams } from "react-router-dom"

export const UserProfile = ({ currentUser }) => {
    const { userId } = useParams();

    const [user, setUser] = useState({});
    const [allPosts, setAllPosts] = useState([]);
    const [postsNum, setPostsNum] = useState(0);

    const navigate = useNavigate();

    // Get all users
    useEffect(() => {
        getAllUsers().then(usersArray => {
            const foundUser = usersArray.find(u => u.id === parseInt(userId))
            setUser(foundUser)
        })
    }, [currentUser, userId])

    // Get all posts
    useEffect(() => {
        getAllPosts().then(postsArray => {
            setAllPosts(postsArray);
        })
    }, [])

    // Get the number of user's posts
    useEffect(() => {
        const userPosts = allPosts.filter(p => p.userId === user?.id)
        const postNum = userPosts.length;
        setPostsNum(postNum)
    }, [allPosts, user])

    
    // Handle edit
    const handleEdit = () => {
        navigate(`/editProfile/${userId}`)
    }

    return (
        
        <section className="bg-white p-6 rounded-xl shadow-md border border-gray-200 max-w-3xl mx-auto mt-10 space-y-4">
            <h2 className="text-3xl font-bold text-gray-800">{user?.name}</h2>
            <div className="flex justify-between items-center text-gray-600">
                <div className="text-gray-600">
                    <span className="font-semibold">Cohort: </span>
                    {user?.cohort}
                </div>
                {currentUser.id === parseInt(userId) ? (
                    <button 
                        className="bg-[#CC5500] text-white font-semibold py-2 px-6 rounded hover:bg-orange-600 transition duration-200" 
                        onClick={handleEdit}>
                            Edit
                    </button>) : ("")
                }
            </div>
            <div className="flex justify-between items-center text-gray-600">
                <div className="text-gray-600">
                    <span className="font-semibold">Posts: </span>
                    {postsNum}
                </div>
            </div>
        </section>
    )
}