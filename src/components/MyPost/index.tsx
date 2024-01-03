import style from './index.module.scss'
import Image from 'next/image'
import bookmarkIcon from '@/assets/icons/bookmark.svg'
import bulbIcon from '@/assets/icons/bulb.svg'
import editIcon from '@/assets/icons/edit.svg'
import Posts from '@/components/Posts'


export default function MyPost() {
  return (
    <>
      <div className={style.container}>
        <div className={style.orderWrap}>
          <div className={style.order} data-selected={true}>
            <Image src={bookmarkIcon} alt='bookmark icon' />
            <p>북마크</p>
          </div>
          <div className={style.order} data-selected={false}>
            <Image src={bulbIcon} alt='bulb icon' />
            <p>내상식</p>
          </div>
        </div>
        <button className={style.createBtn}>
          <Image src={editIcon} alt='edit icon' />
          <p>새 상식 작성</p>
        </button>
      </div>
      <Posts />
    </>
  )
}