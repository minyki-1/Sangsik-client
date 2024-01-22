import style from "./page.module.scss";
import Image from "next/image"
import '@toast-ui/editor/dist/toastui-editor.css';
import { notoSansKr } from "@/app/layout";
import zlib from "zlib"
import LikeAndBookmark from "@/components/LikeAndBookmark";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/option";
import { SessionUser } from "@/types/session";
import { Metadata } from "next/types";

interface IProps {
  params: {
    id: string;
    slug: string;
  }
}

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || ''

export const getData = async (id: string) => {
  const resp = await fetch(`${serverURL}/api/post/${id}`);
  const post = await resp.json();
  return post.data
}

export const generateMetadata = async (props: IProps): Promise<Metadata> => {
  const data = await getData(props.params.id)
  return {
    title: data.title,
    description: data.title,
  }
}

export default async function Page(props: IProps) {
  const session = await getServerSession(options)
  const user = session?.user as SessionUser;
  const { title, content, likes, authorId, likeCount, bookmarks } = await getData(props.params.id);
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
            userId={user ? (user.id ?? undefined) : undefined}
            likes={likeCount}
            isUserLike={user ? likes.includes(user.id) : false}
            isUserBookmark={user ? bookmarks.includes(user.id) : false}
          />
        </div>
        <main className={'toastui-editor-contents'}>
          <div className={notoSansKr.className} dangerouslySetInnerHTML={{ __html: unzipContent }} />
        </main>
      </div>
    </div>
  )
}