'use client'
import style from './style.module.scss'
import BookmarkIcon from '@/assets/icons/bookmark.svg'
import BulbIcon from '@/assets/icons/bulb.svg'
import EditIcon from '@/assets/icons/edit.svg'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function MyPostOrder() {
  const pathname = usePathname();

  return (
    <>
      <div className={style.container}>
        <div className={style.orderWrap}>
          <Link href={'/my/bookmark'} className={style.order} data-selected={pathname === '/my/bookmark'}>
            <BookmarkIcon />
            <p>북마크</p>
          </Link>
          <Link href={'/my/post'} className={style.order} data-selected={pathname === '/my/post'}>
            <BulbIcon />
            <p>내상식</p>
          </Link>
        </div>
        <Link href={'/write'} className={style.createBtn} onClick={() => { localStorage.removeItem('editorData') }}>
          <EditIcon />
          <p>새 상식 작성</p>
        </Link>
      </div>
    </>
  )
}