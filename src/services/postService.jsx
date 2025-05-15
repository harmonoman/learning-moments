export const getAllPosts = () => {
    return fetch("http://localhost:8088/posts?_expand=topic").then((res) => res.json());
}

export const savePost = (post) => {
    return fetch(`http://localhost:8088/posts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post),
    })
}

export const deletePost = (postId) => {
    return fetch(`http://localhost:8088/posts/${postId}`, {
        method: "DELETE",
    })     
}