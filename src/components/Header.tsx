import style from "./Header.module.scss";
import LogoIcon from 'assets/icons/logo.svg'
import ArrowSmallUpIcon from 'assets/icons/arrow-small-up.svg'

export default function Header() {
  return (
    <div className={style.container}>
      <LogoIcon height={52} />
      <ul className={style.navList}>
        <li className={style.navBtn}>
          <h1>모두의 상식</h1>
          <line />
        </li>
        <li className={style.navBtn} data-selected="false">
          <h1>나만의 상식</h1>
          <line />
        </li>
        <li className={style.navBtn} data-selected="false">
          <h1>이벤트</h1>
          <line />
        </li>
      </ul>
      <div className={style.moveToTestBtn}>
        <button>
          <ArrowSmallUpIcon width={28} height={28} />
        </button>
        <h1>상식 테스트</h1>
      </div>
    </div>
  )
}