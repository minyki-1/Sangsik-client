import style from "./page.module.scss";
import Image from "next/image"
import '@/style/tuiBasic.scss'
import { notoSansKr } from "@/app/layout";
import zlib from "zlib"
import LikeAndBookmark from "@/components/LikeAndBookmark";
import { getServerSession } from "next-auth/next";
import { options } from "@/utils/authOptions";
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
    title: data?.title,
    description: data?.description,
  }
}

function decompressContents(contents: string) {
  try {
    return zlib.gunzipSync(Buffer.from(contents, "base64")).toString();
  } catch (error) {
    return contents;
  }
}


export default async function Page(props: IProps) {
  const session = await getServerSession(options)
  const user = session?.user as SessionUser;
  const result = await getData(props.params.id);
  if (!result) return (
    <div>
      <p>존재하지 않는 글입니다.</p>
    </div>
  );
  const { title, contents, likes, authorId, likeCount, bookmarks } = result;
  const unzipContent = decompressContents(contents)

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
            title={title}
            contents={unzipContent}
            postId={props.params.id}
            userId={user ? (user.id ?? undefined) : undefined}
            likes={likeCount}
            isUserLike={user ? likes.includes(user.id) : false}
            isUserBookmark={user ? bookmarks.includes(user.id) : false}
            isMyPost={authorId._id === user?.id}
          />
        </div>
        <main className={'toastui-editor-contents'}>
          <div className={notoSansKr.className} dangerouslySetInnerHTML={{ __html: unzipContent }} />
        </main>
      </div>
    </div>
  )
}