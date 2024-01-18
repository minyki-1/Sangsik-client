import style from "./page.module.scss";
import Image from "next/image"
import '@toast-ui/editor/dist/toastui-editor.css';
import { notoSansKr } from "@/app/layout";
import zlib from "zlib"
import LikeAndBookmark from "@/components/LikeAndBookmark";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/option";

interface IProps {
  params: {
    id: string
  }
}

export default async function Page(props: IProps) {
  const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || ''
  const session = await getServerSession(options)
  const user = session?.user;
  const resp = await fetch(`${serverURL}/api/post/one/${props.params.id}`);
  const post = await resp.json();
  const { title, content, likes, authorId, likeCount, bookmarks } = post.data;
  const unzipContent = zlib.gunzipSync(Buffer.from(content, 'base64')).toString()
  return (
    <div className={style.container}>
      <div className={style.post}>
        <h1 className={style.title}>{title}</h1>
        <div className={style.infoWrap}>
          <div className={style.info1}>
            <Image
              width={28}
              height={28}
              className={style.profileImg}
              src={authorId.picture}
              alt="user profile"
            />
            <p className={style.userName}>{authorId.name}</p>
            <p className={style.point}>·</p>
            <p className={style.day}>12시간 전</p>
          </div>
          <LikeAndBookmark
            postId={props.params.id}
            userId={(user as any).id ?? undefined}
            likes={likeCount}
            isUserLike={likes.includes((user as any).id)}
            isUserBookmark={bookmarks.includes((user as any).id)}
          />
        </div>
        <main className={'toastui-editor-contents'}>
          <div className={notoSansKr.className} dangerouslySetInnerHTML={{ __html: unzipContent }} />
        </main>
      </div>
    </div>
  )
}