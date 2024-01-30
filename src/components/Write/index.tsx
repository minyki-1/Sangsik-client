'use client'
import { useEffect, useState } from "react";
import style from "./style.module.scss"
import { useSession } from "next-auth/react"
import { SessionUser } from "@/types/session";
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic";
import ArrowIcon from "@/assets/icons/arrow-small-up.svg";
import { toast } from "react-toastify";
import UploadPopup from "@/components/UploadPopup";
import '@/style/tuiBasic.scss'
const TextEditor = dynamic(() => import("@/components/TextEditor"), {
  ssr: false,
  loading: () => <></>,
});

export default function Write({ modifyId }: { modifyId?: string }) {
  const [contents, setContents] = useState(' ');
  const [title, setTitle] = useState(typeof window !== 'undefined' ? (localStorage.getItem('titleData') || '') : '');
  const { data: session } = useSession()
  const user = session?.user as SessionUser;
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const editorData = localStorage.getItem('editorData')
    setContents(editorData || ' ')
  }, [])

  const handleClickPublish = () => {
    if (!user) {
      if (confirm('로그인이 되어있지 않습니다.\n로그인 페이지로 이동하시겠습니까?'))
        return router.push('/my');
      return;
    }
    if (title === '')
      return toast.info('제목이 비었습니다.');
    else if (contents === '' || contents === '<p><br></p>')
      return toast.info('내용이 비었습니다.');

    setShowPopup(true);
  }

  return (
    <div className={style.container}>
      <div className={style.header}>
        <div className={style.exitWriteBtn} onClick={() => router.push('/my')}>
          <ArrowIcon />
          <h1>나가기</h1>
        </div>
        <button onClick={handleClickPublish}>
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
            title={title}
            contents={contents}
            userId={user?.id}
            exit={() => setShowPopup(false)}
            modifyId={modifyId}
          />
          : null
      }
    </div>
  )
}