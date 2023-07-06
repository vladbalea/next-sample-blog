import Link from "next/link"
import { getLatestPosts } from "../contentful/client"

export default async function Home() {
    const posts = await getLatestPosts(4)
    return (
        <>
            <h1 className="mb-5">Home page!</h1>
            {
                posts
                ?
                posts.map((post) => (
                    <div key={post.id}>
                        <Link href={`/post/${post.slug}`}>{post.title}</Link>
                    </div>
                ))
                :
                <div>No posts</div>
            }
            <div><Link href="/all-posts" className="text-blue-500 font-semibold">See all posts</Link></div>
        </>
    )
}