import { Outlet, Route, Routes } from "react-router-dom"
import { PostList } from "../components/posts/PostList"
import { NavBar } from "../components/nav/NavBar"
import { useEffect, useState } from "react"
import { PostDetails } from "../components/posts/PostDetails"
import { NewPost } from "../components/forms/NewPostForm"
import { MyPosts } from "../components/posts/MyPosts"
import { EditPost } from "../components/forms/EditPostForm"

export const ApplicationViews = () => {
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        const localLearningUser = localStorage.getItem("learning_user")
        const learningUserObject = JSON.parse(localLearningUser);
        setCurrentUser(learningUserObject);        
    }, [])

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <>
                        <NavBar />
                        <Outlet />
                    </>
                }
            >
                <Route index element={<PostList />} />
                <Route path="posts/:postId" element={<PostDetails currentUser={currentUser}/>} />
                <Route path="newPost" element={<NewPost currentUser={currentUser}/>} />
                <Route path="myPosts" element={<MyPosts currentUser={currentUser} />} />
                <Route path="editPost/:postId" element={<EditPost currentUser={currentUser}/>} />


            </Route>
        </Routes>
    )
}