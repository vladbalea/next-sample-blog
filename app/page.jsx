import Link from "next/link"
import PostList from "@/components/post-grid"
import { getLatestPosts } from "../lib/contentful"

export default async function Home() {
    const posts = await getLatestPosts(6)
    return (
        <>
            <h1 className="text-5xl font-bold mb-5">Home page!</h1>
            <p>Welcome to the blog!</p>
            <h2 className="text-4xl font-bold mb-6 mt-10">
                Latest posts
                <span> <Link href="/all-posts" className="text-blue-500 text-xl">(See all posts)</Link></span>
            </h2>
            <PostList posts={posts} />
        </>
    )
}