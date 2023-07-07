import ReactMarkdown from "react-markdown"
import { getAllPostsSlugs, getPostBySlug } from "@/contentful/client"

export async function generateStaticParams() {
    return await getAllPostsSlugs()
}

export async function generateMetadata({ params }) {
    const post = await getPostBySlug(params.slug)
    return {
        title: post.title
    }
}

export default async function BlogPost({ params }) {
    const post = await getPostBySlug(params.slug)
    return (
        <article className="prose max-w-none">
            <h1>{post.title}</h1>
            <ReactMarkdown children={post.text} />
        </article>
    )
}