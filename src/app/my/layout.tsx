import style from "./layout.module.scss"
import MyPostOrder from '@/components/MyPostOrder'
import MyProfile from '@/components/MyProfile'
import { getServerSession } from 'next-auth';
import { options } from '../api/auth/[...nextauth]/option';
import LoginBtn from "@/components/LoginBtn";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(options)
  const user = session?.user;
  if (user)
    return (
      <>
        <MyProfile />
        <MyPostOrder />
        {children}
      </>
    )

  return (
    <div className={style.container}>
      <div className={style.loginBox}>
        <h1>로그인</h1>
        <LoginBtn />
        <p>다른 로그인은 추후에 추가될 예정입니다.</p>
      </div>
    </div>
  )
}