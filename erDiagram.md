``` mermaid
erDiagram

User ||--o{ Post : creates
Topic ||--o{ Post : categorizes
User ||--o{ UserLike : likes
Post ||--o{ UserLike : isLiked

User {
    int id pk
    varchar name
    varchar email
    varchar cohort
}

Post {
    int id pk
    int userId fk
    int topicId fk
    varchar title
    varchar body
    date date
}

Topic {
    int id pk
    varchar name
}

UserLike {
    int id pk
    int userId fk
    int postId fk
}
