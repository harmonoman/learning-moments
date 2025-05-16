import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export const NavBar = () => {
    const navigate = useNavigate();

    return (
        <ul className="navbar">
            <li className="navbar-item">
                <Link to="/" className="navbar-link" >All Posts</Link>
            </li>
            <li className="navbar-item">
                <Link to="/newPost" className="navbar-link" >New Post</Link>
            </li>
            <li className="navbar-item">
                <Link to="/myPosts" className="navbar-link" >My Posts</Link>
            </li>
            <li className="navbar-item">
                <Link to="/favorites" className="navbar-link" >Favorites</Link>
            </li>
            {localStorage.getItem("learning_user") ? (
                <li className="navbar-item navbar-logout">
                    <Link
                        className="navbar-link"
                        to=""
                        onClick={() => {
                            localStorage.removeItem("learning_user")
                            navigate("/login", { replace: true })
                        }}
                        >
                            Logout
                        </Link>
                </li>
            ) : ( 
                ""
            )}
        </ul>
    )
}