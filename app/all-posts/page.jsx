import AllPostsPaginated from "./[page]/page.jsx"

export const metadata = {
    title: "All posts"
}

export default function AllPosts() {
    return <AllPostsPaginated params={{ page: 1 }} />
}