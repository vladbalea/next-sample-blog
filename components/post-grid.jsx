import PostCard from "./post-card"

export default function PostList({ posts }) {
    return (
        <>
            {
                posts.length > 0
                ?
                <div className="grid lg:gap-4 justify-items-center lg:grid-cols-2 xl:grid-cols-3">
                {
                    posts.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))
                }
                </div>
                :
                <div>No posts!</div>
            }
        </>
    )
}