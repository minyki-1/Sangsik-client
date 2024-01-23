import Post from '../Post'
import style from './style.module.scss'

export default function PostList({ data }: { data: any[] }) {
  return (
    <main className={style.container}>
      <div className={style.postList}>
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
      </div>
    </main>
  )
}