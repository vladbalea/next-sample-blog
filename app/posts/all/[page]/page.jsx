import PostListPage from "@/components/post-list-page"
import { getPostsOnPage, getNumberOfPages, getPagesNumbersSlugs } from "@/lib/contentful"

export async function generateStaticParams() {
    return await getPagesNumbersSlugs()
}

export default async function AllPostsPaginated({ params }) {
    const currentPage = parseInt(params.page)
    const posts = await getPostsOnPage(currentPage)
    const totalPages = await getNumberOfPages()

    if (currentPage > 1 && currentPage > totalPages) {
        notFound()
    }
    return (
        <PostListPage
            title="All posts"
            posts={posts}
            path="posts/all"
            currentPage={currentPage}
            totalPages={totalPages}
        />
    )
}