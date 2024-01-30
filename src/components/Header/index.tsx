'use client'
import style from "./style.module.scss";
import LogoLightIcon from '@/assets/icons/logo-light.svg'
import LogoDarkIcon from '@/assets/icons/logo-dark.svg'
import ArrowSmallUpIcon from '@/assets/icons/arrow-small-up.svg'
import MenuIcon from '@/assets/icons/menu-burger.svg'
import CrossIcon from '@/assets/icons/cross.svg'
import NavList from "@/components/NavList"
import Link from "next/link"
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  const pathname = usePathname();
  const excludePathname = ['/write', '/modify']
  if (excludePathname.some(substring => pathname.includes(substring))) return;
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
      <MenuIcon className={style.menuIcon} onClick={() => setOpenMenu(true)} />
      {
        openMenu ?
          <ul className={style.menuList}>
            <div>
              <CrossIcon onClick={() => setOpenMenu(false)} />
            </div>
            <Link onClick={() => setOpenMenu(false)} href={'/'}>모두의 상식</Link>
            <Link onClick={() => setOpenMenu(false)} href={'/my'}>나만의 상식</Link>
            <Link onClick={() => setOpenMenu(false)} href={'/event'}>이벤트</Link>
          </ul> : null
      }
    </header>
  )
}