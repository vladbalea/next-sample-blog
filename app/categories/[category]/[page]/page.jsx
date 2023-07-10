import PostList from "@/components/post-list"
import Pagination from "@/components/pagination"
import { getPagesNumbersSlugs, getPostsOnPage, getNumberOfPages } from "@/contentful/client"

export async function generateStaticParams({ params }) {
    return await getPagesNumbersSlugs(params.category)
}

export default async function CategoryPostsPaginated({ params }) {
    const categorySlug = params.category
    const currentPage = parseInt(params.page)
    const posts = await getPostsOnPage(currentPage, categorySlug)
    const totalPages = await getNumberOfPages(categorySlug)
    return (
        <>
            <h1>All posts on {categorySlug}</h1>
            <PostList posts={posts} />
            <Pagination
                path={`categories/${categorySlug}`}
                currentPage={currentPage}
                totalPages={totalPages}
            />
        </>
    )
}