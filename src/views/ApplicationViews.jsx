import { Outlet, Route, Routes } from "react-router-dom"
import { PostList } from "../components/posts/PostList"
import { NavBar } from "../components/nav/NavBar"
import { useEffect, useState } from "react"
import { PostDetails } from "../components/posts/PostDetails"

export const ApplicationViews = () => {
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        const localLearningUser = localStorage.getItem("learning_user")
        const learningUserObject = JSON.parse(localLearningUser);
        setCurrentUser(learningUserObject);        
    }, [])

    useEffect(() => {
        console.log("currentUser: ", currentUser)
    })

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

            </Route>
        </Routes>
    )
}