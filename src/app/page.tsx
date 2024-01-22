import PostList from "@/components/PostList";
import Search from "@/components/Search";

interface IProps {
  searchParams: {
    order?: "latest",
    q?: string,
  }
}

export default async function Home(props: IProps) {
  const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || ''
  const { order, q } = props.searchParams;
  const resp = await fetch(`${serverURL}/api/post?${getOrder()}${getQuery()}`, { next: { revalidate: 60 } });
  const postList = await resp.json();

  function getOrder() {
    if (order === 'latest') return 'order=latest'
    return 'order=popular'
  }
  function getQuery() {
    if (q) return `&q=${encodeURIComponent(q)}`
    return ''
  }
  return (
    <div>
      <Search />
      <PostList data={postList.data} />
    </div>
  )
}