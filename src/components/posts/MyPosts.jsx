import { useEffect, useState } from "react"
import { PostFilterBar } from "./PostFilterBar"
import { deletePost, getAllPosts } from "../../services/postService";
import { Post } from "./Post";

export const MyPosts = ({ currentUser }) => {
    const [allPosts, setAllPosts] = useState([]);
    const [myPosts, setMyPosts] = useState([]);
    const [selectedTopicId, setSelectedTopicId] = useState(0);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [lastTopicId, setLastTopicId] = useState(0);

// Get all posts
useEffect(() => {
    getAllPosts().then((postsArray) => {
        setAllPosts(postsArray);
    })
}, [])

// Get my posts from allPosts
useEffect(() => {
    const myPostsArray = allPosts.filter(post => post.userId === currentUser.id)
    setMyPosts(myPostsArray);
}, [allPosts, currentUser])

// Filtering logic
useEffect(() => {
    let postsToFilter = myPosts;

    // If a topic is selected (non-zero), filter by topic first
    if (selectedTopicId !== 0) {
        postsToFilter = postsToFilter.filter(post =>
            post.topicId === selectedTopicId
        );
    }

    // Then filter by search term if provided
    if (searchTerm !== "") {
        postsToFilter = postsToFilter.filter(post =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    setFilteredPosts(postsToFilter);
}, [searchTerm, selectedTopicId, myPosts]);

// Handling of a topic change
const handleTopicChange = (topicId, preserveLast = false) => {
    setSelectedTopicId(topicId);
    if (!preserveLast && topicId !== 0) {
        setLastTopicId(topicId);
    }
}

// Handling a delete
const handleDelete = (postId) => {
    deletePost(postId).then(() => {
        setAllPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
    })
}

    return (
        <div className="flex flex-col items-center px-4 py-8">
            <h1 className="font-comic text-6xl mb-10">My Posts</h1>
            <div className="w-full max-w-4xl space-y-6">  
                <PostFilterBar onTopicChange={handleTopicChange} setSearchTerm={setSearchTerm} lastTopic={lastTopicId} selectedTopicId={selectedTopicId}/>
            </div>
            <div className="w-full max-w-4xl space-y-6"> 
                
                {filteredPosts.map((postObj) => (
                    <div
                        key={postObj.id}
                        className="flex items-start justify-between w-full max-w-4xl rounded shadow p-4"
                    >
                        <div className="flex-1">
                        <Post post={postObj} />
                        </div>
                        <button
                            className="text-red-600 hover:text-red-800 ml-4 self-center focus:outline-none"
                            onClick={() => handleDelete(postObj.id)}
                        >
                        Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}