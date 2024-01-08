import style from "./index.module.scss";
import LogoLightIcon from '@/assets/icons/logo-light.svg'
import LogoDarkIcon from '@/assets/icons/logo-dark.svg'
import ArrowSmallUpIcon from '@/assets/icons/arrow-small-up.svg'
import NavList from "@/components/NavList"

export default function Header() {
  return (
    <header className={style.container}>
      <LogoLightIcon className={style.lightLogo} />
      <LogoDarkIcon className={style.darkLogo} />
      <NavList />
      <div className={style.moveToTestBtn}>
        <button>
          <ArrowSmallUpIcon width={28} height={28} />
        </button>
        <h1>상식 테스트</h1>
      </div>
    </header>
  )
}