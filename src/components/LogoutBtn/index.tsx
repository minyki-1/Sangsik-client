'use client'
import style from "./style.module.scss"
import { signIn, signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button className={style.logoutBtn} onClick={() => signOut()}>로그아웃</button>
  )
}