import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import { MoveRight } from "lucide-react"
import { getAllPostsSlugs, getPostBySlug } from "@/lib/contentful"
import React from "react"

export async function generateStaticParams() {
    return await getAllPostsSlugs()
}

export async function generateMetadata({ params }) {
    const post = await getPostBySlug(params.slug)

    if (post === undefined) {
        return {}
    }
    return {
        title: post.title
    }
}

export default async function BlogPost({ params }) {
    const post = await getPostBySlug(params.slug)

    if (post === undefined) {
        notFound()
    }
    return (
        <>
            <article>
                <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
                {
                    post.featuredImage &&
                    <Image
                        src={post.featuredImage}
                        width={1000}
                        height={1000}
                        alt={post.title}
                        className="object-cover h-96 md:h-[38rem] w-full rounded-xl mb-6"
                    />
                }
                <ReactMarkdown className="prose max-w-none">{post.text}</ReactMarkdown>
            </article>
            {
                post.category &&
                <div className="mt-6">
                    <Link href={`/posts/${post.category.slug}`} className="font-semibold text-blue-500">
                        See all posts in {post.category.name}
                        <MoveRight size={20} className="inline ml-2" />
                    </Link>
                </div>
            }
        </>
    )
}