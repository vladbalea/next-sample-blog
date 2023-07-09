import CategoryPostsPaginated from "./[page]/page.jsx"

export default function CategoryPosts({ params }) {
    return <CategoryPostsPaginated params={{ category: params.category, page: 1 }} />
}