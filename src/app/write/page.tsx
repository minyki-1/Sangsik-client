'use client'
import { useEffect, useState } from "react";
import style from "./page.module.scss"
import dynamic from "next/dynamic";

const TextEditor = dynamic(() => import("@/components/TextEditor"), {
  ssr: false,
  loading: () => <></>,
});

export default function Page() {
  const textState = useState(' ');

  useEffect(() => {
    const setText = textState[1]
    const editorData = localStorage.getItem('editorData')
    setText(editorData || ' ');
  }, [textState])

  return (
    <div className={style.container}>
      <div className={style.header}>
        <h1>새 상식 작성</h1>
        <button>업로드</button>
      </div>
      <input type="text" className={style.title} placeholder="이곳에 제목 작성" />
      <TextEditor state={textState} />
    </div>
  )
}