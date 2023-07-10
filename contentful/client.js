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
        posts[i].category = await getCategoryById(posts[i].fields.category.sys.id)
    }
    
    return posts.map((post) => {
        return {
            id: post.sys.id,
            slug: post.fields.slug,
            title: post.fields.title,
            category: post.category,
        }
    })
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
        posts[i].category = await getCategoryById(posts[i].fields.category.sys.id)
    }

    return posts.map((post) => {
        return {
            id: post.sys.id,
            slug: post.fields.slug,
            title: post.fields.title,
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
    const category = await getCategoryById(post.fields.category.sys.id)

    return {
        id: post.sys.id,
        slug: post.fields.slug,
        title: post.fields.title,
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

/* Catch-all segments, not necessary at the moment

async function getCategoriesIdsAndTheirParents() {
    const response = await client.getEntries({
        content_type: "category",
    })
    if (!response.items) {
        return []
    }
    const categories = response.items

    return categories.map((category) => {
        return {
            categoryId: category.sys.id,
            categorySlug: category.fields.slug,
            parentId: category.fields.parentCategory === undefined ? undefined : category.fields.parentCategory.sys.id
        }
    })
}

function buildHierarchyInCategories(categories, parentId) {
    const result = []

    for (const category of categories) {
        if (category.parentId === parentId) {
            const children = buildHierarchyInCategories(categories, category.categoryId)

            if (children.length > 0) {
                category.children = children
            }
            result.push(category)
        }
    }
    return result
}

async function getCategoriesHierarchy() {
    const categories = await getCategoriesIdsAndTheirParents()

    const hierarchy = []
    hierarchy.push(...buildHierarchyInCategories(categories, undefined))

    return hierarchy
}


function createSlugsFromCategoriesHierarchy(categories, parentSlugs = []) {
    return categories.map(category => {
        const slug = [...parentSlugs, category.categorySlug]
        const children = category.children || []

        if (children.length === 0) {
            return {
                categories: slug
            }
        } else {
            const childSlugs = createSlugsFromCategoriesHierarchy(children, slug)

            // Remove the first value of the parent slug from the child slugs
            const filteredChildSlugs = childSlugs.map(child => child.categories.slice(1))

            return {
                categories: slug.concat(...filteredChildSlugs)
            }
        }
    })
}

export async function getCategoriesAndSubcategoriesSlugs() {
    return createSlugsFromCategoriesHierarchy(await getCategoriesHierarchy())
}

const transformedTest = await getCategoriesAndSubcategoriesSlugs()
console.log(transformedTest)
*/