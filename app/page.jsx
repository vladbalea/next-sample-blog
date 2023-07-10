import Link from "next/link"
import PostList from "@/components/post-list"
import { getLatestPosts, getAllCategoriesSlugs, getCategoryBySlug } from "../lib/contentful"

export default async function Home() {
    const posts = await getLatestPosts(4)
    const categorySlugs = await getAllCategoriesSlugs()
    const categories = []

    for (var i = 0; i < categorySlugs.length; i++) {
        categories.push(await getCategoryBySlug(categorySlugs[i].category))
    }
    return (
        <>
            <h1 className="text-5xl mb-5">Home page!</h1>
            <h2 className="text-3xl mb-2">Categories</h2>
            {
                categories.map((category) => (
                    <div key={category.id}>
                        <Link href={`categories/${category.slug}`}>{category.name}</Link>
                    </div>
                ))
            }
            <h2 className="text-3xl mb-2 mt-4">Latest posts</h2>
            <PostList posts={posts} />
            <div className="mt-2"><Link href="/all-posts" className="text-blue-500 font-semibold">See all posts</Link></div>
        </>
    )
}