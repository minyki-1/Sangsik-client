import style from "./index.module.scss"
import Image from "next/image"

export default function MyProfile() {
  return (
    <div className={style.container}>
      <div className={style.infoWrap}>
        <Image width={82} height={82} src={process.env.TEST_USER_IMG || ''} alt="user profile" />
        <div className={style.info}>
          <h1>Kawan</h1>
          <button>로그아웃</button>
        </div>
      </div>
      <div className={style.badgeList}>추후에 뱃지 시스템이 추가될 부분입니다.</div>
    </div>
  )
}