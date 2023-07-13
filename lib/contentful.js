import { createClient } from "contentful"

const POSTS_PER_PAGE = 3

const client = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
})

export async function getPostsOnPage(page, categorySlug = undefined) {
    const category = categorySlug === undefined ? undefined : await getCategoryBySlug(categorySlug)
    const limit = POSTS_PER_PAGE
    const skip = (page - 1) * limit

    var categoriesIds = []

    if (categorySlug !== undefined) {
        if (category === undefined) {
            return []
        }
        categoriesIds = await getAllSubcategoriesIds(category.id)
        categoriesIds.push(category.id)
    }
    const response = await client.getEntries({
        content_type: "blogPost",
        order: "-sys.createdAt",
        limit,
        skip,
        ...(category !== undefined && { "fields.category.sys.id[in]": categoriesIds.join(",") }),
    })
    if (!response.items) {
        return []
    }
    const posts = response.items

    for (var i = 0; i < posts.length; i++) {
        posts[i].category = posts[i].fields.category ? await getCategoryById(posts[i].fields.category.sys.id) : undefined
        posts[i].featuredImage = posts[i].fields.featuredImage ? await getImageUrlFromAssetId(posts[i].fields.featuredImage.sys.id) : undefined
    }
    
    return posts.map((post) => {
        return {
            id: post.sys.id,
            slug: post.fields.slug,
            title: post.fields.title,
            createdAt: post.sys.createdAt,
            featuredImage: post.featuredImage,
            text: post.fields.text,
            category: post.category,
        }
    })
}

async function getImageUrlFromAssetId(assetId) {
    const asset = await client.getAsset(assetId)

    if (!asset.fields) {
        return undefined
    }
    return "https:" + asset.fields.file.url
}

export async function getLatestPosts(limit) {
    const response = await client.getEntries({
        content_type: "blogPost",
        order: "-sys.createdAt",
        limit,
    })
    if (!response.items) {
        return []
    }
    const posts = response.items

    for (var i = 0; i < posts.length; i++) {
        posts[i].category = posts[i].fields.category ? await getCategoryById(posts[i].fields.category.sys.id) : undefined
        posts[i].featuredImage = posts[i].fields.featuredImage ? await getImageUrlFromAssetId(posts[i].fields.featuredImage.sys.id) : undefined
    }

    return posts.map((post) => {
        return {
            id: post.sys.id,
            slug: post.fields.slug,
            title: post.fields.title,
            createdAt: post.sys.createdAt,
            featuredImage: post.featuredImage,
            text: post.fields.text,
            category: post.category,
        }
    })
}

export async function getAllPostsSlugs() {
    const response = await client.getEntries({
        content_type: "blogPost",
    })
    if (!response.items) {
        return []
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
        return undefined
    }
    const post = response.items[0]

    if (!post) {
        return undefined
    }
    const category = post.fields.category ? await getCategoryById(post.fields.category.sys.id) : undefined
    const featuredImage = post.fields.featuredImage ? await getImageUrlFromAssetId(post.fields.featuredImage.sys.id) : undefined

    return {
        id: post.sys.id,
        slug: post.fields.slug,
        title: post.fields.title,
        createdAt: post.sys.createdAt,
        featuredImage: featuredImage,
        text: post.fields.text,
        category: category,
    }
}

export async function getNumberOfPages(categorySlug = undefined) {
    const category = categorySlug === undefined ? undefined : await getCategoryBySlug(categorySlug)

    var categoriesIds = []

    if (categorySlug !== undefined) {
        if (category === undefined) {
            return 0
        }
        categoriesIds = await getAllSubcategoriesIds(category.id)
        categoriesIds.push(category.id)
    }
    const response = await client.getEntries({
        content_type: "blogPost",
        select: "sys.id",
        ...(category !== undefined && { "fields.category.sys.id[in]": categoriesIds.join(",") }),
    })
    if (!response.items) {
        return 0
    }
    return Math.ceil(response.total / POSTS_PER_PAGE)
}

export async function getPagesNumbersSlugs(categorySlug = undefined) {
    const category = categorySlug === undefined ? undefined : await getCategoryBySlug(categorySlug)

    var categoriesIds = []

    if (categorySlug !== undefined) {
        if (category === undefined) {
            return []
        }
        categoriesIds = await getAllSubcategoriesIds(category.id)
        categoriesIds.push(category.id)
    }
    const response = await client.getEntries({
        content_type: "blogPost",
        select: "sys.id",
        ...(category !== undefined && { "fields.category.sys.id[in]": categoriesIds.join(",") }),
    })
    if (!response.items) {
        return []
    }
    const totalPosts = response.total
    const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE)

    const paths = []

    for (let i = 1; i <= totalPages; i++) {
        paths.push({
            page: i.toString()
        })
    }
    return paths
}

export async function getCategoryBySlug(slug) {
    const response = await client.getEntries({
        content_type: "category",
        limit: 1,
        "fields.slug": slug,
    })
    if (!response.items) {
        return undefined
    }
    const category = response.items[0]

    if (!category) {
        return undefined
    }
    return {
        id: category.sys.id,
        slug: category.fields.slug,
        name: category.fields.name,
    }
}

export async function getCategoryById(categoryId) {
    const response = await client.getEntries({
        content_type: "category",
        limit: 1,
        "sys.id": categoryId,
    })
    if (!response.items) {
        return undefined
    }
    const category = response.items[0]

    if (!category) {
        return undefined
    }
    return {
        id: category.sys.id,
        slug: category.fields.slug,
        name: category.fields.name,
    }
}

export async function getAllCategoriesSlugs() {
    const response = await client.getEntries({
        content_type: "category",
    })
    if (!response.items) {
        return []
    }
    const categories = response.items

    return categories.map((category) => {
        return {
            category: category.fields.slug,
        }
    })
}

export async function getAllRootCategories() {
    const response = await client.getEntries({
        content_type: "category",
    })
    if (!response.items) {
        return []
    }
    const categories = response.items

    return categories.map((category) => {
        return {
            id: category.sys.id,
            slug: category.fields.slug,
            name: category.fields.name,
        }
    })
}

async function getNestedCategoriesRecursive(categoryId) {
    const response = await client.getEntries({
        content_type: "category",
        "fields.parentCategory.sys.id": categoryId,
    })
    if (!response.items) {
        return []
    }
    let nestedCategories = []
  
    for (const category of response.items) {
        const subCategories = await getNestedCategoriesRecursive(category.sys.id)
        nestedCategories = nestedCategories.concat(subCategories)
    }
    nestedCategories = nestedCategories.concat(response.items)
  
    return nestedCategories
}

export async function getAllSubcategoriesIds(categoryId) {
    const result = await getNestedCategoriesRecursive(categoryId)

    return result.map((category) => {
        return category.sys.id
    })
}