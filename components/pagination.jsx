import Link from "next/link"

import {
    MoveRight,
    MoveLeft,
} from "lucide-react"

import { cn } from "@/lib/utils"

export default function Pagination({path, currentPage, totalPages, className}) {
    if (totalPages <= 1) {
        return undefined
    }
    const isOnFirstPage = currentPage - 1 < 1
    const isOnLastPage = currentPage + 1 > totalPages

    const baseStyling = "border-t border-b border-gray-300 bg-white px-3 py-2 text-sm text-gray-500"
    const baseStylingPreviousButton = cn("text-right rounded-l-md border-l", isOnLastPage && "border-r")
    const baseStylingNextButton = cn("rounded-r-md border-r", !isOnLastPage && "border-l")

    const PreviousPageElement = () => {
        if (!isOnFirstPage) {
            return (
                <Link href={currentPage - 1 === 1 ? `/${path}` : `/${path}/${currentPage - 1}`} className={cn(baseStyling, baseStylingPreviousButton, "hover:bg-gray-50")}>
                    <MoveLeft size={14} className="inline mr-2" />
                    Previous
                </Link>
            )
        } else {
            return (
                <div className={cn(baseStyling, baseStylingPreviousButton, "opacity-30")}>
                    <MoveLeft size={14} className="inline mr-2" />
                    Previous
                </div>
            )
        }
    }
    const NextPageElement = () => {
        if (!isOnLastPage) {
            return (
                <Link href={`/${path}/${currentPage + 1}`} className={cn(baseStyling, baseStylingNextButton, "hover:bg-gray-50")}>
                    Next
                    <MoveRight size={14} className="inline ml-2" />
                </Link>
            )
        } else {
            return (
                <div className={cn(baseStyling, baseStylingNextButton, "opacity-30")}>
                    Next
                    <MoveRight size={14} className="inline ml-2" />
                </div>
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