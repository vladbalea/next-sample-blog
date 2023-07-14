import PostCard from "./post-card"

export default function PostGrid({ posts }) {
    return (
        <>
            {
                posts.length > 0
                ?
                <div className="grid justify-items-center lg:gap-4 lg:grid-cols-2 xl:grid-cols-3">
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