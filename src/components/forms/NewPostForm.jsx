import { useEffect, useState } from "react"
import { getAllUsers } from "../../services/userService"
import { savePost } from "../../services/postService";
import { useNavigate } from "react-router-dom";
import { TopicDropdown } from "../filters/TopicDropdown";

export const NewPost = ({ currentUser }) => {
    const [allUsers, setAllUsers] = useState([]);
    const [selectedTopicId, setSelectedTopicId] = useState(0);
    const [body, setBody] = useState("");
    const [title, setTitle] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        getAllUsers().then((usersArray) => {
            setAllUsers(usersArray);
        })
    }, [])

    // Handling of a topic change
    const handleTopicChange = (topicId) => {
        setSelectedTopicId(topicId);
    }

    const handleSave = (event) => {
        event.preventDefault();

        const user = allUsers.find(user => user.id === currentUser.id)

        const newPostObj = {
            userId: user.id,
            topicId: selectedTopicId,
            title: title,
            body: body,
            date: new Date().toISOString().slice(0, 10),
        }

        savePost(newPostObj).then(() => {
            navigate(`/`);
        })
    }

    return (
        <form 
            className="bg-white p-6 rounded-xl shadow-md border border-gray-200 max-w-3xl mx-auto mt-10 space-y-6"
            onSubmit={handleSave}
        >
            <h2 className="text-3xl font-bold text-gray-800">New Post</h2>

            {/* Title input */}
            <fieldset>
                <input
                    onChange={(event) => setTitle(event.target.value)}
                    type="text"
                    placeholder="Post Title"
                    className="w-full h-10 px-4 border-2 border-[#CC5500] rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                />
            </fieldset>

            {/* Topic Dropdown */}
            <fieldset>
                <TopicDropdown onTopicChange={handleTopicChange} />
            </fieldset>

            {/* Body input */}
            <fieldset>
                <textarea
                    onChange={(event) => setBody(event.target.value)}
                    placeholder="Write your post..."
                    className="w-full min-h-[120px] px-4 py-2 border-2 border-[#CC5500] rounded text-gray-700 resize-y focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                ></textarea>
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