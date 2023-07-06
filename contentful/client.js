import { createClient } from "contentful"

const client = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
})

export async function getLatestPosts(limit) {
    const response = await client.getEntries({
        content_type: "blogPost",
        order: "-sys.createdAt",
        limit,
    })
    return response.items
}

export async function getAllPostsSlugs() {
    const response = await client.getEntries({
        content_type: "blogPost",
    })
    if (!response.items) {
        return
    }
    const posts = response.items

    return posts.map((post) => {
        return {
            slug: post.fields.slug,
        }
    })
}

export async function getPostBySlug(slug) {
    const response = await client.getEntries({
        content_type: "blogPost",
        limit: 1,
        "fields.slug": slug,
    })
    if (!response.items) {
        console.error(`Could not fetch blog post: ${slug}!`)
        return
    }
    return response.items[0]
}