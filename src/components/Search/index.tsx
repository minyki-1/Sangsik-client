import style from './index.module.scss'
import searchIcon from '@/assets/icons/search.svg'
import Image from 'next/image'

export default function Search() {
  return (
    <article className={style.container}>
      <div className={style.alignRight}>
        <select className={style.orderBox}>
          <option value="인기순">인기순</option>
          <option value="최신순">최신순</option>
        </select>
        <div className={style.searchWrap}>
          <input type="text" placeholder='세계에서 가장 높은 산은?' />
          <Image src={searchIcon} alt='search icon' width={24} height={24} />
        </div>
      </div>
    </article>
  )
}