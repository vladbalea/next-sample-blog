import Link from "next/link"
import Image from "next/image"
import Date from "./date"

export default function PostCard({ post }) {
    return (
        <div className="h-[28rem] sm:w-96 sm:h-96">
            <Link href={`/post/${post.slug}`}>
                <div className="h-full w-full">
                    {
                        post.featuredImage &&
                        <Image
                            src={post.featuredImage}
                            width={500}
                            height={500}
                            alt={post.title}
                            className="object-cover h-80 sm:h-64 rounded-xl"
                        />
                    }
                    {
                        post.category &&
                        <div className="text-sm mt-2 mb-1">{post.category.name.toUpperCase()}</div>
                    }
                    <div className="text-lg font-medium mb-1">{post.title}</div>
                    <Date dateString={post.createdAt} className="text-sm" />
                </div>
            </Link>
        </div>
    )
}