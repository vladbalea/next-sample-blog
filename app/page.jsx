import Link from "next/link"
import { getLatestPosts } from "../contentful/client"

export default async function Home() {
    const posts = await getLatestPosts(4)
    return (
        <>
            <h1>Home page!</h1>
            {
                posts
                ?
                posts.map((post) => (
                    <div key={post.sys.id}>
                        <Link href={`/post/${post.fields.slug}`}>{post.fields.title}</Link>
                    </div>
                ))
                :
                <div>No posts</div>
            }
        </>
    )
}