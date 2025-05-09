// import { useEffect, useState } from "react";
// import { getAllPosts } from "../../services/postService";

import { useEffect, useState } from "react";
import { getAllTopics } from "../../services/topicService";
import { getAllLikes } from "../../services/likesService";

export const Post = ({ post }) => {

    const [allTopics, setAllTopics] = useState([]);
    const [postTopic, setPostTopic] = useState([]);
    const [allLikes, setAllLikes] = useState([]);
    const [likesTotal, setLikesTotal] = useState([]);

    useEffect(() => {
        getAllTopics().then((topicsArray) => {
            setAllTopics(topicsArray)
        });
    }, []);

    useEffect(() => {
        const topic = allTopics.find(topic => topic.id === post.topicId);
        setPostTopic(topic);
    }, [allTopics, post])

    useEffect(() => {
        getAllLikes().then((likesArray) => {
            setAllLikes(likesArray);
        });
    }, []);

    useEffect(() => {
        const likes = allLikes.filter((like) => like.postId === post.id)
        const total = likes.length;
            setLikesTotal(total);
    }, [allLikes, post])
    
        return (
            <section className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <div className="grid grid-cols-[2fr_1fr_auto] gap-4 text-gray-700 items-start">
                    <h2 className="text-2xl font-bold">{post.title}</h2>       
                    <p>{postTopic?.name}</p>
                    <p>{likesTotal}</p>
                </div>
            </section>
        );
}