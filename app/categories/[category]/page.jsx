import { getCategoryBySlug } from "@/contentful/client"
import CategoryPostsPaginated from "./[page]/page.jsx"

export async function generateMetadata({ params }) {
    const category = await getCategoryBySlug(params.category)
    return {
        title: category.name,
    }
}

export default function CategoryPosts({ params }) {
    return <CategoryPostsPaginated params={{ category: params.category, page: 1 }} />
}