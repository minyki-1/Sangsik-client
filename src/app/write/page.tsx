'use client'
import { useEffect, useState } from "react";
import style from "./page.module.scss"
import axios from "axios";
import { useSession } from "next-auth/react"
import { SessionUser } from "@/types/session";
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic";
import ArrowIcon from "@/assets/icons/arrow-small-up.svg";
import UploadIcon from "@/assets/icons/upload.svg";
import { toast } from "react-toastify";
import UploadPopup from "@/components/uploadPopup";
import '@/style/tuiBasic.scss'
const TextEditor = dynamic(() => import("@/components/TextEditor"), {
  ssr: false,
  loading: () => <></>,
});

export default function Page() {
  const [contents, setContents] = useState(' ');
  const [title, setTitle] = useState(typeof window !== 'undefined' ? (localStorage.getItem('titleData') || '') : '');
  const { data: session } = useSession()
  const user = session?.user as SessionUser;
  const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || ''
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const editorData = localStorage.getItem('editorData')
    setContents(editorData || ' ')
  }, [])

  const handleClickPublish = () => {
    if (!user) {
      if (confirm('로그인이 되어있지 않습니다.\n로그인 페이지로 이동하시겠습니까?\n글은 자동 저장됩니다.'))
        return router.push('/my');
      return;
    }
    if (title === '') return toast.info('제목을 작성해주세요.');

    setShowPopup(true);
  }

  const getFirstImage = () => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = contents;

    const firstImage = tempDiv.querySelector('img');

    return firstImage?.src
  }

  const uploadPost = () => {
    if (!user) return;

    const imageUrl = getFirstImage();

    const postData = {
      title,
      content: contents,
      previewImage: imageUrl,
      authorId: user.id
    };

    axios.post(`${serverURL}/api/post`, postData)
      .then(response => {
        console.log('성공:', response.data); // 성공 처리
      })
      .catch(error => {
        console.error('에러:', error); // 에러 처리
      });
  }

  return (
    <div className={style.container} onLoad={() => console.log('1234567')}>
      <div className={style.header}>
        <div className={style.exitWriteBtn} onClick={() => router.push('/my')}>
          <ArrowIcon />
          <h1>나가기</h1>
        </div>
        <button onClick={handleClickPublish}>
          {/* <UploadIcon /> */}
          게시하기
        </button>
      </div>
      <div className={style.contents}>
        <input
          type="text"
          className={style.title}
          placeholder="이곳에 제목 작성"
          onChange={(e) => {
            localStorage.setItem('titleData', e.target.value)
            setTitle(e.target.value)
          }}
          value={title}
        />
        <TextEditor
          state={contents}
          setState={setContents}
        />
      </div>

      {
        showPopup
          ? <UploadPopup
            imageUrl={getFirstImage()}
            title={"테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트"}
            description="xltmxmrmfl 디스크립스티연"
            exit={() => setShowPopup(false)}
          />
          : null
      }
    </div>
  )
}