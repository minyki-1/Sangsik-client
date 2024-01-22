import Post from '../Post'
import style from './style.module.scss'

export default function PostList({ data }: { data: any[] }) {
  console.log(data)
  return (
    <main className={style.postList}>
      {
        data ? data.map((data: any, key: number) => (
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
        )) : null
      }
    </main>
  )
}