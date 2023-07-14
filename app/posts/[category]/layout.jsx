import { getAllCategoriesSlugs, getCategoryBySlug } from "@/lib/contentful"

export async function generateStaticParams() {
    return await getAllCategoriesSlugs()
}

export async function generateMetadata({ params }) {
    const category = await getCategoryBySlug(params.category)

    if (category === undefined) {
        return {}
    }
    return {
        title: category.name,
    }
}

export default function CategoryLayout({ children }) {
    return children
}