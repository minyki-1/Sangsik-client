import style from "./style.module.scss";
import LogoLightIcon from '@/assets/icons/logo-light.svg'
import LogoDarkIcon from '@/assets/icons/logo-dark.svg'
import ArrowSmallUpIcon from '@/assets/icons/arrow-small-up.svg'
import NavList from "@/components/NavList"
import Link from "next/link"

export default function Header() {
  return (
    <header className={style.container}>
      <Link href="/">
        <LogoLightIcon className={style.lightLogo} />
        <LogoDarkIcon className={style.darkLogo} />
      </Link>
      <NavList />
      <div className={style.moveToTestBtn}>
        <button>
          <ArrowSmallUpIcon width={24} height={24} />
        </button>
        <h1>상식 테스트</h1>
      </div>
    </header>
  )
}