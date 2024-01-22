'use client'
import HeartIcon from "@/assets/icons/heart.svg";
import HeartFillIcon from "@/assets/icons/heart-fill.svg";
import BookmarkIcon from "@/assets/icons/bookmark.svg";
import BookmarkFillIcon from "@/assets/icons/bookmark-fill.svg";
import style from "./style.module.scss"
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface IProps {
  likes: number,
  postId?: string,
  userId?: string,
  isUserLike: boolean,
  isUserBookmark: boolean,
}

interface IPostCache {
  isLike: boolean;
  isBookmark: boolean;
  likeCount: number;
}

export default function LikeAndBookmark({ likes, postId, userId, isUserLike, isUserBookmark }: IProps) {
  const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || ''
  const router = useRouter();
  const [isLike, setIsLike] = useState(isUserLike);
  const [isBookmark, setIsBookmark] = useState(isUserBookmark);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLikeBtn = async () => {
    if (!userId) {
      if (confirm('로그인 후에 좋아요를 할 수 있습니다.\n로그인 페이지로 이동하시겠습니까?'))
        return router.push("/my/bookmark");
      return;
    }
    const changedLike = !isLike;
    setIsLike(changedLike)
    const changedLikeCount = isLike ? likeCount - 1 : likeCount + 1;
    setLikeCount(changedLikeCount);

    sessionStorage.setItem(`postCache_${postId}`,
      JSON.stringify({ isLike: changedLike, isBookmark, likeCount: changedLikeCount }))

    await axios.put(`${serverURL}/api/post/toggle/like/${postId}/${userId}`)
  }

  const handleBMKBtn = () => {
    if (!userId) {
      if (confirm('로그인 후에 북마크를 할 수 있습니다.\n로그인 페이지로 이동하시겠습니까?'))
        return router.push("/my/bookmark");
      return;
    }

    const changedBookmark = !isBookmark;
    setIsBookmark(changedBookmark);
    sessionStorage.setItem(`postCache_${postId}`, JSON.stringify({ isLike, isBookmark: changedBookmark, likeCount }))
    axios.put(`${serverURL}/api/post/toggle/bookmark/${postId}/${userId}`)
      .then(response => {
        console.log('Success:', response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  useEffect(() => {
    const postCache: IPostCache | null = JSON.parse(
      sessionStorage.getItem(`postCache_${postId}`) || JSON.stringify(null)
    );

    if (!postCache) return;

    setIsLike(postCache.isLike);
    setLikeCount(postCache.likeCount);
    setIsBookmark(postCache.isBookmark);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUserLike, isUserBookmark, likes])

  return (
    <div className={style.container}>
      <span onClick={handleLikeBtn}>
        {
          isLike ? <HeartFillIcon /> : <HeartIcon />
        }
        <p>{likeCount}</p>
      </span>
      <span onClick={handleBMKBtn}>
        {
          isBookmark ? <BookmarkFillIcon /> : <BookmarkIcon />
        }
        <p>저장</p>
      </span>
      <span onClick={() => {
        const postUrl = `${window.location.origin}/knowledge/${postId}`;
        navigator.clipboard.writeText(postUrl)
          .then(() => {
            toast.success("링크 복사 완료!")
          })
          .catch(err => {
            console.error('링크 복사 실패:', err);
            toast.error("링크 복사 실패")
          });
      }}>
        <p>공유</p>
      </span>
    </div>
  )
}