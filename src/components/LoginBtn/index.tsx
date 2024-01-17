'use client'
import style from "./style.module.scss"
import { signIn } from "next-auth/react";
import googleIcon from "@/assets/icons/google-icon.png";
import Image from "next/image"

export default function LoginBtn() {
  return (
    <button className={style.loginBtn} onClick={() => signIn("google")}>
      <Image src={googleIcon} alt="google icon" width={20} height={20} />
      <h1>구글 로그인으로 계속하기</h1>
    </button>
  )
}