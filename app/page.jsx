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
            <h2 className="sm:flex justify-between text-4xl font-bold mb-6 mt-10">
                Latest posts
                <div>
                    <Link href="/all-posts" className="italic text-blue-500 text-3xl">
                        See all posts
                        <MoveRight size={34} className="inline ml-2" />
                    </Link>
                </div>
            </h2>
            <PostGrid posts={posts} />
        </>
    )
}