'use client'
import HeartIcon from "@/assets/icons/heart.svg";
import HeartFillIcon from "@/assets/icons/heart-fill.svg";
import BookmarkIcon from "@/assets/icons/bookmark.svg";
import BookmarkFillIcon from "@/assets/icons/bookmark-fill.svg";
import style from "./style.module.scss"
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";
import { useState } from "react";

interface IProps {
  likes: number,
  postId: string,
  userId?: string,
  isUserLike: boolean,
  isUserBookmark: boolean,
}

export default function LikeAndBookmark({ likes, postId, userId, isUserLike, isUserBookmark }: IProps) {
  const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || ''
  const router = useRouter();
  const [isLike, setIsLike] = useState(isUserLike);
  const [isBookmark, setIsBookmark] = useState(isUserBookmark);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLikeBtn = () => {
    setIsLike(value => !value)
    setLikeCount(value => isLike ? value - 1 : value + 1);
    if (!userId) {
      if (confirm('로그인 후에 좋아요를 할 수 있습니다.\n로그인 페이지로 이동하시겠습니까?'))
        return router.push("/my/bookmark");
      return;
    }

    axios.put(`${serverURL}/api/post/toggle/like/${postId}/${userId}`)
      .then(response => {
        console.log('Success:', response.data);
      })
      .catch(error => {
        console.error('Error:', error);
        setLikeCount(value => isLike ? value + 1 : value - 1);
      });
  }
  const handleBMKBtn = () => {
    setIsBookmark(value => !value)

    if (!userId) {
      if (confirm('로그인 후에 북마크를 할 수 있습니다.\n로그인 페이지로 이동하시겠습니까?'))
        return router.push("/my/bookmark");
      return;
    }

    axios.put(`${serverURL}/api/post/toggle/bookmark/${postId}/${userId}`)
      .then(response => {
        console.log('Success:', response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
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
    </div>
  )
}