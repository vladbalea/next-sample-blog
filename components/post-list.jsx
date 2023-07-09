import PostCard from "./post-card"

export default function PostList({ posts }) {
    return (
        <>
            {
                posts.length > 0
                ?
                <>
                    {
                        posts.map((post) => (
                            <PostCard key={post.id} post={post} />
                        ))
                    }
                </>
                :
                <div>No posts</div>
            }
        </>
    )
}