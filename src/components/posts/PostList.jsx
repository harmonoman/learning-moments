import { useState, useEffect } from "react"
import { getAllPosts } from "../../services/postService"
import { Post } from "./Post"
import { PostFilterBar } from "./PostFilterBar"

export const PostList = () => {
    const [allPosts, setAllPosts] = useState([]);
    const [selectedTopicId, setSelectedTopicId] = useState(0);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    // Get all Posts
    useEffect(() => {
        getAllPosts().then(postsArray => {
            setAllPosts(postsArray);
        })
    }, [])
    
    // Filtering logic
    useEffect(() => {
        let postsToFilter = allPosts;
    
        // If a topic is selected (non-zero), filter by topic first
        if (selectedTopicId !== 0) {
            postsToFilter = postsToFilter.filter(post =>
                post.topicId === selectedTopicId
            );
        }
    
        // Then filter by search term if provided
        if (searchTerm.trim() !== "") {
            postsToFilter = postsToFilter.filter(post =>
                post.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
    
        setFilteredPosts(postsToFilter);
    }, [searchTerm, selectedTopicId, allPosts]);

    // Handling of a topic change
    const handleTopicChange = (topicId) => {
        setSelectedTopicId(topicId);
    }

    return (
        <div className="flex flex-col items-center px-4 py-8">
            <h1 className="font-comic text-7xl mb-10">Learning Moments</h1>
            <h1 className="font-comic text-6xl mb-10">Posts</h1>

            <div className="w-full max-w-4xl space-y-6">  
                <PostFilterBar onTopicChange={handleTopicChange} setSearchTerm={setSearchTerm} selectedTopicId={selectedTopicId}/>
            </div>
            <div className="w-full max-w-4xl space-y-6">  
                {filteredPosts.map((postObj) => (
                    <Post post={postObj} key={postObj.id} /> 
                ))}
            </div>
        </div>
    )
}