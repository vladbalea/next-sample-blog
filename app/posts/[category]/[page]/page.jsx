import { notFound } from "next/navigation"
import PostListPage from "@/components/post-list-page"
import { getPagesNumbersSlugs, getCategoryBySlug, getPostsOnPage, getNumberOfPages } from "@/lib/contentful"

export async function generateStaticParams({ params }) {
    return await getPagesNumbersSlugs(params.category)
}

export default async function CategoryPostsPaginated({ params }) {
    const categorySlug = params.category
    const category = await getCategoryBySlug(categorySlug)

    if (category === undefined) {
        notFound()
    }
    const currentPage = parseInt(params.page)
    const posts = await getPostsOnPage(currentPage, categorySlug)
    const totalPages = await getNumberOfPages(categorySlug)
    return (
        <PostListPage
            title={`All posts on ${category.name}`}
            posts={posts}
            path={`posts/${categorySlug}`}
            currentPage={currentPage}
            totalPages={totalPages}
        />
    )
}