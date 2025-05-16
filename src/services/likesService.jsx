export const getAllLikes = () => {
    return fetch("http://localhost:8088/userLikes?_expand=user&_expand=post").then((res) => res.json())
}

export const postLike = (postObj) => {
    return fetch(`http://localhost:8088/userLikes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(postObj),
    }).then((res) => res.json())
}

export const postRemove = (likeId) => {
    return fetch(`http://localhost:8088/userLikes/${likeId}`, {
        method: "DELETE"
    })
}
