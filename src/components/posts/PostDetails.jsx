import { useParams } from "react-router-dom"
import { getAllPosts } from "../../services/postService";
import { useEffect, useState } from "react";
import { getAllLikes, postLike } from "../../services/likesService";
import { getAllUsers } from "../../services/userService";

export const PostDetails = ({ currentUser }) => {
    const { postId } = useParams();
    const [postInfo, setPostInfo] = useState(null);
    const [allLikes, setAllLikes] = useState([]);
    const [likesTotal, setLikesTotal] = useState([]);
    const [authorName, setAuthorName] = useState([])

    // Get post info
    useEffect(() => {
        getAllPosts().then(postsArray => {
            const post = postsArray.find(p => p.id === parseInt(postId))
            setPostInfo(post);
        })
    }, [postId])

    // Get author
    useEffect(() => {
        getAllUsers().then((usersArray) => {
            const author = usersArray.find(user => user.id === postInfo?.userId)
            setAuthorName(author?.name);
        })
    }, [postInfo])


    // Get number of likes
    useEffect(() => {
        getAllLikes().then((likesArray) => {
            setAllLikes(likesArray);
        });
    }, []);
    
    useEffect(() => {
        const likes = allLikes.filter((like) => like.postId === parseInt(postId))
        console.log("likes: ", likes)
        const total = likes.length;
            setLikesTotal(total);
    }, [allLikes, postId])


    useEffect(() => {
        console.log("postInfo: ", postInfo)
        console.log("postId: ", postId)
    })

    // Handle likes
    const handleLike = () => {
        const alreadyLiked = allLikes.some(
          (like) => like.userId === currentUser.id && like.postId === parseInt(postId)
        );
      
        if (alreadyLiked) {
          alert("You already liked this post.");
          return;
        }
      
        const likeObj = {
          userId: currentUser.id,
          postId: parseInt(postId),
        };
      
        postLike(likeObj).then(() => {
          // Optionally refetch likes or just update state manually
          setAllLikes([...allLikes, likeObj]);
        });
      };

      // Handle edit
    const handleEdit = () => {

    }

  

    return (
        <section className="bg-white p-6 rounded-xl shadow-md border border-gray-200 max-w-3xl mx-auto mt-10 space-y-4">
            <h2 className="text-3xl font-bold text-gray-800">{postInfo?.title}</h2>
      
            <div className="flex justify-between items-center text-gray-600">
                <div>
                    <span className="font-semibold">By: </span>
                    {authorName}
                </div>
                {currentUser.id === postInfo?.userId ? (
                <button className="btn btn-secondary" onClick={handleEdit}>Edit</button>) : ("")}
                {currentUser.id != postInfo?.userId ? (
                <button className="btn btn-secondary" onClick={handleLike}>Like</button>) : ("")}
            </div>
      
            <div className="text-gray-600">
                <span className="font-semibold">Topic: </span>
                {postInfo?.topic.name}
            </div>
        
            <div className="text-gray-600">
                <span className="font-semibold">Date: </span>
                {postInfo?.date}
            </div>
        
            <div className="text-gray-600">
                <span className="font-semibold">Likes: </span>
                {likesTotal}
            </div>
        
            <p className="text-gray-700 text-lg leading-relaxed">{postInfo?.body}</p>
        </section>
      )
}