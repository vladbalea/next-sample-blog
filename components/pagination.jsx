import Link from "next/link"
import { cn } from "@/lib/utils"

export default function Pagination({path, currentPage, totalPages, className}) {
    const baseStyling = "border border-gray-300 bg-white px-3 py-2 text-sm text-gray-500"

    const PreviousPageElement = () => {
        if (currentPage - 1 >= 1) {
            return (
                <Link href={currentPage - 1 === 1 ? `/${path}` : `/${path}/${currentPage - 1}`} className={cn(baseStyling, "text-right rounded-l-md hover:bg-gray-50")}>Previous</Link>
            )
        } else {
            return (
                <div className={cn(baseStyling, "text-right rounded-l-md opacity-40")}>Previous</div>
            )
        }
    }
    const NextPageElement = () => {
        if (currentPage + 1 <= totalPages) {
            return (
                <Link href={`/${path}/${currentPage + 1}`} className={cn(baseStyling, "rounded-r-md hover:bg-gray-50")}>Next</Link>
            )
        } else {
            return (
                <div className={cn(baseStyling, "rounded-r-md opacity-40")}>Next</div>
            )
        }
    }
    return (
        <div className={cn("flex w-max mx-auto", className && className)}>
            <PreviousPageElement/>
            <NextPageElement/>
        </div>
    )
}