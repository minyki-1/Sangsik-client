'use client'
import HeartIcon from "@/assets/icons/heart.svg";
import HeartFillIcon from "@/assets/icons/heart-fill.svg";
import BookmarkIcon from "@/assets/icons/bookmark.svg";
import BookmarkFillIcon from "@/assets/icons/bookmark-fill.svg";
import ShareIcon from "@/assets/icons/share.svg";
import EditIcon from "@/assets/icons/edit.svg";
import ReportIcon from "@/assets/icons/flag-alt.svg";
import style from "./style.module.scss"
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import MenuIcon from "@/assets/icons/menu-dots.svg";

interface IProps {
  likes: number,
  postId?: string,
  userId?: string,
  isUserLike: boolean,
  isUserBookmark: boolean,
  isMyPost: boolean
}

interface IPostCache {
  isLike: boolean;
  isBookmark: boolean;
  likeCount: number;
}

export default function LikeAndBookmark({ likes, postId, userId, isUserLike, isUserBookmark, isMyPost }: IProps) {
  const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || ''
  const router = useRouter();
  const [isLike, setIsLike] = useState(isUserLike);
  const [isBookmark, setIsBookmark] = useState(isUserBookmark);
  const [likeCount, setLikeCount] = useState(likes);
  const [openMenu, setOpenMenu] = useState(false);

  const handleLikeBtn = async () => {
    if (!userId) {
      if (confirm('로그인 후에 좋아요를 할 수 있습니다.\n로그인 페이지로 이동하시겠습니까?'))
        return router.push("/my");
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
        return router.push("/my");
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

  const handleReport = async () => {
    if (!userId) {
      if (confirm('로그인 후에 신고를 할 수 있습니다.\n로그인 페이지로 이동하시겠습니까?'))
        return router.push("/my");
      return;
    }
    if (!confirm('이 글을 정말로 신고하시겠습니까?')) return;
    if (!postId) return;
    const url = `${serverURL}/api/post/report?postId=${encodeURIComponent(postId)}&userId=${encodeURIComponent(userId)}`;
    const response = await fetch(url, { method: 'POST' });
    const data = await response.json();
    if (data.status === 'success')
      toast.success("신고 완료");
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
        <ShareIcon />
        <p>공유</p>
      </span>
      {
        isMyPost ?
          <span>
            <EditIcon />
            <p>수정</p>
          </span> : null
      }
      <span
        tabIndex={0}
        onClick={() => setOpenMenu(value => !value)}
        onBlur={() => setOpenMenu(false)}
      >
        <MenuIcon />
        {
          openMenu ?
            <div className={style.menu} onClick={handleReport}>
              <ReportIcon />
              <p>신고</p>
            </div> : null
        }
      </span>
    </div>
  )
}