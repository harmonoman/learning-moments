import { useNavigate, useParams } from "react-router-dom";
import { getAllPosts, updatePost } from "../../services/postService";
import { useEffect, useState } from "react";
import { TopicDropdown } from "../filters/TopicDropdown";

export const EditPost = ({ currentUser }) => {
    const { postId } = useParams();
    const [title, setTitle] = useState("");
    const [selectedTopicId, setSelectedTopicId] = useState(0);
    const [body, setBody] = useState("");
    const [date, setDate] = useState("");

    const navigate = useNavigate();

    // Get post info
    useEffect(() => {
        getAllPosts().then(postsArray => {
            const post = postsArray.find(p => p.id === parseInt(postId))
            setTitle(post.title);
            setSelectedTopicId(post.topicId);
            setBody(post.body);
            setDate(post.date);
        })
    }, [postId])

    // Handle the topic change
    const handleTopicChange = (topicId) => {
        setSelectedTopicId(topicId)
    }
    
    // Handle the post update
    const handleUpdate = (event) => {
        event.preventDefault();

        const updatedPost = {
            id: postId,
            userId: currentUser.id,
            topicId: selectedTopicId,
            title: title,
            body: body,
            date: date,

        }

        updatePost(updatedPost).then(() => {
            navigate("/myPosts")
        });
    }

    return (
        <form 
            className="bg-white p-6 rounded-xl shadow-md border border-gray-200 max-w-3xl mx-auto mt-10 space-y-6"
            onSubmit={handleUpdate}
        >
            <h2 className="text-3xl font-bold text-gray-800">Edit Post</h2>

            {/* Title input */}
            <fieldset>
                <input
                    onChange={(event) => setTitle(event.target.value)}
                    type="text"
                    value={title}
                    className="w-full h-10 px-4 border-2 border-[#CC5500] rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                />
            </fieldset>

             {/* Topic Dropdown */}
            <fieldset>
                <TopicDropdown onTopicChange={handleTopicChange} selectedTopicId={selectedTopicId}/>
            </fieldset>

            {/* Body input */}
            <fieldset>
                <textarea
                    onChange={(event) => setBody(event.target.value)}
                    value={body}
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