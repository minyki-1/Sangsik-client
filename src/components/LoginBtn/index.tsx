'use client'
import style from "./style.module.scss"
import { signIn } from "next-auth/react";
import googleIcon from "@/assets/icons/google-icon.png";
import Image from "next/image"
import { toast } from "react-toastify";

export default function LoginBtn() {
  return (
    <button className={style.loginBtn} onClick={() => {
      const id = toast.loading("로그인 시도중입니다...");
      signIn("google").then(() => {
        toast.update(id, { render: "로그인 성공!", type: "success", isLoading: false });
      }).catch(() => {
        toast.update(id, { render: "로그인 실패", type: "error", isLoading: false });
      })
    }}>
      <Image src={googleIcon} alt="google icon" width={20} height={20} />
      <h1>구글 로그인으로 계속하기</h1>
    </button>
  )
}