import style from "./page.module.scss";
import Post from "@/components/Post";
import Search from "@/components/Search";

export default async function Home() {
  const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || ''
  const resp = await fetch(`${serverURL}/api/post/latest`, { next: { revalidate: 20 } });
  // const resp = await fetch(`${serverURL}/api/post/latest`);
  const postList = await resp.json();
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