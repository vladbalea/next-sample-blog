import Link from "next/link"

export default function Pagination({path, currentPage, totalPages}) {
    const PreviousPageElement = () => {
        if (currentPage - 1 >= 1) {
            return (
                <Link href={currentPage - 1 === 1 ? `/${path}` : `/${path}/${currentPage - 1}`} className="text-blue-500 font-semibold">Previous page ({currentPage - 1})</Link>
            )
        }
    }
    const NextPageElement = () => {
        if (currentPage + 1 <= totalPages) {
            return (
                <Link href={`/${path}/${currentPage + 1}`} className="text-blue-500 font-semibold">Next page ({currentPage + 1})</Link>
            )
        }
    }
    return (
        <>
            <div><PreviousPageElement/></div>
            <div><NextPageElement/></div>
        </>
    )
}