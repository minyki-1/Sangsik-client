'use client';
import style from "./index.module.scss";
import Link from "next/link";
import { usePathname } from 'next/navigation';

export default function NavList() {
  const pathname = usePathname();
  return (
    <ul className={style.navList}>
      <Link href={'/'} className={style.navBtn} data-selected={pathname === '/'}>
        <h1>모두의 상식</h1>
        <line />
      </Link>
      <Link href={'/my'} className={style.navBtn} data-selected={pathname === '/my'}>
        <h1>나만의 상식</h1>
        <line />
      </Link>
      <Link href={'/event'} className={style.navBtn} data-selected={pathname === '/event'}>
        <h1>이벤트</h1>
        <line />
      </Link>
    </ul>
  )
}