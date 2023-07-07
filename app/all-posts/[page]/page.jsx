import PostList from "@/components/post-list"
import Pagination from "@/components/pagination"
import { getPostsOnPage, getNumberOfPages, getPagesNumbersSlugs } from "@/contentful/client"

export async function generateStaticParams() {
    return await getPagesNumbersSlugs()
}

export default async function AllPostsPaginated({ params }) {
    const currentPage = parseInt(params.page)
    const posts = await getPostsOnPage(currentPage)
    const totalPages = await getNumberOfPages()
    return (
        <>
            <h1>All posts!</h1>
            <PostList posts={posts} />
            <Pagination
                path="all-posts"
                currentPage={currentPage}
                totalPages={totalPages}
            />
        </>
    )
}