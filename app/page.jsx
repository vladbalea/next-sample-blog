import Link from "next/link"
import { MoveRight } from "lucide-react"
import PostGrid from "@/components/post-grid"
import { getLatestPosts } from "../lib/contentful"

export default async function Home() {
    const posts = await getLatestPosts(6)
    return (
        <>
            <h1 className="text-5xl font-bold mb-5">Home page!</h1>
            <p>Welcome to the blog!</p>
            <h2 className="flex justify-between text-4xl font-bold mb-6 mt-10">
                Latest posts
                <div className="flex gap-2 text-blue-500">
                    <Link href="/all-posts" className="italic text-3xl">See all posts
                    </Link>
                    <MoveRight size={36} />
                </div>
            </h2>
            <PostGrid posts={posts} />
        </>
    )
}