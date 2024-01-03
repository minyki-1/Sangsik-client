import style from "./index.module.scss";
import Image from "next/image";
import logoLightIcon from '@/assets/icons/logo-light.svg'
import logoDarkIcon from '@/assets/icons/logo-dark.svg'
import arrowSmallUpIcon from '@/assets/icons/arrow-small-up.svg'
import NavList from "@/components/NavList"

export default function Header() {
  return (
    <header className={style.container}>
      <Image
        src={logoLightIcon}
        alt="light icon"
        className={style.lightLogo}
      />
      <Image
        src={logoDarkIcon}
        alt="dark icon"
        className={style.darkLogo}
      />
      <NavList />
      <div className={style.moveToTestBtn}>
        <button>
          <Image
            src={arrowSmallUpIcon}
            alt="arrowSmallUpIcon"
            width={28}
            height={28}
          />
        </button>
        <h1>상식 테스트</h1>
      </div>
    </header>
  )
}