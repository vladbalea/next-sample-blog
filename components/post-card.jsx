import Link from "next/link"

export default function PostCard({ post }) {
    return (
        <div>
            <Link href={`/post/${post.slug}`}>{post.title} {post.category && `(${post.category.name})`}</Link>
        </div>
    )
}