import PostList from "@/components/post-list"
import Pagination from "@/components/pagination"
import { getAllCategoriesSlugs, getPagesNumbersSlugs, getPostsOnPage, getNumberOfPages } from "@/contentful/client"

export async function generateStaticParams() {
    const paths = []
    const categories = await getAllCategoriesSlugs()

    for (var i = 0; i < categories.length; i++) {
        const pages = await getPagesNumbersSlugs(categories[i].category)

        for (var j = 0; j < pages.length; j++) {
            paths.push({
                category: categories[i].category,
                page: pages[j].page
            })
        }
    }
    return paths
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
                path={categorySlug}
                currentPage={currentPage}
                totalPages={totalPages}
            />
        </>
    )
}