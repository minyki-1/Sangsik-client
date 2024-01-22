'use client';
import style from "./style.module.scss";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useEffect, useState } from "react";

export default function NavList() {
  const pathname = usePathname();
  const [page, setPage] = useState('/');
  useEffect(() => {
    if (pathname.includes('/my')) {
      setPage('/my')
    } else if (pathname === '/event') {
      setPage('/event')
    } else {
      setPage('/')
    }
  }, [pathname])
  return (
    <ul className={style.navList}>
      <Link href={'/'} className={style.navBtn} data-selected={page === '/'}>
        모두의 상식
      </Link>
      <Link href={'/my'} className={style.navBtn} data-selected={page === '/my'}>
        나만의 상식
      </Link>
      <Link href={'/event'} className={style.navBtn} data-selected={page === '/event'}>
        이벤트
      </Link>
    </ul>
  )
}