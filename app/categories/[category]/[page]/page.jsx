import PostList from "@/components/post-list"
import Pagination from "@/components/pagination"
import { getCategoriesAndPageNumbersSlugs, getPostsOnPage, getNumberOfPages, getCategoryBySlug } from "@/contentful/client"

export async function generateStaticParams() {
    return await getCategoriesAndPageNumbersSlugs()
}

export async function generateMetadata({ params }) {
    const category = await getCategoryBySlug(params.category)
    const currentPage = parseInt(params.page)
    return {
        title: `${category.name} | Page ${currentPage}`,
    }
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