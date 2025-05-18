import { Outlet, Route, Routes } from "react-router-dom"
import { PostList } from "../components/posts/PostList"
import { NavBar } from "../components/nav/NavBar"
import { useEffect, useState } from "react"
import { PostDetails } from "../components/posts/PostDetails"
import { NewPost } from "../components/forms/NewPostForm"
import { MyPosts } from "../components/posts/MyPosts"
import { EditPost } from "../components/forms/EditPostForm"
import { Favorites } from "../components/posts/Favorites"
import { UserProfile } from "../components/users/UserProfile"
import { EditProfile } from "../components/forms/EditProfileForm"

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
                        <NavBar currentUser={currentUser}/>
                        <Outlet />
                    </>
                }
            >
                <Route index element={<PostList />} />
                <Route path="posts/:postId" element={<PostDetails currentUser={currentUser}/>} />
                <Route path="newPost" element={<NewPost currentUser={currentUser}/>} />
                <Route path="myPosts" element={<MyPosts currentUser={currentUser} />} />
                <Route path="editPost/:postId" element={<EditPost currentUser={currentUser}/>} />
                <Route path="favorites" element={<Favorites currentUser={currentUser}/>} />
                <Route path="profile/:userId" element={<UserProfile currentUser={currentUser}/>} />
                <Route path="editProfile/:userId" element={<EditProfile currentUser={currentUser}/>} />
            </Route>
        </Routes>
    )
}