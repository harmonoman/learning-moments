import { useEffect, useState } from "react"
import { Post } from "./Post"
import { getAllLikes, postRemove } from "../../services/likesService";
import { Link } from "react-router-dom";

export const Favorites = ({ currentUser }) => {
    const [allUserLikes, setAllUserLikes] = useState([]);

    // Get and set all Likes
    useEffect(() => {
        getAllLikes().then((likesArray) => {
            const userLikedPosts = likesArray.filter((like) => like.userId == currentUser.id)
            setAllUserLikes(userLikedPosts)
    })}, [currentUser])

    // Handle removing the post
    const handleRemove = (likeId) => {
        postRemove(likeId).then(() =>{
            setAllUserLikes((prevLikes) => prevLikes.filter((like) => like.id !== likeId))
        })
    }

    return (
        <div className="flex flex-col items-center px-4 py-8">
            <h1 className="font-comic text-6xl mb-10">My Favorites</h1>
            <div className="w-full max-w-4xl space-y-6"> 
                        
            {allUserLikes.map((likeObj) => (
                <div
                    key={likeObj.id}
                    className="flex items-start justify-between w-full max-w-4xl rounded shadow p-4 bg-white rounded-xl"
                >
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold">
                            <Link to={`/posts/${likeObj.post.id}`} className="hover:text-blue-600">
                                {likeObj.post.title}      
                            </Link>
                        </h2> 
                        
                    </div>
                    <button
                        className="text-red-600 hover:text-red-800 ml-4 self-center focus:outline-none"
                        onClick={() => handleRemove(likeObj.id)}
                    >
                    Remove
                    </button>
                </div>
            ))}
            </div>
        </div>
    )
}