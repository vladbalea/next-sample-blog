import { parseISO, format } from "date-fns"
import { cn } from "@/lib/utils"

export default function Date({ dateString, className }) {
    const date = parseISO(dateString)
    return (
        <time dateTime={dateString} className={cn(className && className)}>
            {format(date, "LLLL d, yyyy")}
        </time>
    )
}