import PostList from "@/components/post-grid"
import Pagination from "@/components/pagination"

export default function PostListPage({ title, posts, path, currentPage, totalPages }) {
    return (
        <>
            <h1 className="text-4xl font-bold mb-6">{title}</h1>
            <PostList posts={posts} />
            <Pagination
                path={path}
                currentPage={currentPage}
                totalPages={totalPages}
                className="mt-2 mb-6"
            />
        </>
    )
}