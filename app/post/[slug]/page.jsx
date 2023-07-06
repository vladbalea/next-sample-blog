import { getAllPostsSlugs, getPostBySlug } from "../../../contentful/client"

export async function generateStaticParams() {
    return await getAllPostsSlugs()
}

export async function generateMetadata({ params }) {
    const post = await getPostBySlug(params.slug)
    return {
        title: post.fields.title
    }
}

export default async function BlogPost({ params }) {
    const post = await getPostBySlug(params.slug)
    return (
        <>
            <h1 className="font-bold text-3xl mb-5">{post.fields.title}</h1>
            <p>{post.fields.text}</p>
        </>
    )
}