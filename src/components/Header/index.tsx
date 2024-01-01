import style from "./index.module.scss";
import LogoLightIcon from 'assets/icons/logo-light.svg'
import LogoDarkIcon from 'assets/icons/logo-dark.svg'
import ArrowSmallUpIcon from 'assets/icons/arrow-small-up.svg'
import NavList from "@/components/NavList"

export default function Header() {
  return (
    <header className={style.container}>
      <LogoLightIcon
        className={style.lightLogo}
        height={52}
        fill={'var(--color-1)'}
      />
      <LogoDarkIcon
        className={style.darkLogo}
        height={52}
        fill={'var(--color-1)'}
      />
      <NavList />
      <div className={style.moveToTestBtn}>
        <button>
          <ArrowSmallUpIcon width={28} height={28} fill={'black'} />
        </button>
        <h1>상식 테스트</h1>
      </div>
    </header>
  )
}