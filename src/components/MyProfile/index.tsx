import { getServerSession } from "next-auth/next"
import style from "./style.module.scss"
import Image from "next/image"
import { options } from "@/app/api/auth/[...nextauth]/option";
import LogOutButton from "../LogoutBtn";

export default async function MyProfile() {
  const session = await getServerSession(options)
  const user = session?.user;

  if (!user)
    return (
      <></>
    )

  return (
    <div className={style.container}>
      <div className={style.infoWrap}>
        <Image width={82} height={82} src={user.image || ''} alt="user profile" />
        <div className={style.info}>
          <h1>{user.name}</h1>
          <LogOutButton />
        </div>
      </div>
      <div className={style.badgeList}>추후에 뱃지 시스템이 추가될 부분입니다.</div>
    </div>
  )
}