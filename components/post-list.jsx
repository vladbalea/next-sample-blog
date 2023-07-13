import PostCard from "./post-card"

export default function PostList({ posts }) {
    return (
        <>
            {
                posts.length > 0
                ?
                <div className="w-full lg:w-[50rem] xl:w-[75rem] mx-auto">
                    <div className="grid gap-4 justify-items-center lg:grid-cols-2 xl:grid-cols-3">
                    {
                        posts.map((post) => (
                            <PostCard key={post.id} post={post} />
                        ))
                    }
                    </div>
                </div>
                :
                <div>No posts</div>
            }
        </>
    )
}