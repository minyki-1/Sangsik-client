import style from "./page.module.scss";
import Post from "@/components/Post";
import Search from "@/components/Search";

export default async function Home(props: any) {
  const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || ''
  let postList = null;
  if (props.searchParams.order === 'latest') {
    const resp = await fetch(`${serverURL}/api/post/latest`, { next: { revalidate: 20 } });
    postList = await resp.json();
  } else {
    const resp = await fetch(`${serverURL}/api/post/popular`, { next: { revalidate: 20 } });
    postList = await resp.json();
  }
  console.log(postList)
  return (
    <div>
      <Search />
      <main className={style.postList}>
        {
          postList.data.map((data: any, key: number) => (
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