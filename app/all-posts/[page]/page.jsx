import Link from "next/link"
import Pagination from "../../../components/pagination"
import { getPostsOnPage, getNumberOfPages, getPagesNumbersSlugs } from "../../../contentful/client"

export async function generateStaticParams() {
    return await getPagesNumbersSlugs()
}

export default async function AllPostsPaginated({ params }) {
    const currentPage = parseInt(params.page)
    const posts = await getPostsOnPage(currentPage)
    const totalPages = await getNumberOfPages()
    return (
        <>
            <h1 className="mb-5">All posts!</h1>
            {
                posts
                ?
                <>
                    {
                        posts.map((post) => (
                            <div key={post.id}>
                                <Link href={`/post/${post.slug}`}>{post.title}</Link>
                            </div>
                        ))
                    }
                    <Pagination
                        path="all-posts"
                        currentPage={currentPage}
                        totalPages={totalPages}
                    />
                </>
                :
                <div>No posts</div>
            }
        </>
    )
}