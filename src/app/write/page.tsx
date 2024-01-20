'use client'
import { useEffect, useState } from "react";
import style from "./page.module.scss"
import dynamic from "next/dynamic";
import axios from "axios";
import { useSession } from "next-auth/react"
import { SessionUser } from "@/types/session";
const TextEditor = dynamic(() => import("@/components/TextEditor"), {
  ssr: false,
  loading: () => <></>,
});

export default function Page() {
  const textState = useState(' ');
  const [title, setTitle] = useState('');
  const { data: session, status } = useSession()
  const user = session?.user as SessionUser;
  const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || ''

  useEffect(() => {
    const setText = textState[1]
    const editorData = localStorage.getItem('editorData')
    setText(editorData || ' ');
  }, [textState])

  const uploadPost = () => {
    if (!user && !confirm('로그인이 되어있지 않습니다. 로그인 페이지로 이동하시겠습니까?')) return;
    if (!confirm('게시하시겠습니까?')) return;
    const [text] = textState;

    const postData = {
      title,
      content: text,
      // previewImage: '이미지 URL',
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
    <div className={style.container}>
      <div className={style.header}>
        <h1>새 상식 작성</h1>
        <button onClick={uploadPost}>게시하기</button>
      </div>
      <input
        type="text"
        className={style.title}
        placeholder="이곳에 제목 작성"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <TextEditor state={textState} />
    </div>
  )
}