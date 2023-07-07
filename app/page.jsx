import Link from "next/link"
import PostList from "@/components/post-list"
import { getLatestPosts } from "../contentful/client"

export default async function Home() {
    const posts = await getLatestPosts(4)
    return (
        <>
            <h1>Home page!</h1>
            <PostList posts={posts} />
            <div><Link href="/all-posts" className="text-blue-500 font-semibold">See all posts</Link></div>
        </>
    )
}