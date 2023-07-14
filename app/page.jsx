import Link from "next/link"
import { MoveRight } from "lucide-react"
import PostGrid from "@/components/post-grid"
import { getLatestPosts } from "../lib/contentful"

export default async function Home() {
    const posts = await getLatestPosts(6)
    return (
        <>
            <div className="sm:flex justify-between mb-6">
                <h1 className="text-4xl font-bold">Latest posts</h1>
                <div>
                    <Link href="/posts/all" className="italic text-blue-500 text-3xl font-semibold">
                        See all posts
                        <MoveRight size={34} className="inline ml-2" />
                    </Link>
                </div>
            </div>
            <PostGrid posts={posts} />
        </>
    )
}