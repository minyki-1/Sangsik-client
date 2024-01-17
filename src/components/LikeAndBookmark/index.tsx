'use client'
import HeartIcon from "@/assets/icons/heart.svg";
import BookmarkIcon from "@/assets/icons/bookmark.svg";
import style from "./style.module.scss"
import { useRouter } from "next/navigation";
import axios from "axios";

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

  const handleLikeBtn = () => {
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
      });
  }
  const handleBMKBtn = () => {
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
        <HeartIcon />
        <p>{likes}</p>
      </span>
      <span onClick={handleBMKBtn}>
        <BookmarkIcon />
        <p>저장</p>
      </span>
    </div>
  )
}