import style from "./page.module.scss";
import Post from "@/components/Post";
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
      <main className={style.postList}>
        {
          postList.data?.map((data: any, key: number) => (
            <Post
              key={key}
              id={data._id}
              title={data.title}
              previewImage={data.previewImage}
              authorName={data.authorId.name}
              authorImg={data.authorId.picture}
              likeCount={data.likeCount}
              bookmarkCount={data.bookmarkCount}
            />
          ))
        }
      </main>
    </div>
  )
}