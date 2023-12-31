import style from "./Header.module.scss";
import LogoIcon from 'assets/icons/logo.svg'

export default function Header() {
  return (
    <div className={style.container}>
      <LogoIcon height={100} />
    </div>
  )
}