import style from "./style.module.scss";
import Image from "next/image";
import HeartIcon from "@/assets/icons/heart.svg";
import BookmarkIcon from "@/assets/icons/bookmark.svg";
import Link from "next/link"

interface IPost {
  id: string,
  title: string,
  previewImage?: string,
  authorName: string,
  authorImg: string,
  likeCount: number;
  bookmarkCount: number;
}

export default function Post({ id, title, previewImage, authorImg, authorName, likeCount, bookmarkCount }: IPost) {
  return (
    <div className={style.post}>
      {
        previewImage ?
          <Link href={`/knowledge/${id}`} className={style.postImg}>
            <Image
              src={previewImage || ''}
              alt="preview image"
              fill={true}
              objectFit="cover"
            />
          </Link> : null
      }
      <div className={style.postInfoWrap}>
        <div className={style.postInfo}>
          <div className={style.postProfile}>
            <Image
              width={24}
              height={24}
              src={authorImg}
              alt="user profile"
            />
            <p>{authorName}</p>
          </div>
          <div className={style.postData}>
            <HeartIcon />
            <p>{likeCount}</p>
          </div>
          <div className={style.postData}>
            <BookmarkIcon />
            <p>{bookmarkCount}</p>
          </div>
        </div>
        <Link href={`/knowledge/${id}`} className={style.postTitle}>{title}</Link>
      </div>
    </div>
  )
}