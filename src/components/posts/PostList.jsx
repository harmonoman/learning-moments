import { useState } from "react"
import { useEffect } from "react"
import { getAllPosts } from "../../services/postService"
import "./Posts.css"
import { Post } from "./Post"

export const PostList = () => {
    const [allPosts, setAllPosts] = useState([])

    useEffect(() => {
        getAllPosts().then(postsArray => {
            setAllPosts(postsArray);
        })
    }, [])

    return (
        <div className="flex flex-col items-center px-4 py-8">
            <h1 className="font-comic text-6xl mb-10">Posts</h1>
            <div className="w-full max-w-4xl space-y-6">  
                {allPosts.map((postObj) => (
                    <Post post={postObj} key={postObj.id} /> 
                ))}
            </div>
        </div>
    )
}