import { notFound } from "next/navigation"
import Link from "next/link"
import CategoryPostsPaginated from "./[page]/page"
import { getCategoryBySlug, getDirectChildrenForCategory, getCategoryById } from "@/lib/contentful"
import { MoveRight } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export default async function CategoryPosts({ params }) {
    const categorySlug = params.category
    const category = await getCategoryBySlug(categorySlug)

    if (category === undefined) {
        notFound()
    }
    const subcategories = await getDirectChildrenForCategory(category.id)
    const parentCategory = category.parentCategoryId === undefined ? undefined : await getCategoryById(category.parentCategoryId)
    return (
        <>
            <div className="sm:flex sm:mb-3 gap-5">
            {
                subcategories.length > 0 &&
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="text-base font-normal mb-2 sm:mb-0">
                            See subcategories of {category.name}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {
                            subcategories.map((subcategory) => (
                                <DropdownMenuItem key={subcategory.id}>
                                    <Link href={`/posts/${subcategory.slug}`}>
                                        {subcategory.name}
                                    </Link>
                                </DropdownMenuItem>
                            ))
                        }
                    </DropdownMenuContent>
                </DropdownMenu>
            }
            {
                parentCategory !== undefined &&
                <div className="mb-1 sm:mb-0 sm:my-auto">
                    <Link href={`/posts/${parentCategory.slug}`} className="italic text-blue-500 font-semibold">
                        See all posts in {parentCategory.name}
                        <MoveRight className="inline ml-2" />
                    </Link>
                </div>
            }
            </div>
            <CategoryPostsPaginated params={{ category: params.category, page: 1 }} />
        </>
    )
}